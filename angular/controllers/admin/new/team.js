app.controller('teamController', ['$scope', '$rootScope', '$http', '$state', function ($scope, $rootScope, $http, $state) {

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