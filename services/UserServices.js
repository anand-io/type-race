'use strict';

const mongoose = require('./MongooseServices.js');

var UserModel = mongoose.model('User',
 {
   _id: String,
   access_token: String,
   refresh_token: String,
 });

 function UserService() {}

 UserService.prototype.addTokens = function addTokens(userId, accessToken, refreshToken) {
   UserModel.findById(userId, function(err, usermodel) {
      if(usermodel !== null) {
        console.log(usermodel);
        console.log('updating the usermodel');
        usermodel.access_token = accessToken;
        usermodel.refresh_token = refreshToken;
        usermodel.save();
      }
      else {
        console.log('creating new usermodel');
        var userModelEntry = new UserModel({ _id: userId, access_token:accessToken, refresh_token:refreshToken });
        userModelEntry.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`stored UserModel`);
          }
        });
      }
   });
 }

 UserService.prototype.getTokens = function getTokens(id, callback) {
   console.log(id)
   UserModel.findById(id, function(err, usermodel) {
     console.log(usermodel)
     callback(usermodel);
   });
 }

 module.exports = new UserService();
