var config = require('./memcached_server_config');

var PORT = config.PORT;
var HOST = config.HOST;
var username = config.username;
var password = config.password;

var memcached = require("../index");

memcached.debug_mode = true;

exports.testSet = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {});

  client.set('hello', 'world', function (err, data) {
    n++;

    assert.ok(err == null);

    client.get('hello', function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data == "world");
    });

    client.set('set expiration test', 'set value', 5, function (err, data) {
      n++;

      assert.ok(err == null);

      setTimeout(function () {
        n++;

        client.get('set expiration test', function (err, data) {
          assert.ok(!err);
          assert.ok(!data);
        });

        client.end();
      }, 6 * 1000);
    });
  });

  // Alternatively, you can use the beforeExit shortcut.
  beforeExit(function () {
    assert.equal(4, n);
  });
};

exports.testVersion = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  client.version(function (err, data) {
    n++;

    assert.ok(err == null);

    client.end();
  });

  beforeExit(function () {
    assert.equal(1, n);
  });
};

exports.testAdd = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  var temp = (new Date).getTime();
  client.add(temp, 'add test value', function (err, data) {
    n++;

    assert.ok(err == null);

    // add duplicate error test
    client.add(temp, 'world', function (err, data) {
      n++;

      assert.ok(err != null);

      assert.ok(err == memcached.protocol.errors[memcached.protocol.status.KEY_EEXISTS]);
    });
  });

  // add expiration test
  temp += 'delta';
  client.add(temp, 'add test value', 5, function (err, data) {
    n++;

    assert.ok(err == null);

    setTimeout(function () {
      client.get(temp, function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data == "add test value");
      });
    }, 1000);

    setTimeout(function () {
      client.get(temp, function (err, data) {
        n++;

        assert.ok(!err);
        assert.ok(!data);

        client.end();
      });
    }, 6 * 1000);
  });

  beforeExit(function () {
    assert.equal(5, n);
  });
};

exports.testReplace = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  var temp = (new Date).getTime() + 'replace' + Math.random();
  client.replace(temp, 'replace test value', function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);
  });

  client.set(temp, 'replace test value', function (err, data) {
    n++;

    assert.ok(err == null);
    assert.ok(!data);

    client.replace(temp, 'replace test new value', 5, function (err, data) {
      n++;

      assert.ok(err == null);
      assert.ok(!data);

      client.get(temp, function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data == 'replace test new value');
      });

      setTimeout(function () {
        client.get(temp, function (err, data) {
          n++;

          assert.ok(!err);
          assert.ok(!data);

          client.end();
        });
      }, 6 * 1000);
    });
  });

  beforeExit(function () {
    assert.equal(5, n);
  });
};

exports.testVersion = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  client.set('delete test', 'delete test value', function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);

    client.delete('delete test', function (err, data) {
      n++;

      assert.ok(!err);
      assert.ok(!data);

      client.end();
    });
  });

  beforeExit(function () {
    assert.equal(2, n);
  });
}

exports.testAppend = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('append test', 'append test value', function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);

    client.append('append test', 'append', function (err, data) {
      n++;

      assert.ok(!err);
      assert.ok(!data);

      client.get('append test', function (err, data) {
        n++;

        assert.ok(err == null);
        assert.ok(data == "append test valueappend");

        client.end();
      });
    });
  });

  beforeExit(function () {
    assert.equal(3, n);
  });
}

exports.testPrepend = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  client.set('prepend test', 'prepend test value', function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);

    client.prepend('prepend test', 'prepend', function (err, data) {
      n++;

      assert.ok(!err);
      assert.ok(!data);

      client.get('prepend test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data == "prependprepend test value");

        client.end();
      });
    });
  });

  beforeExit(function () {
    assert.equal(3, n);
  });
};

exports.testIncrement = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  client.set('increment test', 1, function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);

    client.increment('increment test', 5, 5, function (err, data) {
      n++;

      assert.ok(!err);
      assert.ok(!data);

      client.get('increment test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data == 6);
      });

      setTimeout(function () {
        client.get('increment test', function (err, data) {
          n++;

          assert.ok(!err);
          assert.ok(!data);

          client.end();
        });
      }, 6 * 1000);

    });
  });

  beforeExit(function () {
    assert.equal(4, n);
  });
};

exports.testDecrement = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, { });

  client.set('decrement test', 9, function (err, data) {
    n++;

    assert.ok(!err);
    assert.ok(!data);

    client.decrement('decrement test', 5, 5, function (err, data) {
      n++;

      assert.ok(!err);
      assert.ok(!data);

      client.get('decrement test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data == 4);
      });

      setTimeout(function () {
        client.get('decrement test', function (err, data) {
          n++;

          assert.ok(!err);
          assert.ok(!data);

          client.end();
        });
      }, 6 * 1000);

    });
  });

  beforeExit(function () {
    assert.equal(4, n);
  });
};
