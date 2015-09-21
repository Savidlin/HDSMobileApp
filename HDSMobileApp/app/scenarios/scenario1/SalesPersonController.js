"use strict";
var SalesPersonController = (function () {
    function SalesPersonController() {
    }
    SalesPersonController.prototype.initView = function (appTools, ngApp) {
        this.setupSalesPersonLookupDirective(ngApp);
    };
    SalesPersonController.prototype.setupSalesPersonLookupDirective = function (ngApp) {
        ngApp.directive('salesTable', function () {
            return {
                //TODO: ensure that the productTable directive is an element
                //TODO: define a template HTML file for this directive
                controller: ["$scope", "$http", function ($scope, $http) {
                        var salesPersons = [], peopleArray = [], salesHeader = [];
                        //TODO: assign the salesPersons variable by using a services call instead of a null value
                        salesPersons = null;
                        //TODO: assign this.salesPersonFull variable by joining sales person object with employee and person data
                        //Remeber that the join needs to have sales person data.
                        this.salesPersonFull = null;
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
                            //TODO: assign the salesHeaderPerson variable to the sales order headers based on the id of the sales person
                            var salesHeaderPerson = null;
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
    SalesPersonController.prototype.deregister = function (appTools, view) {
    };
    return SalesPersonController;
})();
module.exports = SalesPersonController;
