/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

import LocalStore = require("./LocalStore");
import Cookies = require("./Cookies");

/** PsInstance
 * A class with static variables for all of the necessary object instances to run HDSMobileApp
 * @author Benjamin
 * @since 2015-2-5
 */
class PsInstance {
    static psStash: LocalStore = LocalStore.getDefaultInst();
    static psSessionStash: LocalStore = LocalStore.getSessionInst();
    static cookies: Cookies = Cookies.getDefaultInst();


    // wait to initialize some variables until other events have finished such as the database being initialized

    static initStorage() {
    }


    static initModels() {
    }


    static initApp() {
    }

}

export = PsInstance;
