"use strict";

var should = require('should');
var config = require('./config');

var PORT = config.port;
var HOST = config.host;
var username = config.username;
var password = config.password;

var memcached = require("../index");

describe('#Event:connect', function () {
  it('should work', function (done) {
    var n = 0;
    var client = memcached.createClient(PORT, HOST, {
      username: username,
      password: password
    });

    client.on('connect', function () {
      n++;
      should(client.connected).eql(true);
    });

    client.on('ready', function () {
      n++;
      should(client.ready).eql(true);
      should(n).eql(2);
      client.end();
      done();
    });
  });
});

describe('#Event:connect', function () {
  it('should work', function (done) {
    var n = 0;
    var client = memcached.createClient(PORT, HOST, {
      username: username,
      password: 'wrong password'
    });

    client.on('connect', function () {
      n++;
    });

    client.on('ready', function () {
      n++;
    });

    client.on('error', function () {
      n++;
      should(n).eql(1);
      client.end();
      done();
    });
  });
});