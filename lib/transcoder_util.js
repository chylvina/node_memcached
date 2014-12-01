exports.decodeLong = function (data) {
  var rv = 0;
  for (var i = 0, len = data.length; i < len; i++) {
    var b = data[i];
    rv = (rv << 8) | (b < 0 ? (256 + b) : b);
  }
  return rv;
};

exports.decodeInt = function (data) {
  return decodeLong(data);
};

exports.decodeByte = function (data) {
  var rv = 0;
  if (data.length === 1) {
    rv = data[0];
  }
  return rv;
};

exports.decodeBoolean = function (data) {
  return data[0] === '1';
};

