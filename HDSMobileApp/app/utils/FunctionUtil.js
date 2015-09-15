"use strict";
/** FunctionUtil class
 * utility functions for calling functions
 * @author Benjamin
 * @since 2015-4-21
 */
var FunctionUtil = (function () {
    function FunctionUtil() {
    }
    FunctionUtil.callFunc = function (func, thisArg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return FunctionUtil.applyFunc(func, thisArg, args);
    };
    FunctionUtil.applyFunc = function (func, thisArg, args) {
        if (typeof func === "function") {
            return func.apply(thisArg, args);
        }
        return null;
    };
    FunctionUtil.tryCatch = function (tryFunc, catchFunc, thisArg, args) {
        var res = null;
        if (typeof tryFunc === "function") {
            try {
                res = tryFunc.apply(thisArg, args);
            }
            catch (err) {
                var catchRes = catchFunc(err);
                if (catchRes != null) {
                    res = catchRes;
                }
            }
        }
        return res;
    };
    FunctionUtil.isFunction = function (func) {
        return typeof func === "function";
    };
    /** Create a function that lazily returns a computed value
     * @param {Function():T} initializer: the function that initializes the lazy field and returns it (this function will only be called once)
     * @return {Function(): T} a function that returns the cached value returned by the {@code initializer} function
     */
    FunctionUtil.createLazyInitializedField = function (initializer) {
        var value = null;
        return function lazyInitializer() {
            if (value == null) {
                value = initializer();
            }
            return value;
        };
    };
    /** A function which takes no arguments (or any arguments) and returns nothing */
    FunctionUtil.NO_OP = function () { };
    // Alias for {@link #createLazyInitializedField}
    FunctionUtil.lazyField = FunctionUtil.createLazyInitializedField;
    return FunctionUtil;
})();
module.exports = FunctionUtil;
