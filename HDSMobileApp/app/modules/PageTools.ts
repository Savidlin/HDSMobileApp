/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

/** Variables for managing a browser window, page, DOM, and DOM interaction tool like JQuery
 * @author Benjamin
 * @since 2015-4-10
 */
module PageTools {

    /** Page access interface for abstracting UI/DOM/jQuery access
     * @since 2015-4-3
     */
    export interface PageInfo {

        pageDocument: Document;
        getPageDocument(): Document;

        pageWindow: Window;
        getPageWindow(): Window;

        jQuery: JQueryStatic;
        getUiAccessor(): JQueryStatic;

        jQueryContext: JQuery;
        getJQueryContext(): JQuery;

    }


    /** Page specific global variables
     * @since 2015-2-12
     */
    export class PageConfig implements PageInfo {
        private _currentPageWindow: Window;
        private _currentPageDocument: Document;
        private _jQueryInst: JQueryStatic;
        private _jQueryContext: JQuery;


        constructor(wnd?: Window, doc?: Document, jQuery?: JQueryStatic) {
            this._currentPageWindow = wnd;
            this._currentPageDocument = doc;
            this._jQueryInst = jQuery;
            this._jQueryContext = jQuery != null ? jQuery(doc) : undefined;
        }


        copy() {
            var copy: PageConfig = new PageConfig();
            copy._currentPageWindow = this._currentPageWindow;
            copy._currentPageDocument = this._currentPageDocument;
            copy._jQueryInst = this._jQueryInst;
            copy._jQueryContext = this._jQueryContext;
            return copy;
        }


        get pageDocument() {
            return this.getPageDocument();
        }

        getPageDocument() {
            return this._currentPageDocument;
        }

        setPageDocument(doc: Document) {
            this._currentPageDocument = doc;
            if (this._jQueryContext != null && this._jQueryInst != null) {
                this._jQueryContext = PageConfig.createJQueryContext(this._jQueryInst, doc);
            }
        }


        get jQuery() {
            return this.getJQuery();
        }

        getUiAccessor() {
            return this.getJQuery();
        }


        get jQueryContext() {
            return this.getJQueryContext();
        }

        getJQueryContext() {
            return this._jQueryContext || (this._jQueryContext = PageConfig.createJQueryContext(this._jQueryInst, this.getPageDocument()));
        }


        getJQuery() {
            return this._jQueryInst;
        }

        setJQuery(jQuery: JQueryStatic) {
            this._jQueryInst = jQuery;
        }


        get pageWindow() {
            return this.getPageWindow();
        }

        getPageWindow() {
            return this._currentPageWindow;
        }

        setPageWindow(wnd: Window) {
            this._currentPageWindow = wnd;
        }


        private static createJQueryContext(jquery: JQueryStatic, doc: Document) {
            return jquery(doc || PageConfig.illegalState("create jQuery context", "page document"));
        }


        private static illegalState(context: string, msg: string): any {
            throw new Error("context: " + context + "; " +
                "problem: missing " + msg);
        }

    }

}

export = PageTools;