"use strict";

class TestCompanyNgCtrl {

    
    public static initView(appTools: Main) {

        // data in the case of method 1 where there is no json call
        // var data = {
        //   name: "test Company",
        //   slogan: "testing placeholder slogan"
        // };

        var app = angular.module('myCompany', []);

        // 1st method not involving a json call
        // app.controller('CompanyController', function() {
        //   this.information = data;
        // });

        app.controller('CompanyController', ["$http", function ($http) {
            //make this a variable so we can use it in methods
            var company = this;

            //set-up http get request to json data and assign it to information
            //upon sucess of getting json file data (the json file) is passed into a fucntion that assigns it to
            //company.information
            $http.get('app/rsc/company-information.json').success(function (data) {
                company.information = data;
            });

        }]);

        // define a directive and now we can use products in the html
        app.directive("products", function () {
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

    }


    public static deregister(appTools: any, view: TestCompanyNgCtrl): void {

    }

}

export = TestCompanyNgCtrl;
