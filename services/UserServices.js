'use strict';

const mongoose = require('./MongooseServices.js');

var UserModel = mongoose.model('User',
 {
   _id: String,
   access_token: String,
   refresh_token: String,
 });

 function UserService() {}

 UserService.prototype.addTokens = function addTokens(userId, access_token, refresh_token) {

   var query = {_id: userId},
       update = { access_token, refresh_token },
       options = { upsert: true, new: true, setDefaultsOnInsert: true };

   UserModel.findOneAndUpdate(query, update, options, function(error, result) {
       if (error) {
         console.log(error);
       } else {
         console.log(`stored WPM`);
       }
   });

   if (this.authorizeCallback) this.authorizeCallback(userId);
 }

 UserService.prototype.getTokens = function getTokens(id, callback) {
   console.log(id)
   UserModel.findById(id, function(err, usermodel) {
     console.log(usermodel)
     callback(usermodel);
   });
 }

 UserService.prototype.onAuthorized = function onAuthorized(callback) {
   this.authorizeCallback = callback;
 }

 module.exports = new UserService();
