'use strict';

import questionTpl from './question.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('question', {
      url: '/question/:id',
      templateUrl: questionTpl,
      controller: require('./question.controller'),
      controllerAs: 'question'
    });

}

export default routeConfig;
