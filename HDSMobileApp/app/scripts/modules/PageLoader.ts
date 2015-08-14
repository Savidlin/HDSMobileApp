/// <reference path="../../tsDefinitions/mobileapp.d.ts" />
"use strict";
import FunctionUtil = require("../modules/utils/FunctionUtil");
import TestUserView = require("../views/TestUserView");
import TestCompanyNgCtrl = require("../controllers/TestCompanyNgCtrl");
import Ps = require("./main");

/** Page initializers for HDS Mobile App
 * @since 2015-8-12
 */
class PageLoader {
    private static _defaultPageLoader = new PageLoader();


    // static initializer to give pages access
    private static cctor = (function () {
        window["PageLoader"] = PageLoader;

        // TODO debugging
        console.log("PageLoader static initializer: " + (window["PageLoader"]));
    } ());


    public loadPage(name: string) {
        Ps.resetAppNewPage(null, null, window);

        var view = this.getPages()[name].initView(Ps);
        return view;
    }


    public getPages = FunctionUtil.createLazyInitializedField(() => ({
        TestUserView: TestUserView,
        TestCompanyNgCtrl: TestCompanyNgCtrl,
    }));


    public static get defaultPageLoader() {
        return PageLoader._defaultPageLoader;
    }

}


/**
 * @param <T> the type of view object returned
 */
interface View<T> {
    initView: (appTools: Main) => T;
    deregister: (appTools: Main, View: T) => void;
}


export = PageLoader;
