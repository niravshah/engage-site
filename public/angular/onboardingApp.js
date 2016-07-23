var app = angular.module('onboardingApp', ['ui.router', 'ngFileUpload','selectize']);

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
                'mainInfoView': {
                    templateUrl: '/angular/partials/mainInfoView.html'
                },
                'projectsView': {
                    templateUrl: '/angular/partials/projectsView.html'
                }
            }
        })

});


app.controller('onboardingAppController', ['$scope', 'Upload', function ($scope, Upload) {

    $scope.myModel = 1;

    $scope.myOptions = [
        {id: 1, title: 'Spectrometer'},
        {id: 2, title: 'Star Chart'},
        {id: 3, title: 'Laser Pointer'}
    ];

    $scope.myConfig = {
        plugins: ['remove_button'],
        create: true,
        valueField: 'id',
        labelField: 'title',
        delimiter: '|',
        placeholder: 'Pick something',
        onInitialize: function(selectize){
            // receives the selectize object as an argument
        },
        // maxItems: 1
    };

    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
        $('#slides').superslides({'pagination': false});
    });

    $scope.init = function () {
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = {};
        $scope.data.teamMembers = [];
        $scope.data.projects = [];
        $scope.newMember = {};
        $scope.newProject = {};
    };

    $scope.init();

    $scope.saveSection1 = function (isValid) {
        if (isValid) {
            var files = [];
            if ($scope.data.basicInfo.banner) {
                $scope.data.basicInfo.d.banner = $scope.data.basicInfo.banner.name;
                files.push($scope.data.basicInfo.banner);
            }

            if ($scope.data.basicInfo.logo) {
                $scope.data.basicInfo.d.logo = $scope.data.basicInfo.logo.name;
                files.push($scope.data.basicInfo.logo);
            }

            /*$scope.upload(files, $scope.data.basicInfo.d,'/ngo/onboard/section1', function(resp,err){
             if(err){
             console.log('File Upload Error')
             }else{
             console.log('File Upload Success',resp);
             $scope.data.id = resp.data._id;
             }
             });*/

            $('#slides').superslides('animate', 'next');

        } else {
            console.log('Invalid Form');
        }
    };

    $scope.saveSection2 = function () {
        var team = $scope.data.teamMembers;
        var files = [];
        for (var i = 0; i < team.length; i++) {
            if (typeof team[i].avatar != 'undefined') {
                files.push(team[i].avatar);
                team[i].avatar = team[i].avatar.name;
            }
        }
        /* $scope.upload(files,team, '/ngo/onboard/section2/'+$scope.data.id,function(resp,err){
         if(err){
         console.log('File Upload Error')
         }else{
         console.log('File Upload Success',resp);
         }
         });*/

        $('#slides').superslides('animate', 'next');
    };

    $scope.saveSection3 = function () {
        //$('#slides').superslides('animate', 'next');
    };


    $scope.addNewMember = function (isValid) {
        if (isValid) {
            console.log('addNewMember', $scope.newMember)
            $scope.data.teamMembers.push($scope.newMember);
            $scope.newMember = {};
        } else {
            console.log('Invalid Form')
        }
    };

    $scope.addNewProject = function () {
        $scope.data.projects.push($scope.newProject);
        $scope.newProject = {};
    };

    $scope.remove = function (array, index) {
        array.splice(index, 1);
    }

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

    $scope.showAddSkillsModla = function(){
        //Use modal popups to display messages
        //$('#modalMessage .modal-title').html('<i class="icon icon-envelope-open"></i>' + data);
        $('#addSkillsModal').modal('show');

    }
}]);