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
    
    $scope.addNewMember = function($scope){
        
    };

    $scope.teamMembers = [
        {
            "name": "Anna Smith",
            "email": "anna.smith@email.com",
            "designation": "Corporate Relations",
            "avatar":'http://lorempixel.com/56/56/people/1g'
        }
    ]
    
    $scope.init();
});
