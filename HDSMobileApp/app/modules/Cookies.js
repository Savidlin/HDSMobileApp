/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var Ps = require("./main");
/** Cookies wrapper for browser cookie management in PowerScope
 * @since 2015-2-12
 */
var Cookies = (function () {
    function Cookies() {
    }
    Cookies.prototype.getItem = function (id, isObj) {
        return Ps.getJQuery().cookie(id, undefined, this.getCookieOption(isObj));
    };
    Cookies.prototype.setItem = function (id, value) {
        Ps.getJQuery().cookie(id, value, this.getCookieOption(typeof value === "string"));
    };
    Cookies.prototype.removeItem = function (id) {
        Ps.getJQuery().removeCookie(id, this.getCookieOption());
    };
    Cookies.prototype.getCookieOption = function (isObj) {
        if (isObj === true) {
            return this.getCookieOptionObject();
        }
        else {
            return { path: '/' };
        }
    };
    Cookies.prototype.getCookieOptionObject = function () {
        return { path: '/', json: true };
    };
    Cookies.getDefaultInst = function () {
        return Cookies.defaultInst || (Cookies.defaultInst = new Cookies());
    };
    return Cookies;
})();
module.exports = Cookies;
