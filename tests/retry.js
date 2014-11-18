"use strict";

var should = require('should');

var PORT = 11211;
var HOST = '127.0.0.1';
var username = 'myname';
var password = 'mypass';

var memcached = require("../index");

var client = memcached.createClient(PORT, HOST, {
  username: username,
  password: password
});

client.on('error', function(err) {
  console.log('client error:', err);
});