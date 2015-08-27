"use strict";
var TODO_NAME = (function () {
    function TODO_NAME() {
    }
    TODO_NAME.prototype.initView = function (appTools, ngApp) {
        // TODO create scenario controllers/directives/angular stuff here...
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
    };
    TODO_NAME.prototype.setupMainDirectives = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("salesTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/partials/nav-bar.html",
                //add in a controller alias
                controllerAs: "SalesCtrl"
            };
        });
    };
    TODO_NAME.prototype.deregister = function (appTools, view) {
    };
    return TODO_NAME;
})();
module.exports = TODO_NAME;
