var app = angular.module('adminApp', ['ui.router', 'angular-jwt', 'ngFileUpload', 'selectize', 'ui.bootstrap.datetimepicker', 'ui.validate',
    'ngMessages', 'angularSpinner', 'ngSanitize', 'angularTrix', 'ngImgCrop', 'ErrorCatcher', 'ErrorReporter', 'pascalprecht.translate']);

app.config(function  ($provide, $interpolateProvider, $stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, $translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/admin-',
        suffix: '.json'
    });

    $translateProvider.determinePreferredLanguage(function () {
        if(window.location.host.indexOf('ro') > 0){
            return 'ro';
        }
        return 'en';
    });

    $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.fallbackLanguage('en');

    $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
        return function (exception, cause) {
            var $rootScope = $injector.get("$rootScope");
            $rootScope.logException({message: exception.message, reason: exception.stack});
            $delegate(exception, cause);
        };
    });

    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

    jwtInterceptorProvider.tokenGetter = function () {
        return localStorage.getItem('id_token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/angular/partials/admin/login.html',
            controller: 'loginController',
            authenticate: false
        })
        .state('reset', {
            url: '/reset',
            templateUrl: '/angular/partials/admin/reset.html',
            controller: 'resetController',
            authenticate: false
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/angular/partials/admin/dashboard.html',
            controller: 'dashboardController',
            authenticate: true
        })
        .state('new', {
            url: '/new',
            templateUrl: '/angular/partials/admin/new/main.html',
            abstract: true,
            authenticate: true
        })
        .state('new.profile', {
            url: '/profile',
            templateUrl: '/angular/partials/admin/new/profile/main.html',
            controller: 'profileController',
            authenticate: true,
            redirectTo: 'new.profile.basic'
        })
        .state('new.profile.basic', {
            url: '/basic',
            templateUrl: '/angular/partials/admin/new/profile/basic.html',
            authenticate: true
        })
        .state('new.profile.additional', {
            url: '/additional',
            templateUrl: '/angular/partials/admin/new/profile/additional.html',
            authenticate: true
        })
        .state('new.profile.logo', {
            url: '/logo',
            templateUrl: '/angular/partials/admin/new/profile/logo.html',
            authenticate: true
        })
        .state('new.team', {
            url: '/team',
            templateUrl: '/angular/partials/admin/new/team.html',
            controller: 'teamController',
            authenticate: true
        })
        .state('new.projects', {
            url: '/projects',
            templateUrl: '/angular/partials/admin/new/projects/main.html',
            controller: 'projectsController',
            authenticate: true,
            redirectTo: 'new.project.info'
        })
        .state('new.projects.info', {
            url: '/info',
            templateUrl: '/angular/partials/admin/new/projects/info.html',
            authenticate: true
        })
        .state('new.projects.skills', {
            url: '/team-skills',
            templateUrl: '/angular/partials/admin/new/projects/teamskills.html',
            authenticate: true
        })
        .state('project',{})

});

app.value('selectizeConfig', {
    plugins: ['remove_button'],
    create: false,
    delimiter: ','
});

app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!AuthService.validToken() && toState.authenticate) {
            $state.transitionTo('login');
            event.preventDefault();
        }
        if (toState.redirectTo) {
            event.preventDefault();
            $state.go(toState.redirectTo, toParams, {location: 'replace'})
        }
    });

}]);

app.controller('adminAppController', ['$scope', '$rootScope', '$state', '$http', 'Upload', 'ErrorReporterService', function ($scope, $rootScope, $state, $http, Upload, ErrorReporterService) {
    
    angular.element(document).ready(function () {
        $.material.init();
        $.material.ripples();
    });
    $scope.upload = function (file, addMore, url, cb) {
        Upload.upload({
            url: url,
            data: {file: file, addData: addMore},
            arrayKey: '[k]',
            objectKey: '[k]'
        }).then(function (resp) {
            cb(resp, null);
        }, function (resp) {
            cb(null, resp);
        });
    };
    $rootScope.logException = function (exp) {
        ErrorReporterService.report(exp);
    };
}]);