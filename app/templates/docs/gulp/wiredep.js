'use strict';

var gulp = require('gulp');

/*
// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('src/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/],
    }))
    .pipe(gulp.dest('src'));
});
*/

// inject bower components
gulp.task('wiredep:docs', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('app/index.html')
    .pipe(wiredep({
			bowerJson: require('../bower.json'),
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap.js/, /open-sans-fontface/],
    }))
    .pipe(gulp.dest('app'));
});
