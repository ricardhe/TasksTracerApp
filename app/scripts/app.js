'use strict';

/**
 * @ngdoc overview
 * @name taskTrackerApp
 * @description
 * # taskTrackerApp
 *
 * Main module of the application.
 */

'use strict';
var app = angular.module('taskTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .value('apiUrl', "http://localhost:63023/")
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
