'use strict';

module.exports = function (options) {
  var path = require('canonical-path');
  var _ = require('lodash');
  var mainBowerFiles = require('main-bower-files');

  var main = mainBowerFiles(options);
  var scripts = [], stylesheets = [];
  var bowerDir = path.normalize(process.cwd() + '/bower_components');

  _(main).map(function (file) {
    return path.relative(bowerDir, path.normalize(file))
  }).filter(function (file) {
    var res = false;
    _.forEach(options.exclude, function (pattern) {
      res = res || file.match(pattern);
    });
    return !res;
  }).map(function (file) {
    return {
      ext: path.extname(file),
      path: options.base + '/' + file
    }
  }).forEach(function (file) {
    if (file.ext === '.js') {
      scripts.push(file.path);
    } else if (file.ext === '.css') {
      stylesheets.push(file.path);
    }
  });

  return {
    scripts: scripts,
    stylesheets: stylesheets
  };

};


