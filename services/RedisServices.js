'use strict';
const client = require('redis').createClient();
// const client = require('redis').createClient("redis://user:typepassword@redis-16046.c10.us-east-1-2.ec2.cloud.redislabs.com:16046");

module.exports = client;
