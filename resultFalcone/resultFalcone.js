'use strict';

var ResultFalconeCtrl = function ($location, findFalconeResponse) {
    var vm = this;
    vm.passedValue = findFalconeResponse.response;
    
    /*When this view is tried to load directly*/
    if(vm.passedValue==null || vm.passedValue==undefined){
        $location.path('/findFalcone');
    }


    console.log(vm.passedValue);
    /*When "Start Again" button is clicked in the view*/
    vm.startAgain = function () {
        $location.path('/findFalcone');
    }
}

/*Defining the view*/
angular.module('myApp.resultFalcone', ['ngAnimate'])

.controller('ResultFalconeCtrl', ResultFalconeCtrl);
ResultFalconeCtrl.$inject = ['$location', 'findFalconeResponse'];/*Injecting dependencies*/
