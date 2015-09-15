/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var LocalStore = require("./LocalStore");
var Cookies = require("./Cookies");
/** PsInstance
 * A class with static variables for all of the necessary object instances to run HDSMobileApp
 * @author Benjamin
 * @since 2015-2-5
 */
var PsInstance = (function () {
    function PsInstance() {
    }
    // wait to initialize some variables until other events have finished such as the database being initialized
    PsInstance.initStorage = function () {
    };
    PsInstance.initModels = function () {
    };
    PsInstance.initApp = function () {
    };
    PsInstance.psStash = LocalStore.getDefaultInst();
    PsInstance.psSessionStash = LocalStore.getSessionInst();
    PsInstance.cookies = Cookies.getDefaultInst();
    return PsInstance;
})();
module.exports = PsInstance;
