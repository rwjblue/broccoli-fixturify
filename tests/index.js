'use strict';

var Fixturify = require('../index');
var expect = require('expect.js');
var rimraf = require('rimraf');
var root = process.cwd();

var fs = require('fs');
var broccoli = require('broccoli');

var builder;

describe('broccoli-file-creator', function(){
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('creates the files specified with fixturify', function(){
    var obj = {
      'foo.txt': 'foo.txt contents',
      'subdir': {
        'bar.txt': 'bar.txt contents'
      }
    };

    var node = new Fixturify(obj);

    builder = new broccoli.Builder(node);

    return builder.build().then(function(dir) {
      expect(fs.readFileSync(dir + '/foo.txt', 'utf8')).to.eql(obj['foo.txt']);
      expect(fs.readFileSync(dir + '/subdir/bar.txt', 'utf8')).to.eql(obj['subdir']['bar.txt']);
      expect(fs.readdirSync(dir)).to.eql(['foo.txt', 'subdir']);
    });
  });

  it('rebuilds', function(){
    var obj = {
      'foo.txt': 'foo.txt contents',
      'subdir': {
        'bar.txt': 'bar.txt contents'
      }
    };

    var node = new Fixturify(obj);

    builder = new broccoli.Builder(node);

    var stats = {};

    return builder.build().then(function(dir) {
      expect(fs.readFileSync(dir + '/foo.txt', 'utf8')).to.eql(obj['foo.txt']);
      expect(fs.readFileSync(dir + '/subdir/bar.txt', 'utf8')).to.eql(obj['subdir']['bar.txt']);
      expect(fs.readdirSync(dir)).to.eql(['foo.txt', 'subdir']);

      stats.foo = fs.statSync(dir + '/foo.txt');
      stats.bar = fs.statSync(dir + '/subdir/bar.txt');

      // add file
      node.write({
        'apple.txt': 'I am apple'
      });

      return builder.build();
    }).then(function(dir) {
      var foo = fs.statSync(dir + '/foo.txt');
      var bar = fs.statSync(dir + '/subdir/bar.txt');

      // such stability
      expect(foo).to.eql(stats.foo);
      expect(bar).to.eql(stats.bar);

      expect(fs.readFileSync(dir + '/apple.txt', 'utf8')).to.eql('I am apple');
      expect(fs.readFileSync(dir + '/foo.txt', 'utf8')).to.eql(obj['foo.txt']);
      expect(fs.readFileSync(dir + '/subdir/bar.txt', 'utf8')).to.eql(obj['subdir']['bar.txt']);

      // remove files
      node.remove({
        'foo.txt':  null,
        'subdir': {
          'bar.txt': null
        }
      });

      stats.apple = fs.statSync(dir + '/apple.txt');

      return builder.build();
    }).then(function(dir) {
      expect(fs.readdirSync(dir)).to.eql(['apple.txt']);
      var apple = fs.statSync(dir + '/apple.txt');

      // such stability
      expect(apple).to.eql(stats.apple);

      node.reset();

      return builder.build();
    }).then(function(dir) {
      expect(fs.readFileSync(dir + '/foo.txt', 'utf8')).to.eql(obj['foo.txt']);
      expect(fs.readFileSync(dir + '/subdir/bar.txt', 'utf8')).to.eql(obj['subdir']['bar.txt']);
      expect(fs.readdirSync(dir)).to.eql(['foo.txt', 'subdir']);

      stats.foo = fs.statSync(dir + '/foo.txt');
      stats.bar = fs.statSync(dir + '/subdir/bar.txt');
    });
  });
});
