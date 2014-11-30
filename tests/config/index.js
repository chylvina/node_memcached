
var fs = require('fs');
var path = require('path');

var config = {
  port: 11211,
  host: '127.0.0.1',
  username: 'myname',
  password: 'mypass'
};

var configDev = path.join(__dirname, 'config-dev.js');
if (fs.existsSync(configDev)) {
  var options = require(configDev);
  for (var k in options) {
    config[k] = options[k];
  }
}

module.exports = config;