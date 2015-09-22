"use strict";
var VacationController = (function () {
    function VacationController() {
    }
    VacationController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupProductLookupDirective(ngApp);
    };
    VacationController.prototype.setupProductLookupDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("vacationTable", function () {
            return {
                //TODO: ensure that the productTable directive is an element
                //TODO: define a template HTML file for this directive
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        //TODO: assign the this.employees variable by using a services call instead of a null value
                        this.employees = null;
                        $scope.vacationChange = false;
                        // set an initial value to sort by
                        $scope.predicate = 'businessEntityId';
                        // set an initial reverse value
                        // false is ascending true is decending
                        // Made a decision to start by decending because the data looked nicer that way on the table
                        $scope.reverse = true;
                        $scope.order = function (predicate) {
                            // if the same header is clicked on again reverse the sort boolean and set the current predicate
                            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                            $scope.predicate = predicate;
                        };
                        //reset the searchTerm and refocus to the search box
                        $scope.inputClear = function () {
                            $scope.searchTerm = "";
                            jQuery('.salesSearch').focus();
                        };
                        //this function is called when a user clicks on a table row
                        //the product the user clicked on is passed in as product
                        $scope.showEmployee = function (emp) {
                            //TODO assign the $scope.semployee variable to the employee clicked on by the user
                            //Remeber what was passed to this function from the html
                            $scope.employee = null;
                        };
                        $scope.submit = function (emp, vacHoursTaken) {
                            // set employee's vacation hours to what they were minus what the user inputed
                            emp.vacationHours -= vacHoursTaken;
                            // reset model value so when user clicks another employee they can see a fresh box
                            $scope.vacHoursTaken = "";
                            $scope.vacationChange = true;
                        };
                        $scope.cancel = function () {
                            $scope.vacationChange = false;
                        };
                        $scope.dismissAlert = function () {
                            $scope.vacationChange = false;
                        };
                    }],
                // add an alias for a controller
                controllerAs: "VacCtrl"
            };
        });
    };
    VacationController.prototype.deregister = function (appTools, view) {
    };
    return VacationController;
})();
module.exports = VacationController;
