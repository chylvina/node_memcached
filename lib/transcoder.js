
var InputObjectStream = require('java.io').InputObjectStream;
var zlib = require('zlib');
var tu = require('./transcoder_util');

var SERIALIZED = 1;
var COMPRESSED = 2;
var SPECIAL_MASK = 0xff00;
var SPECIAL_BOOLEAN = (1 << 8);
var SPECIAL_INT = (2 << 8);
var SPECIAL_LONG = (3 << 8);
var SPECIAL_DATE = (4 << 8);
var SPECIAL_BYTE = (5 << 8);
var SPECIAL_FLOAT = (6 << 8);
var SPECIAL_DOUBLE = (7 << 8);
var SPECIAL_BYTEARRAY = (8 << 8);

function decodeInt(data, i) {
  return (data[i] & 0xff) << 24
    | (data[i + 1] & 0xff) << 16
    | (data[i + 2] & 0xff) << 8
    | (data[i + 3] & 0xff);
}

function deserialize(data) {
  var is = new InputObjectStream(data, false);
  return is.readObject();
}

// deflate
exports.compress = function (input) {
  return zlib.deflateSync(input, {
    level: zlib.Z_BEST_COMPRESSION
  });
};

exports.decompress = function (input) {
  return zlib.inflateSync(input);
};

exports.decode = function (reply) {
  var data = new Buffer(reply.val);
  var extras = new Buffer(reply.extras);
  var rv;
  var flags;

  flags = decodeInt(extras, 0);
  if (flags & COMPRESSED) {
    data = decompress(data);
  }
  var _flags = flags & SPECIAL_MASK;
  if ((flags & SERIALIZED) !== 0 && data) {
    rv = deserialize(data);
  } else if (_flags !== 0 && data) {
    switch (_flags) {
      case SPECIAL_BOOLEAN:
        rv = tu.decodeBoolean(data);
        break;
      case SPECIAL_INT:
        rv = tu.decodeInt(data);
        break;
      case SPECIAL_LONG:
        rv = tu.decodeLong(data);
        break;
      case SPECIAL_DATE:
        rv = tu.decodeLong(data);
        break;
      case SPECIAL_BYTE:
        rv = tu.decodeByte(data);
        break;
      // case SPECIAL_FLOAT:
      //   rv = Float.intBitsToFloat(tu.decodeInt(data));
      //   break;
      // case SPECIAL_DOUBLE:
      //   rv = Double.longBitsToDouble(tu.decodeLong(data));
        // break;
      case SPECIAL_BYTEARRAY:
        rv = data;
        break;
      default:
        console.warn("Undecodeable with flags %x", flags);
    }
  } else {
    return data.toString();
  }
  return rv;
};