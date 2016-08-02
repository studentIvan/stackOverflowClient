'use strict';

import route from './question.route';
import './question.scss';

const questionPageModule = angular.module('question-module', [
  'ui.router'
]);

questionPageModule
    .config(route);

export default questionPageModule;
