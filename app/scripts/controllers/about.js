'use strict';

/**
 * @ngdoc function
 * @name taskTrackerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the taskTrackerApp
 */
angular.module('taskTrackerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
