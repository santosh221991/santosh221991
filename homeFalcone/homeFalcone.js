'use strict';

var HomeFalconeCtrl = function ($location) {
    var vm = this;
    
    /*On Click of "Start" button redirect to Game*/
    vm.start = function () {
        $location.path('/findFalcone');
    }
    
}

/*Defining the view*/
angular.module('myApp.homeFalcone', ['ngAnimate'])

.controller('HomeFalconeCtrl', HomeFalconeCtrl);
HomeFalconeCtrl.$inject = ['$location']; /*Injecting dependencies*/
