var config = require('./memcached_server_config');

var PORT = config.PORT;
var HOST = config.HOST;
var username = config.username;
var password = config.password;

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
    
    assert.ok(client.connected == true);
  });

  client.on('ready', function () {
    n++;

    assert.ok(client.ready == true);
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

