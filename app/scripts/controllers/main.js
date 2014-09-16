'use strict';

/**
 * @ngdoc function
 * @name taskTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the taskTrackerApp
 */
angular.module('taskTrackerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
