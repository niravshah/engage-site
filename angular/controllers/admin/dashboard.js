app.controller('dashboardController', ['$scope', '$rootScope', '$state', '$http','$window', 'AuthService', function ($scope, $rootScope, $state, $http, $window, aS) {

    $scope.ngos = {};
    $scope.init = function () {
        var decodedToken = aS.getDecodedToken();
        var userId = decodedToken._doc._id;
        $http.get('/user/' + userId + '/ngos').then(function (resp) {
            if (resp.data.success == true) {
                $scope.ngos = resp.data.ngos;
            } else {
                $.snackbar({content: resp.data.message});
            }
        }, function (error) {
            $.snackbar({content: error.message});
        })
    };

    $scope.init();

    $scope.newNgo = function () {
        $state.transitionTo('new.profile');
    };

    $scope.editNgo = function (ngo) {
        $rootScope.currentNgo = ngo;
        $state.transitionTo('new.profile');
    };

    $scope.viewNgo = function (sname) {
        var link = '/ngo/' + sname;
        $window.open(link, '_blank');
    };

    $scope.deleteNgo = function (sname) {
        $http.post('/ngo/' + sname, {}).then(function (resp) {
            if (resp.data.success == true) {
                $.snackbar({content: 'Delete Successful'});
                var spliceIndex = -1
                for(var i=0; i<$scope.ngos.length;i++){
                    if($scope.ngos[i].sname == sname){
                        spliceIndex = i;
                    }
                }
                if(spliceIndex>=0){
                    $scope.ngos.splice(spliceIndex,1);
                }
            } else {
                $.snackbar({content: 'Unable to delete'});
            }
        }, function (err) {
            if (err) {
                $.snackbar({content: 'Error deleting NGO'});
            }
        });
    }

}]);