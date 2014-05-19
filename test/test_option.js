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

exports.testRetryAutomatically = function (beforeExit, assert) {
  var n = 0;
  var errorCount = 0;
  var lostConnectionCount = 0;
  var connectCount = 0;
  var readyCount = 0;
  var retryCount = 0;

  var unReachablePort = 1234;
  var client = memcached.createClient(unReachablePort, HOST, {
    username: username,
    password: password,
    retry_max_delay: 1000,
    connect_timeout: 1000,
    max_attempts: 2
  });

  client.on('connect', function () {
    connectCount++;
  });

  client.on('ready', function () {
    readyCount++;
  });

  client.on('reconnecting', function() {
    retryCount++;
  });

  client.on('error', function(err) {
    errorCount++;
    if(err == 'lost connection') {
      lostConnectionCount++;
      client.end();
    }
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(2, errorCount);
    assert.equal(1, lostConnectionCount);
    assert.equal(0, connectCount);
    assert.equal(0, readyCount);
    assert.equal(1, retryCount);
  });
};
