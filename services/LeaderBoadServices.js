'use strict';
const mongoose = require('./MongooseServices.js');

var LeaderBoardModel = mongoose.model('LeaderBoad',
 {
   _id: String,
   name: String,
   wpm: { type: String, index: true },
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
  LeaderBoardModel.find().sort('-wpm').limit(10).exec((err, leaders) => {
    callback(leaders);
  });
};

module.exports = new LeaderBoard();
