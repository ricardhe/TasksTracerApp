/// <reference path="vwLoginAndRegister.html" />
/// <reference path="vwLoginAndRegister.html" />
var app = angular.module('MyApp');


function ModalInstanceCtrl($scope, $modalInstance, AuthService) {

    var username = "ricardh@gmail.com";
    var password = "Valencia2!";
    var confirmpassword = "Valencia2!";

    $scope.user = { username: username, password: password };

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.logIn = function () {

        var loginData = {
            grant_type: 'password',
            username: $scope.user.username,
            password: $scope.user.password
        };

        AuthService.logIn(loginData).then(
            function (data) {
                $modalInstance.close();
            },
            function (error) {
                $scope.alerts.push({ type: 'danger', msg: 'An error ocurred while trying to get loged' });
            }
            );
    };

}

app.directive('logindialog', function (AUTH_EVENTS) {
    return {
        restrict: 'EA',
        templateUrl: 'js/Authentication/login-form.html',
        scope: {
            visible: '='
        },
        link: function (scope) {  
            scope.$on(AUTH_EVENTS.notAuthenticated, function () { scope.logged = false; scope.refreshUserName(); });
            scope.$on(AUTH_EVENTS.sessionTimeout, function () { scope.logged = false; scope.refreshUserName(); });
            scope.$on(AUTH_EVENTS.loginSuccess, function () { scope.logged = true; scope.refreshUserName(); });
        },
        controller: ['$scope', '$modal', 'AuthService', 'Session', function ($scope, $modal, AuthService, Session) {
            'use strict';

            $scope.logged = false;
            $scope.userName = '';

            $scope.refreshUserName=function()
            {
                $scope.userName = Session.userName();
            }

            $scope.showDialog = function () {
                $scope.logged = false;
            };

            $scope.goToLogin = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'js/Authentication/vwLoginAndRegister.html',
                    controller: ModalInstanceCtrl
                });
            }
            $scope.message = '';
            $scope.logOut = function () {
                AuthService.logOut().then(
                    function (data) {
                        $scope.logged = false;
                    },
                    function (error) {
                        $scope.message = 'An error ocurred while trying to get loged Out';
                    }
                );
            }

            $scope.goToEditProfile = function () {
                AuthService.getExtendedUserInfo().then(
                        function (data) {
                            var d = data;
                        },
                        function (error) {
                            $scope.message = 'An error ocurred while trying to getUserInfo';
                        }
                    );
            }

        }]
    }
});



//'<div ng-if="visible" ng-include="\'login-form.html\'">',