angular.module('myApp.routes',['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/homeFalcone', {
        templateUrl: 'homeFalcone/homeFalcone.html',
        controller: 'HomeFalconeCtrl'
    }).when('/findFalcone', {
        templateUrl: 'findFalcone/findFalcone.html',
        controller: 'FindFalconeCtrl'
    }).when('/resultFalcone', {
        templateUrl: 'resultFalcone/resultFalcone.html',
        controller: 'ResultFalconeCtrl'
    }).otherwise({
        redirectTo: '/homeFalcone'
    });
}])