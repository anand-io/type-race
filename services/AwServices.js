'use strict';
var request = require('request');
var credentials = require('../credentials.json');
var userService = require('./UserServices');

function AwServices() {}


function getNewAccessToken(refresh_token, callback) {
  request.post({
    url: 'https://access.anywhereworks.com/o/oauth2/v1/token',
    form: { refresh_token: refresh_token, client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            grant_type: 'refresh_token'
          },
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
  },
  function(e, r, body) {
    console.log(e);
    console.log('respose : ');
    console.log(body)
    body = JSON.parse(body);
    console.log(body)
    if (body && body.access_token) {
      console.log(`got new access_token .... ${body.access_token}`);
      callback(body.access_token);
    }
  });
};

AwServices.prototype.postFeed = function postFeed(user_id, content) {
  if (user_id) {
    userService.getTokens(user_id, function(model) {
      console.log(`posting feed : ${user_id} ${content}`);
      if (model.access_token && model.refresh_token) {
        getNewAccessToken(model.refresh_token, function(access_token) {
          var options = {
            url: 'https://api.anywhereworks.com/api/v1/feed',
            body: JSON.stringify({
  	           "content": content,
               "type" : "update"
            }),
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          }
          request.post(options, function(e, r, body) {
            console.log(body);
          });
        });
      }
    });
  }
};

AwServices.prototype.sendMessage = function sendMessage(myId, accountId, userId, streamId, content) {
  var url = userId ? `https://api.anywhereworks.com/api/v1/account/${accountId}/chat/user/${userId}/message`:
    `https://api.anywhereworks.com/api/v1/account/${accountId}/chat/stream/${streamId}/message`;
  console.log(`sending message : ${userId} ${content}`);
  userService.getTokens(myId, function(model) {
    console.log(`something message : ${userId} ${content}`);
    if (model.access_token && model.refresh_token) {
      getNewAccessToken(model.refresh_token, function(access_token) {
        var options = {
          url: url,
          body: JSON.stringify({
             "msg": content,
          }),
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${access_token}`
          }
        }
        request.post(options, function(e, r, body) {
          console.log(body);
        });
      });
    }
  });
}

module.exports = new AwServices();
