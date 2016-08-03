app.controller('dashboardController', ['$scope', '$rootScope', '$state',  '$http', 'AuthService','DataService', function ($scope, $rootScope, $state, $http, aS, dS) {

    $scope.init = function(){
        console.log(aS.getDecodedToken());
    };

    $scope.init();
    
    $scope.newNgo = function () {
        dS.init();
        $state.transitionTo('new.profile');
    }
    
    
}]);