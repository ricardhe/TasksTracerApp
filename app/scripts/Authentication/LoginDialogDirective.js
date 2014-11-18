

app.directive('logindialog', function (AUTH_EVENTS) {
    return {
        restrict: 'EA',
        templateUrl: 'scripts/Authentication/login-form.html',
        scope: {
            message:'@'
        },
        link: function (scope) {  
            /*
            var showDialog = function () {
                scope.visible = true;
            };

            scope.visible = true;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
            */
        },
        controller: ['$scope', 'AuthService', function ($scope,AuthService) {
            'use strict';
            var username = "ricardh@gmail.com";
            var password = "Valencia2!";
            var confirmpassword = "Valencia2!";

            $scope.user = { username: username, password: password };
            //$scope.message = '';
            message = '';


            $scope.submit = function () {

                var loginData = {
                    grant_type: 'password',
                    username: $scope.user.username,
                    password: $scope.user.password
                };

                AuthService.Login(loginData).then(
                    function (data) {
                        message = 'Welcome ' + username;
                    },
                    function (error) {
                        message = 'An error ocurred while trying to get loged';
                    }
                    );

            };
        }]
    }
});

//'<div ng-if="visible" ng-include="\'login-form.html\'">',