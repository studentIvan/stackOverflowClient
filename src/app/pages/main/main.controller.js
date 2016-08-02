'use strict';

class MainController {

  constructor($state, $rootScope) {
    'ngInject';

    this.$state = $state;
    this.$rootScope = $rootScope;
  }

  /**
   * Start searching with query text
   */
  doSearch() {
    const { query, $rootScope, $state } = this;
    $rootScope.loadingProcess = true;
    $state.go('search-results', { query });
  };

}

export default MainController;
