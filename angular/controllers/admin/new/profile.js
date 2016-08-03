app.controller('profileController', ['$scope', '$rootScope', '$http', '$q', '$window', '$state', function ($scope, $rootScope, $http, $q, $window,$state) {


    $scope.init = function () {
        $scope.data = {};
        $scope.data.basicInfo = {};
        $scope.data.basicInfo.d = $rootScope.d || {};
    };

    $scope.init();

    $scope.saveNgo = function (isValid) {
        if (isValid) {
            var files = [];
            if (typeof $scope.data.basicInfo.ngfBanner == 'object') {
                $scope.data.basicInfo.d.banner = $scope.data.basicInfo.ngfBanner.name;
                files.push($scope.data.basicInfo.ngfBanner);
            }

            if (typeof $scope.data.basicInfo.ngfLogo == 'object') {
                $scope.data.basicInfo.d.logo = $scope.data.basicInfo.ngfLogo.name;
                files.push($scope.data.basicInfo.ngfLogo);
            }

            $scope.data.basicInfo.d.uid = $window.localStorage['jwtToken_uid'];

            $scope.upload(files, $scope.data.basicInfo.d, '/ngo', function (resp, err) {
                if (err) {
                    //console.log('File Upload Error')
                    $.snackbar({content: "Server error while updating Profile"});
                } else {
                    //console.log('File Upload Success', resp);
                    $.snackbar({content: "Profile details updated"});
                    $rootScope.ngoId = resp.data._id;
                    $rootScope.d = resp.data;
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