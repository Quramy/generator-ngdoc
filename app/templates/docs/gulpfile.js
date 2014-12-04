'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('default', ['docs:clean'], function () {
    gulp.start('docs:build');
});
