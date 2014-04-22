'use strict';

var fixtureTree = require('../index');
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
    }
    var tree = fixtureTree(obj);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      expect(fs.readFileSync(dir + '/foo.txt', {encoding: 'utf8'})).to.eql(obj['foo.txt']);
      expect(fs.readFileSync(dir + '/subdir/bar.txt', {encoding: 'utf8'})).to.eql(obj['subdir']['bar.txt']);
    });
  })
});
