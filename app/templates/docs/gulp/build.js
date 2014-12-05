'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// Template Cache.
gulp.task('docs:partials', ['dgeni'], function () {
	return gulp.src(['app/{src,.tmp}/**/*.html', '.tmp/{partials,.tmp}/**/*.html'])
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
    .pipe($.ngHtml2js({
      moduleName: 'docApp'
    }))
		.pipe(gulp.dest('.tmp/partials'))
		.pipe($.size());
});

// Build index.html.
gulp.task('docs:html', ['docs:wiredep', 'docs:partials'], function(){
	var assets;
  var jsFilter = $.filter('**/*.js');
	return gulp.src(['app/index.html'])
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
		/*
		.pipe($.inject(gulp.src('docs/app/env_*.js'), {
      read: false,
      starttag: '<!-- inject:env -->',
      addRootSlash: false,
      addPrefix: '../../'
		}))
		*/
    .pipe(assets = $.useref.assets())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

// Copy example files.
gulp.task('docs:examples', ['dgeni'], function(){
	return gulp.src(['.tmp/{*.js,examples/**/*}'])
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

// Copy fonts.
gulp.task('docs:fonts', function () {
  return gulp.src($.mainBowerFiles({
			bowerDirectory: 'bower_components',
			bowerJson: 'bower.json'
		}))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('docs:build', ['module:dist', 'docs:html', 'docs:fonts', 'docs:examples', 'docs:copy_dependencies']);

gulp.task('docs:clean', function (done) {
  $.del(['.tmp', 'dist'], done);
});

