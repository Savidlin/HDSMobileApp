"use strict";
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
                //TODO: ensure that the productTable directive is an element
                //TODO: define a template HTML file for this directive
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        //TODO: assign the this.customers variable by using a services call instead of a null value
                        //then append the following to it (don't worry about what it does) ".slice(1000,1050)"
                        this.customers = null;
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
                            //TODO: assign the customer varaible to all the sales order headers by customerId instead of null
                            //Rember to pass the right id into the service data call
                            //Remeber that a customer object has been pased into this function that contains all customer attributes
                            var customer = null;
                            $scope.custSales = customer;
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
