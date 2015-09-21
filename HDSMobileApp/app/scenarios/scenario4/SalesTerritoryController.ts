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
                //TODO: ensure that the productTable directive is an element
                
                //TODO: define a template HTML file for this directive

                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                    
                    //TODO: assign the this.territories variable by using a services call instead of a null value
                    this.territories = null;

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

                        //TODO: assign the salesPeople variable to all the sales people that have a shared territory ID
                        //Remeber that a territory object has been based into this function that contains all territory attributes
                        //Remeber we only want to show sales people that are in the same territory that the user clicked on
                        //Remeber Data has methods for getting data and joining data
                        var salesPeople = null;

                        //TODO: assign the employeeSalesPeople variable to the joined data of salespeople and employee based on their shared territoryId
                        //Remeber Data has methods for getting data and joining data
                        var employeeSalesPeople = null;

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