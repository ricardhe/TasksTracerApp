

app.directive('logindialog', function (AUTH_EVENTS) {
    return {
        restrict: 'EA',
        templateUrl: 'scripts/Authentication/login-form.html',
        scope: {
            visible: '='
        },
        link: function (scope) {  

            scope.$on(AUTH_EVENTS.notAuthenticated, scope.showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, scope.showDialog);
            
        },
        controller: ['$scope', 'AuthService', function ($scope,AuthService) {
            'use strict';
            var username = "ricardh@gmail.com";
            var password = "Valencia2!";
            var confirmpassword = "Valencia2!";

            $scope.user = { username: username, password: password };

            $scope.message = '';
            $scope.message_fora = '';
            $scope.logged = false;
            $scope.actionNoLogged = "";
            $scope.actionLogged = "";

            $scope.showDialog = function () {
                $scope.logged = false;
            };

            $scope.goToLogin = function () {
                $scope.actionNoLogged = "login";
            }

            $scope.goToRegister= function () {
                $scope.actionNoLogged = "register";
            }

            $scope.logOut = function () {
                AuthService.logOut().then(
                    function (data) {
                        $scope.logged = false;
                        $scope.actionLogged = "";
                        $scope.actionNoLogged = "";
                    },
                    function (error) {
                        $scope.message = 'An error ocurred while trying to get loged Out';
                    }
                );
            }

            $scope.goToEditProfile = function () {
                $scope.actionLogged = "editprofile";
            }

            $scope.logIn = function () {

                var loginData = {
                    grant_type: 'password',
                    username: $scope.user.username,
                    password: $scope.user.password
                };

                AuthService.logIn(loginData).then(
                    function (data) {
                        $scope.message = 'Welcome ' + username;
                        $scope.logged = true;
                        $scope.actionLogged = "";
                        $scope.actionNoLogged = "";
                    },
                    function (error) {
                        $scope.message = 'An error ocurred while trying to get loged';
                    }
                    );

            };
        }]
    }
});

//'<div ng-if="visible" ng-include="\'login-form.html\'">',