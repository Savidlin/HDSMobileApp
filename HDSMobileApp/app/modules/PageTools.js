/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
/** Variables for managing a browser window, page, DOM, and DOM interaction tool like JQuery
 * @author Benjamin
 * @since 2015-4-10
 */
var PageTools;
(function (PageTools) {
    /** Page specific global variables
     * @since 2015-2-12
     */
    var PageConfig = (function () {
        function PageConfig(wnd, doc, jQuery) {
            this._currentPageWindow = wnd;
            this._currentPageDocument = doc;
            this._jQueryInst = jQuery;
            this._jQueryContext = jQuery != null ? jQuery(doc) : undefined;
        }
        PageConfig.prototype.copy = function () {
            var copy = new PageConfig();
            copy._currentPageWindow = this._currentPageWindow;
            copy._currentPageDocument = this._currentPageDocument;
            copy._jQueryInst = this._jQueryInst;
            copy._jQueryContext = this._jQueryContext;
            return copy;
        };
        Object.defineProperty(PageConfig.prototype, "pageDocument", {
            get: function () {
                return this.getPageDocument();
            },
            enumerable: true,
            configurable: true
        });
        PageConfig.prototype.getPageDocument = function () {
            return this._currentPageDocument;
        };
        PageConfig.prototype.setPageDocument = function (doc) {
            this._currentPageDocument = doc;
            if (this._jQueryContext != null && this._jQueryInst != null) {
                this._jQueryContext = PageConfig.createJQueryContext(this._jQueryInst, doc);
            }
        };
        Object.defineProperty(PageConfig.prototype, "jQuery", {
            get: function () {
                return this.getJQuery();
            },
            enumerable: true,
            configurable: true
        });
        PageConfig.prototype.getUiAccessor = function () {
            return this.getJQuery();
        };
        Object.defineProperty(PageConfig.prototype, "jQueryContext", {
            get: function () {
                return this.getJQueryContext();
            },
            enumerable: true,
            configurable: true
        });
        PageConfig.prototype.getJQueryContext = function () {
            return this._jQueryContext || (this._jQueryContext = PageConfig.createJQueryContext(this._jQueryInst, this.getPageDocument()));
        };
        PageConfig.prototype.getJQuery = function () {
            return this._jQueryInst;
        };
        PageConfig.prototype.setJQuery = function (jQuery) {
            this._jQueryInst = jQuery;
        };
        Object.defineProperty(PageConfig.prototype, "pageWindow", {
            get: function () {
                return this.getPageWindow();
            },
            enumerable: true,
            configurable: true
        });
        PageConfig.prototype.getPageWindow = function () {
            return this._currentPageWindow;
        };
        PageConfig.prototype.setPageWindow = function (wnd) {
            this._currentPageWindow = wnd;
        };
        PageConfig.createJQueryContext = function (jquery, doc) {
            return jquery(doc || PageConfig.illegalState("create jQuery context", "page document"));
        };
        PageConfig.illegalState = function (context, msg) {
            throw new Error("context: " + context + "; " +
                "problem: missing " + msg);
        };
        return PageConfig;
    })();
    PageTools.PageConfig = PageConfig;
})(PageTools || (PageTools = {}));
module.exports = PageTools;
