var app = angular.module('onboardingApp', ['ui.router', 'ngFileUpload', 'selectize']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $urlRouterProvider.otherwise('welcome');
    $stateProvider
        .state('home', {
            url: '/welcome',
            templateUrl: '/angular/partials/mainInfoView.html',
            controller: 'mainInfoController'
        })
        .state('team', {
            url: '/team',
            templateUrl: '/angular/partials/teamView.html',
            controller: 'teamViewController'
        })
        .state('projects', {
            abstract: true,
            url: '/projects',
            templateUrl: '/angular/partials/projectsView.html',
            controller: 'projectsViewController'
        })
        .state('projects.home', {
            url: '',
            templateUrl: '/angular/partials/projectHomeView.html'
        })
        .state('projects.skills', {
            url: '/skills',
            templateUrl: '/angular/partials/projectSkillsView.html'
        });
});


app.controller('mainInfoController', ['$scope', 'Upload', '$state', function ($scope, $rootScope, Upload, $state) {


    $scope.init = function () {
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = {};
    };

    $scope.init();

    $scope.saveSection1 = function (isValid) {
        if (isValid) {
            console.log("saveSection1");
            /*var files = [];
             if ($scope.data.basicInfo.banner) {
             $scope.data.basicInfo.d.banner = $scope.data.basicInfo.banner.name;
             files.push($scope.data.basicInfo.banner);
             }

             if ($scope.data.basicInfo.logo) {
             $scope.data.basicInfo.d.logo = $scope.data.basicInfo.logo.name;
             files.push($scope.data.basicInfo.logo);
             }

             $scope.upload(files, $scope.data.basicInfo.d,'/ngo/onboard/section1', function(resp,err){
             if(err){
             console.log('File Upload Error')
             }else{
             console.log('File Upload Success',resp);
             $scope.data.id = resp.data._id;
             }
             });*/

        } else {
            console.log('Invalid Form');
        }
    };
}]);

app.controller('teamViewController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {

    $scope.init = function () {
        $scope.data = {};
        $scope.data.teamMembers = [];
        $scope.newMember = {};
    };

    $scope.init();

    $scope.addNewMember = function (isValid) {
        if (isValid) {
            console.log('addNewMember', $scope.newMember)
            $scope.data.teamMembers.push($scope.newMember);
            $scope.newMember = {};
        } else {
            console.log('Invalid Form')
        }
    };

    $scope.saveSection2 = function () {
        console.log("saveSection2");
        /*var team = $scope.data.teamMembers;
         var files = [];
         for (var i = 0; i < team.length; i++) {
         if (typeof team[i].avatar != 'undefined') {
         files.push(team[i].avatar);
         team[i].avatar = team[i].avatar.name;
         }
         }
         scope.upload(files,team, '/ngo/onboard/section2/'+$scope.data.id,function(resp,err){
         if(err){
         console.log('File Upload Error')
         }else{
         console.log('File Upload Success',resp);
         }
         });*/
    };

}]);

app.controller('projectsViewController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {
    $scope.init = function () {
        console.log('projectsViewController init');
        $scope.data = {};
        $scope.data.projects = [];
        $scope.newProject = {};
    };
    
    $scope.selectizeSkills = [
        {id: 1, title: 'Leadership'},
        {id: 2, title: 'Listening'},
        {id: 3, title: 'Talking to Others'},
        {id: 4, title: 'Reading & Writing'},
        {id: 5, title: 'Teamwork'},
        {id: 6, title: 'Organising'}
    ];
    
    $scope.selectizeConfig = {
        plugins: ['remove_button'],
        create: false,
        valueField: 'id',
        labelField: 'title',
        delimiter: '|',
        placeholder: 'Pick something'
    };

    $scope.init();

    $scope.addNewProject = function () {
        $scope.data.projects.push($scope.newProject);
        $scope.newProject = {};
    };

    $scope.saveSection3 = function () {
        $state.go('team')
    };

}]);

app.controller('onboardingAppController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {

    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
    });

    $scope.remove = function (array, index) {
        array.splice(index, 1);
    };

    $scope.upload = function (file, addMore, url, cb) {
        Upload.upload({
            url: url,
            data: {file: file, addData: addMore},
            arrayKey: '[k]',
            objectKey: '[k]'
        }).then(function (resp) {
            cb(resp, null);
        }, function (resp) {
            cb(null, resp);
        });
    };
}]);