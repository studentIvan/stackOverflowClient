'use strict';

function routeConfig($urlRouterProvider, $stateProvider, resolverProvider) {
  'ngInject';


    $stateProvider
        .state('search-results', {
          url: '/search/:query',
          templateUrl: require('!!file-loader?name=templates/[name].[ext]!./pages/async-search-results/async-search-results.html'),
          controller: 'searchResultsController',
          controllerAs: 'results',
          resolve: {
            asyncPreloading: resolverProvider.asyncPagePrealoading
          }
        });


  $urlRouterProvider.otherwise('/');

}

export default angular
  .module('index.routes', [])
    .config(routeConfig);

