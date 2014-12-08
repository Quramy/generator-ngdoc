'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var _ = require('lodash');
var Dgeni = require('dgeni');
var path = require('canonical-path');

// 
// 'BowerCommonFiles' creates an object such as:
// {
//    scripts: ['../../deps/angular/angular.js', '../../deps/jquery/dist/jquery.js'],
//    stylesheets: ['../../deps/bootstrap/bootstrap.css']
// }
//
// This object contains paths of bower dependencies configured by not '(root)/docs/bower.json' but '(root)/bower.json'.
//
//
var bowerFiles = require('../lib/bowerCommonFiles')({
  base: '../../deps',
  exclude: [/bootstrap.js/],
  paths: {
    bowerDirectory: '../bower_components',
    bowerJson: '../bower.json'
  }
});

// Create deployment definition of dgeni example package.
// (https://github.com/angular/dgeni-packages#examples-package)
var deployment = {
  name: 'default',
  examples: {

    // These files are injected to examples' html.
    commonFiles: {
      scripts: _.union(bowerFiles.scripts, ['../../modules.js']),
      stylesheets: _.union(bowerFiles.stylesheets, ['../../modules.css'])
    },
    dependencyPath: '../../deps'
  }
};
 
var dgeniGenerate = function () {
  try {
    // Prease see also 'docs/config/index.js'.
    var dgeni = new Dgeni([require('../config/')
      .config(function (readFilesProcessor, writeFilesProcessor) {

        // Specify the base path used when resolving relative paths to source and output files
        readFilesProcessor.basePath = path.resolve(__dirname, '../..');

        // Specify collections of source files that should contain the documentation to extract
        readFilesProcessor.sourceFiles = [{include: 'src/**/*.js', basePath: 'src'}, {include: 'docs/content/**/*.ngdoc',basePath: 'docs/content'}];

        //templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
        writeFilesProcessor.outputFolder  = 'docs/.tmp';
      })
      .config(function (renderDocsProcessor) {
        renderDocsProcessor.extraData.deploymentTarget = 'default';
        renderDocsProcessor.extraData.git = {
          info: {
            owner: '<%= ownerName %>',
            repo: '<%= moduleName %>'
          },
          version: {
            isSnapshot: true
          }
        };
      })
      .config(function (generateExamplesProcessor, generateProtractorTestsProcessor){
        generateExamplesProcessor.deployments = [deployment];
        generateProtractorTestsProcessor.deployments = [deployment];
      })
    ]);


    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
};

// Run dgeni to generate documents.
gulp.task('dgeni', function (done){
  dgeniGenerate().then(function () {
    done();
  });
});

// Copy bower components that examples use to distination.
gulp.task('docs:copy_dependencies', function () {
	var depPath = deployment.examples.dependencyPath;
	var scripts = bowerFiles.scripts || [];
  var stylesheets = bowerFiles.stylesheets || [];
	var deps = _.union(scripts, stylesheets).filter(function (it) {
		return it.match(depPath);
	}).map(function (it) {
		return it.replace(depPath, 'bower_components');
	});

	return gulp.src(deps, {base: 'bower_components'})
		.pipe(gulp.dest('dist/deps'))
		.pipe($.size());
});

