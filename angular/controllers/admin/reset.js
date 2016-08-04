    app.controller('resetController', ['$scope', '$rootScope', '$state', 'AuthService', function ($scope, $rootScope, $state, AuthService) {
    $scope.reset = function () {
        AuthService.reset($scope.data.uname, $scope.data.current, $scope.data.new, $scope.data.newAgain).then(function (res) {
            if (res.data.success == true) {
                $.snackbar({content: res.data.message});
                $state.transitionTo('dashboard');
            } else {
                $.snackbar({content: res.data.message});
            }

        }, function (err) {
            console.log(err);
            $.snackbar({content: "Error Resetting Current Password"});
        });
    }
}]);