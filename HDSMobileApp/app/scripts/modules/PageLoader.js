"use strict";
var FunctionUtil = require("../modules/utils/FunctionUtil");
var TestUserView = require("../views/TestUserView");
var Ps = require("./main");
/** Page initializers for HDS Mobile App
 * @since 2015-8-12
 */
var PageLoader = (function () {
    function PageLoader() {
        this.getPages = FunctionUtil.createLazyInitializedField(function () { return {
            TestUserView: TestUserView,
        }; });
    }
    PageLoader.prototype.loadPage = function (name) {
        Ps.resetAppNewPage(null, null, window);
        var elem = Ps.getPageDocument().querySelector("#test-user-view");
        var view = this.getPages()[name].newView(null, elem);
        return view;
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
        window["PageLoader"] = PageLoader;
    }());
    return PageLoader;
})();
module.exports = PageLoader;