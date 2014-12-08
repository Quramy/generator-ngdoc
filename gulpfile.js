'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('jshint', function () {
  return gulp.src(['app/index.js', 'app/src/**/*.js', 'app/templates/docs/**/!(*.template).js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('mocha', function () {
  return gulp.src('test/**/*.js')
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .pipe($.size());
});

gulp.task('test', ['mocha', 'jshint']);

gulp.task('default', ['test']);

