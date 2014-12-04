var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// Put together multiple javascript files.
gulp.task('module:scripts', [], function(){
	return gulp.src([
    // Add your javascript sources' path, ordering to top the source file that contains the module definition.
    '../src/components/index.js',   // This file includes the module definition.
    '../src/**/*.js'
  ])
		.pipe($.concat('modules.js'))
		.pipe(gulp.dest('.tmp'))
		.pipe($.size());
});

gulp.task('module:scripts:dist', [], function () {
  return gulp.src([
    // Add your javascript sources' path, ordering to top the source file that contains the module definition.
    '../src/components/index.js',   // This file includes the module definition.
    '../src/**/*.js'
  ])
		.pipe($.ngAnnotate())
		.pipe($.concat('modules.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

// Put together multiple CSS files.
gulp.task('module:styles', [], function (){
	return gulp.src(['../src/**/*.css'])
		.pipe($.concat('modules.css'))
		.pipe(gulp.dest('.tmp'))
		.pipe($.size());
});

gulp.task('module:styles:dist', [], function () {
  return gulp.src(['../src/**/*.css'])
		.pipe($.concat('modules.css'))
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});


gulp.task('module', ['module:scripts', 'module:styles']);
gulp.task('module:dist', ['module:scripts:dist', 'module:styles:dist']);

