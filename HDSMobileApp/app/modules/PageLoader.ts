/// <reference path="../tsDefinitions/mobileapp.d.ts" />
"use strict";
import FunctionUtil = require("../utils/FunctionUtil");
import DemoSalesPersonsController = require("../scenarios/demo/DemoSalesPersonsController");
import GlobalDirectivesController = require("../scenarios/global/controllers/GlobalDirectivesController");
import CustomerPurchaseController = require("../scenarios/scenario2/CustomerPurchaseController");
import VacationController = require("../scenarios/scenario3/VacationController");
import SalesTerritoryController = require("../scenarios/scenario4/SalesTerritoryController");
import ProductLookupController = require("../scenarios/scenario5/ProductLookupController");
import SalesPersonController = require("../scenarios/scenario1/SalesPersonController");
import Ps = require("./main");
import DataCache = require("./DataCache");
import Data = require("./Data");

/** Page initializers for HDS Mobile App
 * @since 2015-8-12
 */
class PageLoader {
    private static _defaultPageLoader = new PageLoader();


    // static initializer to give pages access
    private static cctor = (function () {
        window["appGlobals"] = {
            PageLoader: PageLoader,
            Data: Data,
            DataCache: DataCache,
        };
    } ());


    public loadPage(pageLoadInfo: { ngAppName: string; controllerNames: string[]; appLoaderName?: string; }) {
        var that = this;
        Ps.resetAppNewPage(null, null, window);
   
        console.log("init loading data...");

        DataCache.loadData(undefined, false).done(function () {
            var ngAppName: string = null;

            // if no 'appLoaderName' is supplied, then create a default angular.module and pass it to each controller
            if (pageLoadInfo.appLoaderName == null) {
                var names = pageLoadInfo.controllerNames;

                ngAppName = pageLoadInfo.ngAppName;

                console.log("done loading data...");
                console.log("loading app: ", ngAppName, "using controllers: ", names);

                var ngAppModule = angular.module(ngAppName, []);

                var views = [];
                for (var i = 0, size = names.length; i < size; i++) {
                    var viewFactory = that.getViews()[names[i]];
                    if (viewFactory != null) {
                        var view = viewFactory.initView(Ps, ngAppModule);
                        views.push(view);
                    }
                    else {
                        console.error("could not find controller '" + names[i] + "'");
                    }
                }
            }
            // call the custom bootstrapper class matching 'appLoaderName' to create the angular.module()
            else {

                console.log("loading app: ", pageLoadInfo.ngAppName, "using custom bootstrapper: ", pageLoadInfo.appLoaderName);

                var appObj = that.getAppBootstrappers()[pageLoadInfo.appLoaderName].initNgApp(Ps, pageLoadInfo.ngAppName);
                ngAppName = appObj.ngAppModule.name;
            }

            // bootstrap the angular page here!
            var domContext = Ps.getPageDocument();
            angular.element(domContext).ready(function () {
                angular.bootstrap(domContext, [ngAppName]);
            });

        });
    }


    // add references to views here
    public getViews = FunctionUtil.createLazyInitializedField(() => <StringMap<WidgetView<any>>>({
        DemoSalesPersonsController: new DemoSalesPersonsController(),
        GlobalDirectivesController: new GlobalDirectivesController(),
        ProductLookupController: new ProductLookupController(),
        VacationController: new VacationController(),
        SalesTerritoryController: new SalesTerritoryController(),
        CustomerPurchaseController: new CustomerPurchaseController(),
        SalesPersonController: new SalesPersonController()
    }));


    // add references to app bootstrappers here
    public getAppBootstrappers = FunctionUtil.createLazyInitializedField(() => <StringMap<NgAppBootstrapper<any>>>({

    }));


    public static get defaultPageLoader() {
        return PageLoader._defaultPageLoader;
    }

}

export = PageLoader;
