"use strict";
var Services = require("../../services/Services");
var Data = require("../../modules/Data");
var SalesPeopleController = (function () {
    function SalesPeopleController() {
    }
    SalesPeopleController.prototype.initView = function (appTools, ngApp) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupSalesTableDirective(ngApp);
    };
    SalesPeopleController.prototype.setupSalesTableDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("salesTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/pages/sales-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                        var sales = this;
                        // TODO debugging
                        console.log("starting controller DemoSalesPersonsController, Data=", Data.getCustomers());
                        Services.SalesPerson.search($http, {}, {}).done(function (data) {
                            var employee;
                            var person;
                            //data.Items is the actually array of objects that we want not the full return object
                            var salesPeople = data.Items;
                            Services.Employee.search($http, {}, {}).done(function (data) {
                                //data.Items is the actually array of objects that we want not the full return object
                                employee = data.Items;
                            });
                            Services.Person.search($http, {}, {}).done(function (data) {
                                //data.Items is the actually array of objects that we want not the full return object
                                person = data.Items;
                                sales.salesPeopleFull = joinSalesData(salesPeople, employee, person);
                                console.log("sales people full:", sales.salesPeopleFull);
                            });
                        });
                        function joinSalesData(salesPeople, employee, person) {
                            // loop through all sales people
                            for (var i = 0; i < salesPeople.length; i++) {
                                // loop through all employees to find a record that matches for the current sales person in loop
                                for (var j = 0; j < employee.length; j++) {
                                    if (salesPeople[i].businessEntityId == employee[j].businessEntityId) {
                                        // take every attribute of employee and add it to salesPeople
                                        jQuery.extend(salesPeople[i], employee[j]);
                                    }
                                }
                                // loop through all person records for a matching sales person
                                for (var k = 0; k < person.length; k++) {
                                    if (salesPeople[i].businessEntityId == person[k].businessEntityId) {
                                        // take every attribute of employee and add it to salesPeople
                                        jQuery.extend(salesPeople[i], person[k]);
                                    }
                                }
                            }
                            return salesPeople;
                        }
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
                    }],
                // add an alias for a controller
                controllerAs: "SalesCtrl"
            };
        });
    };
    SalesPeopleController.prototype.deregister = function (appTools, view) {
    };
    return SalesPeopleController;
})();
module.exports = SalesPeopleController;
