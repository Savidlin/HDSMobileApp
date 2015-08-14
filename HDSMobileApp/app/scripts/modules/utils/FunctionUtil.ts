"use strict";

/** FunctionUtil class
 * utility functions for calling functions
 * @author Benjamin
 * @since 2015-4-21
 */
class FunctionUtil {

    /** A function which takes no arguments (or any arguments) and returns nothing */
    public static NO_OP: () => void = function () { };


    public static callFunc<T>(func: (...args) => T, thisArg: any, ...args: any[]): T;
    public static callFunc(func: (...args) => any, thisArg: any, ...args: any[]): any {
        return FunctionUtil.applyFunc(func, thisArg, args);
    }


    public static applyFunc<T>(func: (...args) => any, thisArg: any, args: any): T;
    public static applyFunc(func: (...args) => any, thisArg: any, args: any): any {
        if (typeof func === "function") {
            return func.apply(thisArg, args);
        }
        return null;
    }



    public static tryCatch<T>(tryFunc: (...args) => T, catchFunc: (err) => (void | T), thisArg?: any, args?: any[]): T;
    public static tryCatch(tryFunc: (...args) => any, catchFunc: (err) => (void | any), thisArg?: any, args?: any[]): any {
        var res = null;
        if (typeof tryFunc === "function") {
            try {
                res = tryFunc.apply(thisArg, args);
            } catch (err) {
                var catchRes = catchFunc(err);
                if (catchRes != null) {
                    res = catchRes;
                }
            }
        }
        return res;
    }


    public static isFunction(func): boolean {
        return typeof func === "function";
    }


    // Alias for {@link #createLazyInitializedField}
    public static lazyField = FunctionUtil.createLazyInitializedField;

    /** Create a function that lazily returns a computed value
     * @param {Function():T} initializer: the function that initializes the lazy field and returns it (this function will only be called once)
     * @return {Function(): T} a function that returns the cached value returned by the {@code initializer} function
     */
    public static createLazyInitializedField<T>(initializer: () => T): () => T {
        var value = null;
        return function lazyInitializer() {
            if (value == null) {
                value = initializer();
            }
            return value;
        };
    }

}

export = FunctionUtil;
