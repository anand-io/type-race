const Primus = require('primus')
const Emitter = require('primus-emitter');
const Rooms = require('primus-rooms');
const client = require('redis').createClient();
require('bluebird').promisifyAll(require("redis"));
const paragraphs = require('./paragraphs.json');

function WebSocketServer(server) {
  const primus = new Primus(server, { transformer: 'websockets' });
  primus.plugin('emitter', Emitter);
  primus.plugin('rooms', Rooms);
  primus.save(__dirname +'/public/javascripts/builds/primus.js');
  primus.on('connection', function connection(spark) {
    // client.set(spark.query.myId, spark.id);

    spark.on('joinRace', function (raceId, callback) {
      if (spark.joinedRace) return;
      client.getAsync(`${raceId}_isStated`)
      .then((isStated) => {
        if (isStated) {
          callback()
          return;
        }
        spark.join(raceId, function () {
          spark.joinedRace = raceId;
          client.saddAsync(`${raceId}_racers`, spark.query.myId);
          client.getAsync(`${raceId}_para`)
          .then(para => {
            if(!para) client.set(`${raceId}_para`, paragraphs['0']);
            const paragraph = para || paragraphs['0'];

            const sparks = spark.room(raceId).clients();
            const participants = sparks.map(id => {
              const s = primus.spark(id);
              return s.query.myId
            });
            callback(paragraph, participants);
            if (sparks.length > 1) {
              spark.room(raceId).send('startCounter');
              client.set(`${raceId}_statedAt`, new Date().getTime());
            }
          });
          spark.room(raceId).except(spark.id).send('participantJoined', spark.query.myId);
        });
      });

    });

    spark.on('updateWMP', (noOfCharacters) => {
      const raceId = spark.joinedRace;
      const countTime = new Date().getTime();
      client.getAsync(`${raceId}_statedAt`)
      .then((startedTime) => {
        if (!startedTime) throw Error(`no startedTime for race ${raceId}`);
        const timeTakenInMin = ((countTime - (Number(startedTime) + 6000)) / 1000) / 60;
        const wpm = (noOfCharacters / 5) / timeTakenInMin;
        const data = { id: spark.query.myId, wpm, noOfCharacters };
        spark.room(raceId).send('participantWordCount', data);
      });
    });

    spark.on('raceStarted', () => {
      const raceId = spark.joinedRace;
      client.set(`${raceId}_isStated`, true);
    });

    spark.on('finishedRace', () => {
      const raceId = spark.joinedRace;
      client.sremAsync(`${raceId}_racers`, spark.query.myId)
      .then(() => {
        client.smembersAsync(`${raceId}_racers`)
        .then((racers) => {
          if (racers.length === 0) {
            client.del(`${raceId}_isStated`);
            const sparks = spark.room(raceId).clients();
            sparks.forEach(s => {
              s.leave(raceId, () => {
                s.send('leftRace', raceId);
              });
            });
          }
        });
      });
    });

    spark.on('end', () => {
      const raceId = spark.joinedRace;
      client.sremAsync(`${raceId}_racers`, spark.query.myId)
      .then(() => {
        client.smembersAsync(`${raceId}_racers`)
        .then((racers) => {
          if (racers.length === 0) {
            client.del(`${raceId}_isStated`);
          }
        });
      });
    });

  });
}

module.exports = WebSocketServer;
