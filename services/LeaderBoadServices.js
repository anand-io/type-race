'use strict';
const mongoose = require('./MongooseServices.js');

var LeaderBoardModel = mongoose.model('LeaderBoad',
 {
   userId: String,
   name: String,
   wpm: { type: String, index: true },
 });

function LeaderBoard() {}

LeaderBoard.prototype.addWPM = function addWPM(userId, wpm, name) {
  var leaderBoardEntry = new LeaderBoardModel({ userId, wpm, name });
  leaderBoardEntry.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`stored WPM`);
    }
  });
};

LeaderBoard.prototype.getLeaders = function getLeaders(callback) {
  LeaderBoardModel.find().sort('-wpm').limit(10).exec((err, leaders) => {
    callback(leaders);
  });
};

module.exports = new LeaderBoard();
