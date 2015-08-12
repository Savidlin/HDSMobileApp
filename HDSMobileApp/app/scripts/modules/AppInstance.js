/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var DateConverter = require("./DateConverter");
/** AppInstance class - for detecting multiple tabs running PowerScope at the same time
 * @author Assaf
 * @since 2015-1-0
 */
var AppInstance = (function () {
    function AppInstance() {
        this.ACTIVE_INSTANCE_KEY = "activeInstanceId";
        this.SESSION_INSTANCE_KEY = "sessionId";
        this.storageEventListener = function appInstanceChangeListener(event) {
            if (event.key === self.ACTIVE_INSTANCE_KEY && event.newValue !== self.instanceId) {
                window.location.href = "about:blank";
                // TODO should use psLog
                console.log("multiple app instances running, closing duplicate instance");
            }
        };
        this.instanceId = JSON.parse(sessionStorage.getItem(this.SESSION_INSTANCE_KEY));
        if (!this.instanceId) {
            this.instanceId = DateConverter.Timestamp.now();
            sessionStorage.setItem(this.SESSION_INSTANCE_KEY, this.instanceId);
        }
        // Set the instance as active
        localStorage.setItem(this.ACTIVE_INSTANCE_KEY, this.instanceId);
        // Kill the window if it becomes inactive
        var self = this;
        window.addEventListener("storage", this.storageEventListener);
        this.getActiveInstanceId = this.getActiveInstanceId.bind(this);
        this.isActive = this.isActive.bind(this);
    }
    AppInstance.prototype.getActiveInstanceId = function () {
        return localStorage.getItem(this.ACTIVE_INSTANCE_KEY);
    };
    AppInstance.prototype.isActive = function () {
        return this.instanceId == this.getActiveInstanceId();
    };
    AppInstance.prototype.deregister = function () {
        window.removeEventListener("storage", this.storageEventListener);
    };
    return AppInstance;
})();
module.exports = AppInstance;
