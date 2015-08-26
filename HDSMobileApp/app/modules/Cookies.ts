/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

import Ps = require("./main");

/** Cookies wrapper for browser cookie management in PowerScope
 * @since 2015-2-12
 */
class Cookies {
    "use strict";
    private static defaultInst: Cookies;


    getItem(id: string, isObj?: boolean): string {
        return Ps.getJQuery().cookie(id, undefined, this.getCookieOption(isObj));
    }


    setItem(id: string, value) {
        Ps.getJQuery().cookie(id, value, this.getCookieOption(typeof value === "string"));
    }


    removeItem(id: string) {
        Ps.getJQuery().removeCookie(id, this.getCookieOption());
    }


    private getCookieOption(isObj?: boolean) {
        if (isObj === true) {
            return this.getCookieOptionObject();
        }
        else {
            return { path: '/' };
        }
    }


    private getCookieOptionObject() {
        return { path: '/', json: true };
    }


    static getDefaultInst() {
        return Cookies.defaultInst || (Cookies.defaultInst = new Cookies());
    }

}


export = Cookies;
