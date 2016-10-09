var express = require('express');
var uuid = require('node-uuid');
var shortid = require('shortid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(shortid.generate());
});

router.get('/:roomId', function(req, res, next) {
  res.render('index', { title: req.params.roomId, id: uuid.v4() });
});

module.exports = router;
