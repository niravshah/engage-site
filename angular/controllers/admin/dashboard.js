app.controller('dashboardController', ['$scope', '$rootScope', '$state', '$http', 'AuthService', function ($scope, $rootScope, $state, $http, aS) {

    $scope.ngos = {};
    $scope.init = function () {
        var decodedToken = aS.getDecodedToken();
        var userId = decodedToken._doc._id;
        $http.get('/user/' + userId + '/ngos').then(function (resp) {
            if (resp.data.success == true) {
                $scope.ngos = resp.data.ngos;
                console.log(resp.data);
            } else {
                $.snackbar({ content: resp.data.message });
            }
        }, function (error) {
            $.snackbar({ content: error.message });
        })
    };

    $scope.init();

    $scope.newNgo = function () {
        $state.transitionTo('new.profile');
    }
}]);