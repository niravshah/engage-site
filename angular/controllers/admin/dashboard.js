app.controller('dashboardController', ['$scope', '$rootScope', '$state',  '$http', 'AuthService', function ($scope, $rootScope, $state, $http, AuthService) {

    $scope.init = function(){
        console.log(AuthService.getDecodedToken());
    };

    $scope.init();
}]);