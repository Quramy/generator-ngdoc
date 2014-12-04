'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

//var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;//, forwardIndexPrefix;
  //var isDebug = baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1);
  var isDoc = baseDir === '.tmp' || (util.isArray(baseDir) && baseDir.indexOf('.tmp') !== -1);
  /*
  if(isDebug){
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
	}*/
	if(isDoc){
		routes = {
			'/bower_components': 'bower_components',
			'/deps': 'bower_components'
    };

		// Read Area prefix data(e.g. ['api', ...]) from dgeni result.
		//forwardIndexPrefix = require('../.tmp_docs/src/area-data');

		// The following proxy routes a request that has url start with Area prefix to '/index.html',
		// because we need a correct view when browserSync.reload() is invoked after changing $location.path() .
		/*
		middleware.push(function(req, res, next){
			forwardIndexPrefix.forEach(function(area){
				if(req.url === '/' + area || req.url.indexOf('/' + area + '/') === 0){
					req.url = '/index.html';
				}
			});
			next();
		});
	  */
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

gulp.task('serve:docs', ['dgeni', 'wiredep:docs', 'module'], function(){
	browserSyncInit(['.tmp', 'app'], ['app/*.html', 'app/src/**/*']);
	gulp.watch(['config/templates/**/*', 'content/**/*', '../src/{app,components}/**/*.js'], ['dgeni', browserSync.reload]);
	gulp.watch(['../src/{app,components}/**/*.js'], ['module']);
});

gulp.task('serve:docs:dist', ['build:docs'], function(){
	browserSyncInit('dist_docs');
});

gulp.task('serve:dist', ['build'], function () {
	browserSyncInit('dist');
});

