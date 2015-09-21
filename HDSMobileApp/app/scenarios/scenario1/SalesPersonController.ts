"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");
import ArrayUtil = require("../../utils/ArrayUtil");

class SalesPersonController implements WidgetView<any>{

    public initView(appTools: Main, ngApp: ng.IModule) {
        this.setupSalesPersonLookupDirective(ngApp);
    }

    public setupSalesPersonLookupDirective(ngApp: ng.IModule) {
        ngApp.directive('salesTable', function () {
            return {
                //TODO: ensure that the productTable directive is an element

                //TODO: define a template HTML file for this directive
                controller: ["$scope", "$http", function ($scope, $http) {
                    var salesPersons = [],
                        peopleArray = [],
                        salesHeader = [];

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
                    $scope.display = function (salesPerson: Models.SalesPerson) {

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
    }

    public deregister(appTools: Main, view: SalesPersonController) {

    }

}

export = SalesPersonController;