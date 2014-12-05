var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var _ = require('lodash');
var Dgeni = require('dgeni');

// 
// 'BowerCommonFiles' creates an object such as:
// {
//    scripts: ['../../deps/angular/angular.js', '../../deps/jquery/dist/jquery.js'],
//    stylesheets: ['../../deps/bootstrap/bootstrap.css']
// }
//
var bowerFiles = require('../lib/bowerCommonFiles')({
  base: '../../deps',
  exclude: [/bootstrap.js/],
  bowerJson: require('../bower.json')
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
      .config(function (generateExamplesProcessor, generateProtractorTestsProcessor){
        generateExamplesProcessor.deployments = [deployment];
        generateProtractorTestsProcessor.deployments = [deployment];
      })
      .config(function (renderDocsProcessor) {
        renderDocsProcessor.extraData.deploymentTarget = 'default';
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
		return it.match(depPath)
	}).map(function (it) {
		return it.replace(depPath, 'bower_components');
	});

	return gulp.src(deps, {base: 'bower_components'})
		.pipe(gulp.dest('dist/deps'))
		.pipe($.size());
});

