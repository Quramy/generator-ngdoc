'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean', function (done) {
  $.del(['.tmp', '.tmp_docs', 'dist', 'dist_docs'], done);
});

//gulp.task('build', ['html', 'images', 'fonts', 'misc']);
