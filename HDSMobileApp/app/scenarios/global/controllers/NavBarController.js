"use strict";
var NavBarController = (function () {
    function NavBarController() {
    }
    NavBarController.prototype.initView = function (appTools, ngApp) {
        // TODO create scenario controllers/directives/angular stuff here...
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
    };
    NavBarController.prototype.setupMainDirectives = function (ngApp) {
        // define a directive and now we can use products in the html
        ngApp.directive("navBar", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/global/partials/nav-bar.html",
                //add in a controller alias
                controllerAs: "NavBarController"
            };
        });
    };
    NavBarController.prototype.deregister = function (appTools, view) {
    };
    return NavBarController;
})();
module.exports = NavBarController;
