angular.module('ErrorReporter', [])
    .service('ErrorReporterService', ['$http',
        function ($http) {
            this.report = function (ex) {
                $http.post('/api/error', { exception: ex });
            }
        }]);