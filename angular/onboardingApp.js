var app = angular.module('onboardingApp', ['ui.router', 'ngFileUpload', 'selectize', 'ui.bootstrap.datetimepicker', 'ui.validate', 'ngMessages', 'angular-jwt']);

app.config(function ($interpolateProvider, $stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    jwtInterceptorProvider.tokenGetter = function () {
        return localStorage.getItem('id_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/angular/partials/loginView.html',
            controller: 'loginController',
            authenticate: false
        })
        .state('reset', {
            url: '/reset',
            templateUrl: '/angular/partials/resetView.html',
            controller: 'resetController',
            authenticate: false
        })
        .state('basic', {
            url: '/basic',
            templateUrl: '/angular/partials/mainInfoView.html',
            controller: 'mainInfoController',
            authenticate: true
        })
        .state('team', {
            url: '/team',
            templateUrl: '/angular/partials/teamView.html',
            controller: 'teamViewController',
            authenticate: true
        })
        .state('projects', {
            abstract: true,
            url: '/projects',
            templateUrl: '/angular/partials/projectsView.html',
            controller: 'projectsViewController',
            authenticate: true
        })
        .state('projects.home', {
            url: '',
            templateUrl: '/angular/partials/projectHomeView.html'
        })
        .state('projects.skills', {
            url: '/team',
            templateUrl: '/angular/partials/projectSkillsView.html',
            authenticate: true
        });
});

app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!AuthService.validToken() && toState.authenticate) {
            $state.transitionTo('login');
            event.preventDefault();
        } else if (!AuthService.validSname($rootScope.sname) && toState.authenticate) {
            $.snackbar({content: "You're not authorized to access this Organization"});
            $state.transitionTo('login');
            event.preventDefault();
        }
    });
}]);

app.value('selectizeConfig', {
    plugins: ['remove_button'],
    create: false,
    delimiter: ','
});

app.service('AuthService', ['$http', '$window', 'jwtHelper',
    function ($http, $window, jwtHelper) {
        this.login = function (username, password, sname) {
            return $http.post('/auth/login', {
                uname: username,
                pword: password,
                sname: sname
            });
        };
        this.reset = function (uname, current, newP, newAgain) {
            return $http.post('/auth/reset', {
                uname: uname,
                current: current,
                newP: newP,
                newAgain: newAgain
            });
        };

        this.saveToken = function (token) {
            $window.localStorage['jwtToken'] = token;
            var tokenPayload = jwtHelper.decodeToken(token);
            $window.localStorage['jwtToken_sname'] = tokenPayload._doc.orgId;
            $window.localStorage['jwtToken_uid'] = tokenPayload._doc._id;
        };

        this.getToken = function () {
            return $window.localStorage['jwtToken'];
        };

        this.validToken = function () {
            var token = this.getToken();
            if (typeof token != 'undefined')
                return !jwtHelper.isTokenExpired(token);
            else return false;
        };

        this.validSname = function (sname) {
            if (sname != "") {
                return $window.localStorage['jwtToken_sname'] == sname;
            }

            return true;
        }

    }
]);

app.controller('mainInfoController', ['$scope', '$rootScope', '$http', '$q', '$window', '$state', function ($scope, $rootScope, $http, $q, $window,$state) {


    $scope.init = function () {
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = $rootScope.d || {};
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

            $scope.data.basicInfo.d.uid = $window.localStorage['jwtToken_uid'];

            $scope.upload(files, $scope.data.basicInfo.d, '/ngo', function (resp, err) {
                if (err) {
                    //console.log('File Upload Error')
                    $.snackbar({content: "Server error while adding new NGO"});
                } else {
                    //console.log('File Upload Success', resp);
                    $.snackbar({content: "Basic Details Updated"});
                    $rootScope.ngoId = resp.data._id;
                    $rootScope.sname = resp.data.sname;
                    $rootScope.d = resp.data;
                    $window.localStorage['jwtToken_sname']=resp.data.sname;
                    $state.transitionTo('team');
                }
            });
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

}]);

app.controller('teamViewController', ['$scope', '$rootScope', '$http', '$state', function ($scope, $rootScope, $http, $state) {

    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
    });

    $scope.init = function () {
        $scope.data = {};
        $scope.data.teamMembers = [];
        if (typeof  $rootScope.d != 'undefined') {
            $scope.data.teamMembers = $rootScope.d.teamMembers || [];
        }

        $scope.newMember = {};
        $scope.newMember.createEngageUser = true;
    };

    $scope.init();

    $scope.addNewMember = function (isValid) {
        if (isValid) {
            //console.log('addNewMember', $scope.newMember);

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
                    $scope.newMember.createEngageUser = true;

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

    $scope.editMember = function (array, index, mid) {
        $http.delete('/ngo/' + $rootScope.ngoId + '/members/' + mid).then(function (response) {
            $scope.newMember = array[index];
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
        //console.log('projectsViewController init');

        $scope.newProject = {};
        $scope.newProject.eDate = new Date();
        $scope.newProject.sDate = new Date();
        $scope.data = {};
        $scope.data.projects = {};
        if (typeof  $rootScope.d != 'undefined') {
            $scope.data.projects = $rootScope.d.projects || {};
        }
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

    $scope.addNewProject = function (isValid, $projectForm) {
        console.log($projectForm.$error);
        if (isValid) {
            //console.log('addNewProject', $scope.newProject);
            var files = [];
            if (typeof $scope.newProject.banner != 'undefined' && typeof $scope.newProject.banner == 'object') {

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
            $.snackbar({content: "Add New Project Form is not valid"});
        }

    };

    $scope.removeProject = function (array, index, mid) {
        $http.delete('/ngo/' + $rootScope.ngoId + '/projects/' + mid).then(function (response) {
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });

    };

    $scope.editProject = function (array, index, mid) {
        /*$http.delete('/ngo/' + $rootScope.ngoId + '/projects/' + mid).then(function (response) {
            $scope.newProject = array[index];
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });*/

        $scope.newProject = array[index];
    };

    $scope.inputOnTimeSet = function (newDate, oldDate) {
        //console.log('inputOnTimeSet', newDate, oldDate);
        $('#dLabel1').dropdown('toggle');
    };

    $scope.doneButtonClicked = function () {
        $window.location.href = '/ngo/' + $rootScope.sname;
    };

}]);

app.controller('loginController', ['$scope', '$rootScope', '$state', 'AuthService', function ($scope, $rootScope, $state, AuthService) {

    $scope.init = function () {
        $scope.data = {};
    };
    $scope.init();

    $scope.login = function () {
        AuthService.login($scope.data.uname, $scope.data.pword, $rootScope.sname).then(function (res) {
            if (res.data.success == true) {
                AuthService.saveToken(res.data.token);
                if (res.data.resetPassword == true) {
                    $state.transitionTo('reset');
                    event.preventDefault();

                } else {
                    $state.transitionTo('basic');
                    event.preventDefault();
                }

            } else {
                $.snackbar({content: res.data.message});
            }

        }, function (err) {
            console.log(err);
            $.snackbar({content: "Login Error"});
        });
    }

}]);
app.controller('resetController', ['$scope', '$rootScope', '$state', 'AuthService', function ($scope, $rootScope, $state, AuthService) {

    $scope.init = function () {
        $scope.data = {};
    };
    $scope.init();

    $scope.reset = function () {
        AuthService.reset($scope.data.uname, $scope.data.current, $scope.data.new, $scope.data.newAgain).then(function (res) {
            if (res.data.success == true) {
                $.snackbar({content: res.data.message});
                $state.transitionTo('login');
            } else {
                $.snackbar({content: res.data.message});
            }

        }, function (err) {
            console.log(err);
            $.snackbar({content: "Error Resetting Current Password"});
        });
    }

}]);

app.controller('onboardingAppController', ['$scope', '$rootScope', '$state', 'Upload', '$http', function ($scope, $rootScope, $state, Upload, $http) {

    $scope.init = function () {
        $rootScope.sname = $('#server-sname').val();
        if ($rootScope.sname != "") {
            $http.get('/ngo/sname/' + $rootScope.sname).then(function (resp) {
                $rootScope.d = resp.data;
                $rootScope.ngoId = resp.data._id;
                $state.go('basic');
            });
        }
        ;
    }

    $scope.init();

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