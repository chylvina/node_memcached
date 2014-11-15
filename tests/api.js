"use strict";

var assert = require('assert');
var _ = require('lodash');
var should = require('should');

var PORT = 11211;
var HOST = '127.0.0.1';
var memcached = require("../index");

var client = memcached.createClient(PORT, HOST, {});

describe('#set()', function () {
  it('should work', function (done) {
    client.set('hello', 'world', function (err, data) {
      should.not.exist(err);
    });

    client.get('hello', function (err, data) {
      should.not.exist(err);
      should(data).eql("world");

      done();
    });
  });

  it('expiration should work', function (done) {
    client.set('set expiration test', 'set value', 1, function (err, data) {
      should.not.exist(err);
    });

    setTimeout(function () {
      client.get('set expiration test', function (err, data) {
        should.not.exist(err);
        should.not.exist(data);

        done();
      });
    }, 1100);
  });
});

describe('#version()', function () {
  it('should work', function (done) {
    client.version(function (err, data) {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });
});

describe('#add()', function () {

  it('should work', function (done) {
    var temp = (new Date).getTime();
    client.add(temp, 'add test value', function (err, data) {
      should.not.exist(err);

      // add duplicate error test
      client.add(temp, 'world', function (err, data) {
        should.exist(err);

        done();
      });
    });

  });

  it('expiration should work', function (done) {
    var temp = (new Date).getTime();
    client.add(temp, 'add test value', 1, function (err, data) {
      should.not.exist(err);

      client.get(temp, function (err, data) {
        should.not.exist(err);
        should(data).eql("add test value");
      });

      setTimeout(function () {
        client.get(temp, function (err, data) {
          should.not.exist(err);

          done();
        });
      }, 1100);
    });
  });
});

describe('#replace()', function () {

  it('should work', function (done) {
    var temp = (new Date).getTime();
    client.set(temp, 'replace test value', function(err, data) {
      should.not.exist(err);

      client.get(temp, function(err, data) {
        should(data).eql('replace test value');

        client.replace(temp, 'replace test new value', function(err, data) {
          should.not.exist(err);

          client.get(temp, function(err, data) {
            should(data).eql('replace test new value');

            done();
          });
        });
      });
    });
  });

  it('should return ENOENT error', function (done) {
    var temp = (new Date).getTime();
    client.replace(temp, 'replace test new value', function(err, data) {
      should.exist(err);
      should(err).eql(memcached.protocol.errors[memcached.protocol.status.KEY_ENOENT]);
      done();
    });
  });

  it('expiration should work', function (done) {
    var temp = (new Date).getTime();
    client.set(temp, 'replace test value', function(err, data) {
      should.not.exist(err);

      client.get(temp, function(err, data) {
        should(data).eql('replace test value');

        client.replace(temp, 'replace test new value', 1, function(err, data) {
          should.not.exist(err);

          client.get(temp, function(err, data) {
            should(data).eql('replace test new value');

            setTimeout(function() {
              client.get(temp, function(err, data) {
                should.not.exist(err);
                // todo: verify this
                should.not.exist(data);

                done();
              });
            }, 1100);
          });
        });
      });
    });
  });
});

describe('#append()', function () {

  it('should work', function (done) {
    var temp = (new Date).getTime();
    client.set(temp, 'append test value', function (err, data) {
      should.not.exist(err);

      client.get(temp, function (err, data) {
        should.not.exist(err);
        should(data).eql("append test value");

        client.append(temp, 'append', function (err, data) {
          should.not.exist(err);

          client.get(temp, function (err, data) {
            should.not.exist(err);
            should(data).eql("append test valueappend");

            done();
          });
        });
      });
    });
  });
});

describe('#prepend()', function () {

  it('should work', function (done) {
    var temp = (new Date).getTime();
    client.set(temp, 'prepend test value', function (err, data) {
      should.not.exist(err);

      client.get(temp, function (err, data) {
         should(data).eql("prepend test value");

        client.prepend(temp, 'prepend', function (err, data) {
          should.not.exist(err);

          client.get(temp, function (err, data) {
            should.not.exist(err);
            should(data).eql("prependprepend test value");

            done();
          });
        });
      });
    });
  });
});

describe('#increment()', function () {

  it('should work', function (done) {
    var temp = (new Date).getTime();
    client.set(temp, 1, function (err, data) {
      should.not.exist(err);

      client.increment(temp, 5, 2, function (err, data) {
        should.not.exist(err);

        client.get(temp, function (err, data) {
          should.not.exist(err);
          should(data).eql('6');
        });

        setTimeout(function () {
          client.get(temp, function (err, data) {
            should.not.exist(err);
            should(data).eql('6');
          });
        }, 1000);

        setTimeout(function () {
          client.get(temp, function (err, data) {
            should.not.exist(err);
            should.not.exist(data);
          });
        }, 3000);
      });
    });
  });
});
