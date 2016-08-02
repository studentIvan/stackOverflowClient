'use strict';

export default function (app) {
    app.provider('resolver', resolverProvider);

    function resolverProvider () {
        this.asyncPagePrealoading = asyncPagePrealoading;
        this.$get = function() { return this; };
    }

    
        function asyncPagePrealoading ($q, $ocLazyLoad) {
            "ngInject";

            var deferred = $q.defer();
            require.ensure([], function (require) {
                var asyncSearchResultsModule = require('../../pages/async-search-results/async-search-results.module');
                $ocLazyLoad.load({
                    name: asyncSearchResultsModule.name,
                });
                deferred.resolve(asyncSearchResultsModule.controller);
            });
            return deferred.promise;
        }
    

}
