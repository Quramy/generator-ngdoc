'use strict';

/**
 *
 * @ngdoc provider
 * @module <%= moduleNameCamel %>
 * @name sampleServiceProvider
 * @description
 *
 * This provider allows you to configure {@link sampleService sampleService}.
 *
 **/
angular.module('<%= moduleNameCamel %>').provider('sampleService', function () {
  var msg = 'Default message.';
  return {

    /**
     *
     * @ngdoc method
     * @name sampleServiceProvider#setMessaage
     * @param {String} message A message.
     * @description
     * Configure {@link sampleService sampleService} message.
     *
     **/
    setMessage: function (message) {
      msg = message;
    },

    /**
     *
     * @ngdoc service
     * @module <%= moduleNameCamel %>
     * @name sampleService
     * @description
     *
     * Sample service. It returns the message.
     *
     * @example
        <example module="sampleServiceExample" deps="">
          <file name="index.html">
            <div ng-controller="MainCtrl as main">
              Message: {{main.message}}
            </div>
          </file>
          <file name="main.js">
            angular.module('sampleServiceExample', ['<%= moduleNameCamel %>'])
              .config(function (sampleServiceProvider) {
                sampleServiceProvider.setMessage('Hello, AngularJS service!');
              })
              .controller('MainCtrl', function (sampleService) {
                this.message = sampleService.getMessage();
              });
          </file>
        </example>
     *
     **/
    $get: function () {
      return {
        /**
         * 
         * @ngdoc method
         * @name sampleService#get
         * @return {String} message
         * @description
         *
         * Get the message.
         **/
        getMessage: function () {
          return msg;
        }
      };
    }
  };
});
