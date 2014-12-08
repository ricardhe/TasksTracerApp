
function config($stateProvider, $urlRouterProvider, $httpProvider) {

    // Configurem les rutes mitjançant estats
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })


    // injectem al httpprovidere l'interceptor de codi de resposta http per autenticació.
    $httpProvider.interceptors.push(['$injector',
                                               function ($injector) {
                                                   return $injector.get('authInterceptorToken');
                                               }
    ]);

}
angular
    .module('MyApp')
    .config(config)
    .run(function($rootScope, $state, AUTH_EVENTS, AuthService) {
      
        $rootScope.$state = $state;


        $rootScope.$on('$stateChangeStart', function (event, next) {
            
            var authorizedRoles = next.data.authorizedRoles;

            if (!authorizedRoles) {

                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

            }
            else {
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
            }

        });


    }
    );
