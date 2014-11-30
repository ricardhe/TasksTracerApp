'use strict';


app.service('Session',['LS', function (LS) {

    this.token=function()
    {
        var AuthData = LS.getAuthorizationData();
        if (AuthData) {
            return AuthData.token;
        } else return null;
    }
    
    this.userName=function()
    {
        var AuthData = LS.getAuthorizationData();
        if (AuthData) {
            return AuthData.userName;
        } else return null;
    }

    this.userRole=function()
    {
        var AuthData = LS.getAuthorizationData();
        if (AuthData) {
            return AuthData.userRole;
        } else return null;
    }

    this.create = function (token, userName, userRole) {
        LS.setAuthorizationData(token,userName,userRole)
    };

    this.destroy = function () {
        LS.removeAuthorizationData();
    };

    return this;

}]);

app.service('AuthService', ['$http','$q', '$log', 'apiUrl', 'Session', function ($http, $q, $log, apiUrl, Session) {

    var apiurl = apiUrl + "api/Account";

    this.logIn = function(loginData) {

        var self = this;
        Session.destroy();
        var deferred = $q.defer();

        $http(
                    {
                        url: apiUrl + 'Token',
                        method: 'POST',
                        data: $.param(loginData),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
            ).success(function (res) {

                Session.create(res.access_token, res.userName, 'admin');
                $log.info('Loged succeful');
                deferred.resolve(res);

              }).error(function (error){
                  $log.warn('Error while tryn to get loged : ' + error.message);
                  deferred.reject(error);
              });

        return deferred.promise;
    }

    this.logOut = function () {
        var self = this;
        
        var deferred = $q.defer();

        $http(
                    {
                        url: apiUrl + 'api/Account/Logout',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }
            ).success(function (res) {

                Session.destroy();
                $log.info('LogedOut succeful');
                deferred.resolve(res);

            }).error(function (error) {
                $log.warn('Error while tryn to get Loged Out : ' + error.message);
                deferred.reject(error);
            });

        return deferred.promise;

    }

    this.isAuthenticated = function () {
        return !!Session.token();
    };

    this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole()) !== -1);
    };

}

]);

app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    });


app.factory('authInterceptorToken', function ($rootScope, $q, Session) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (Session.token()) {
                config.headers.Authorization = 'Bearer ' + Session.token();
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});
