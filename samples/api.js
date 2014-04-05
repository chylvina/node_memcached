var PORT = 11211;
var HOST = '10.232.4.26';
var username = '7d4a76f6b9c711e3';
var password = '123_Jae_ASD';

var memcached = require("../index");

memcached.debug_mode = true;

var client = memcached.createClient(PORT, HOST, {
  username: username,
  password: password,
  retry_max_delay: 1000
});

/*setTimeout(function() {
  client.set('hello', 'world', function (err, data) {
    console.log(err, data);
  });
}, 9000);*/

client.noop(function (err, data) {
  console.log(err, data);
});

client.on('error', function (err) {
  console.log('hihihi:', err);
  client.end();
});
