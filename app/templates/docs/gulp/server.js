'use strict';

var gulp = require('gulp');
var util = require('util');

var browserSync = require('browser-sync');

function browserSyncInit (baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  var isDebug = baseDir === '.tmp' || (util.isArray(baseDir) && baseDir.indexOf('.tmp') !== -1);
  
	if(isDebug){
		routes = {
			'/bower_components': 'bower_components',
			'/deps': '../bower_components',
      '/components': '../src/components',
      '/app': '../src/app'
    };
	}

	browserSync.instance = browserSync.init(files, {
		startPath: '/index.html',
		server: {
			baseDir: baseDir,
			middleware: [],
			routes: routes
		},
		browser: browser
	});
}

// Run document application on server for development purposes.
// If you modify ngdoc contents(in .js or .ngdoc), run Dgeni to rebuild partial htmls, and reload.
// If you modify document app, reload only.
gulp.task('docs:serve', ['dgeni', 'docs:wiredep', 'module'], function () {
	browserSyncInit(['.tmp', 'app'], ['app/*.html', 'app/src/**/*']);
	gulp.watch(['config/templates/**/*', 'content/**/*', '../src/{app,components}/**/*.js'], ['dgeni', browserSync.reload]);
	gulp.watch(['../src/{app,components}/**/*.js'], ['module']);
});

// Run document applicaton on server.
gulp.task('docs:serve:dist', ['docs:build'], function () {
	browserSyncInit('dist', ['dist/**/*.html']);
});

