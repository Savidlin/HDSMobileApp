/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
/** LocalStore namespace
 * simple persistent storage interface for small objects or data blobs
 * @author multiple (Assaf, Benjamin)
 * @since 2015-1-30
 */
var LocalStore = (function () {
    function LocalStore(store) {
        this.MAX_ITEM_SIZE_BYTES = 500000;
        this.keyValueStore = localStorage;
        this.keyValueStore = store != null ? store : localStorage;
        this.getItem = this.getItem.bind(this);
        this.hasItem = this.hasItem.bind(this);
        this.setItem = this.setItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }
    LocalStore.prototype.getItem = function (key, plainString) {
        if (!key) {
            return;
        }
        key = key.trim().toLowerCase();
        var value = this.keyValueStore.getItem(key);
        return plainString === true ? value : (value != null ? JSON.parse(value) : null);
    };
    LocalStore.prototype.hasItem = function (key) {
        return this.getItem(key, true) != null;
    };
    LocalStore.prototype.setItem = function (key, value, plainString) {
        if (!key) {
            return;
        }
        key = key.trim().toLowerCase();
        if (plainString === true && typeof value !== "string") {
            throw new Error("local store value = '" + value + "', plain string = true, but value is not a string");
        }
        var jsonString = plainString === true ? value : JSON.stringify(value);
        if (jsonString.length > this.MAX_ITEM_SIZE_BYTES) {
            if (console && typeof console.error === "function") {
                console.error("Attempting to save too large a value to localStorage, key='" + key + "' size is " + jsonString.length);
            }
            throw new Error("Attempting to save too large a value to localStorage, key='" + key + "' size is " + jsonString.length);
        }
        this.tryLogSetItem(key, jsonString);
    };
    LocalStore.prototype.tryLogSetItem = function (key, value) {
        try {
            this.keyValueStore.setItem(key, value);
        }
        catch (e) {
            if (console && typeof console.error === "function") {
                console.error("error storing key-value '" + key + "' = '" + value.substr(0, 100) + "' in key-value store: " + e);
                console.error(e.message, e.stack);
            }
            throw new Error("error storing key-value '" + key + "' = '" + value.substr(0, 100) + "' in key-value store: " + e);
        }
    };
    LocalStore.prototype.removeItem = function (key) {
        if (!key) {
            return;
        }
        key = key.trim().toLowerCase();
        this.keyValueStore.removeItem(key);
    };
    LocalStore.prototype.getKeys = function () {
        return Object.keys(this.keyValueStore);
    };
    LocalStore.getDefaultInst = function () {
        return LocalStore.defaultInst || (LocalStore.defaultInst = new LocalStore(localStorage));
    };
    LocalStore.getSessionInst = function () {
        return LocalStore.sessionInst || (LocalStore.sessionInst = new LocalStore(sessionStorage));
    };
    return LocalStore;
})();
module.exports = LocalStore;
