'use strict';
const mongoose = require('./MongooseServices.js');

var LeaderBoardModel = mongoose.model('LeaderBoard',
 {
   _id: String,
   name: String,
   wpm: { type: Number, index: true },
   imageUrl: String,
 });

function LeaderBoard() {}

LeaderBoard.prototype.addWPM = function addWPM(userId, wpm, name, imageUrl) {

  LeaderBoardModel.findById(userId, function (err, myDocument) {
    if (myDocument) {
      if (myDocument.wpm > wpm) return;
      myDocument.wpm = wpm;
      myDocument.save();
    } else {
      myDocument = new LeaderBoardModel({ _id: userId, wpm, name, imageUrl });
      myDocument.save();
    }
  });
};

LeaderBoard.prototype.getLeaders = function getLeaders(callback) {
  LeaderBoardModel.find().sort('-wpm').limit(20).exec((err, leaders) => {
    callback(leaders);
  });
};

LeaderBoard.prototype.getUserPosition = function getUserPosition(userId) {
  LeaderBoardModel.findById(userId, (err, user) => {
    if(!user) return;
    LeaderBoardModel.find().gt('wpm', user.wpm).count((err, count) => {
      console.log(count + 1);
    })
  })
};

module.exports = new LeaderBoard();
