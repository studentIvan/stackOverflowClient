'use strict';

import * as components from './index.components';
import config from './index.config';
import run from './index.run';


const App = angular.module(
  "stackOverflowClientApp", [
  
    // plugins
    require('angular-ui-router'),
  	"ngSanitize", 
    "oc.lazyLoad",
  	"duScroll",

    // core
    require("./core/core.module").name,

    // components
    require("./index.components").name,

    // routes
    require("./index.routes").name,

    // pages
    require("./pages/main/main.module").name,
    require("./pages/question/question.module").name

  ]
);

App
  .config(config)
  .run(run);



export default App;
