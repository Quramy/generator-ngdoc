'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ngdoc:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        moduleName: 'testModule',
        ownerName: 'testOwner'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json'
    ]);
  });
});
