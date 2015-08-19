"use strict";
var Services = require("../services/Services");
var TestCompanyController = (function () {
    function TestCompanyController() {
    }
    TestCompanyController.prototype.initView = function (appTools, ngApp) {
        this.setupCompanyController(ngApp);
        this.setupProductsDirective(ngApp);
    };
    TestCompanyController.prototype.setupCompanyController = function (ngApp) {
        ngApp.controller('CompanyController', ["$scope", "$http", function ($scope, $http) {
                //make this a variable so we can use it in methods
                var company = this;
                //set-up http get request to json data and assign it to information
                //upon sucess of getting json file data (the json file) is passed into a fucntion that assigns it to
                //company.information
                $http.get('app/rsc/company-information.json').success(function (data) {
                    company.information = data;
                });
                // wall of slackers
                Services.Employee.search($http, {}, {}).done(function (data) {
                    //after data is recieved create our new slackers array of objects
                    var employees = createSlackersList(data.Items);
                    //sort the slackers notice we are using a custom sort prototype
                    employees = employees.sort(TestCompanyController.sortVacationHours);
                    company.slackers = employees;
                    // TODO debugging
                    console.log("done creating slacker list: ", company.slackers);
                });
                function createSlackersList(employees) {
                    var res = [];
                    //loop through employees array of objects
                    for (var i = 0; i < employees.length; i++) {
                        var emplyI = employees[i];
                        //create a temp objecct for addding into slackers array
                        var tempObj = {
                            name: emplyI.loginId.substr(16),
                            vacationHours: emplyI.vacationHours,
                            jobTitle: emplyI.jobTitle,
                            usedHours: emplyI.vacationHours,
                        };
                        res.push(tempObj);
                    }
                    return res;
                }
            }]);
    };
    TestCompanyController.prototype.setupProductsDirective = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("products", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "app/pages/products.html",
                //add in a controller
                controller: ["$http", function ($http) {
                        var company = this;
                        $http.get('app/rsc/company-products.json').success(function (data) {
                            company.products = data;
                        });
                    }],
                // add an alias for a controller
                controllerAs: "productsCtrl"
            };
        });
    };
    TestCompanyController.prototype.deregister = function (appTools, view) {
    };
    TestCompanyController.sortVacationHours = function (a, b) {
        // our custom sort prototype sorts usedHours property of a slacker from most to least
        return b.vacationHours - a.vacationHours;
    };
    return TestCompanyController;
})();
module.exports = TestCompanyController;
