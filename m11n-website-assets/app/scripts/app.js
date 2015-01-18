/* global angular */

'use strict';

angular.module('m11n-website', [
    'ngCookies',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'hljs',
    'gist'
])
.config(function ($locationProvider, $stateProvider, $urlRouterProvider, hljsServiceProvider) {
    $locationProvider
        .html5Mode(false)
        .hashPrefix('!');

    $urlRouterProvider.when('', '/');

    $stateProvider
        .state('home', {
            abstract: false,
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'AppCtrl'
        });

    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
    });
})
.factory('$exceptionHandler', function ($log, $window, StacktraceSvc) {
    return function (exception, cause) {

        try {

            var errorMessage = exception.toString();
            var stackTrace = StacktraceSvc.print({ e: exception });

            // Log the JavaScript error to the server.
            // --
            // NOTE: In this demo, the POST URL doesn't
            // exists and will simply return a 404.
            $log.error(angular.toJson({
                    errorUrl: $window.location.href,
                    errorMessage: errorMessage,
                    stackTrace: stackTrace,
                    cause: ( cause || '' )
                })
            );

        } catch ( loggingError ) {

            // For Developers - log the log-failure.
            $log.warn( 'Error logging failed' );
            $log.log( loggingError );

        }
    };
});
