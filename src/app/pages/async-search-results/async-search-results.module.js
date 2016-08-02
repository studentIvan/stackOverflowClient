'use strict';

import './async-search-results.scss';

import asyncSearchResultsController from './async-search-results.controller.js';

const asyncSearchResultsModule = angular.module('async-search-results-module', []);

asyncSearchResultsModule.controller('searchResultsController', asyncSearchResultsController);

export default asyncSearchResultsModule;