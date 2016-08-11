angular.module('ErrorReporter', [])
    .service('ErrorReporterService', ['$http',
        function ($http) {
            this.report = function (ex) {
                if (ex.reason.url) {
                    if (ex.reason.url != '/api/error') {
                        $http.post('/api/error', {exception: ex});
                    }
                } else {
                    $http.post('/api/error', {exception: ex});
                }
            }
        }]);

