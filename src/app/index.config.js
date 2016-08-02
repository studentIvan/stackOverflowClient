'use strict';

function config($logProvider, $locationProvider) {
	'ngInject';

  // const isOldIE = /*@cc_on!@*/false;
  $logProvider.debugEnabled(true);
  // $locationProvider.html5Mode(!isOldIE);
  
}

export default config;
