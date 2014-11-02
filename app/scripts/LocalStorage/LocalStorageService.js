/**
 * Created by PAULA on 29/10/2014.
 */


app.factory("LS", function($window, $rootScope,localStorageService) {

    angular.element($window).on('storage', function(event) {
        if (event.key === 'token' || event.key === 'username' ||  event.key === 'userrole' ) {
            $rootScope.$apply();
        }
    });

    return {

        setAuthorizationData: function(token,userName,userRoles)  {
            localStorageService.set('authorizationData', { token: token, userName: userName, userRoles:userRoles });
        },
        getAuthorizationData: function()  {
            return localStorageService.get('authorizationData');
        },
        removeAuthorizationData: function() {
             localStorageService.remove('authorizationData');
        },
        clearAll : function () {
            localStorageService.clearAll();
        }
    };
});