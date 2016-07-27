var loginApp = angular.module('loginApp', ['ui.router', 'angular-jwt']);

loginApp.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
});

loginApp.controller('mainController', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
        $scope.login = function() {
            $http.post('/auth/login', {
                username: username,
                password: password
            }).then(function(req,res){
                
            });
        }
    }
]);