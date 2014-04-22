var fs = require('fs');
var path = require('path');
var Writer = require('broccoli-writer');
var Promise = require('rsvp').Promise
var fixturify = require('fixturify')

Creator.prototype = Object.create(Writer.prototype);
Creator.prototype.constructor = Creator;
function Creator (fixture) {
  if (!(this instanceof Creator)) return new Creator(fixture);

  this.fixture = fixture;
};

Creator.prototype.write = function (readTree, destDir) {
  var _this = this

  return Promise.resolve().then(function() {
    fixturify.writeSync(destDir, _this.fixture);
  });
};

module.exports = Creator;
