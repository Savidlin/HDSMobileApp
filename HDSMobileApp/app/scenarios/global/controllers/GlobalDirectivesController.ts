"use strict";
import Services = require("../../../services/Services");

class GlobalDirectivesController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        

        this.setupGlobalDirectives(ngApp);
    }


    public setupGlobalDirectives(ngApp: ng.IModule) {

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

    }


    public deregister(appTools: Main, view: GlobalDirectivesController) {

    }

}

export = GlobalDirectivesController;