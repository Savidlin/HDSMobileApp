"use strict";
var GlobalDirectivesController = (function () {
    function GlobalDirectivesController() {
    }
    GlobalDirectivesController.prototype.initView = function (appTools, ngApp) {
        // TODO create scenario controllers/directives/angular stuff here...
        this.setupGlobalDirectives(ngApp);
    };
    GlobalDirectivesController.prototype.setupGlobalDirectives = function (ngApp) {
        // define a directive
        ngApp.directive("navbar", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/global/partials/navbar.html",
            };
        });
        ngApp.directive("footer", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/global/partials/footer.html",
            };
        });
    };
    GlobalDirectivesController.prototype.deregister = function (appTools, view) {
    };
    return GlobalDirectivesController;
})();
module.exports = GlobalDirectivesController;
