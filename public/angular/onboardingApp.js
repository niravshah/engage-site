var app = angular.module('onboardingApp', ['ui.router']);
app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'teamView': {
                    templateUrl: '/angular/partials/teamView.html',
                    controller: 'teamController'
                }
            }
        })
});


app.controller('teamController', function ($scope) {
    $scope.init = function(){
        console.log('teamController init');
    };

    $scope.teamMembers = {
        "1": {
            "name": "Anna Smith",
            "email": "anna.smith@email.com",
            "designation": "Corporate Relations",
            "avatar":'/images/anna.jpg'
        }
    }
    $scope.init();
});
