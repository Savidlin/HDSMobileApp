"use strict";
var ProductLookupController = (function () {
    function ProductLookupController() {
    }
    ProductLookupController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupProductLookupDirective(ngApp);
    };
    ProductLookupController.prototype.setupProductLookupDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("productTable", function () {
            return {
                //TODO: ensure that the productTable directive is an element
                //TODO: define a template HTML file for this directive
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        //TODO: assign the this.products variable by using a services call instead of a null value
                        this.products = null;
                        // set an initial value to sort by
                        $scope.predicate = 'productId';
                        // set an initial reverse value
                        // false is ascending true is decending
                        // Made a decision to start by decending because the data looked nicer that way on the table
                        $scope.reverse = true;
                        $scope.order = function (predicate) {
                            // if the same header is clicked on again reverse the sort boolean and set the current predicate
                            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                            $scope.predicate = predicate;
                        };
                        //test commit
                        //reset the searchTerm and refocus to the search box
                        $scope.inputClear = function () {
                            $scope.searchTerm = "";
                            jQuery('.salesSearch').focus();
                        };
                        //this function is called when a user clicks on a table row
                        //the product the user clicked on is passed in as product
                        $scope.showProduct = function (product) {
                            //set the scope variables 
                            $scope.product = product;
                        };
                    }],
                // add an alias for a controller
                controllerAs: "ProdCtrl"
            };
        });
    };
    ProductLookupController.prototype.deregister = function (appTools, view) {
    };
    return ProductLookupController;
})();
module.exports = ProductLookupController;
