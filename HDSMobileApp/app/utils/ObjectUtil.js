"use strict";
var NumberUtil = require("./NumberUtil");
/** ObjectUtil class
 * object manipulation utility functions
 * @author Benjamin
 * @since 2014-10-24
 */
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    /** Get a set of property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: {@code ObjectUtil.values({ alpha: "1", beta: "2", charlie: "3" })}
     * returns: {@code ["1", "2", "3"]}
     *
     * @param {Object} obj: the object to retrieve property values from
     * @param {Array<String>} [keys=Object.keys(obj)]: the list of property names
     * to retrieve from the object
     * @return {Array} the values associated with {@code keys} or {@code Object.keys(obj)}
     */
    ObjectUtil.values = function (obj, keys) {
        "use strict";
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }
        return keys.map(function (prop) { return obj[prop]; });
    };
    /** Get a set of non-null property values from an object.
     * The list of property names can be provided, or if not provided,
     * all of the object's key values will be retrieved.
     * Example: {@code ObjectUtil.valuesNotNull({ alpha: "1", beta: "2", charlie: "3", delta: null })}
     * returns: {@code ["1", "2", "3"]}
     *
     * @param {Object} obj: the object to retrieve property values from
     * @param {Array<String>} [keys=Object.keys(obj)]: the list of property names
     * to retrieve from the object
     * @return {Array} the non-null values associated with {@code keys} or the
     * non-null values associated with {@code Object.keys(obj)}
     */
    ObjectUtil.valuesNotNull = function (obj, keys) {
        "use strict";
        if (keys != null && !Array.isArray(keys)) {
            throw new Error("incorrect usage (" + obj + ", " + keys + "), expected (Object obj, Array<String> [keys])");
        }
        if (keys == null) {
            keys = Object.keys(obj);
        }
        return keys.filter(function (prop) { return obj[prop] != null; }).map(function (prop) { return obj[prop]; });
    };
    /** Check if an object has at least 1 non-null property from a list of property names
     * @see #hasMatchingProperties()
     */
    ObjectUtil.hasAnyNonFalseyProperties = function (obj, propNames) {
        return ObjectUtil.hasMatchingProperties(obj, propNames, function template_notNull(val) { return !!val; }, propNames != null ? 1 : 0);
    };
    /** Check if an object has at least 1 non-null property from a list of property names
     * @see #hasMatchingProperties()
     */
    ObjectUtil.hasAnyNonNullProperties = function (obj, propNames) {
        return ObjectUtil.hasMatchingProperties(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? 1 : 0);
    };
    /** Check if an object has non-null values for all of the propery names specified
     * @see #hasMatchingProperties()
     */
    ObjectUtil.hasNonNullProperties = function (obj, propNames) {
        return ObjectUtil.hasMatchingProperties(obj, propNames, function template_notNull(val) { return val != null; }, propNames != null ? propNames.length : 0);
    };
    /** Check if an object has matching values for all of the properties specified
     * Example: {@code hasMatchingProperties({ alpha: 100 }, ["alpha"], function (v) { return v != null; })}
     * returns: {@code true}
     * Or example: {@code hasMatchingProperties({ alpha: 100, beta: null }, ["alpha", "beta", "gamma", "delta", "epsilon"], function (v) { return v != null; }, 3)}
     * returns: {@code false} (and should return after checking 4 properties, since there are 5 properties, only 1 of the first 4 matches, and 3 are required)
     *
     * @param {Object} obj: the object to check
     * @param {Array<String>} propNames: the array of property names to check for in {@code obj}
     * @param {Number} requiredCount: the number of properties (in the order they appear in the {@code propNames} array)
     * required to be non-null before returning true, defaults to the size in the {@code propNames} array
     * @return {Boolean} true if the required number of properties exist in the object and match the condition function specified, false otherwise
     */
    ObjectUtil.hasMatchingProperties = function (obj, propNames, template_condition, requiredCount) {
        "use strict";
        if (requiredCount === void 0) { requiredCount = (propNames != null ? propNames.length : 0); }
        if (obj == null) {
            return false;
        }
        if (!Array.isArray(propNames)) {
            throw new Error("incorrect usage (" + obj + ", " + propNames + "), expected (Object obj, Array<String> propNames, Function template_condition, Number requiredCount?)");
        }
        var nonNullCount = 0;
        for (var i = 0, size = propNames.length; i < size; i++) {
            var propNameI = propNames[i];
            // test each property
            if (obj.hasOwnProperty(propNameI) && template_condition(obj[propNameI]) === true) {
                nonNullCount++;
                if (nonNullCount >= requiredCount) {
                    return true;
                }
            }
            else if (i - nonNullCount >= size - requiredCount) {
                // enough properties checks have already returned false, that we can return false early
                break;
            }
        }
        return false;
    };
    /** Return the first non-null argument
     * @param {Object...} arguments: an list of parameters to search through
     * @return {Object|null} the first argument that is not null, or null if all of the arguments are null
     */
    ObjectUtil.coalesce = function () {
        "use strict";
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var i = 0, size = args.length; i < size; i++) {
            var arg = args[i];
            if (arg != null) {
                return arg;
            }
        }
        return null;
    };
    /** convert undefined values to null
     * @param {Object} obj: the object to return if not null
     * @return {Object|null} the {@code obj} if it is not null, else null
     */
    ObjectUtil.orNull = function (obj) {
        "use strict";
        return obj == null ? null : obj;
    };
    /** Get a property from an object without the risk of an undefined error.
     * Return null if either the object or the property are null or undefined.
     * Example: {@code getProp(undefined, "alpha")}
     * returns: {@code null}
     * Or example: {@code getProp({ alpha: 342 }, "alpha")}
     * returns: {@code 342}
     *
     * @param {Object} obj: the object to retrieve the property from
     * @param {String} propertyName: the name of the object property to retrieve
     * @return {*|null} the property retrieved from the object if both the object and property are not null, else null
     */
    ObjectUtil.getProp = function (obj, propertyName) {
        "use strict";
        if (obj == null) {
            return null;
        }
        var prop = obj[propertyName];
        return prop == null ? null : prop;
    };
    /** Get multiple properties from an object without the risk of an undefined error.
     * Return an empty array if either the object or the list of property names are null or undefined.
     * Example: {@code getProps(undefined, ["alpha", "beta"])}
     * returns: {@code []}
     * Or example: {@code getProp({ alpha: 342, beta: "B" }, ["alpha", "beta"])}
     * returns: {@code [342, "B"]}
     *
     * @param {Object} obj: the object to retrieve the properties from
     * @param {Arrya<String>} propertyNames: the names of the object properties to retrieve
     * @return {Array} the properties retrieved from the object if both the object
     * and property names are not null, else an empty array
     */
    ObjectUtil.getProps = function (obj, propertyNames) {
        "use strict";
        if (obj == null || propertyNames == null || !Array.isArray(propertyNames)) {
            return [];
        }
        var size = propertyNames.length;
        var res = new Array(size);
        for (var i = 0; i < size; i++) {
            res[i] = obj[propertyNames[i]] || null;
        }
        return res;
    };
    ObjectUtil.orZero = function (num, infinityToZero) {
        "use strict";
        return NumberUtil.orZero(num, infinityToZero);
    };
    /** Convert null or undefined values to an empty string, else returns the value unmodified
     * Example: {@code orEmptyString(8543.213)}
     * returns: {@code 8543.213}
     * Or example: {@code orEmptyString(null)}
     * returns: {@code ""}
     *
     * @param {Object} val: the value to check
     * @return {Object} the {@code val} object or {@code ""} if val is null or undefined
     */
    ObjectUtil.orEmptyString = function (val) {
        "use strict";
        return val != null ? val : "";
    };
    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param {Object} classChild: the sub class that inherits from {@code classParent}
     * @param {Object} classParent: the super class that {@code classChild} will inherit from
     * @param {Boolean} allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     */
    ObjectUtil.extend = function (classChild, classParent, allowChildToOverride) {
        "use strict";
        if (allowChildToOverride === void 0) { allowChildToOverride = true; }
        if (classParent.prototype == null) {
            throw new Error(classParent + ", does not have the property '.prototype'");
        }
        var childProto = classChild.prototype;
        var newChildProto = Object.create(classParent.prototype);
        classChild.prototype = newChildProto;
        for (var key in childProto) {
            if (childProto.hasOwnProperty(key)) {
                if (allowChildToOverride && newChildProto.hasOwnProperty(key)) {
                }
                else {
                    newChildProto[key] = childProto[key];
                }
            }
        }
        Object.defineProperty(classChild.prototype, "constructor", {
            value: classChild
        });
    };
    /** Modify classChild to extend classParent via prototype-to-static inheritance.
     * Side-effect: classChild is modified.
     * @param {Object} classChild: the sub class that inherits from {@code classParent}
     * @param {Object} classParent: the super class that {@code classChild} will inherit from
     * @param {Boolean} allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name,
     * also see {@code throwErrorIfOverwrites}
     * @param {Boolean} throwErrorIfOverwrites: true to throw an error if a {@code classParent} property overwrites
     * a {@code classChild} property, false to ignore the parent property and keep the classChild property
     * @see #extend()
     */
    ObjectUtil.extendToStatic = function (classChild, classParent, allowChildToOverride, throwErrorIfOverwrites) {
        "use strict";
        if (allowChildToOverride === void 0) { allowChildToOverride = true; }
        if (throwErrorIfOverwrites === void 0) { throwErrorIfOverwrites = true; }
        var parentProto = classParent.prototype;
        for (var key in parentProto) {
            if (parentProto.hasOwnProperty(key)) {
                if (allowChildToOverride && classChild.hasOwnProperty(key)) {
                    if (throwErrorIfOverwrites) {
                        throw new Error(classChild + " already has a property named '" + key + "', cannot inherit from parent " + classParent);
                    }
                }
                else {
                    classChild[key] = parentProto[key];
                }
            }
        }
    };
    /** Return the prototype tree of a specified object
     * @return {Array} an array of objects, where the first object is {@code obj}
     * and each following object is the prototype of the previous object
     */
    ObjectUtil.getPrototypeTree = function (obj) {
        var res = [];
        var proto = obj;
        do {
            res.push(proto);
            proto = Object.getPrototypeOf(proto);
        } while (proto != null);
        return res;
    };
    /** Search for a matching constructor by name up an object's prototype tree
     * @param {Object} obj: search this object's prototype tree
     * @param {String} name: the name of the prototype constructor to search for
     * @return {Object} the matching 'constructor' prototype object or null
     * if a matching constructor could not be located
     */
    ObjectUtil.getParentConstructorByName = function (obj, name) {
        if (obj == null) {
            throw new Error("incorrect usage (" + obj + ", " + name + "), expected (Object obj, String name)");
        }
        var proto = obj;
        do {
            if (proto.constructor.name === name) {
                return proto.constructor;
            }
            proto = Object.getPrototypeOf(proto);
        } while (proto != null);
        return null;
    };
    /** Run a set of test functions
     * @param {Array<Function(Object)>} testFunctions: an array of functions that
     * accept a test parameter object that has the following properties:
     * {Function(String, Array)} 'success' which should be called if the test succeeds
     * {Function(String, Array)} 'fail' which should be called if the test fails
     */
    ObjectUtil.runTest = function (testFunctions) {
        if (!Array.isArray(testFunctions)) {
            if (typeof testFunctions !== "function") {
                throw new Error("incorrect usage, (" + testFunctions + "), expected (Array<Function(Object)>|Function(Object) testFunctions)");
            }
            testFunctions = [testFunctions];
        }
        var testParams = testParams || {
            success: function (testName, results) {
                if (typeof testName !== "string" || !Array.isArray(results)) {
                    throw new Error("test success() callback expects (String testName, Array results)");
                }
                console.log("success: '" + testName + "'", results);
            },
            fail: function (testName, results) {
                if (typeof testName !== "string" || !Array.isArray(results)) {
                    throw new Error("test fail() callback expects (String testName, Array results)");
                }
                console.error("fail: '" + testName + "'", results);
            }
        };
        for (var i = 0, size = testFunctions.length; i < size; i++) {
            testFunctions[i](testParams);
        }
    };
    return ObjectUtil;
})();
module.exports = ObjectUtil;
