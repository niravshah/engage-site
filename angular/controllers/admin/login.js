app.controller('loginController', ['$scope', '$rootScope', '$state', 'AuthService', function ($scope, $rootScope, $state, AuthService) {
    $scope.login = function () {
        AuthService.login($scope.data.uname, $scope.data.pword, $rootScope.sname).then(function (res) {
            if (res.data.success == true) {
                AuthService.saveToken(res.data.token);
                if (res.data.resetPassword == true) {
                    $state.transitionTo('reset');
                } else {
                    $state.transitionTo('dashboard');
                }

            } else {
                $.snackbar({content: res.data.message});
            }

        }, function (err) {
            console.log(err);
            $.snackbar({content: "Login Error"});
        });
    }
}]);