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
        ngApp.directive("productTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/scenario5/product-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        this.products = Data.getProducts();
                        //var fullProducts = ProductLookupController.joinProductData(this.products);
                        // set an initial value to sort by
                        $scope.predicate = 'productId';
                        // set an initial reverse value
                        // false is ascending true is decending
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
                        $scope.showProduct = function (product) {
                            console.log(product);
                            //var fullProduct = ProductLookupController.findProduct(fullProducts, product);
                            //console.log(fullProduct);
                            $scope.prodName = product.name;
                            $scope.product = product;
                        };
                    }],
                // add an alias for a controller
                controllerAs: "ProdCtrl"
            };
        });
    };
    //public static joinProductData(product: Models.Product[]): any {
    //    var orderHeader = Data.getSalesOrderHeaders();
    //    var orderDetail = Data.getSalesOrderDetails();
    //    var salesFull = [];
    //    var temp = {};
    //    console.log("start product join");
    //    for (var i = 0; i < orderHeader.length; i++) {
    //        jQuery.extend(temp, orderHeader[i]);
    //        jQuery.extend(temp, Data.getSalesOrderDetailById(orderHeader[i].salesOrderId));
    //        jQuery.extend(temp, Data.getProductById(orderDetail[i].productId));
    //        salesFull.push(temp);
    //    }
    //    return salesFull;
    //}
    //public static findProduct(fullProducts, product): any {
    //    console.log(fullProducts[0].productId);
    //    console.log(product.productId);
    //    for (var i = 0; i < fullProducts.length; i++) {
    //        if (product.productId == fullProducts[i].productId) {
    //            return fullProducts[i];
    //        }
    //    }
    //    return null;
    //}
    ProductLookupController.prototype.deregister = function (appTools, view) {
    };
    return ProductLookupController;
})();
module.exports = ProductLookupController;
