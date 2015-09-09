"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class SalesTerritoryController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupProductLookupDirective(ngApp);
    }


    public setupProductLookupDirective(ngApp: ng.IModule) {

        // define a directive
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
                    //the product the user clicked on is passed in as territory
                    $scope.showTerritory = function (territory) {

                        //getSalesPeopleByTerritoryId is a custom function in Data by James that returns an array of sales people
                        //that match a given territory ID
                        var salesPeople = Data.getSalesPeopleByTerritoryId(territory.territoryId);

                        //joinEmployeeSalesPeople is a custom function by james in Data that will  join salespeople and employees based on territory ID
                        var employeeSalesPeople = Data.joinEmployeeSalesPeople(territory.territoryId);

                        //set scope variables
                        $scope.terrSalesPeople = employeeSalesPeople;
                        $scope.territory = territory;
                    };
                }],
                // add an alias for a controller
                controllerAs: "TerritoryCtrl"
            };
        });
    }

    public deregister(appTools: Main, view: SalesTerritoryController) {

    }

}

export = SalesTerritoryController;