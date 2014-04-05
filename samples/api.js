var PORT = 11211;
var HOST = '10.232.4.26';
var username = '7d4a76f6b9c711e3';
var password = '123_Jae_ASD';

var memcached = require("../index");

memcached.debug_mode = true;

var createClient = function() {
  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password,
    retry_max_delay: 1000,
    connect_timeout: 1000,
    max_attempts: 2
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
  });

  client.on('ready', function() {
    if(reconnecting) {
      reconnecting = false;
      console.log('reconnect success');
    }

  });

  return client;
};

createClient();
