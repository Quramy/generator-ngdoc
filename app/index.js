'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('moduleName', {
      type: String,
      required: false
    });
    this.pkg = require('../package.json');
    this.moduleName = this.moduleName || path.basename(process.cwd());
    this.hasBowerJson = fs.existsSync('bower.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('Welcome!') + '\n' +
      chalk.yellow('You\'re using the fantastic generator for scaffolding ngDoc document application!')
    ));

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What name is your main module?',
      default: this.moduleName
    }, {
      type: 'input',
      name: 'ownerName',
      message: 'What name is github owner of this repository?',
      default: this.moduleName + '-owner'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.ownerName = props.ownerName;
      this.moduleNameCamel = this._.camelize(this._.slugify(this._.humanize(this.moduleName)));
      done();
    }.bind(this));
  },

  // Write files (copy, template)
  writeFiles: require('./src/write'),

  install: function () {

    var self = this;
    
    if(this.hasBowerJson){
      this.log('I found ' + chalk.green('bower.json') + ', so skip bower install.'); 
    }
    // Install to project root directory.
    this.installDependencies({
      bower: true,
      npm: false,
      skipInstall: this.options['skip-install'] || this.hasBowerJson,
      skipMessage: this.hasBowerJson,
      callback: function () {
        process.chdir('docs');
        if(!self.options['skip-install']){
          self.log('Runnnig ' + chalk.yellow.bold('bower install & npm install') + ' for docs application.'
                   + 'These dependencies will be installed under ' + chalk.green('docs') + ' directory.');
        }
        // Install to 'docs' directory.
        self.installDependencies({
          skipInstall: self.options['skip-install'],
          skipMessage: true
        });
      }
    });
  }
});
