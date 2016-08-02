'use strict';

import swagPreloaderDirective from './swag-preloader.directive';
import './swag-preloader.scss';

const swagPreloaderModule = angular.module('swag-preloader-module', []);

swagPreloaderModule
  .directive('swagPreloader', swagPreloaderDirective);

export default swagPreloaderModule;