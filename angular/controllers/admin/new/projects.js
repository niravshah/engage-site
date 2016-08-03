app.controller('projectsController', ['$scope', '$rootScope', '$http',function ($scope, $rootScope, $http) {
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
            if (typeof $scope.newProject.bannerNgf == 'object') {

                files.push($scope.newProject.bannerNgf);
                $scope.newProject.banner = $scope.newProject.bannerNgf.name;
            }
            $scope.upload(files, $scope.newProject, '/ngo/' + $rootScope.ngoId + '/projects', function (resp, err) {
                if (err) {
                    $.snackbar({content: "Server error while adding new Project"});
                } else {
                    $.snackbar({content: "New Project added successfully"});
                    $scope.data.projects = resp.data.projects;
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


}]);