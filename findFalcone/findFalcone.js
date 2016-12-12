'use strict';

var FindFalconeCtrl = function ($filter, $http, $location, findFalconeResponse) {
    var vm = this;

    /*Access Token*/
    vm.accessToken = '';
    /*Planets Variables*/
    vm.planets = '';
    vm.planetsSelected = [];
    /*Vehicles Variables*/
    vm.vehicles = '';
    vm.selectedVehicles = {};
    vm.timeTaken = 0;
   
    /*Variables to store Response on find Falcone*/
    vm.queen = '';

    /*Flag Variables for "Loading" and Disabling "Find Falcone" Button*/
    vm.findButtonFlag = 0;
    vm.loadingFlag = 0;

    /*Init function is called on load of the Controller*/
    vm.init = function () {
        vm.getAccessToken();
        vm.getPlanets();
        vm.getVehicles();

    }

    /*Range function for using in ng-repeat to repeat 4 times*/
    vm.range = function () {
        return [1, 2, 3, 4];
    }

    /*Resets the Entire Find Falcone Data instead of reloading the view to reset data*/
    vm.resetFunction = function () {
        // $location.path('/');
        vm.planetsList = null;  //Resets Planets List
        vm.vehiclesList = {};   //Resets Vehicles List
        vm.timeTaken = 0;       //Resets Total Time Taken
        vm.findButtonFlag = 0;  //Resets findButtonFlag used for Disabling the button
        
        vm.getVehicles();       //Resets Vehicles and their count
        vm.selectedVehicles = {};   //Resets Selected Vehicles List
        vm.previousSelection = vm.selectedVehicles;     //Resets Previous Selction List
        vm.planetsSelected = [];    //Resets Planets Selected
        vm.queen = undefined;       //Resets the final Response as well if ever updated

        /*Reset All Planet Images*/
        for (var i in vm.range()) {
            var resetIndex = parseInt(i) + 1;
            $("#planetImage" + resetIndex).attr("src", "assets/images/" + "questionmark.svg");
        }
        /*Reset All Vehicle Images*/
        for (var i in vm.range()) {
            var resetIndex = parseInt(i) + 1;
            $("#vehicleImage2" + resetIndex).attr("src", "assets/images/" + "questionmark.svg");
        }
    }

    /*When a planet selction is changed from dropdown*/
    vm.planetChange = function (index, planetIndex, currentPlanet) {
        
        vm.planetsSelected[planetIndex] = currentPlanet.name;
        $("#planetImage" + planetIndex).attr("src", "assets/images/" + currentPlanet.name + ".PNG"); //Set Planet Image
        $("#vehicleImage2" + planetIndex).attr("src", "assets/images/" + "questionmark.svg");        //Reset Vehicle Image

        /*When Change in planet Reset Vehicle selected, time taken, vehicle count and findButtonFlag*/
        if (vm.selectedVehicles[index + 1] !== undefined) {
            console.log(vm.vehicles[vm.selectedVehicles[index + 1].selectedIndex].total_no);
            if (vm.vehicles[vm.selectedVehicles[index + 1].selectedIndex].total_no <= vm.selectedVehicles[index + 1].max_value) {
                vm.vehicles[vm.selectedVehicles[index + 1].selectedIndex].total_no++;

            }
            vm.selectedVehicles[index + 1].timeTaken = 0;
            vm.vehiclesList[index + 1] = false;
            delete vm.selectedVehicles[index + 1];
            vm.findButtonFlag--;

        }
        /*Compute the Latest Time taken after update*/
        vm.timeTaken = 0;
        for (var i in vm.selectedVehicles) {
            vm.timeTaken += vm.selectedVehicles[i].timeTaken;
        }
    }

    /*When a vehicle selction is changed in radio buttons*/
    vm.vehicleChange = function (value, index, vehicleIndex) {
        
        $("#vehicleImage2" + vehicleIndex).attr("src", "assets/images/" + $filter('replaceSpace')(value.name) + ".PNG") //Update vehicle image.

        /*If selected vehicle list for the respective index is not defined then set it*/
        if (vm.selectedVehicles[vehicleIndex] == undefined) {
            vm.selectedVehicles[vehicleIndex] = {
                "selectedIndex": index,
                "timeTaken": vm.planetsList[vehicleIndex].distance / value.speed,
                "max_value": value.total_no
            };
            vm.vehicles[index].total_no -= 1;

            vm.findButtonFlag++;
            console.log(vm.findButtonFlag);

        } else {/*If its already available recompute the values and update*/
            vm.vehicles[vm.selectedVehicles[vehicleIndex].selectedIndex].total_no += 1;
            vm.timeTaken -= vm.planetsList[vehicleIndex].distance / vm.vehicles[vm.selectedVehicles[vehicleIndex].selectedIndex].speed;
            vm.vehicles[index].total_no -= 1;

            vm.selectedVehicles[vehicleIndex].selectedIndex = index;
            vm.selectedVehicles[vehicleIndex].timeTaken = vm.planetsList[vehicleIndex].distance / value.speed;


        }
        
        vm.previousSelection = vm.selectedVehicles;
        /*Recompute Time after change in space vehicle.*/
        vm.timeTaken = 0;
        for (var i in vm.selectedVehicles) {
            vm.timeTaken += vm.selectedVehicles[i].timeTaken;
        }
    }
    
    /*Get the Access token which would be use for other api requests*/
    vm.getAccessToken = function () {
        console.log('init');
        $http({
            method: 'POST',
            url: "https://ﬁndfalcone.herokuapp.com/token",
            headers: {
                "Accept": "application/json"
            }
        }).success(function (data, config, status, headers) {
            // console.log(config);
            console.log(data);
            // console.log(status);
            // console.log(headers);
            vm.accessToken = data.token;
            vm.loadingFlag++;
        })

    }
    
    /*Get the list of Planets where Al Falcone may be hiding*/
    vm.getPlanets = function () {
        $http({
            method: 'GET',
            url: "https://ﬁndfalcone.herokuapp.com/planets"
        }).success(function (data, config, status, headers) {
            // console.log(config);
            console.log(data);
            // console.log(status);
            // console.log(headers);
            vm.planets = data;
            vm.loadingFlag++;
        })
    }
 
    /*Get the list of Vehicle List with King Shan*/
    vm.getVehicles = function () {
        $http({
            method: 'GET',
            url: "https://ﬁndfalcone.herokuapp.com/vehicles "
        }).success(function (data, config, status, headers) {
            console.log('config....')
            // console.log(config);
            console.log(data);
            // console.log(status);
            // console.log(headers);
            vm.vehicles = data;
            vm.loadingFlag++;
        })
    }

    /*Find Queen Based on the Planets and vehicles generated*/
    vm.findQueen = function () {
        $http({
            method: 'POST',
            url: "https://findfalcone.herokuapp.com/find",
            data: {
                "token": vm.accessToken,
                "planet_names": [
                                vm.planetsList[1].name,
                                vm.planetsList[2].name,
                                vm.planetsList[3].name,
                                vm.planetsList[4].name
                                ],
                "vehicle_names": [
                                vm.vehiclesList[1].name,
                                vm.vehiclesList[2].name,
                                vm.vehiclesList[3].name,
                                vm.vehiclesList[4].name
                                ]
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).success(function (data, config, status, headers) {
            console.log('config....')
            // console.log(config);
            console.log(data);
            // console.log(status);
            // console.log(headers);
            vm.queen = data;
            findFalconeResponse.response = vm.queen;
            findFalconeResponse.response.timeTaken = vm.timeTaken;
            $location.path('/resultFalcone');
        })
    }
}

/*Defining the view*/
angular.module('myApp.findFalcone', ['ngAnimate'])

.controller('FindFalconeCtrl', FindFalconeCtrl);
FindFalconeCtrl.$inject = ['$filter', '$http', '$location', 'findFalconeResponse']; /*Injecting dependencies*/
