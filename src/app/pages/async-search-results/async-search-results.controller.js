'use strict';

class SearchResultsController {

  constructor(API_URL, $log, $state, $document, $http, $stateParams, $rootScope, $timeout) {
    'ngInject';

    this.apiQueryURL = `${API_URL}/search/advanced?order=desc&sort=activity&site=stackoverflow`;
    this.query = $stateParams.query;
    this.$rootScope = $rootScope;
    this.$document = $document;
    this.$state = $state;
    this.$http = $http;
    this.$log = $log;
    this.items = [];

    this.sortType = '';
    this.sortReverse = false;
    this.searchError = false;
    this.subSortType = '';
    this.subSortReverse = false;
    this.subSearchError = false;
    this.selectedRow = null;

    this.tableHeaders = [
        { name: 'owner.display_name', title: 'Автор вопроса' },
        { name: 'title', title: 'Тема' },
        { name: 'answer_count', title: 'Количество ответов' },
        { name: 'tags', title: 'Теги' }
    ];

    this.search();
  }

  /**
   * Activate search process using this.query
   */
  search() {
    const { $rootScope, $log, $http } = this;
    let searchProcess = $http.get(`${this.apiQueryURL}&title=${this.query}`, { cache: true });

    $rootScope.loadingProcess = true;

    searchProcess.then((response) => {
        $log.debug('Quota remaining:', response.data.quota_remaining);
        this.items = response.data.items;
        $rootScope.loadingProcess = false;
        this.searchError = (!response.data.quota_remaining || !this.items.length);
    }, () => {
        this.searchError = true;
        $rootScope.loadingProcess = false;
    });
  }

  /** 
    * Keyboard helper function
    * @param {number} questionId
   */
  goQuestion(questionId) {
    const { $state } = this;
    $state.go('question', { id: questionId });
  }

  /**
   * Select from the table of results into rapid display panel
   * @param {object} item
   * @param {'owner'|'tag'} key
   * @param {string} value value for tag or nickname
   */
  selectRow(item, key, value) {
    const { $document, $log, $http, $rootScope } = this;

    let queryParam = (key =='owner') ? `user=${item.owner.user_id}` : `tagged=${value}`;
    let searchProcess = $http.get(`${this.apiQueryURL}&${queryParam}`, { cache: true });

    this.subSearchError = false;
    this.selectedRow = null;
    $rootScope.loadingProcess = true;

    searchProcess.then((response) => {
        $log.debug('Quota remaining:', response.data.quota_remaining);
        this.selectedRow = { 
            owner: key == 'owner' ? value : false, 
            tag: key == 'tag' ? value : false, 
            items: response.data.items 
        };
        this.subSortType = key == 'tag' ? 'answer_count' : '';
        this.subSortReverse = key == 'tag';
        this.subSearchError = (!response.data.quota_remaining || !this.selectedRow.items.length);
        $rootScope.loadingProcess = false;
        $document.scrollTopAnimated(0);
    }, () => {
        this.subSearchError = true;
        $rootScope.loadingProcess = false;
    });
  }

  /**
   * Sort the table or sub table by specified key (field)
   * @param {string} key
   * @param {boolean} subTable
   */
  tableSort(key, subTable=false) {
    if (subTable) {
        this.subSortType = key;
        this.subSortReverse = !this.subSortReverse;
    } else {
        this.sortType = key;
        this.sortReverse = !this.sortReverse;
    }
  }

}

export default SearchResultsController;
