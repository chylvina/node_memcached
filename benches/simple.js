"use strict";

var PORT = 11211;
var HOST = '127.0.0.1';
var username = 'myname';
var password = 'mypass';
var memcached = require("../index");

var client = memcached.createClient(PORT, HOST, {
  username: username,
  password: password
});

var start = Date.now();
var i = 0;

var set = function() {
  if(i == 10000) {
    console.log("10000 simple set cost", Date.now() - start, 'milliseconds');
    start = Date.now();
    i = 0;
    get();
    return;
  }
  client.set(i++, i, 100, function(err, res) {
    set();
  });
};

var get = function() {
  if(i == 10000) {
    console.log("10000 simple get cost", Date.now() - start, 'milliseconds');
    return;
  }
  client.get(i++, function(err, res) {
    get();
  });
};

set();