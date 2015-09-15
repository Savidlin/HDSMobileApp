/// <reference path="../tsDefinitions/mobileapp.d.ts" />
"use strict";
var FunctionUtil = require("../utils/FunctionUtil");
var DemoSalesPersonsController = require("../scenarios/demo/DemoSalesPersonsController");
var GlobalDirectivesController = require("../scenarios/global/controllers/GlobalDirectivesController");
var CustomerPurchaseController = require("../scenarios/scenario2/CustomerPurchaseController");
var VacationController = require("../scenarios/scenario3/VacationController");
var SalesTerritoryController = require("../scenarios/scenario4/SalesTerritoryController");
var ProductLookupController = require("../scenarios/scenario5/ProductLookupController");
var Ps = require("./main");
var DataCache = require("./DataCache");
var Data = require("./Data");
/** Page initializers for HDS Mobile App
 * @since 2015-8-12
 */
var PageLoader = (function () {
    function PageLoader() {
        // add references to views here
        this.getViews = FunctionUtil.createLazyInitializedField(function () { return ({
            DemoSalesPersonsController: new DemoSalesPersonsController(),
            GlobalDirectivesController: new GlobalDirectivesController(),
            ProductLookupController: new ProductLookupController(),
            VacationController: new VacationController(),
            SalesTerritoryController: new SalesTerritoryController(),
            CustomerPurchaseController: new CustomerPurchaseController()
        }); });
        // add references to app bootstrappers here
        this.getAppBootstrappers = FunctionUtil.createLazyInitializedField(function () { return ({}); });
    }
    PageLoader.prototype.loadPage = function (pageLoadInfo) {
        var that = this;
        Ps.resetAppNewPage(null, null, window);
        // TODO debugging
        console.log("init loading data...");
        DataCache.loadData(undefined, false).done(function () {
            var ngAppName = null;
            // if no 'appLoaderName' is supplied, then create a default angular.module and pass it to each controller
            if (pageLoadInfo.appLoaderName == null) {
                var names = pageLoadInfo.controllerNames;
                ngAppName = pageLoadInfo.ngAppName;
                // TODO debugging
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
            else {
                // TODO debugging
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
    };
    Object.defineProperty(PageLoader, "defaultPageLoader", {
        get: function () {
            return PageLoader._defaultPageLoader;
        },
        enumerable: true,
        configurable: true
    });
    PageLoader._defaultPageLoader = new PageLoader();
    // static initializer to give pages access
    PageLoader.cctor = (function () {
        window["appGlobals"] = {
            PageLoader: PageLoader,
            Data: Data,
            DataCache: DataCache,
        };
    }());
    return PageLoader;
})();
module.exports = PageLoader;
