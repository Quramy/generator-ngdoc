var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('module:scripts', [], function(){
	return gulp.src(['src/app/index.js', 'src/**/*.js'])
		.pipe($.concat('modules.js'))
		.pipe(gulp.dest('.tmp_docs'))
		.pipe($.size());
});

gulp.task('module:scripts:dist', [], function () {
  return gulp.src(['src/app/index.js', 'src/**/*.js'])
		.pipe($.ngAnnotate())
		.pipe($.concat('modules.js'))
		.pipe(gulp.dest('dist_docs'))
		.pipe($.size());
});

gulp.task('module:styles', [], function(){
	return gulp.src(['src/app/index.css', 'src/**/*.css'])
		.pipe($.concat('modules.css'))
		.pipe(gulp.dest('.tmp_docs'))
		.pipe($.size());
});

gulp.task('module:styles:dist', [], function () {
  return gulp.src(['src/app/index.css', 'src/**/*.css'])
		.pipe($.concat('modules.css'))
		.pipe(gulp.dest('dist_docs'))
		.pipe($.size());
});


gulp.task('module', ['module:scripts', 'module:styles']);
gulp.task('module:dist', ['module:scripts:dist', 'module:styles:dist']);

