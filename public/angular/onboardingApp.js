var app = angular.module('onboardingApp', ['ui.router', 'ngFileUpload', 'selectize', 'ui.bootstrap.datetimepicker', 'ui.validate','ngMessages']);

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
            url: '/team',
            templateUrl: '/angular/partials/projectSkillsView.html'
        });
});

app.value('selectizeConfig', {
    plugins: ['remove_button'],
    create: false,
    delimiter: ','
});

app.controller('mainInfoController', ['$scope', '$rootScope', '$http', '$q', function ($scope, $rootScope, $http, $q) {


    $scope.init = function () {
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = {};
    };

    $scope.init();

    $scope.saveNgo = function (isValid) {
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

            $scope.upload(files, $scope.data.basicInfo.d, '/ngo', function (resp, err) {
                if (err) {
                    //console.log('File Upload Error')
                    $.snackbar({content: "Server error while adding new NGO"});
                } else {
                    //console.log('File Upload Success', resp);
                    $.snackbar({content: "Successfully created new NGO"});
                    $rootScope.ngoId = resp.data._id;
                    $rootScope.sname = resp.data.sname;
                }
            })
        } else {
            $.snackbar({content: "Add New NGO form is not valid"});
        }
    };

    $scope.checkNameUnique = function (sname, isDirty) {

        if (isDirty) {
            return $q(function (resolve, reject) {
                $http.post('/ngo/checksname', {sname: sname}).then(function (resp) {
                    if (resp.data.isNameValid) {
                        resolve();
                    } else {
                        reject();
                    }

                }, function (err) {
                    reject()
                });
            });
        }
        else {
            return true;
        }

    }

}])
;

app.controller('teamViewController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

    $scope.init = function () {
        $scope.data = {};
        $scope.data.teamMembers = [];
        $scope.newMember = {};
    };

    $scope.init();

    $scope.addNewMember = function (isValid) {
        if (isValid) {
            console.log('addNewMember', $scope.newMember);

            var files = [];
            if (typeof $scope.newMember.avatar != 'undefined') {
                files.push($scope.newMember.avatar);
                $scope.newMember.avatar = $scope.newMember.avatar.name;
            }
            $scope.upload(files, $scope.newMember, '/ngo/' + $rootScope.ngoId + '/members', function (resp, err) {
                if (err) {
                    $.snackbar({content: "Server error while adding new team member"});
                } else {
                    $.snackbar({content: "New Team Member added successfully"});
                    $scope.data.teamMembers.push(resp.data);
                    $scope.newMember = {};
                }
            });

        } else {
            $.snackbar({content: "Add New Team member form is not valid"});
        }
    };

    $scope.removeMember = function (array, index, mid) {
        $http.delete('/ngo/' + $rootScope.ngoId + '/members/' + mid).then(function (response) {
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });

    };

    $scope.teamMembersNext = function () {
        $rootScope.teamMembers = $scope.data.teamMembers;
    }

}]);

app.controller('projectsViewController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.init = function () {
        console.log('projectsViewController init');
        $scope.data = {};
        $scope.data.projects = [];
        $scope.newProject = {};
        $scope.newProject.eDate = new Date();
        $scope.newProject.sDate = new Date();
        $scope.teamMembers = $rootScope.teamMembers;
    };

    $scope.szSkillsConfig = {
        valueField: 'id',
        labelField: 'value',
        placeholder: 'Pick Skills'
    };

    $scope.szSkills = [
        {id: 'leadership', value: 'Leadership'},
        {id: 'listening', value: 'Listening'},
        {id: 'talking-to-others', value: 'Talking to Others'},
        {id: 'reading-and-writing', value: 'Reading & Writing'},
        {id: 'teamwork', value: 'Teamwork'},
        {id: 'organising', value: 'Organising'}
    ];

    $scope.szCategoryConfig = {
        valueField: 'id',
        labelField: 'value',
        placeholder: 'Select Category'
    };
    $scope.szCategory = [
        {id: 'education', value: 'Teaching'},
        {id: 'arts-culture', value: 'Training'},
        {id: 'coaching', value: 'Coaching'},
        {id: 'youth-work', value: 'Youth Work'},
        {id: 'conservation', value: 'Conservation'},
        {id: 'diy-odd-jobs', value: 'DIY / Odd Jobs'},
        {id: 'community-services', value: 'Community Service'}
    ];


    $scope.szContactConfig = {
        valueField: 'email',
        labelField: 'name',
        placeholder: 'Select Contact'
    };

    $scope.szTeamConfig = {
        valueField: 'id',
        labelField: 'value',
        placeholder: 'Select Team Size',
        maxItems: 1
    };

    $scope.managingTeamSize = [
        {id: '1-2', value: '1-2'},
        {id: '2-5', value: '2-5'},
        {id: '5-10', value: '5-10'}
    ];

    $scope.volunteerTeamSize = [
        {id: '1-2', value: '1-2'},
        {id: '2-5', value: '2-5'},
        {id: '5-10', value: '5-10'}
    ];

    $scope.init();

    $scope.addNewProject = function (isValid) {
        if (isValid) {
            //console.log('addNewProject', $scope.newProject);
            var files = [];
            if (typeof $scope.newProject.banner != 'undefined') {
                files.push($scope.newProject.banner);
                $scope.newProject.banner = $scope.newProject.banner.name;
            }
            $scope.upload(files, $scope.newProject, '/ngo/' + $rootScope.ngoId + '/projects', function (resp, err) {
                if (err) {
                    $.snackbar({content: "Server error while adding new Project"});
                } else {
                    $.snackbar({content: "New Project added successfully"});
                    $scope.data.projects.push(resp.data);
                    $scope.newProject = {};
                }
            });

        } else {
            $.snackbar({content: "Add New Project member form is not valid"});
        }

    };

    $scope.removeProject = function (array, index, mid) {
        $http.delete('/ngo/' + $rootScope.ngoId + '/projects/' + mid).then(function (response) {
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });

    };

    $scope.inputOnTimeSet = function (newDate, oldDate) {
        console.log('inputOnTimeSet', newDate, oldDate);
        $('#dLabel1').dropdown('toggle');
    }

    $scope.doneButtonClicked = function(){
        $window.location.href = '/ngo/' + $rootScope.sname;
    };

}]);

app.controller('onboardingAppController', ['$scope', '$state', 'Upload', function ($scope, $state, Upload) {

    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
    });

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