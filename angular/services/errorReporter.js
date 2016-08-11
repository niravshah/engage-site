angular.module('ErrorCatcher', [])
    .factory('errorHttpInterceptor', function ($exceptionHandler, $q) {
        return {
            responseError: function responseError(rejection) {
                $exceptionHandler(rejection, "HTTP Error.\nHTTP config: " + rejection.config
                    + "\nMethod: " + rejection.config.method
                    + "\nUrl: " + rejection.config.url
                    + "\nStatus: " + rejection.status
                    + "\nStatus Message: " + rejection.statusText);
                return $q.reject(rejection);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    });