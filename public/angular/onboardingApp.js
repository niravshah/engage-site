var app = angular.module('onboardingApp', ['ui.router','ngFileUpload']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'teamView': {
                    templateUrl: '/angular/partials/teamView.html'
                },
                'mainInfoView':{
                    templateUrl :'/angular/partials/mainInfoView.html'
                },
                'projectsView': {
                    templateUrl: '/angular/partials/projectsView.html'
                }
            }
        })
});


app.controller('onboardingAppController', ['$scope','Upload', function ($scope, Upload) {


    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();

        $('#slides').superslides();
        $('#prevBtn').attr('disabled', true);
        $('#doneBtn').hide();
    });

    $scope.init = function(){
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.teamMembers=[];
        $scope.data.projects=[];
        $scope.newMember = {};
        console.log('onboardingAppController init', $scope.data)

        /*$scope.data.teamMembers = [
            {
                "name": "Anna Smith",
                "email": "anna.smith@email.com",
                "title": "Corporate Relations",
                "avatar":"https://randomuser.me/api/portraits/women/49.jpg"
            }
        ];

        $scope.data.projects = [
            {
                "name": "Anna Smith",
                "email": "anna.smith@email.com",
                "title": "Corporate Relations",
                "avatar":"http://lorempixel.com/86/86/people/1g"
            }
        ];*/

    };

    $scope.init();


    $scope.ssNextClicked = function(){
        $('#slides').superslides('animate', 'next');

        var nextIndex = $('#slides').superslides('next');
        var size = $('#slides').superslides('size')-1;
        var prevIndex = $('#slides').superslides('prev');
        if(nextIndex == size){
            $('#nextBtn').attr('disabled', true);
            $('#doneBtn').show();
        }
        if(prevIndex != 0){
            $('#prevBtn').removeAttr('disabled');
        }
    };

    $scope.ssPreviousClicked = function(){

        $('#slides').superslides('animate', 'prev');
        var prevIndex = $('#slides').superslides('prev');
        var nextIndex = $('#slides').superslides('next');
        var size = $('#slides').superslides('size')-1;

        if(prevIndex == 0){
            $('#prevBtn').attr('disabled', true);
        }
        if(nextIndex != size){
            $('#nextBtn').removeAttr('disabled');
            $('#doneBtn').hide();
        }
    };

    $scope.ssDoneClicked = function(){
        console.log("ssDoneClicked", $scope.data);

        var files = [];

        if ($scope.data.basicInfo.banner) {
            files.push($scope.data.basicInfo.banner);
            //$scope.upload($scope.data.basicInfo.banner);
        }
        if ($scope.data.basicInfo.logo) {
            files.push($scope.data.basicInfo.logo);
            //$scope.upload($scope.data.basicInfo.logo);
        }

        if (files && files.length) {
            $scope.upload(files);
        }

    };

    $scope.addNewMember = function(){
        console.log('addNewMember', $scope.newMember)
        $scope.data.teamMembers.push($scope.newMember);
        $scope.newMember = {};
    };

    $scope.addNewProject = function(){
        $scope.data.projects.push($scope.newProject);
        $scope.newProject = {};
    };

    $scope.remove = function(array, index){
        array.splice(index, 1);
    }

    $scope.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}]);