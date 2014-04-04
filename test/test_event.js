var PORT = 11211;
var HOST = '10.232.4.26';
var username = '7d4a76f6b9c711e3';
var password = '123_Jae_ASD';

var memcached = require("../index");

memcached.debug_mode = true;

exports.testConnect = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.on('connect', function () {
    n++;
  });

  client.on('ready', function () {
    n++;

    client.end();
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(2, n);
  });
};

// test wrong host
exports.testError1 = function (beforeExit, assert) {
  var n = 0;

  // connect to an wrong host
  var client = memcached.createClient(PORT, 'wrong host', {
    username: username,
    password: password
  });

  client.on('error', function () {
    n++;
    client.end();
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(1, n);
  });
};

// test wrong username
exports.testError2 = function (beforeExit, assert) {
  var n = 0;

  // connect to an wrong host
  var client = memcached.createClient(PORT, HOST, {
    username: 'wrong user name',
    password: password
  });

  client.on('error', function () {
    n++;
    client.end();
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(1, n);
  });
};

// test wrong password
exports.testError2 = function (beforeExit, assert) {
  var n = 0;

  // connect to an wrong host
  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: 'wrong password'
  });

  client.on('error', function () {
    n++;
    client.end();
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(1, n);
  });
};

