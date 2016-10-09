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

    spark.on('joinRoom', function (room, callback) {
      spark.join(room, function () {
        client.getAsync(`${room}_para`)
        .then(para => {
          if(!para) client.set(`${room}_para`, paragraphs['0']);
          const paragraph = para || paragraphs['0'];

          const sparks = spark.room(room).clients();
          const participants = sparks.map(id => {
            const s = primus.spark(id);
            return s.query.myId
          });
          callback(paragraph, participants);
        });
        // spark.write('you joined room ' + room);

        spark.room(room).except(spark.id).send('participantJoined', spark.query.myId);
      });
    });

    spark.on('ready', function (room, callback) {
      spark.isReady = true;
      spark.room(room).send('participantReady', spark.query.myId);
      const sparks = spark.room(room).clients();
      if (!sparks || sparks.length === 1) return;
      let isEveryoneReady = true;
      sparks.forEach(id => {
        const s = primus.spark(id);
        if (!s.isReady) isEveryoneReady = false;
      });
      if (isEveryoneReady) {
        spark.room(room).send('everyoneReady');
      }
    });

  });
}

module.exports = WebSocketServer;
