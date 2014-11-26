var PORT = 11211;
var HOST = '127.0.0.1';
var username = 'myname';
var password = 'mypass';
var memcached = require("../index");

var client = memcached.createClient(PORT, HOST, {
  username: username,
  password: password
});

client.on("error", function (err) {
  console.log("Error " + err);
});

// 10 为过期时间， 10秒
client.set('hello', 'world', 10, function(err, res) {
  console.log(err, res);
});

client.get('hello', function(err, res) {
  console.log(err, res);
});

// 也可以不用设置过期时间
client.set('number', 1, function(err, res) {
  console.log(err, res);
});

client.increment('number', 2, function(err, res) {
  console.log(err, res.toString());
});

client.decrement('number', 1, function(err, res) {
  console.log(err, res.toString());
});

client.get('number', function(err, res) {
  console.log(err, res);
});
