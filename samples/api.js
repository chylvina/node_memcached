var PORT = 11211;
var HOST = '10.232.4.26';
var username = '8ef0266ada9e11e3';
var password = '123_Jae_ASD';

var memcached = require("../index");

memcached.debug_mode = true;

var createClient = function() {
  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password,
    retry_max_delay: 1000,
    connect_timeout: 1000,
    max_attempts: 2,
    no_ready_check: true
  });

  var reconnecting = false;

  client.on('error', function (err) {
    if(err == 'lost connection') {
      if(memcached.debug_mode) {
        console.log('will reconnect manually after 10 sec...');
      }

      reconnecting = true;
      setTimeout(function() {
        client.reconnect();
      }, 1000 * 10);
    }
    else {
      console.log(err);
    }
  });

  client.on('ready', function() {
    if(reconnecting) {
      reconnecting = false;
      console.log('reconnect success');
    }

  });

  client.set('hello', 'world', function (err, data) {
    if(err) {
      console.log('error:', err);
    }

    console.log('success:', data);
  });

  client.noop(function(err, data) {
    if(err) {
      console.log('error:', err);
    }

    console.log('success:', data);
  });

  return client;
};

createClient();
