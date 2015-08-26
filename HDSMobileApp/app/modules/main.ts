/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
"use strict";
import Models = require("../models/ModelsImpl");
import PageTools = require("./PageTools");


/** UiUtil - miscellaneous global UI utilities
 * @since 2015-2-18
 */
class UiUtil implements UiUtilI {
    private page: PageTools.PageInfo;


    constructor(page: PageTools.PageInfo) {
        this.page = page;
    }


    /* these are used in dynamic loading of values to provide a spinner as a placeholder until a value is obtained - used in Tax Calculation on Summary page, for example*/
    showSpinner(selector: string, ctx?: JQuery | Element) {
        (ctx ? this.page.jQuery(selector, ctx) : this.page.jQuery(selector, this.page.getPageDocument())).text('').addClass("loaderImage");
    }


    hideSpinner(selector: string, ctx?: JQuery | Element) {
        (ctx ? this.page.jQuery(selector, ctx) : this.page.jQuery(selector, this.page.getPageDocument())).removeClass("loaderImage");
    }

}


/** Ps namespace
 * the root of the MobileApp application
 * @since 2015-2-10
 */
class Ps {
    private static _syncUpMonitorInterval;
    private static pageSettings: PageTools.PageConfig = new PageTools.PageConfig();
    private static uiUtil: UiUtil;


    static resetAppNewPage(psInst/*TODO : psInstance*/, svcs/*TODO : Services*/, wnd: Window, pageDocument: Document = wnd.document, url: string = pageDocument.location.href) {
        Ps.resetAppState(psInst);
        if (window["$"]) {
            Ps.setJQuery(window["$"]);
        }
        Ps.setCurrentPage(wnd, pageDocument);
        Ps.urlLoaded(svcs, url);
    }


    /**
     * @param psInst the current app's {@link psInstance} to reset
     */
    static resetAppState(psInst/*TODO : psInstance*/) {
        if (psInst) {
            psInst.currentBid.reset();
        }
    }


    /** Call when a new page has been loaded (or the current page reloaded) by an outside source, such as the user
     * @param svcs the {@link Services} instance to apply this change to
     * @param url optional new page URL being navigated to
     */
    static urlLoaded(svcs/*TODO : Services*/, url: string) {
        if (svcs) {
            svcs.navigated(url);
        }
    }


    static setCurrentPage(wnd: Window, pageDocument: Document = wnd.document) {
        Ps.setPageWindow(wnd);
        Ps.setPageDocument(pageDocument);
    }


    static setPageDocument(newPageDocument: Document) {
        Ps.pageSettings.setPageDocument(newPageDocument);
    }


    static setJQuery(jQueryInst?: JQueryStatic) {
        Ps.pageSettings.setJQuery(jQueryInst);
    }


    static getPageDocument(): Document {
        return Ps.pageSettings.getPageDocument();
    }


    static getJQuery(): JQueryStatic {
        return Ps.pageSettings.getJQuery();
    }


    static getJQueryContext(): JQuery {
        return Ps.pageSettings.getJQueryContext();
    }


    static getUiUtil(): UiUtilI {
        return Ps.uiUtil || (Ps.uiUtil = new UiUtil(Ps.pageSettings));
    }

    static getPageWindow() {
        return Ps.pageSettings.getPageWindow();
    }

    static setPageWindow(wnd: Window) {
        Ps.pageSettings.setPageWindow(wnd);
    }


    static createDefaultPageInfo() {
        return Ps.pageSettings.copy();
    }

}

module Ps {

    export enum ModelRole {
        MASTER,
        CUSTOM,
        CUSTOMIZED_MASTER,
        ALL
    }

}


export = Ps;
