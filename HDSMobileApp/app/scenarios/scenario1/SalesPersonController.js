"use strict";
var Data = require("../../modules/Data");
var SalesPersonController = (function () {
    function SalesPersonController() {
    }
    SalesPersonController.prototype.initView = function (appTools, ngApp) {
        this.setupSalesPersonLookupDirective(ngApp);
    };
    SalesPersonController.prototype.setupSalesPersonLookupDirective = function (ngApp) {
        ngApp.directive('salesTable', function () {
            return {
                restrict: "E",
                templateUrl: "/app/scenarios/scenario1/salesperson-table.html",
                controller: ["$scope", "$http", function ($scope, $http) {
                        var salesPersons = [], peopleArray = [], salesHeader = [];
                        salesPersons = Data.getSalesPersons();
                        // Get Sales Person data joined with Employee and Person
                        this.salesPersonFull = SalesPersonController.joinSalesData(salesPersons);
                        // set an initial value to sort by
                        $scope.predicate = 'businessEntityId';
                        $scope.predicateModal = 'salesOrderNumber';
                        // set an initial reverse value
                        // false is ascending true is decending
                        // Made a decision to start by decending because the data looked nicer that way on the table
                        $scope.reverse = false;
                        $scope.reverseModal = false;
                        $scope.order = function (predicate) {
                            // if the same header is clicked on again reverse the sort boolean and set the current predicate
                            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
                            $scope.predicate = predicate;
                        };
                        // Order for the Modal
                        $scope.orderModal = function (predicate) {
                            // if the same header is clicked on again reverse the sort boolean and set the current predicate
                            $scope.reverseModal = ($scope.predicateModal === predicate) ? !$scope.reverseModal : true;
                            $scope.predicateModal = predicate;
                        };
                        // Clears Search term input
                        $scope.inputClear = function () {
                            $scope.searchTerm = "";
                            jQuery('.salesSearch').focus();
                        };
                        //this function is called when a user clicks on a table row
                        //the Person the user clicked on is passed in as Person
                        $scope.display = function (salesPerson) {
                            var salesHeaderPerson = Data.getSalesOrderHeaderBySalesPersonId(salesPerson.businessEntityId);
                            //set the scope variables 
                            $scope.person = salesPerson;
                            $scope.salesHeaders = salesHeaderPerson;
                        };
                        //commit
                    }],
                controllerAs: "salesPersonCtrl"
            };
        });
    };
    SalesPersonController.joinSalesData = function (salesPersons) {
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
    SalesPersonController.prototype.deregister = function (appTools, view) {
    };
    return SalesPersonController;
})();
module.exports = SalesPersonController;
