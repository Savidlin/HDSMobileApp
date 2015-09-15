"use strict";
var Data = require("../../modules/Data");
var DemoSalesPersonsController = (function () {
    function DemoSalesPersonsController() {
    }
    DemoSalesPersonsController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupSalesTableDirective(ngApp);
    };
    DemoSalesPersonsController.prototype.setupSalesTableDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("salesTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/demo/sales-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        var sales = this;
                        // TODO debugging
                        console.log("starting controller DemoSalesPersonsController, Data=", Data.getCustomers());
                        var salesPersons = Data.getSalesPersons();
                        sales.salesPeopleFull = DemoSalesPersonsController.joinSalesData(salesPersons);
                        console.log("sales people full:", sales.salesPeopleFull);
                        // set an initial value to sort by
                        $scope.predicate = 'businessEntityId';
                        // set an initial reverse value
                        // false is ascending true is decending
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
                    }],
                // add an alias for a controller
                controllerAs: "SalesCtrl"
            };
        });
    };
    DemoSalesPersonsController.joinSalesData = function (salesPersons) {
        // loop through all sales people
        for (var i = 0; i < salesPersons.length; i++) {
            // loop through all employees to find a record that matches for the current sales person in loop
            var employee = Data.getEmployeeById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], employee);
            // loop through all person records for a matching sales person
            var person = Data.getPersonById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], person);
        }
        return salesPersons;
    };
    DemoSalesPersonsController.prototype.deregister = function (appTools, view) {
    };
    return DemoSalesPersonsController;
})();
module.exports = DemoSalesPersonsController;
