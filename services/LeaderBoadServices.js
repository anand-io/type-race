'use strict';
const mongoose = require('./MongooseServices.js');

var LeaderBoardModel = mongoose.model('LeaderBoad',
 {
   _id: String,
   name: String,
   wpm: { type: String, index: true },
 });

function LeaderBoard() {}

LeaderBoard.prototype.addWPM = function addWPM(userId, wpm, name) {
  var query = {_id: userId},
      update = { wpm, name },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

  LeaderBoardModel.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) {
        console.log(error);
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
