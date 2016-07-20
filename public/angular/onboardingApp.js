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
        $('#slides').superslides({'pagination':false});
    });

    $scope.init = function(){
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = {};
        $scope.data.teamMembers=[];
        $scope.data.projects=[];
        $scope.newMember = {};
    };

    $scope.init();

    $scope.saveSection1 = function(isValid){
        if(isValid) {
            var files = [];
            if ($scope.data.basicInfo.banner) {
                $scope.data.basicInfo.d.banner = $scope.data.basicInfo.banner.name;
                files.push($scope.data.basicInfo.banner);
            }

            if ($scope.data.basicInfo.logo) {
                $scope.data.basicInfo.d.logo = $scope.data.basicInfo.logo.name;
                files.push($scope.data.basicInfo.logo);
            }

            $scope.upload(files, $scope.data.basicInfo.d,'/ngo/onboard/section1');

            $('#slides').superslides('animate', 'next');
        }else{
            console.log('Invalid Form');
        }
    };

    $scope.saveSection2 = function(){
        $('#slides').superslides('animate', 'next');
    };

    $scope.saveSection3 = function(){
        //$('#slides').superslides('animate', 'next');
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

    $scope.upload = function (file, addMore, url) {
        Upload.upload({
            url: url,
            data: {file: file, addData: addMore},
            arrayKey: '[]'
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