app.controller('dashboardController', ['$scope', '$rootScope', '$state',  '$http', 'AuthService', function ($scope, $rootScope, $state, $http, aS) {

    $scope.init = function(){
        var decodedToken = aS.getDecodedToken();
        console.log(decodedToken._doc._id);
    };

    $scope.init();
    
    $scope.newNgo = function () {
        $state.transitionTo('new.profile');
    }
}]);