/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
"use strict";
var PageTools = require("./PageTools");
/** UiUtil - miscellaneous global UI utilities
 * @since 2015-2-18
 */
var UiUtil = (function () {
    function UiUtil(page) {
        this.page = page;
    }
    /* these are used in dynamic loading of values to provide a spinner as a placeholder until a value is obtained - used in Tax Calculation on Summary page, for example*/
    UiUtil.prototype.showSpinner = function (selector, ctx) {
        (ctx ? this.page.jQuery(selector, ctx) : this.page.jQuery(selector, this.page.getPageDocument())).text('').addClass("loaderImage");
    };
    UiUtil.prototype.hideSpinner = function (selector, ctx) {
        (ctx ? this.page.jQuery(selector, ctx) : this.page.jQuery(selector, this.page.getPageDocument())).removeClass("loaderImage");
    };
    return UiUtil;
})();
/** Ps namespace
 * the root of the MobileApp application
 * @since 2015-2-10
 */
var Ps = (function () {
    function Ps() {
    }
    Ps.resetAppNewPage = function (psInst /*TODO : psInstance*/, svcs /*TODO : Services*/, wnd, pageDocument, url) {
        if (pageDocument === void 0) { pageDocument = wnd.document; }
        if (url === void 0) { url = pageDocument.location.href; }
        Ps.resetAppState(psInst);
        if (window["$"]) {
            Ps.setJQuery(window["$"]);
        }
        Ps.setCurrentPage(wnd, pageDocument);
        Ps.urlLoaded(svcs, url);
    };
    /**
     * @param psInst the current app's {@link psInstance} to reset
     */
    Ps.resetAppState = function (psInst /*TODO : psInstance*/) {
        if (psInst) {
            psInst.currentBid.reset();
        }
    };
    /** Call when a new page has been loaded (or the current page reloaded) by an outside source, such as the user
     * @param svcs the {@link Services} instance to apply this change to
     * @param url optional new page URL being navigated to
     */
    Ps.urlLoaded = function (svcs /*TODO : Services*/, url) {
        if (svcs) {
            svcs.navigated(url);
        }
    };
    Ps.setCurrentPage = function (wnd, pageDocument) {
        if (pageDocument === void 0) { pageDocument = wnd.document; }
        Ps.setPageWindow(wnd);
        Ps.setPageDocument(pageDocument);
    };
    Ps.setPageDocument = function (newPageDocument) {
        Ps.pageSettings.setPageDocument(newPageDocument);
    };
    Ps.setJQuery = function (jQueryInst) {
        Ps.pageSettings.setJQuery(jQueryInst);
    };
    Ps.getPageDocument = function () {
        return Ps.pageSettings.getPageDocument();
    };
    Ps.getJQuery = function () {
        return Ps.pageSettings.getJQuery();
    };
    Ps.getJQueryContext = function () {
        return Ps.pageSettings.getJQueryContext();
    };
    Ps.getUiUtil = function () {
        return Ps.uiUtil || (Ps.uiUtil = new UiUtil(Ps.pageSettings));
    };
    Ps.getPageWindow = function () {
        return Ps.pageSettings.getPageWindow();
    };
    Ps.setPageWindow = function (wnd) {
        Ps.pageSettings.setPageWindow(wnd);
    };
    Ps.createDefaultPageInfo = function () {
        return Ps.pageSettings.copy();
    };
    Ps.pageSettings = new PageTools.PageConfig();
    return Ps;
})();
var Ps;
(function (Ps) {
    (function (ModelRole) {
        ModelRole[ModelRole["MASTER"] = 0] = "MASTER";
        ModelRole[ModelRole["CUSTOM"] = 1] = "CUSTOM";
        ModelRole[ModelRole["CUSTOMIZED_MASTER"] = 2] = "CUSTOMIZED_MASTER";
        ModelRole[ModelRole["ALL"] = 3] = "ALL";
    })(Ps.ModelRole || (Ps.ModelRole = {}));
    var ModelRole = Ps.ModelRole;
})(Ps || (Ps = {}));
module.exports = Ps;
