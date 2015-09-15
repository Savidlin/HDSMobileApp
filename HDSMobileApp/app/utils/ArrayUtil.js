"use strict";
var ObjectUtil = require("./ObjectUtil");
/** ArrayUtil class
 * Array utility functions (most are superseeded by lodash), useful for chrome command line testing
 * @author Benjamin
 * @since 2014-8-0
 */
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    /** Add all of the values in {@code toAdd} to the {@code src} array
     * @return the source array
     */
    ArrayUtil.addAll = function (src, toAdd) {
        if (toAdd && toAdd.length > 0) {
            Array.prototype.push.apply(src, toAdd);
        }
        return src;
    };
    /** Returns only the unique values in the array as defined by the '===' operator
     * @param {Array} ary: an array of values
     * @return {Array} a new array of values containing the original array's unique values
     */
    ArrayUtil.arrayUnique = function (ary) {
        if (ary == null || ary.length < 2) {
            return ary || null;
        }
        ary = ary.sort();
        var res = [ary[0]];
        for (var i = 1, size = ary.length; i < size; i++) {
            if (ary[i - 1] !== ary[i]) {
                res.push(ary[i]);
            }
        }
        return res;
    };
    /** Returns the unique values in the array and how many times each occured as defined by the '===' operator.
     * For example: {@code arrayUniqueCount(["alpha", "beta", "charlie", "alpha", "charlie", "charlie"])}
     * returns: {@code { "alpha": 2, "beta": 1, "charlie": 3 } }
     * @param {Array} ary: an array of values
     * @return {Array} a new array of unique objects from the original array in the format [{ aryValue: count }, {...}, ...]
     * where {@code aryVal} is a value from the original {@code ary} and {@code count} is the number of times it occured
     */
    ArrayUtil.arrayUniqueCountAsObject = function (ary) {
        if (ary == null || ary.length < 1) {
            return ary == null ? null : {};
        }
        ary = ary.sort();
        var res = {};
        res[ary[0]] = 1;
        for (var i = 1, size = ary.length; i < size; i++) {
            var resAryI = res[ary[i]];
            if (resAryI) {
                res[ary[i]] = resAryI + 1;
            }
            else {
                res[ary[i]] = 1;
            }
        }
        return res;
    };
    /** Returns the unique values in the array and how many times each occured as defined by the '===' operator.
     * For example: {@code arrayUniqueCountAsKeyValueArray(["alpha", "beta", "charlie", "alpha", "charlie", "charlie"])}
     * returns: {@code [{ key: "alpha", value: 2 }, { key: "beta", value: 1 }, { key: "charlie", value: 3 }]}
     * @param {Array} ary: an array of values
     * @return {Array} a new array of unique objects from the original array in the format [{ key: aryValue, value: count }, {...}, ...]
     * where {@code aryVal} is a value from the original {@code ary} and {@code count} is the number of times it occured
     */
    ArrayUtil.arrayUniqueCountAsKeyValueArray = function (ary) {
        var res = ArrayUtil.arrayUniqueCountAsObject(ary);
        var results = [];
        var vals = Object.keys(res);
        for (var i = 0, size = vals.length; i < size; i++) {
            results.push({ key: vals[i], value: res[vals[i]] });
        }
        return results;
    };
    /** Return all shared/matching elements in two arrays.
     * For example: {@code arrayUnion([1, 2, 3, 4, 5, 6, 7, 8, 9, "A"], [1, 2, 4, 8, "A"])}
     * returns: {@code [1, 2, 4, 8, "A"]}
     * @param {Array} ary1: the first array
     * @param {Array} ary2: the second array
     * @return {Array} an array of shared elements between {@code ary1} and {@code ary2}
     */
    ArrayUtil.arrayUnion = function (ary1, ary2) {
        if (ary1 == null || ary2 == null) {
            if (ary1 == null && ary2 != null) {
                return ary2.slice();
            }
            else if (ary1 != null && ary2 == null) {
                return ary1.slice();
            }
            else {
                return [];
            }
        }
        var results = [];
        for (var i = 0, size = ary1.length; i < size; i++) {
            var idx = ary2.indexOf(ary1[i]);
            if (idx > -1) {
                results.push(ary1[i]);
            }
        }
        return results;
    };
    /** returns all of the objects in an array that share all specified property values (up to 3 properties).
     * For example: {@code withAllProp([ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 13}, {text: "mike", value: 32} ], "value", 32)}
     * returns: {@code [ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 32} ]}
     * @param {Array} ary: the array of objects to search
     * @param {String} propName: the name of the object property to that is being compared
     * @param {Object} propValue: the property value to compare
     * @param {String} [propName2]: the name of the second object property to that is being compared
     * @param {Object} [propValue2]: the second property value to compare
     * @param {String} [propName3]: the name of the third object property to that is being compared
     * @param {Object} [propValue3]: the third property value to compare
     * @return {Array} an array of objects from the input array that contain a matching property
     */
    ArrayUtil.withAllProp = function (ary, propName, propValue, propName2, propValue2, propName3, propValue3) {
        if (ary != null) {
            if (propName != null) {
                if (propName2 != null) {
                    if (propName3 != null) {
                        return ArrayUtil.withAll3Prop(ary, propName, propValue, propName2, propValue2, propName3, propValue3);
                    }
                    return ArrayUtil.withAll2Prop(ary, propName, propValue, propName2, propValue2);
                }
                return ArrayUtil.with1Prop(ary, propName, propValue);
            }
            return [];
        }
        return [];
    };
    /** returns all of the objects in an array that share any specified property values (up to 3 properties).
     * Properties are compared using the '===' equality operator.
     * For example: {@code withAnyProp([ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 13}, {text: "mike", value: 32} ], "value", 13, "text", "luke")}
     * returns: {@code [ {text: "luke", value: 32}, {text: "mike", value: 13} ]}
     * @param {Array} ary: the array of objects to search
     * @param {String} propName: the name of the object property to that is being compared
     * @param {Object} propValue: the property value to compare
     * @param {String} [propName2]: the name of the second object property to that is being compared
     * @param {Object} [propValue2]: the second property value to compare
     * @param {String} [propName3]: the name of the third object property to that is being compared
     * @param {Object} [propValue3]: the third property value to compare
     * @return {Array} an array of objects from the input array that contain a matching property
     */
    ArrayUtil.withAnyProp = function (ary, propName, propValue, propName2, propValue2, propName3, propValue3) {
        if (ary != null) {
            if (propName != null) {
                if (propName2 != null) {
                    if (propName3 != null) {
                        return ArrayUtil.withAny3Prop(ary, propName, propValue, propName2, propValue2, propName3, propValue3);
                    }
                    return ArrayUtil.withAny2Prop(ary, propName, propValue, propName2, propValue2);
                }
                return ArrayUtil.with1Prop(ary, propName, propValue);
            }
            return [];
        }
        return [];
    };
    /** Get all objects from an array that have a specific property value.
     * For example: {@code with1Prop([ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 13}, {text: "mike", value: 32} ], "value", 32)}
     * returns: {@code [ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 32} ]}
     * which is all of the objects from the array that have a property named "value" with a value of 32
     *
     * @param {Array} ary: an array of values to search
     * @param {String} propName: the name of the property to search for
     * @param {Object} propValue: the value of the property to match
     * @return {Array} the input array objects that contained the specified property
     */
    ArrayUtil.with1Prop = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return [];
        }
        var results = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                results.push(ary[i]);
            }
        }
        return results;
    };
    /** Get all objects from an array that have 2 specific property values.
     * @see with1Prop()
     */
    ArrayUtil.withAll2Prop = function (ary, propName, propValue, propName2, propValue2) {
        if (ary == null || propName == null || propName2 == null || propValue === undefined || propValue2 === undefined) {
            return [];
        }
        var results = [];
        var obj = null;
        for (var i = 0, size = ary.length; i < size; i++) {
            obj = ary[i];
            if (obj[propName] === propValue && obj[propName2] === propValue2) {
                results.push(obj);
            }
        }
        return results;
    };
    /** Get all objects from an array that have one or more of 2 specific property values.
     * @see with1Prop()
     */
    ArrayUtil.withAny2Prop = function (ary, propName, propValue, propName2, propValue2) {
        if (ary == null || propName == null || propName2 == null || propValue === undefined || propValue2 === undefined) {
            return [];
        }
        var results = [];
        var obj = null;
        for (var i = 0, size = ary.length; i < size; i++) {
            obj = ary[i];
            if (obj[propName] === propValue || obj[propName2] === propValue2) {
                results.push(obj);
            }
        }
        return results;
    };
    /** Get all objects from an array that have 3 specific property values.
     * @see with1Prop()
     */
    ArrayUtil.withAll3Prop = function (ary, propName, propValue, propName2, propValue2, propName3, propValue3) {
        if (ary == null || propName == null || propName2 == null || propName3 == null ||
            propValue === undefined || propValue2 === undefined || propValue3 === undefined) {
            return [];
        }
        var results = [];
        var obj = null;
        for (var i = 0, size = ary.length; i < size; i++) {
            obj = ary[i];
            if (obj[propName] === propValue &&
                obj[propName2] === propValue2 &&
                obj[propName3] === propValue3) {
                results.push(obj);
            }
        }
        return results;
    };
    /** Get all objects from an array that have one or more of 3 specific property values.
     * @see with1Prop()
     */
    ArrayUtil.withAny3Prop = function (ary, propName, propValue, propName2, propValue2, propName3, propValue3) {
        if (ary == null || propName == null || propName2 == null || propName3 == null ||
            propValue === undefined || propValue2 === undefined || propValue3 === undefined) {
            return [];
        }
        var results = [];
        var obj = null;
        for (var i = 0, size = ary.length; i < size; i++) {
            obj = ary[i];
            if (obj[propName] === propValue ||
                obj[propName2] === propValue2 ||
                obj[propName3] === propValue3) {
                results.push(obj);
            }
        }
        return results;
    };
    /** returns all of the objects in an array with a property that does not match the specified value.
     * Properties are compared using the '===' equality operator.
     * For example: {@code without1Prop([ {text: "john", value: 32}, {text: "luke", value: 32}, {text: "mike", value: 13}, {text: "mike", value: 32} ], "value", 32)}
     * returns: {@code [ {text: "mike", value: 13} ]}
     * @param {Array} ary: the array of objects to search
     * @param {String} propName: the name of the object property to that is being compared
     * @param {Object} propValue: the property value to compare
     * @return {Array} an array of objects from the input array that do not contain the specified property
     */
    ArrayUtil.without1Prop = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return [];
        }
        var results = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            var obj = ary[i];
            if (obj.hasOwnProperty(propName) && obj[propName] !== propValue) {
                results.push(obj);
            }
        }
        return results;
    };
    /** search for the index of an array object with a property that matches the specified property value.
     * For example: {@code indexOfPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)}
     * returns: {@code 0}
     * because the first object with the property "value" with a value of 12 was at index 0
     * @param {Array} ary: the array to search
     * @param {String} propName: the name of the property to search for on each object
     * @param {Object} propValue: the property value to compare
     * @return {Integer} the array index of an object with a matching property, -1 if no matching object was found
     */
    ArrayUtil.indexOfPropValue = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return -1;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    };
    /** search for the last index of an array object with a property that matches the specified property value
     * For example: {@code lastIndexOfPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)}
     * returns: {@code 1}
     * because the last object with the property "value" with a value of 12 was at index 1
     * @param {Array} ary: the array to search
     * @param {String} propName: the name of the property to search for on each object
     * @param {Object} propValue: the property value to compare
     * @return {Integer} the array index of an object with a matching property, -1 if no matching object was found
     */
    ArrayUtil.lastIndexOfPropValue = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return -1;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    };
    /** search for objects in an array with a property that matches the specified property value.
     * For example: {@code findPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12}, { text: "overhill", value: 3 ], "value", 12)}
     * returns: {@code {text: "john's bid", value: 12}, { text: "test bid", value: 12 } }
     * because the matching object has a property "value" with a value of 12
     *
     * @param {Array} ary: the array to search
     * @param {String} propName: the name of the property to search for on each object
     * @param {Object} propValue: the property value to compare
     * @return {Array} an array of objects with properties by the name 'propName' equal to the specified 'propValue', {@code []} if no matching object was found
     */
    ArrayUtil.findAllPropValue = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return null;
        }
        var res = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                res.push(ary[i]);
            }
        }
        return res;
    };
    /** search for an object in an array with a property that matches the specified property value.
     * For example: {@code findPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)}
     * returns: {@code {text: "john's bid", value: 12} }
     * because the matching object has a property "value" with a value of 12
     *
     * @param {Array} ary: the array to search
     * @param {String} propName: the name of the property to search for on each object
     * @param {Object} propValue: the property value to compare
     * @return {Object} the object from {@code ary} with a matching property, {@code null} if no matching object was found
     */
    ArrayUtil.findPropValue = function (ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return null;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                return ary[i];
            }
        }
        return null;
    };
    /** Find one matching value in an array, throw an exception if more than
     * one result is found.
     * For example: {@code findOne([ {id: 40, value: "A"}, {id: 78, value: "B"}, {id: 123, value: "C"} ], function (obj) { return obj.id === 123; }, "id")}
     * returns: {@code {text: "C"}
     *
     * @param {Array<T>} ary: the array of values to search
     * @param {Function} filter: the filter to apply to {@code ary}
     * @param {String} [propName]: an optional property to return from the one found result object
     * @return the matching value from the array or a property of that result
     * object if {@code propName} is not null, or null if a result cannot be found
     */
    ArrayUtil.findOne = function (ary, filter, propName, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || filter == null) {
            return null;
        }
        var result = null;
        var resultCount = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i]) === true) {
                if (resultCount === 0) {
                    result = ary[i];
                    if (!ensureOne) {
                        resultCount++;
                        break;
                    }
                }
                resultCount++;
                throw new Error("found multiple results, expected to find one");
            }
        }
        if (resultCount === 1) {
            return result != null ? (propName != null ? result[propName] : result) : null;
        }
        return null;
    };
    /** Find one matching value in an array, throw an exception if more than
     * one result is found.
     * For example: {@code findOneByProp([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)}
     * returns: {@code {text: "john's bid", value: 12} }
     * Or example: {@code findOneByProp([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12, "text", true)}
     * throws an error because the value appears more than once
     * Or example: {@code findOneByProp([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12, "text")}
     * returns: {@code "john's bid"}
     *
     * @param {Array<T>} ary: the array of values to search
     * @param {String} searchPropName: the property to compare from each {@code ary} value to {@code searchPropValue},
     * or null to compare array values to {@code searchPropValue}
     * @param {String} [resultPropName]: an optional property to return from the one found result object
     * @return the matching value from the array or a property of that result
     * object if {@code propName} is not null, or null if a result cannot be found
     */
    ArrayUtil.findOneByProp = function (ary, searchPropName, searchPropValue, resultPropName, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || searchPropName == null) {
            return null;
        }
        var result = null;
        var resultCount = 0;
        if (searchPropName != null) {
            for (var i = 0, size = ary.length; i < size; i++) {
                if (ary[i][searchPropName] === searchPropValue) {
                    if (resultCount === 0) {
                        result = ary[i];
                        if (!ensureOne) {
                            resultCount++;
                            break;
                        }
                    }
                    resultCount++;
                    throw new Error("found multiple results, expected to find one");
                }
            }
        }
        else {
            for (var i = 0, size = ary.length; i < size; i++) {
                if (ary[i] === searchPropValue) {
                    if (resultCount === 0) {
                        result = ary[i];
                        if (!ensureOne) {
                            resultCount++;
                            break;
                        }
                    }
                    resultCount++;
                    throw new Error("found multiple results, expected to find one");
                }
            }
        }
        if (resultCount === 1) {
            return result != null ? (resultPropName != null ? result[resultPropName] : result) : null;
        }
        return null;
    };
    /** Set a property to a specific value for every object in an array.
     * Useful for clearing a specific property to false or null.
     * @param {Array} ary: the array of objects
     * @param {String} propName: the name of the property to set
     * @param {Object} propValue: the value to assigned to each object's {@code propName} property
     */
    ArrayUtil.setAllProp = function (ary, propName, propValue) {
        if (ary == null || propName == null) {
            return;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            ary[i][propName] = propValue;
        }
        return;
    };
    /** Get a specified property from each object in an array of objects
     * @param {Array} ary: the array of objects
     * @param {String} propName: the name of the property to get
     * @return {Array} an array of the specified property from each object in {@code ary}
     */
    ArrayUtil.getAllProp = function (ary, propName) {
        if (ary == null || propName == null) {
            return [];
        }
        var results = new Array(ary.length);
        for (var i = ary.length - 1; i > -1; i--) {
            results[i] = ary[i][propName];
        }
        return results;
    };
    /** Check if an array is not null and contains 1 or more items
     * @param {Array} ary: the array to check
     * @return {Boolean} true if the array is not null and has 1 or more items, false if not
     */
    ArrayUtil.hasItems = function (ary) {
        return ary != null && ary.length > 0;
    };
    /** Search for a set of values in an array of base values
     * @param {Array<T>} ary: the array of values
     * @param {Array<T>} searchFor: the values to search for
     * @return true if all of {@code searchFor} values are contained in {@code ary}
     */
    ArrayUtil.containsAll = function (ary, searchFor) {
        if (ary == null || searchFor == null) {
            return false;
        }
        for (var i = 0, size = searchFor.length; i < size; i++) {
            if (ary.indexOf(searchFor[i]) < 0) {
                return false;
            }
        }
        return true;
    };
    /** Removes all values from an array
     * @param {Array} ary: an array of values to clear
     */
    ArrayUtil.clearArray = function (ary) {
        if (ary == null) {
            return;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            ary.pop();
        }
    };
    /** Sum the values of an array
     * @param {Array} ary: an array of numbers to sum, if the array is null, 0 is returned,
     * null, infinite, and NaN values in the array are treated as zero
     * @return {Number} the sum of the values in {@code ary}
     */
    ArrayUtil.arraySum = function (ary) {
        if (ary == null) {
            return 0;
        }
        var sum = 0;
        for (var i = ary.length - 1; i > -1; i--) {
            sum += ObjectUtil.orZero(ary[i]);
        }
        return sum;
    };
    /** Remove an item from an array based on value without creating a new array or splicing the array,
     * the returned order of the array's elements is not defined
     * @param {Array} ary: the array of values to remove the matching value from
     * @param {Object} value: the value to search for in the array and remove the first instance of if present
     * @return the {@code ary} of values with the first instance of a value matching {@code value} removed,
     * values are compared based on strict equality "==="
     */
    ArrayUtil.arrayFastRemoveValue = function (ary, value) {
        if (ary == null || ary.length === 0) {
            return ary;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i] === value) {
                ary[i] = ary[size - 1];
                ary.pop();
            }
        }
        return ary;
    };
    /** Remove an item at a specific index from an array based without creating a new array or splicing
     * the array, the returned order of the array's elements is not defined
     * @param {Array} ary: the array of values to remove the value index from
     * @param {Integer} index: the index of the item to remove from the array
     * @return the {@code ary} of values with the specified index removed if present
     */
    ArrayUtil.arrayFastRemoveIndex = function (ary, index) {
        if (ary == null || ary.length === 0) {
            return ary;
        }
        if (ary.length > 1) {
            ary[index] = ary[ary.length - 1];
        }
        ary.pop();
        return ary;
    };
    /** Remove an index from an array
     * For example: {@code arrayRemoveIndex(["Alpha", "Beta", "Gamma"], 1)}
     * returns: {@code ["Alpha", "Gamma"]}
     * @param {Array} ary: the array to remove an index from
     * @param {Integer} index: the index of the value to remove
     * @return {Array} the {@code ary} with the value at {@code index} removed
     */
    ArrayUtil.arrayRemoveIndex = function (ary, index) {
        if (ary == null) {
            return ary;
        }
        var size = ary.length;
        if (ary.length < 1 || index < 0 || index >= ary.length) {
            return ary;
        }
        for (var i = index + 1; i < size; i++) {
            ary[i - 1] = ary[i];
        }
        ary[size - 1] = null;
        ary.length = size - 1;
        return ary;
    };
    ArrayUtil.isAllInstance = function (ary, expectedConstructorName) {
        if (expectedConstructorName == null) {
            throw new Error("incorrect usage (" + ary + ", " + expectedConstructorName + "), " +
                "expected (Array ary, String|Function(Object):Boolean expectedConstructorName)");
        }
        return ArrayUtil.isAllSameInstance(ary, expectedConstructorName);
    };
    /** Check if all elements in an array are of the same type by comparing each
     * object's constructor.name property or using a comparator function.
     * For example: {@code ArrayUtil.isAllSameInstance(["1", "2", "3"], function (item) { return typeof item === "string"; })}
     * returns: {@code true}
     * Or example: {@code ArrayUtil.isAllSameInstance([1, "2", "3"], function (item) { return typeof item === "string"; })}
     * returns: {@code false}
     *
     * @param {Array} ary: the array of objects to check. Return false if null.
     * @param {String|Function(Object):Boolean} [expectedConstructorName=ary[0].constructor.name]: the
     * expected name of all of the {@code ary} elements' constructors, if this is null all
     * elements' constructor names are compared to the first element's constructor name.
     * Or a function that takes an element of the array and returns a boolean indicate
     * if the element matches the expected type (true) or not (false).
     * @return {Boolean} true if all of the elements in the array have a matching
     * constructor name or if {@code ary} is empty, false if any of the array element
     * constructor names do not match, or if {@code ary} is null
     */
    ArrayUtil.isAllSameInstance = function (ary, expectedConstructorName) {
        if (!Array.isArray(ary) || ary == null) {
            return false;
        }
        if (expectedConstructorName == null && ary.length > 0) {
            expectedConstructorName = ary[0].constructor.name;
        }
        if (typeof expectedConstructorName === "string") {
            for (var i = ary.length - 1; i > -1; i--) {
                if (ary[i] == null || ary[i].constructor.name !== expectedConstructorName) {
                    return false;
                }
            }
        }
        else if (typeof expectedConstructorName === "function") {
            for (var i = ary.length - 1; i > -1; i--) {
                if (ary[i] == null || expectedConstructorName(ary[i]) === false) {
                    return false;
                }
            }
        }
        else {
            throw new Error("incorrect usage (" + ary + ", " + expectedConstructorName + "), " +
                "expected (Array ary, String|Function(Object):Boolean expectedConstructorName)");
        }
        return true;
    };
    /** Check if all elements in an array are of the same type by comparing each
     * object's constructor property to a provided parent class.
     * @return {Boolean} true if all of the elements in the array match
     */
    ArrayUtil.isAllInstanceOf = function (ary, parentClass) {
        if (!Array.isArray(ary) || ary == null || parentClass == null) {
            throw new Error("incorrect usage (" + ary + ", " + parentClass + "), " +
                "expected (Array ary, Function() parentClass)");
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (ary[i] == null || !(ary[i] instanceof parentClass)) {
                return false;
            }
        }
        return true;
    };
    /** Check if all items in an array are strings
     * For example: {@code isStringArray(["32", "1", { param: "alpha" }])}
     * returns: {@code false}
     * Or example: {@code isStringArray(["32", "string"])}
     * returns: {@code true}
     * @param {Array<any>} ary: an array of objects to check
     * @return {Boolean} true if all {@code ary} objects are strings, false if not
     */
    ArrayUtil.isStringArray = function (ary) {
        if (!Array.isArray(ary) || ary == null) {
            throw new Error("incorrect usage (" + ary + "), " + "expected (Array ary)");
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (typeof ary[i] !== "string" && !(ary[i] instanceof String)) {
                return false;
            }
        }
        return true;
    };
    /** Check if all items in an array are numbers
     * For example: {@code isNumberArray(["32", "1", new Number(3)])}
     * returns: {@code false}
     * Or example: {@code isNumberArray([32, new Number(3)])}
     * returns: {@code true}
     * @param {Array<any>} ary: an array of objects to check
     * @return {Boolean} true if all {@code ary} objects are numbers, false if not
     */
    ArrayUtil.isNumberArray = function (ary) {
        if (!Array.isArray(ary) || ary == null) {
            throw new Error("incorrect usage (" + ary + "), " + "expected (Array ary)");
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (typeof ary[i] !== "number" && !(ary[i] instanceof Number)) {
                return false;
            }
        }
        return true;
    };
    /** Compare two arrays, ignoring the order of the elements in each array.
     * elements are compare by strict (i.e. {@code '==='}) equality.
     * For example: {@code arrayLooseEqual([34, "A", 7], [7, 34, "A"])}
     * returns: {@code true}
     * Or example: {@code arrayLooseEqual([34, "A", "7"], [7, 34, "A"])}
     * returns :{@code false}
     *
     * @param {Array} ary1: the first array to compare
     * @param {Array} ary1: the second array to compare
     * @return {Boolean} true if both arrays contain the same elements in or out of order,
     * or if both arrays are null. False if one or more elements differ between the two arrays
     */
    ArrayUtil.arrayLooseEqual = function (ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return true;
            }
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) ||
                ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), " + "expected (Array ary1, Array ary2)");
            }
            if ((ary1 == null && ary2 != null) || (ary1 != null && ary2 == null)) {
                return false;
            }
        }
        if (ary1.length !== ary2.length) {
            return false;
        }
        var matchCount = 0;
        for (var i = ary1.length - 1; i > -1; i--) {
            if (ary2.indexOf(ary1[i]) === -1) {
                return false;
            }
            matchCount++;
        }
        return matchCount == ary2.length;
    };
    /** Get the delta/difference between two arrays.
     * For example: {@code ary1 = [1,2,3,4,5]} and {@code ary2 = [1,2,4,6]}
     * returns: {@code [6,3,5]}
     * (note: the order is undefined) which represents the differences between {@code ary1} and {@code ary2}
     * @param {Array} ary1: the first array to compare
     * @param {Array} ary2: the second array to compare
     * @return {Array} of values that exist in only one of the input arrays
     * @see arrayDifference()
     */
    ArrayUtil.arrayLooseDifference = function (ary1, ary2) {
        var diff = ArrayUtil.arrayDifference(ary1, ary2);
        var looseDiff = Array.prototype.concat.apply(diff.added, diff.removed);
        return looseDiff;
    };
    /** Get the difference between two arrays returned as elements added and remove from the first array.
     * For example: {@code ary1 = [1,2,3,4,5]} and {@code ary2 = [1,2,4,6]}
     * returns: {@code { added: [6], removed: [3,5]}},
     * which represents the differences that applied to {@code ary1} would convert it to {@code ary2}
     * @param {Array} ary1: the master/original array to base differences on
     * @param {Array} ary2: the branch/new array to find differences in
     * @return {Object} with 'added' and 'removed' arrays of values from {@code ary1} and {@code ary2}
     * @see arrayLooseDifference()
     */
    ArrayUtil.arrayDifference = function (ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            // both array's null, no difference between them
            if (ary1 == null && ary2 == null) {
                return {
                    added: [],
                    removed: []
                };
            }
            // if either value is not an array, incorrect function usage
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) ||
                ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), expected (Array ary1, Array ary2)");
            }
            // if one array is null and the other is not, the difference is just the non-null array's values
            if (ary1 == null && ary2 != null) {
                return {
                    added: ary2.slice(),
                    removed: []
                };
            }
            if (ary1 != null && ary2 == null) {
                return {
                    added: [],
                    removed: ary1.slice()
                };
            }
        }
        var dif = {
            added: [],
            removed: []
        };
        var usedFromAry2 = [];
        var ary1Size = ary1.length;
        var ary2Size = ary2.length;
        // find each element in {@code ary2} that does not exist in {@code ary1} and mark it
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = ary1[i];
            var matchIndex2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (usedFromAry2[ii] !== true && elem1 === ary2[ii]) {
                    matchIndex2 = ii;
                    break;
                }
            }
            // the item does not exist in {@code ary2}, so it is a removed item
            if (matchIndex2 === -1) {
                dif.removed.push(ary1[i]);
            }
            else {
                usedFromAry2[matchIndex2] = true;
            }
        }
        // each unused item represents an item that only exists in {@code ary2}
        for (var ii = 0; ii < ary2Size; ii++) {
            if (usedFromAry2[ii] !== true) {
                dif.added.push(ary2[ii]);
            }
        }
        return dif;
    };
    /** Get the difference between two arrays of keys and returned as elements added
     * and remove from the first values array.
     * For example:
     * {@code aryKeys1 = [1,2,3,4,5]}, {@code aryKeys2 = [1,2,4,6]},
     * {@code aryValues1 = ["A","B","C","D","E"]} and {@code aryValues2 = ["A","B","D","F"]},
     * {@code arrayKeyValueDifference([1,2,3,4,5], [1,2,4,6], ["A","B","C","D","E"], ["A","B","D","F"])}
     * returns:
     * {@code { added: ["F"], removed: ["C","E"]},
     * which represents the differences that applied to {@code aryValues1} would convert it to {@code aryValues2}
     *
     * @param {Array} aryKeys1: the master/original array to base differences on
     * @param {Array} aryKeys2: the branch/new array to find differences in
     * @param {Array} aryValues1: the master/original array of values
     * @param {Array} aryValues2: the branch/new array of values
     * @return {Object} with 'added' and 'removed' arrays of values from {@code aryValues1} and {@code aryValues2}
     * @see arrayDifference()
     * @see arrayLooseDifference()
     */
    ArrayUtil.arrayKeyValueDifference = function (aryKeys1, aryKeys2, aryValues1, aryValues2) {
        // check that keys and values are the correct types and handle null values
        if (aryKeys1 == null || aryKeys2 == null || !Array.isArray(aryKeys1) || !Array.isArray(aryKeys2) ||
            aryValues1 == null || aryValues2 == null || !Array.isArray(aryValues1) || !Array.isArray(aryValues2)) {
            // both array's null, no difference between them
            if (aryKeys1 == null && aryKeys2 == null) {
                return {
                    added: [],
                    removed: []
                };
            }
            // if either value is not an array, incorrect function usage
            if ((aryKeys1 != null && !Array.isArray(aryKeys1)) || (aryKeys2 != null && !Array.isArray(aryKeys2)) ||
                aryValues1 == null || aryValues2 == null || !Array.isArray(aryValues1) || !Array.isArray(aryValues2)) {
                throw new Error("incorrect usage ([" + aryKeys1 + "], [" + aryKeys2 + "], [" + aryValues1 + "], [" + aryValues2 + "]), " +
                    "expected (Array aryKeys1, Array aryKeys2, Array aryValues1, Array aryValues2)");
            }
            // if one array is null and the other is not, the difference is just the non-null array's values
            if (aryKeys1 == null && aryKeys2 != null) {
                return {
                    added: aryValues2.slice(),
                    removed: []
                };
            }
            if (aryKeys1 != null && aryKeys2 == null) {
                return {
                    added: [],
                    removed: aryValues1.slice()
                };
            }
        }
        var dif = {
            added: [],
            removed: []
        };
        var usedFromAry2 = [];
        var ary1Size = aryKeys1.length;
        var ary2Size = aryKeys2.length;
        // find each element in {@code aryKeys2} that does not exist in {@code aryKeys1} and mark it
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = aryKeys1[i];
            var matchIndex2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (usedFromAry2[ii] !== true && elem1 === aryKeys2[ii]) {
                    matchIndex2 = ii;
                    break;
                }
            }
            // the item does not exist in {@code aryKey2}, so it is a removed item
            if (matchIndex2 === -1) {
                dif.removed.push(aryValues1[i]);
            }
            else {
                usedFromAry2[matchIndex2] = true;
            }
        }
        // each unused item represents an item that only exists in {@code aryKey2}
        for (var ii = 0; ii < ary2Size; ii++) {
            if (usedFromAry2[ii] !== true) {
                dif.added.push(aryValues2[ii]);
            }
        }
        return dif;
    };
    /** Convert an array of values to an array of percentages based on the sum of the array of values.
     * For example: {@code toPercentagesOfTotal([43, 20, 7, 57])}
     * returns: {@code [0.339, 0.157, 0.055, 0.449]}
     * Or example: {@code toPercentagesOfTotal([43, 20, 7, 57], 100)}
     * returns: {@code [0.43, 0.2, 0.07, 0.57]}
     * because the total is based on the second parameter when provided (in this case 100).
     *
     * @param {Array<Number|String>} ary: the array of Numbers to convert to percentages, null, infinite, and NaN values are treated as zero
     * @param {Number} [total]: an optional total to base the percentage calculations on,
     * if null or undefined, the sum of the {@code ary} values is used
     * @return {Array<Number>} an array equal in length to {@code ary} where each value represents the percent (out of 1.0) of the
     * value at that index in {@code ary} compared to the total sum of the values in {@code ary},
     * strings that represent valid numeric values are parsed and included in the sum calculation and returned percentages,
     * if the sum of {@code ary} is 0, then all returned values are 0
     */
    ArrayUtil.toPercentagesOfTotal = function (ary, total) {
        if (ary == null) {
            return [];
        }
        if (total != null && typeof total !== "number") {
            throw new Error("incorrect parameter 'total': '" + total + "' must be a number if not null");
        }
        var aryLen = ary.length;
        var results = new Array(aryLen);
        var sum = 0;
        // fill the {@code results} array with the converted values so that we do not call orZero again for the same element in the percentage loop further below
        for (var i = aryLen - 1; i > -1; i--) {
            var val = results[i] = ObjectUtil.orZero(ary[i]);
            if (val < 0) {
                throw new Error("negative value '" + ary[i] + "' at index " + i + ", cannot calculate percentage value of negative array values");
            }
            sum += val;
        }
        // use total if it is defined
        if (total != null) {
            sum = total;
        }
        // if the sum is zero, don't divide by zero, just set all result percentages to zero
        if (sum === 0) {
            for (var i = aryLen - 1; i > -1; i--) {
                results[i] = 0;
            }
        }
        else {
            // else, calculate percentages using non-zero sum
            for (var i = aryLen - 1; i > -1; i--) {
                results[i] = results[i] / sum;
            }
        }
        return results;
    };
    /** Create an array containing the contents of two arrays.
     * For example: {@code copyAndInsertArray([0, 5, 10], [2, 3], 2)}
     * returns: {@code [0, 2, 3, 5, 10]}
     *
     * @param {Array} origAry: the initial array to copy
     * @param {Array} insertAry: the array to insert into {@code origAry}
     * @param {Integer} index: the {@code origAry} index at which to insert the elements from {@code insertAry}
     * @param {Integer} [deleteCount=0]: the number of elements to not copy from {@code origAry} starting at {@code index}
     * @return {Array} the {@code origAry} or a new array containing the contents of {@code origAry} and {@code insertAry}
     */
    ArrayUtil.spliceArray = function (origAry, insertAry, index, deleteCount) {
        if (deleteCount === void 0) { deleteCount = 0; }
        if (origAry == null || insertAry == null || !Array.isArray(origAry) || !Array.isArray(insertAry) ||
            !(typeof index === "number" && isFinite(index) && Math.floor(index) === index) || (deleteCount !== undefined && !(typeof deleteCount === "number" && isFinite(deleteCount) && Math.floor(deleteCount) === deleteCount))) {
            if (origAry == null && insertAry == null) {
                return null;
            }
            if ((origAry != null && !Array.isArray(origAry)) || (insertAry != null && !Array.isArray(insertAry)) ||
                origAry === undefined || insertAry === undefined) {
                throw new Error("incorrect usage ([" + origAry + "], [" + insertAry + "], " + index + ", " + (deleteCount || 0) + "), " + "expected (Array origAry, Array insertAry, Integer index, Integer deleteCount)");
            }
            if ((origAry == null && insertAry != null) || (origAry != null && insertAry == null)) {
                return Array.prototype.push.apply([], origAry || insertAry);
            }
        }
        if (insertAry.length === 0) {
            return origAry;
        }
        deleteCount = deleteCount || 0; // undefined => 0
        var tmp;
        // add to the end of the array
        if (index === origAry.length && deleteCount === 0) {
            tmp = origAry;
            Array.prototype.push.apply(tmp, insertAry);
        }
        else {
            tmp = [];
            // copy up to the index to insert, then insert the array, and copying the remaining portion
            for (var i = 0; i < index; i++) {
                tmp.push(origAry[i]);
            }
            Array.prototype.push.apply(tmp, insertAry);
            for (var i = index + deleteCount, size = origAry.length; i < size; i++) {
                tmp.push(origAry[i]);
            }
        }
        return tmp;
    };
    ArrayUtil.EMPTY_ARRAY = Object.freeze([]);
    // Aliases
    ArrayUtil.diff = ArrayUtil.arrayDifference;
    ArrayUtil.looseDiff = ArrayUtil.arrayLooseDifference;
    ArrayUtil.fastRemoveValue = ArrayUtil.arrayFastRemoveValue;
    ArrayUtil.fastRemoveIndex = ArrayUtil.arrayFastRemoveIndex;
    ArrayUtil.removeIndex = ArrayUtil.arrayRemoveIndex;
    ArrayUtil.union = ArrayUtil.arrayUnion;
    ArrayUtil.unique = ArrayUtil.arrayUnique;
    return ArrayUtil;
})();
module.exports = ArrayUtil;
