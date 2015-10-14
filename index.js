var Plugin = require('broccoli-plugin');
var fixturify = require('fixturify');

Fixturify.prototype = Object.create(Plugin.prototype);
Fixturify.prototype.constructor = Fixturify;
function Fixturify(fixture, options) {
  if (!(this instanceof Fixturify)) return new Fixturify(fixture, options);
  options = options || {};
  Plugin.call(this, [], {
    annotation: options.annotation
  });

  this.fixture = fixture;
}

Fixturify.prototype.build = function() {
  fixturify.writeSync(this.outputPath, this.fixture);
};

module.exports = Fixturify;
