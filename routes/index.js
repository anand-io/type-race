var express = require('express');
var uuid = require('node-uuid');
var shortid = require('shortid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(shortid.generate());
});

router.get('/AWAPI', function(req, res, next) {
  res.render('index', { id: uuid.v4() });
});

router.get('/:roomId', function(req, res, next) {
  res.render('index', {  name: req.query.name, id: uuid.v4() });
});

module.exports = router;
