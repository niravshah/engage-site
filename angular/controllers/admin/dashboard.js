app.controller('dashboardController', ['$scope', '$rootScope', '$state',  '$http', 'AuthService','DataService', function ($scope, $rootScope, $state, $http, aS, dS) {

    $scope.init = function(){
        var decodedToken = aS.getDecodedToken();
        console.log(decodedToken._doc._id);
    };

    $scope.init();
    
    $scope.newNgo = function () {
        dS.init();
        $state.transitionTo('new.profile');
    }
}]);