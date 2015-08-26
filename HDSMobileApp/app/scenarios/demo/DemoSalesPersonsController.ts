"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class SalesPeopleController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupSalesTableDirective(ngApp);
    }


    public setupSalesTableDirective(ngApp: ng.IModule) {

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
                        var salesPeople = data.Items

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

                    function joinSalesData(salesPeople: Models.SalesPerson[], employee: Models.Employee[], person: Models.Person[]) {

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
    }

    public deregister(appTools: Main, view: SalesPeopleController) {

    }

}

export = SalesPeopleController;