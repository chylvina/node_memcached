var PORT = 11211;
var HOST = '127.0.0.1';

var memcached = require("../index");

memcached.debug_mode = true;

var createClient = function() {
  var client = memcached.createClient(PORT, HOST, {
    retry_max_delay: 1000,
    connect_timeout: 1000,
    max_attempts: 2,
    no_ready_check: true
  });

  var reconnecting = false;

  client.on('error', function (err) {
    if(err == 'lost connection') {
      if(memcached.debug_mode) {
        console.log('will reconnect manually after 3 sec...');
      }

      reconnecting = true;
      setTimeout(function() {
        client.reconnect();
      }, 1000 * 3);
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
      return;
    }

    console.log('success:', data);
  });

  client.add('hello', 'again', function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.get('hello111', function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.noop(function(err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.set('number', 2, function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });


  client.increment('number', 2, function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.get('number', function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.decrement('number', 1, function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  client.get('number', function (err, data) {
    if(err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });

  return client;
};

createClient();
