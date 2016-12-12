'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.routes'
  , 'ngAnimate'
  , 'myApp.homeFalcone'
  , 'myApp.findFalcone'
  , 'myApp.resultFalcone'
  , 'filters'
  ])
/*Define a factory to load findFalconeResponse*/
.factory("findFalconeResponse", function () {
        return {};
    });