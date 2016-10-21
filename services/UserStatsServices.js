'use strict';
const mongoose = require('./MongooseServices.js');

var UserStatsModel = mongoose.model('UserStats',
 {
   _id: String,
   racesWon: { type: Number, index: true, default: 0 },
   raceCompleted: { type: Number, index: true, default: 0 },
   warmupsCompleted: { type: Number, index: true, default: 0 },
   overallRaceWPM: { type: Number, index: true, default: 0 },
   overallWarmupWPM: { type: Number, index: true, default: 0 },
   lastTenRaceWPM: {type: [Number], default: []},
   name: String,
   imageUrl: String,
 });

function UserStats() {}

UserStats.prototype.addWPM = function addWPM(userId, wpm, name, imageUrl, isWarmup, won) {

  UserStatsModel.findById(userId, function (err, myDocument) {
    if (!myDocument) {
      myDocument = new UserStatsModel({ _id: userId});
    }
    if (isWarmup) {
      myDocument.warmupsCompleted +=  1;
      myDocument.overallWarmupWPM += wpm;
    } else {
      myDocument.raceCompleted +=  1;
      myDocument.overallRaceWPM += wpm;
      if (myDocument.lastTenRaceWPM.length === 10) myDocument.lastTenRaceWPM.shift();
      myDocument.lastTenRaceWPM.push(wpm);
    }
    if (won && !isWarmup) myDocument.racesWon += 1;
    myDocument.name = name;
    myDocument.imageUrl = imageUrl;
    myDocument.save();
  });
};

UserStats.prototype.fixRacesWon = function fixRacesWon() {
  UserStatsModel.find().exec(function (err, docs) {
    docs.forEach(doc => {
      doc.racesWon = doc.racesWon - doc.warmupsCompleted;
      doc.save();
    });
  });
}


// UserStats.prototype.getLeaders = function getLeaders(callback) {
//   UserStatsModel.find().sort('-wpm').limit(20).exec((err, leaders) => {
//     callback(leaders);
//   });
// };

module.exports = new UserStats();
