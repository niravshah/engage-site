app.controller('profileController', ['$scope', '$rootScope', '$http', '$q', '$window', '$state', 'Upload', '$translate', 'OptionsService',
    function ($scope, $rootScope, $http, $q, $window, $state, Upload, $translate,oS) {


        $scope.init = function () {
            $scope.currentNgo = $rootScope.currentNgo || {};
            $scope.disableNextButton = false;
            $scope.activityTypeOptions = [];
            oS.getActivityTypeOptions('profile',function(vals){$scope.activityTypeOptions = vals});
        };

        $scope.init();

        $scope.saveNgo = function (isValid) {
            if (isValid) {
                $scope.disableNextButton = true;
                var files = [];
                if (typeof $scope.currentNgo.ngfBanner == 'object') {
                    $scope.currentNgo.banner = $scope.currentNgo.ngfBanner.name;
                    files.push($scope.currentNgo.ngfBanner);
                }

                if (typeof $scope.currentNgo.ngfLogo == 'string' && $scope.currentNgo.ngfLogo != '') {
                    $scope.currentNgo.logo = $scope.currentNgo.currentNgfLogo.name;
                    files.push(Upload.dataUrltoBlob($scope.currentNgo.ngfLogo, $scope.currentNgo.logo));
                    delete $scope.currentNgo.ngfLogo;
                    delete $scope.currentNgo.currentNgfLogo;
                }

                $scope.currentNgo.uid = $window.localStorage['jwtToken_uid'];

                $scope.upload(files, $scope.currentNgo, '/ngo', function (resp, err) {
                    if (err) {
                        //console.log('File Upload Error')
                        $.snackbar({content: "Server error while updating Profile"});
                    } else {
                        //console.log('File Upload Success', resp);
                        $.snackbar({content: "Profile details updated"});
                        $scope.disableNextButton = false;
                        $scope.currentNgo = {};
                        $rootScope.currentNgo = resp.data;
                        $state.transitionTo('new.team');
                    }
                });
            } else {
                $.snackbar({content: "Profile update form is not valid"});
            }
        };

        $scope.addLogo = function () {
            if ($scope.currentNgo.logo) {
                Upload.urlToBlob($scope.currentNgo.logo).then(function (blob) {
                    blob.name = $scope.currentNgo.logo.replace(/^.*[\\\/]/, '')
                    $scope.currentNgo.currentNgfLogo = blob;
                    $state.transitionTo('new.profile.logo');
                });
            } else {
                $state.transitionTo('new.profile.logo');
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