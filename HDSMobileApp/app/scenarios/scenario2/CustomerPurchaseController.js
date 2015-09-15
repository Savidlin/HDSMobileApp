"use strict";
var Data = require("../../modules/Data");
var CustomerPurchaseController = (function () {
    function CustomerPurchaseController() {
    }
    CustomerPurchaseController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupCustomerPurchaseDirective(ngApp);
    };
    CustomerPurchaseController.prototype.setupCustomerPurchaseDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("customerTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/scenario2/customer-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        //get all the territories and set them as an instance variable for the controller
                        this.customers = Data.getCustomers().slice(1000, 1050);
                        console.log(this.customers);
                        // console.log(this.customers);
                        // set an initial value to sort by
                        $scope.predicate = 'customerId';
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
                        $scope.showCustomerSales = function (customersales) {
                            //return sales order headres for specific customer
                            var customer = Data.getCustomersByCustomerId(customersales.customerId);
                            $scope.custSales = customer;
                            console.log($scope.custSales);
                        };
                    }],
                // add an alias for a controller
                controllerAs: "CustomerCtrl"
            };
        });
    };
    CustomerPurchaseController.prototype.deregister = function (appTools, view) {
    };
    return CustomerPurchaseController;
})();
module.exports = CustomerPurchaseController;
