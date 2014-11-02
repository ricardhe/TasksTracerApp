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

    'ngCookies',
    'ngRoute',
    'LocalStorageModule',
    'angular-loading-bar'
    //'ngResource'
    //'ngAnimate',
    //'ngSanitize'
    //,
    //'ngTouch'
  ])
    .constant('AUTH_EVENTS', {
                                loginSuccess:       'auth-login-success',
                                loginFailed:        'auth-login-failed',
                                logoutSuccess:      'auth-logout-success',
                                sessionTimeout:     'auth-session-timeout',
                                notAuthenticated:   'auth-not-authenticated',
                                notAuthorized:      'auth-not-authorized'
                            }
    )
    .constant('USER_ROLES', {
                                all:    '*',
                                admin:  'admin',
                                editor: 'editor',
                                guest:  'guest'
                            }
            )
  .value('apiUrl', "http://localhost:63023/")
  .run(function ($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    }
   )
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

 app.config(function ($httpProvider) {
     $httpProvider.interceptors.push(['$injector',
                                                    function ($injector) {
                                                            return $injector.get('AuthInterceptor');
                                                     }
                                     ]);
 });

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorToken');
});
