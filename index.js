var Plugin = require('broccoli-plugin');
var fixturify = require('fixturify');
var fs = require('fs-extra');

module.exports = Fixturify;
Fixturify.prototype = Object.create(Plugin.prototype);
Fixturify.prototype.constructor = Fixturify;
function Fixturify(fixture, options) {
  if (!(this instanceof Fixturify)) return new Fixturify(fixture, options);
  options = options || {};
  Plugin.call(this, [], {
    annotation: options.annotation
  });

  this._persistentOutput = true;
  this._initialFixture = this._fixture = fixture;
  this._remove = {};
  this._purgeOnNextBuild = false;
}

Fixturify.prototype.write  = function(fixture) {
  this._fixture = require('lodash.merge')(this.fixture, fixture);
};

Fixturify.prototype.remove = function(fixture) {
  this._remove = require('lodash.merge')(this._remove, fixture);
};

Fixturify.prototype.reset = function() {
  this._fixture = this._initialFixture;
  this._purgeOnNextBuild = true;
};

Fixturify.prototype.build = function() {
  if (this._purgeOnNextBuild) {
    this._purgeOnNextBuild = false;
    fs.removeSync(this.outputPath);
    fs.mkdirSync(this.outputPath);
  }
  try {
    fixturify.removeSync(this.outputPath, this._remove);
    fixturify.writeSync(this.outputPath,  this._fixture);
  } finally {
    this._fixture = {};
    this._remove  = {};
  }
};

