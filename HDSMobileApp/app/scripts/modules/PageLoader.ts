"use strict";
import FunctionUtil = require("../modules/utils/FunctionUtil");
import TestUserView = require("../views/TestUserView");
import Ps = require("./main");

/** Page initializers for HDS Mobile App
 * @since 2015-8-12
 */
class PageLoader {
    private static _defaultPageLoader = new PageLoader();


    // static initializer to give pages access
    private static cctor = (function () {
        window["PageLoader"] = PageLoader;
    } ());


    public loadPage(name: string) {
        Ps.resetAppNewPage(null, null, window);

        var elem = Ps.getPageDocument().querySelector("#test-user-view");

        var view = this.getPages()[name].newView(null, elem);
        return view;
    }


    public getPages = FunctionUtil.createLazyInitializedField(() => (<StringMap<View>>{
        TestUserView: TestUserView,
    }));


    public static get defaultPageLoader() {
        return PageLoader._defaultPageLoader;
    }

}


interface View {
    newView: (data: any, elem: Element) => any;
    deregister: (view: any) => void
}


export = PageLoader;
