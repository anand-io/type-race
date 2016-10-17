'use strict';
const Primus = require('primus')
const Emitter = require('primus-emitter');
const Rooms = require('primus-rooms');
require('bluebird').promisifyAll(require("redis"));
const client = require('./services/RedisServices.js');
const paragraphs = require('./paragraphs.json');
const leaderBoadServices = require('./services/LeaderBoadServices');
const userServices = require('./services/UserServices');
const AwServices = require('./services/AwServices');

function WebSocketServer() {}

WebSocketServer.prototype.init = function init(server){

  this.primus = new Primus(server, { transformer: 'websockets' });
  this.primus.plugin('emitter', Emitter);
  this.primus.plugin('rooms', Rooms);
  this.primus.save(__dirname +'/public/javascripts/builds/primus.js');

  userServices.onAuthorized(function (id) {
    const spark = this.primus.spark(id);
    spark.send('gotAuthorization');
  });

  this.primus.on('connection', spark => {

    client.set(spark.query.myId, spark.id);

    userServices.getTokens(spark.query.myId, function functionName(usermodel) {
      if (!usermodel)  {
        spark.send('needAuthorization');
      }
    });


    spark.on('joinRace', (raceId, isPractice, callback) => {
      if (spark.joinedRace) return;
      client.getAsync(`${raceId}_isStated`)
      .then((isStated) => {
        if (isStated) {
          callback()
          return;
        }
        spark.join(raceId, () => {
          spark.joinedRace = raceId;
          client.saddAsync(`${raceId}_racers`, spark.query.myId);
          console.log(spark.query.myId);
          client.getAsync(`${raceId}_para`)
          .then(para => {
            if(!para) client.set(`${raceId}_para`, paragraphs['0']);
            const paragraph = para || paragraphs['0'];

            const sparks = spark.room(raceId).clients();
            const participants = sparks.map(id => {
              const s = this.primus.spark(id);
              return {id: s.query.myId, name: s.query.name};
            });
            callback(paragraph, participants);
            if (sparks.length > 1 || isPractice) {
              spark.room(raceId).send('startCounter');
              client.set(`${raceId}_statedAt`, new Date().getTime());
            }
          });
          const participant = { id: spark.query.myId, name: spark.query.name };
          spark.room(raceId).except(spark.id).send('participantJoined', participant);
        });
      });
    });

    spark.on('challenge', (to, streamId, callback) => {
      if (!to) return;
      const toList = [].concat(to);
      toList.forEach(toId => {
        client.get(toId, (err, sparkId) => {
          console.log(sparkId);
          const peerSpark = this.primus.spark(sparkId);
          if(!peerSpark) return;
          console.log(peerSpark);
          const data =  { from: spark.query.myId, streamId, name: spark.query.name };
          peerSpark.send('challenge', data, callback);
        });
      });
    });

    spark.on('updateWMP', (noOfCharacters, isFinished, disqualified) => {
      const raceId = spark.joinedRace;
      const countTime = new Date().getTime();
      spark.noOfCharacters = noOfCharacters;
      spark.isFinished = isFinished;
      spark.disqualified = disqualified;
      client.getAsync(`${raceId}_statedAt`)
      .then((startedTime) => {
        let wpm = 0;
        if (startedTime) {
          const timeTakenInMin = ((countTime - (Number(startedTime) + 6000)) / 1000) / 60;
          wpm = (noOfCharacters / 5) / timeTakenInMin;
        }
        const sparks = spark.room(raceId).clients();
        let position = 1;
        sparks.forEach(id => {
          const s = this.primus.spark(id);
          if (spark.disqualified) {
            position = 0;
            return;
          }
          if (s.id === spark.id) return;
          if (s.noOfCharacters > noOfCharacters || (s.isFinished && ! s.disqualified)) position++;
        });
        const data = { id: spark.query.myId, wpm, noOfCharacters, isFinished, position,
          disqualified, name: spark.query.name };
        spark.room(raceId).send('participantWordCount', data);

        if (isFinished && wpm > 30) {
          const content = `Played Typerace, position : ${position}, speed : ${wpm}`
          console.log(content);
          AwServices.postFeed(spark.query.myId, content);
          leaderBoadServices.addWPM(spark.query.myId, wpm, spark.query.name);
        }
      });

      if (isFinished) {
        this.removeFromRace(spark, raceId);
      }
    });

    spark.on('raceStarted', () => {
      const raceId = spark.joinedRace;
      client.set(`${raceId}_isStated`, true);
    });


    spark.on('end', () => {
      if(!spark.joinedRace) return;
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

    spark.on('leaveRace', () => {
      if(!spark.joinedRace) return;
      const raceId = spark.joinedRace;
      this.removeFromRace(spark, raceId);
      spark.joinedRace = null;
      spark.isFinished = false;
      spark.disqualified = false;
      spark.noOfCharacters = 0;
      spark.leave(raceId, () => {
        spark.send('raceOver', raceId);
      });
    });

    spark.on('getLeaders', callback => {
      leaderBoadServices.getLeaders(callback);
    });
  });
}

WebSocketServer.prototype.removeFromRace = function (spark, raceId) {
  console.log(spark.query.myId + 'leaving' + raceId);
  client.sremAsync(`${raceId}_racers`, spark.query.myId)
  .then(() => {
    client.smembersAsync(`${raceId}_racers`)
    .then((racers) => {
      if (racers.length === 0) {
        client.del(`${raceId}_isStated`);
        client.del(`${raceId}_para`);
        client.del(`${raceId}_statedAt`);
        client.del(`${raceId}_racers`);
        const sparks = spark.room(raceId).clients();
        console.log(sparks);
        sparks.forEach(id => {
          const s = this.primus.spark(id);
          s.joinedRace = null;
          s.isFinished = false;
          s.disqualified = false;
          s.noOfCharacters = 0;
          s.leave(raceId, () => {
            s.send('raceOver', raceId);
          });
        });
      }
    });
  });
}

module.exports = new WebSocketServer();
