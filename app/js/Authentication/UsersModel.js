var app = angular.module('MyApp');

/**
  https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
**/

app.factory('User', function () {

    function User(email, phoneNumber, firstName, lastName, userName, sex, dateOfBirth) {

        // Public properties, assigned to the instance ('this')
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        
    }

    User.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    var possibleRoles = ['admin', 'editor', 'guest'];

    function checkRole(role) {
        return possibleRoles.indexOf(role) !== -1;
    }

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    User.possibleRoles = angular.copy(possibleRoles);

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    User.build = function (data) {
      /*  if (!checkRole(data.role)) {
            return;
        }*/
        return new User(
                        data.email, data.phoneNumber, data.firstName,
                        data.lastName, data.userName, data.sex, data.dateOfBirth
                        );
    };

    return User;
})