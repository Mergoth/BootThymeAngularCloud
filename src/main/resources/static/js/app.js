angular.module('myModule', [ 'ngRoute' ])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'home',
            controllerAs: 'controller'
        }).when('/login', {
            templateUrl : 'login.html',
            controller : 'navigation',
            controllerAs: 'controller'
        }).otherwise('/');

    })
    .controller('home', function($http) {
        var self = this;
        $http.get('/resource/').then(function(response) {
            self.message = response.data;
        })
    })
    .controller('navigation',
        function($rootScope, $http, $location) {
            var self = this

            var authenticate = function(credentials, callback){

                var headers = credentials ? {authentication : "Basic "
                + btoa(credentials.username + ":"+credentials.password)
                } : {};

                $http.get('user', {headers : headers}).then(function(response) {
                    if (response.data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback();
                }, function() {
                    $rootScope.authenticated = false;
                    callback && callback();
                });
            }


            self.credentials = {};
            self.login = function() {
                authenticate(self.credentials, function() {
                    if ($rootScope.authenticated) {
                        $location.path("/");
                        self.error = false;
                    } else {
                        $location.path("/login");
                        self.error = true;
                    }
                });
            };

            self.logout = function() {
                $http.post('logout', {}).finally(function() {
                    $rootScope.authenticated = false;
                    $location.path("/");
                });
            }
        });