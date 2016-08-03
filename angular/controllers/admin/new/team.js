app.controller('teamController', ['$scope', '$rootScope', '$http', 'DataService', function ($scope, $rootScope, $http, dS) {

    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
    });

    $scope.init = function () {
        $scope.teamMembers = dS.getCurrentNgoTeamMembers();
        $scope.currentMember = dS.getCurrentTeamMember();
        $scope.ngoId = dS.getCurrentNgoId();
    };

    $scope.init();

    $scope.addNewMember = function (isValid) {
        if (isValid) {
            //console.log('addNewMember', $scope.newMember);
            var files = [];
            if (typeof $scope.currentMember.ngfAvatar != 'undefined') {
                files.push($scope.currentMember.ngfAvatar);
                $scope.currentMember.avatar = $scope.currentMember.ngfAvatar.name;
            }
            $scope.upload(files, $scope.currentMember, '/ngo/' + $scope.ngoId + '/members', function (resp, err) {
                if (err) {
                    $.snackbar({content: "Server error while adding new team member"});
                } else {
                    $.snackbar({content: "New Team Member added successfully"});
                    dS.addCurrentNgoTeamMember(resp.data);
                    dS.setCurrentTeamMember({createEngageUser: true});
                }
            });

        } else {
            $.snackbar({content: "Add New Team member form is not valid"});
        }
    };

    $scope.removeMember = function (array, index, mid) {
        $http.delete('/ngo/' + $scope.ngoId + '/members/' + mid).then(function (response) {
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });

    };

    $scope.editMember = function (array, index, mid) {
        $http.delete('/ngo/' + $scope.ngoId + '/members/' + mid).then(function (response) {
            $scope.newMember = array[index];
            array.splice(index, 1);
        }, function (error) {
            $.snackbar({content: "Server Error"});
        });
    };
}]);