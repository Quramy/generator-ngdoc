'use strict';

/**
 *
 * @ngdoc directive
 * @module sample
 * @name sampleElem
 * @description 
 * This is a sample directive.
 *
 **/
angular.module('sample').directive('sampleElem', function () {
  return {
    restrict: 'E',
    template: '<div>Hello, AngularJS directive!</div>'
  };
});
