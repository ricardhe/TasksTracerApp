/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 */
(function () {
    angular.module('MyApp', [
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule'
    ]).constant('AUTH_EVENTS', {
                                    loginSuccess: 'auth-login-success',
                                    loginFailed: 'auth-login-failed',
                                    logoutSuccess: 'auth-logout-success',
                                    sessionTimeout: 'auth-session-timeout',
                                    notAuthenticated: 'auth-not-authenticated',
                                    notAuthorized: 'auth-not-authorized'
                                }
    )
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    }
    )
  .value('apiUrl', "http://localhost:63023/");


})();