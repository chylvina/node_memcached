var config = require('./memcached_server_config');

var PORT = config.PORT;
var HOST = config.HOST;
var username = config.username;
var password = config.password;

var memcached = require("../index");

memcached.debug_mode = true;

exports.testSet = function (beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('hello', 'world', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.get('hello', function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
      assert.ok(data.val.toString() == "world");
    });

    client.set('set expiration test', 'set value', 5, function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

      setTimeout(function () {
        n++;

        client.get('set expiration test', function (err, data) {
        assert.ok(err != null);

        assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);
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

exports.testVersion = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.version(function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.VERSION);

    client.end();
  });

  beforeExit(function () {
    assert.equal(1, n);
  });
}

exports.testAdd = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  var temp = (new Date).getTime();
  client.add(temp, 'add test value', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.ADD);

    // add duplicate error test
    client.add(temp, 'world', function (err, data) {
      n++;

      assert.ok(err != null);

      assert.ok(err.header.status == memcached.protocol.status.KEY_EEXISTS);
      assert.ok(err.header.opcode == memcached.protocol.opcode.ADD);
    });
  });

  // add expiration test
  temp += 'delta';
  client.add(temp, 'add test value', 5, function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.ADD);

    setTimeout(function () {
      client.get(temp, function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
        assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
        assert.ok(data.val.toString() == "add test value");
      });
    }, 1000);

    setTimeout(function () {
      client.get(temp, function (err, data) {
        n++;

        assert.ok(err != null);

        assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);

        client.end();
      });
    }, 6 * 1000);
  });

  beforeExit(function () {
    assert.equal(5, n);
  });
};

exports.testReplace = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  var temp = (new Date).getTime() + 'replace' + Math.random();
  client.replace(temp, 'replace test value', function (err, data) {
    n++;

    assert.ok(err != null);

    assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);
    assert.ok(err.header.opcode == memcached.protocol.opcode.REPLACE);
  });

  client.set(temp, 'replace test value', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.replace(temp, 'replace test new value', 5, function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.REPLACE);

      client.get(temp, function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.val.toString() == 'replace test new value');
      });

      setTimeout(function () {
        client.get(temp, function (err, data) {
          n++;

          assert.ok(err != null);

          assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);

          client.end();
        });
      }, 6 * 1000);
    });
  });

  beforeExit(function () {
    assert.equal(5, n);
  });
}

exports.testVersion = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('delete test', 'delete test value', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.delete('delete test', function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.DELETE);

      client.end();
    });
  });

  beforeExit(function () {
    assert.equal(2, n);
  });
}

exports.testAppend = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('append test', 'append test value', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.append('append test', 'append', function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.APPEND);

      client.get('append test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
        assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
        assert.ok(data.val.toString() == "append test valueappend");

        client.end();
      });
    });
  });

  beforeExit(function () {
    assert.equal(3, n);
  });
}

exports.testPrepend = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('prepend test', 'prepend test value', function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.prepend('prepend test', 'prepend', function (err, data) {
      n++;
      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.PREPEND);

      client.get('prepend test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
        assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
        assert.ok(data.val.toString() == "prependprepend test value");

        client.end();
      });
    });
  });

  beforeExit(function () {
    assert.equal(3, n);
  });
}

exports.testIncrement = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('increment test', 1, function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.increment('increment test', 5, 5, function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.INCREMENT);

      client.get('increment test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
        assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
        assert.ok(data.val.toString() == 6);
      });

      setTimeout(function () {
        client.get('increment test', function (err, data) {
          n++;

          assert.ok(err != null);

          assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);
          assert.ok(err.header.opcode == memcached.protocol.opcode.GET);

          client.end();
        });
      }, 6 * 1000);

    });
  });

  beforeExit(function () {
    assert.equal(4, n);
  });
}

exports.testDecrement = function(beforeExit, assert) {
  var n = 0;

  var client = memcached.createClient(PORT, HOST, {
    username: username,
    password: password
  });

  client.set('decrement test', 9, function (err, data) {
    n++;

    assert.ok(err == null);

    assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
    assert.ok(data.header.opcode == memcached.protocol.opcode.SET);

    client.decrement('decrement test', 5, 5, function (err, data) {
      n++;

      assert.ok(err == null);

      assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
      assert.ok(data.header.opcode == memcached.protocol.opcode.DECREMENT);

      client.get('decrement test', function (err, data) {
        n++;

        assert.ok(err == null);

        assert.ok(data.header.status == memcached.protocol.status.SUCCESS);
        assert.ok(data.header.opcode == memcached.protocol.opcode.GET);
        assert.ok(data.val.toString() == 4);
      });

      setTimeout(function () {
        client.get('decrement test', function (err, data) {
          n++;

          assert.ok(err != null);

          assert.ok(err.header.status == memcached.protocol.status.KEY_ENOENT);
          assert.ok(err.header.opcode == memcached.protocol.opcode.GET);

          client.end();
        });
      }, 6 * 1000);

    });
  });

  beforeExit(function () {
    assert.equal(4, n);
  });
}
