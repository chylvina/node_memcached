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
var s = 'sdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23' +
  'nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4' +
  'fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsnd' +
  'flsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownif' +
  'o[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2l' +
  'f3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3nsdflsndflsnfdowihfownifo[2h3fo23nf2;ofn2;lknf;l2knf2f2lf;;12c92100292i2n4fl2knf3lkn23fl2n3fl2k3nf2lk3fn2lf3n';

var set = function() {
  if(i == 10000) {
    console.log("10000 simple set cost", Date.now() - start, 'milliseconds');
    start = Date.now();
    i = 10000;
    get();
    return;
  }
  client.set(i++, s, 100, function(err, res) {
    set();
  });
};

var get = function() {
  if(i < 1) {
    console.log("10000 simple get cost", Date.now() - start, 'milliseconds');
    return;
  }
  client.get(--i, function(err, res) {
    get();
  });
};

set();
