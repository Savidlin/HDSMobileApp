"use strict";
var Data = require("../../modules/Data");
var ProductLookupController = (function () {
    function ProductLookupController() {
    }
    ProductLookupController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupProductLookupDirective(ngApp);
    };
    ProductLookupController.prototype.setupProductLookupDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("territoryTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/scenario4/territory-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        //get all the territories and set them as an instance variable for the controller
                        this.territories = Data.getSalesTerritorys();
                        console.log(this.territories);
                        // set an initial value to sort by
                        $scope.predicate = 'territoryId';
                        // set an initial reverse value
                        // false is ascending true is decending
                        // Made a decision to start by decending because the data looked nicer that way on the table
                        $scope.reverse = false;
                        $scope.order = function (predicate) {
                            // if the same header is clicked on again reverse the sort boolean and set the current predicate
                            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
                            $scope.predicate = predicate;
                        };
                        //reset the searchTerm and refocus to the search box
                        $scope.inputClear = function () {
                            $scope.searchTerm = "";
                            jQuery('.salesSearch').focus();
                        };
                        //this function is called when a user clicks on a table row
                        //the product the user clicked on is passed in as product
                        $scope.showTerritory = function (territory) {
                            //var tempObj = {};
                            //jQuery.extend(tempObj, territory);
                            //jQuery.extend(tempObj, Data.getSalesPeopleByTerritoryId(territory.territoryId));
                            //jQuery.extend(tempObj, tempObj.businessEntityId);
                            var salesPeople = Data.getSalesPeopleByTerritoryId(territory.territoryId);
                            var employees = Data.getEmployees();
                            for (var i = 0; i < salesPeople.length; i++) {
                                for (var j = 0; j < employees.length; j++) {
                                    if (salesPeople[i].businessEntityId == employees[j].businessEntityId) {
                                        jQuery.extend(salesPeople[i], employees[j]);
                                    }
                                }
                            }
                            console.log(salesPeople);
                            $scope.terrSalesPeople = salesPeople;
                            $scope.territory = territory;
                        };
                    }],
                // add an alias for a controller
                controllerAs: "TerritoryCtrl"
            };
        });
    };
    ProductLookupController.prototype.deregister = function (appTools, view) {
    };
    return ProductLookupController;
})();
module.exports = ProductLookupController;
