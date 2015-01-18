/* global printStackTrace */

'use strict';

angular.module('m11n-website').factory('StacktraceSvc', function () {
    // Service logic
    // ...

    // Public API here
    return {
        print: printStackTrace
    };
});
