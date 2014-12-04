'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('moduleName', {
      type: String,
      required: false
    });
    this.pkg = require('../package.json');
    this.moduleName = this.moduleName || path.basename(process.cwd());
    //this.moduleNameCamel = this._.camelize(this._.slugify(this._.humanize(this.moduleName)));
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stunning' + chalk.red('Dgeni') + ' generator!'
    ));

    var prompts = [
      /*{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }, */{
      type: 'input',
      name: 'moduleName',
      message: 'What name is your main module?',
      default: this.moduleName
    }];

    this.prompt(prompts, function (props) {
      //this.someOption = props.someOption;
      this.moduleName = props.moduleName;
      this.moduleNameCamel = this._.camelize(this._.slugify(this._.humanize(this.moduleName)));
      done();
    }.bind(this));
  },

  /*
  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },
    */

  // Format props to template values
  formatProps: require('./src/format'),

  // Write files (copy, template)
  writeFiles: require('./src/write'),

  install: function () {

    var self = this;
    this.installDependencies({
      // Install to project root directory.
      skipInstall: this.options['skip-install'],
      callback: function () {
        process.chdir('docs');
        // Install to 'docs' directory.
        self.installDependencies({
          skipInstall: self.options['skip-install']
        });
      }
    });
  }
});
