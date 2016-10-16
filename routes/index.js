var express = require('express');
var uuid = require('node-uuid');
var shortid = require('shortid');
var requst = require('request');
var userService = require('../services/UserServices');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(shortid.generate());
});

router.get('/AWAPI', function(req, res, next) {
  res.render('index', { id: uuid.v4() });
});

router.get('/fullAuth', function(req, res, next) {
  res.redirect(`https://access.anywhereworks.com/o/oauth2/auth?response_type=code&client_id=29354-350168b6951106380b1ae3cc5e2f5feb&access_type=offline&scope=awapis.users.read awapis.feeds.write awapis.notifications.write &redirect_uri=http://localhost:3000/fullAuthCallback`);
});

router.get('/fullAuthCallback', function(req, res, next) {
  console.log('response : ', req.body, req.query);
  var params = req.query
  if (params.code) {
    requst.post({
      url: 'https://access.anywhereworks.com/o/oauth2/v1/token',
      form: { code: params.code, client_id:'29354-350168b6951106380b1ae3cc5e2f5feb',
              client_secret: 'yROIE6frtWTS9VkPeBVBpX7zw8o5ZbzHnxLgWgYK',
              redirect_uri: 'http://localhost:3000/fullAuthCallback',
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
  res.json({
    response: req.query,
    body: req.body,
  })
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

router.get('/:roomId', function(req, res, next) {
  res.render('index', {  name: req.query.name, id: uuid.v4() });
});

module.exports = router;
