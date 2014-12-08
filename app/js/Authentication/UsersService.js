var app = angular.module('MyApp');


app.factory('UsersService', function (API, Organisation) {
    return {
        get: function () {
            return API
              .get('/organisations')
              .then(Organisation.apiResponseTransformer);
        }
    }
}
);