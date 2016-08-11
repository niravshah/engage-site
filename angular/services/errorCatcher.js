angular.module('ErrorCatcher', [])
    .factory('errorHttpInterceptor', function ($exceptionHandler, $q) {
        return {
            responseError: function responseError(rejection) {
                $exceptionHandler({message: "HTTP Error.\nHTTP config: " + rejection.config
                    + "\nMethod: " + rejection.config.method
                    + "\nUrl: " + rejection.config.url
                    + "\nStatus: " + rejection.status
                    + "\nStatus Message: " + rejection.statusText, stack:rejection.config},null);
                return $q.reject(rejection);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    });