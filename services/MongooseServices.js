'use strict';
var mongoose = require('mongoose');

let mongodbUrl;
if (process.env.NODE_ENV === 'production') {
  var credentials = require('../credentials.json');
  mongodbUrl = credentials.mongodb;
} else {
  mongodbUrl = 'mongodb://localhost/test';
}

mongoose.connect(mongodbUrl);

module.exports = mongoose;
