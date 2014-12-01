"use strict";

var should = require('should');

var PORT = 11211;
var HOST = '127.0.0.1';
var username = 'myname';
var password = 'mypass';

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