app.controller('profileController', ['$scope', '$rootScope', '$http', '$q', '$window', '$state', 'DataService', function ($scope, $rootScope, $http, $q, $window,$state, dS) {


    $scope.init = function () {
        $scope.currentNgo = dS.getCurrentNgo();
    };

    $scope.init();

    $scope.saveNgo = function (isValid) {
        if (isValid) {
            var files = [];
            if (typeof $scope.currentNgo.ngfBanner == 'object') {
                $scope.currentNgo.banner = $scope.currentNgo.ngfBanner.name;
                files.push($scope.currentNgo.ngfBanner);
            }

            if (typeof $scope.currentNgo.ngfLogo == 'object') {
                $scope.currentNgo.logo = $scope.currentNgo.ngfLogo.name;
                files.push($scope.currentNgo.ngfLogo);
            }

            $scope.currentNgo.uid = $window.localStorage['jwtToken_uid'];

            $scope.upload(files, $scope.currentNgo, '/ngo', function (resp, err) {
                if (err) {
                    //console.log('File Upload Error')
                    $.snackbar({content: "Server error while updating Profile"});
                } else {
                    //console.log('File Upload Success', resp);
                    $.snackbar({content: "Profile details updated"});
                    dS.setCurrentNgo(resp.data);
                    $state.transitionTo('new.team');
                }
            });
        } else {
            $.snackbar({content: "Profile update form is not valid"});
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