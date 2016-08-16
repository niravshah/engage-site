app.controller('projectsController', ['$scope', '$rootScope', '$http','OptionsService', function ($scope, $rootScope, $http,oS) {
    $scope.init = function () {
        $scope.currentProject = {};
        $scope.projects = $rootScope.currentNgo.projects;
        $scope.teamMembers = $rootScope.currentNgo.teamMembers;
        $scope.ngoId = $rootScope.currentNgo._id;
        $scope.disableAddButton = false;
        $scope.szCategory = [];
        $scope.szSkills = [];
        oS.getSkillsOptions('profile',function(data){$scope.szSkills = data});
        oS.getCategoryOptions('profile',function(data){$scope.szCategory = data});
    };

    $scope.szSkillsConfig = {
        valueField: 'value',
        labelField: 'label',
        placeholder: 'Pick Skills'
    };

    $scope.szCategoryConfig = {
        valueField: 'value',
        labelField: 'label',
        placeholder: 'Select Category'
    };

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
        { id: '1-2', value: '1-2' },
        { id: '2-5', value: '2-5' },
        { id: '5-10', value: '5-10' }
    ];

    $scope.volunteerTeamSize = [
        { id: '1-2', value: '1-2' },
        { id: '2-5', value: '2-5' },
        { id: '5-10', value: '5-10' }
    ];

    $scope.init();

    $scope.addNewProject = function (isValid, $projectForm) {
        if (isValid) {
            //console.log('addNewProject', $scope.newProject);
            $scope.disableAddButton = true;
            var files = [];
            if (typeof $scope.currentProject.bannerNgf != 'undefined') {

                files.push($scope.currentProject.bannerNgf);
                $scope.currentProject.banner = $scope.currentProject.bannerNgf.name;
            }
            $scope.upload(files, $scope.currentProject, '/ngo/' + $scope.ngoId + '/projects', function (resp, err) {
                if (err) {
                    $.snackbar({ content: "Server error while adding new Project" });
                } else {
                    $.snackbar({ content: "New Project added successfully" });
                    $scope.projects = resp.data;
                    $scope.currentProject = {};
                    $scope.disableAddButton = false;
                }
            });

        } else {
            $.snackbar({ content: "Add New Project Form is not valid" });
        }

    };

    $scope.removeProject = function (array, index, mid) {
        $http.delete('/ngo/' + $scope.ngoId + '/projects/' + mid).then(function (response) {
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({ content: "Server Error" });
        });
    };
    $scope.editProject = function (array, index, mid) {
        $scope.currentProject = array[index];
    };

    $scope.inputOnTimeSet = function (newDate, oldDate) {
        $('#dLabel1').dropdown('toggle');
    };
}]);