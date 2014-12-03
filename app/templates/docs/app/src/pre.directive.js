'use strict';

angular.module('docApp').directive('pre', function () {
  return {
    restrict: 'E',
    link: function ($scope, $elem, $attrs) {
      var formatted = prettyPrintOne($elem.find('>code').html());
      $elem.addClass('prettyprint');
      $elem.find('>code').html(formatted);
    }
  };
});
