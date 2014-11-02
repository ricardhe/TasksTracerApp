/**
 * Created by PAULA on 25/10/2014.
 */


app.controller('UserCtrl',['$scope','AuthService', function ($scope, AuthService) {

    var username = "ricardh@gmail.com";
    var password = "Valencia2!";
    var confirmpassword="Valencia2!";

    $scope.user = {username: username, password: password};
    $scope.message = '';


    $scope.submit = function () {

        var loginData = {
            grant_type: 'password',
            username: $scope.user.username,
            password: $scope.user.password
        };

        AuthService.Login(loginData).then(
            function (data) {
                $scope.message = 'Welcome '+ username;
            },
            function (error) {
                $scope.message = 'An error ocurred while trying to get loged';
            }
            );

    };

}]);



