'use strict';

var files = require('../files.json');
var path = require('path');

/* Process files */
module.exports = function () {
  var _ = this._;
  var basename;
  var src;

  // Copy static files
  _.forEach(files.staticFiles, function(src) {
    this.copy(src);
  }.bind(this));

  // Copy dot files
  _.forEach(files.dotFiles, function(src) {
    basename = path.basename(src);
    this.copy(src, src.replace(basename, '.' + basename));
  }.bind(this));

  // Create files with templates
  _.forEach(files.templates, function(dest) {
    basename = path.basename(dest);
    src = dest.replace(basename, '_' + basename);
    this.template(src, dest, this);
  }.bind(this));

  // Create root's bower.json 
  if(!this.hasBowerJson){
    (function (dest) {
      basename = path.basename(dest);
      src = dest.replace(basename, '_' + basename);
      this.template(src, dest, this);
    })(files.bowerJson);
  }
};
