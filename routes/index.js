var express = require('express');
var uuid = require('node-uuid');
var shortid = require('shortid');
var request = require('request');
var userService = require('../services/UserServices');
var credentials = require('../credentials.json');
var AwServices = require('../services/AwServices');
var leaderBoardServices = require('../services/LeaderBoardServices');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(shortid.generate());
});

router.get('/AWAPI', function(req, res, next) {
  res.render('index', { isAW: 'true' });
});

router.get('/Permissions', function(req, res, next) {
  res.redirect(`https://access.anywhereworks.com/o/oauth2/auth?response_type=code&client_id=29354-350168b6951106380b1ae3cc5e2f5feb&access_type=offline&scope=awapis.users.read awapis.feeds.write awapis.notifications.write awapis.chat.streams.push awapis.chat.users.push &redirect_uri=https://anandhub.com/fullAuthCallback`);
});

router.get('/fullAuthCallback', function(req, res, next) {
  console.log('response : ', req.body, req.query);
  var params = req.query
  if (params.code) {
    console.log('params.code : ', params.code);
    request.post({
      url: 'https://access.anywhereworks.com/o/oauth2/v1/token',
      form: { code: params.code, client_id: credentials.client_id,
              client_secret: credentials.client_secret,
              redirect_uri: 'https://anandhub.com/fullAuthCallback',
              grant_type: 'authorization_code'
            },
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
    },
    function(e, r, body) {
      console.log(e);
      console.log('respose : ');
      console.log(body);
      console.log(`user_id : ${body.user_id}`)
      body = JSON.parse(body);
      if (body && body.user_id) {
        console.log('storing tokens....');
        userService.addTokens(body.user_id, body.access_token, body.refresh_token);
      }
    });
  }
  res.send('<h1>Thanks, you can now close this window and continue using the app</h1>');
});

router.get('/getTokens', function(req, res, next) {
    var params = req.query
    userService.getTokens(params.id, function(model) {
      console.log(model);
      res.json({
        response: model
      })
    })
});

router.post('/feed', function(req, res, next) {
  console.log('inside feed')
  var user_id = req.body.user_id;
  var content = req.body.content;
  if (user_id) {
    AwServices.postFeed(user_id, content);
  }
 });

router.get('/:roomId', function(req, res, next) {
  res.render('index', {  name: req.query.name, id: uuid.v4() });
});

module.exports = router;
