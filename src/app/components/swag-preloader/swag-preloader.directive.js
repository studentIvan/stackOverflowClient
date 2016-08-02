'use strict';

import swagPreloaderTpl from './swag-preloader.html';

function swagPreloaderComponent($log) {
    'ngInject';

  return {
    restrict: 'E',
    templateUrl: swagPreloaderTpl,
    controller: swagPreloaderController,
    controllerAs: 'vm',
    scope: {
      loadingProcess: '='
    }
  };

  function swagPreloaderController () {}

}

export default swagPreloaderComponent;
