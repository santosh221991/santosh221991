angular.module('filters', [])
.filter('disablePlanet', function () {
    return function (inputPlanet, planetsSelected, planetIndex) {
        if (planetsSelected[planetIndex] == inputPlanet) {
            return false;
        } else {
            return planetsSelected.indexOf(inputPlanet) > -1;
        }
    }
})
.filter('replaceSpace', function () {
    return function (input) {
        return input.replace(" ", "_");
    }
})