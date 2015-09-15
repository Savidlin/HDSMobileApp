"use strict";
/** StringUtil namespace - string manipulation utility functions
 * @author Benjamin
 * @since 2014-12-8
 */
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.isAllStrings = function (ary) {
        if (ary == null) {
            return false;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (typeof ary[i] !== "string") {
                return false;
            }
        }
        return true;
    };
    /** Check if a string is null or empty
     * @param {String} str: the string to check
     * @return {Boolean} true if the {@code str} is null or empty, false if not
     */
    StringUtil.isNullOrEmpty = function (str) {
        return str == null || str === "";
    };
    /** Check if a string is null or empty or contains only whitespace
     * @param {String} str: the string to check
     * @return {Boolean} true if the {@code str} is null, empty or contains only
     * whitespace characters, false if not
     */
    StringUtil.isNullOrWhiteSpace = function (str) {
        return str == null || (str.trim instanceof Function ? str.trim().length === 0 : false);
    };
    /** Replace all occurances of a specified substring with a replacement string
     * For example: {@code replaceAll("cat in the hat", "at" "ab")}
     * returns: {@code "cab in the hab"}
     * @param {String} str: the string to search and replace
     * @param {String} find: the string to search for
     * @param {String} replace: the replacement string
     * @return {String} the {@code str} with all instances of {@code find} replaced with {@code replace}
     */
    StringUtil.replaceAll = function (str, find, replace) {
        if (str == null || find == null || replace == null) {
            throw new Error("incorrect usage (" + str + ", " + find + ", " + replace + "), expected (String str, String find, String replace)");
        }
        return str.split(find).join(replace);
    };
    /** Compare two strings, ignoring leading/trailing whitespace and ignoring upper/lower case
     * @param {String} str1: the second string to compare
     * @param {String} str2: the second string to compare
     * @return {Boolean} true if the strings are loosely equal (ignoring case and whitespace)
     */
    StringUtil.looseEqual = function (str1, str2) {
        return str1 != null && str2 != null && str1.trim().toUpperCase() === str2.trim().toUpperCase();
    };
    /** Test if a string ends with a specific suffix
     * For example: {@code endsWith("coding in javascript", "script")}
     * returns: {@code true}
     * @param {String} str: the string to check. Null returns false
     * @param {String} suffix: the suffix to check for. Null returns false
     * @return {Boolean} true if {@code str} ends with {@code stuffix}, false otherwise
     */
    StringUtil.endsWith = function (str, suffix) {
        if (str == null || suffix == null) {
            return false;
        }
        return str.indexOf(suffix) === (str.length - suffix.length);
    };
    /** Trim and add quotes to a string if quotes do not exist, single quotes are used if there are no existing quotes.
     * For example {@code " this string"} becomes {@code "'this string'"},
     * or {@code "'starts with"} becomes {@code "'starts with'"}
     * @param {String} str: the string to surround with quotes
     * @return {String} the quoted string
     * @see addQuotesSingleOrDouble()
     */
    StringUtil.addQuotes = function (str) {
        return StringUtil.addQuotesSingleOrDouble(str, false);
    };
    /** Trim and add quotes to a string if quotes do not exist, single quotes are used if there are no existing quotes.
     * For example: {@code " this string"}
     * returns: {@code "'this string'"}
     * Or example: {@code "'starts with"}
     * returns: {@code "'starts with'"}
     *
     * @param {String} str: the string to surround with quotes
     * @param {Boolean} [doTrim]: true to trim {@code str}, false to not trim the string
     * @return {String} the quoted string
     */
    StringUtil.addQuotesSingleOrDouble = function (str, doTrim) {
        // ensure that value is quoted
        str = ("" + str);
        if (doTrim === true) {
            str = str.trim();
        }
        var startsWithSingle = str.indexOf("'") === 0;
        var startsWithDouble = str.indexOf("\"") === 0;
        var endsWithSingle = str.lastIndexOf("'") === str.length - 1 && str.length > 0;
        var endsWithDouble = str.lastIndexOf("\"") === str.length - 1 && str.length > 0;
        var withoutExistingQuotes = str.substring(startsWithSingle || startsWithDouble ? 1 : 0, str.length - (endsWithSingle || endsWithDouble ? 1 : 0));
        var containsSingle = withoutExistingQuotes.indexOf("'") > -1;
        var containsDouble = withoutExistingQuotes.indexOf("\"") > -1;
        // if a string starts with a ' or " and ends with the other, throw an error, this case is probably an input error of some kind
        if ((startsWithSingle && endsWithDouble) || (startsWithDouble && endsWithSingle) ||
            (containsSingle && (startsWithSingle || endsWithSingle)) ||
            (containsDouble && (startsWithDouble || endsWithDouble)) ||
            containsSingle && containsDouble) {
            throw new Error("argument: " + str +
                ", this function is not designed to add quotes to a string that already contains or starts and ends with different quote characters");
        }
        // starts with ' or "
        if (startsWithSingle || startsWithDouble) {
            if (startsWithSingle && !endsWithSingle && !containsSingle) {
                str = str + "'";
                endsWithSingle = true;
            }
            else if (startsWithDouble && !endsWithDouble && !containsDouble) {
                str = str + "\"";
                endsWithDouble = true;
            }
        }
        else {
            if (endsWithSingle && !startsWithSingle && !containsSingle) {
                str = "'" + str;
                startsWithSingle = true;
            }
            else if (endsWithDouble && !startsWithDouble && !containsDouble) {
                str = "\"" + str;
                startsWithDouble = true;
            }
            else if (!endsWithSingle && !endsWithDouble) {
                if (!containsSingle) {
                    str = "'" + str + "'";
                    startsWithSingle = true;
                    endsWithSingle = true;
                }
                else if (!containsDouble) {
                    str = "\"" + str + "\"";
                    startsWithDouble = true;
                    endsWithDouble = true;
                }
            }
        }
        // double check logic
        if (str.indexOf("'") !== 0 && str.indexOf("\"") !== 0 && str.lastIndexOf("'") !== str.length - 1 && str.lastIndexOf("\"") !== str.length - 1) {
            throw new Error("assertion error: " + str + ", tried to add start and end ' or \" quotes, but failed, probably logic error in function");
        }
        if (containsSingle || containsDouble) {
            console.log("possible error, adding quotes to string containing quotes: " + str);
        }
        return str;
    };
    StringUtil.padZeroLeft = function (value, maxDigits, padChar) {
        if (padChar === void 0) { padChar = '0'; }
        return StringUtil.padLeft(value, maxDigits, padChar);
    };
    /** Prepend padding to a string or number until it reaches a maximum length
     * @param {Object|String|Number}: the value to convert to a string and pad
     * @param {Integer} maxDigits: the maximum length of the returned string
     * @param {String} [padChar]: an optional character to use as the left padding instead of '0'
     * @return {String} the {@code value} converted to a string padded with {@code padChar} or '0'
     */
    StringUtil.padLeft = function (value, maxDigits, padChar) {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? new Array(maxDigits - valStr.length + 1).join(padChar) + value : value;
    };
    StringUtil.padRight = function (value, maxDigits, padChar) {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? value + new Array(maxDigits - valStr.length + 1).join(padChar) : value;
    };
    /** Check if a character at a specific index in a string is a digit
     * @param {String} str: the string to get the character from
     * @param {Integer} i: the index of the character
     * @return {Boolean} true if the character at the specified index is a digit {@code 0-9}, false if not
     */
    StringUtil.isCharAtDigit = function (str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charCodeAt(i) - 48;
        return ch >= 0 && ch <= 9;
    };
    /** Check if all characters in a string are digits
     * @param {String} str: the string to check
     * @return {Boolean} true if every character in the string is a digit {@code 0-9}, false if not
     */
    StringUtil.isDigit = function (str) {
        if (str == null) {
            return false;
        }
        for (var i = 0, size = str.length; i < size; i++) {
            var ch = str.charCodeAt(i) - 48;
            if (ch < 0 || ch > 9) {
                return false;
            }
        }
        return true;
    };
    /** Test if a char at a specific index in a string is upper case
     * For example: {@code isCharAtUpperCase("Super", 0)}
     * returns: {@code true}
     * Or example: {@code isCharAtUpperCase("Super", 4)}
     * returns {@code false}
     * @param {String} str: the string that the char resides in
     * @param {Integer} i: the index of the character in {@code str} to test
     * @return {Boolean} true if the character at index {@code i} is upper case
     */
    StringUtil.isCharAtUpperCase = function (str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toUpperCase();
    };
    /** Test if a char at a specific index in a string is lower case
     * For example: {@code isCharAtLowerCase("Super", 0)}
     * returns: {@code false}
     * Or example: {@code isCharAtLowerCase("Super", 4)}
     * returns {@code true}
     * @param {String} str: the string that the char resides in
     * @param {Integer} i: the index of the character in {@code str} to test
     * @return {Boolean} true if the character at index {@code i} is lower case
     */
    StringUtil.isCharAtLowerCase = function (str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toLowerCase();
    };
    /** Check if a string is underscore case.
     * For example: {@code isUnderscoreCase("Java_Script")}
     * returns: {@code true}
     * Or example: {@code isUnderscoreCase("case")}
     * returns: {@code false}
     * @param {String} str: the string to check
     * @param {Boolean} true if {@code str} is underscore case, false if not
     */
    StringUtil.isUnderscoreCase = function (str) {
        var underscoreIndex = str.indexOf('_');
        if (underscoreIndex === 0) {
            throw new Error("invalid underscoreCase string starting with underscore '" + str + "'");
        }
        var isUpper = false;
        for (var i = 1, size = str.length; i < size; i++) {
            var ch = str.charAt(i);
            isUpper = (ch === ch.toUpperCase());
            if (ch !== '_' && isUpper) {
                if (str.charAt(i - 1) !== '_' && !StringUtil.isDigit(ch) && !StringUtil.isCharAtUpperCase(str, i - 1)) {
                    return false;
                }
                // read consecutive capital characters after an underscore, for example "Bid_ID" is valid because the capital "D" gets skipped
                for (; i < size; i++) {
                    ch = str.charAt(i);
                    if (ch !== ch.toUpperCase() || ch === '_') {
                        break;
                    }
                }
            }
        }
        return true;
    };
    /** Convert a string from camel case or title case to underscore case
     * @param {String} str: the string to convert
     * @return {String} the {@code str} converted to underscore case if possible,
     * throws an error if the string's format is not recognized
     */
    StringUtil.toUnderscoreCase = function (str) {
        var resStr = null;
        if (StringUtil.isCamelCase(str)) {
            var res = [str.charAt(0).toUpperCase()];
            for (var i = 1, size = str.length; i < size; i++) {
                var ch = str.charAt(i);
                if (ch === ch.toUpperCase()) {
                    res.push('_', ch);
                }
                else {
                    res.push(ch);
                }
            }
            resStr = res.join('');
        }
        else if (StringUtil.isTitleCase(str)) {
            var res = [str.charAt(0)];
            for (var i = 1, size = str.length; i < size; i++) {
                var ch = str.charAt(i);
                if (ch === ch.toUpperCase()) {
                    res.push('_', ch);
                }
                else {
                    res.push(ch);
                }
            }
            resStr = res.join('');
        }
        else if (StringUtil.isUnderscoreCase(str)) {
            resStr = str;
        }
        else {
            throw new Error("unknown case of str '" + str + "'");
        }
        return resStr;
    };
    /** Check if a string is title case.
     * For example: {@code isUnderscoreCase("JavaScript")}
     * returns: {@code true}
     * Or example: {@code isUnderscoreCase("case")}
     * returns: {@code false}
     * @param {String} str: the string to check
     * @param {Boolean} true if {@code str} is title case, false if not
     */
    StringUtil.isTitleCase = function (str) {
        var underscoreIndex = str.indexOf('_');
        if (underscoreIndex === 0) {
            throw new Error("invalid TitleCase string starting with underscore '" + str + "'");
        }
        return underscoreIndex === -1 && str.charAt(0) === str.charAt(0).toUpperCase();
    };
    /** Convert a string from camel case or underscore case to title case
     * @param {String} str: the string to convert
     * @return {String} the {@code str} converted to title case if possible,
     * throws an error if the string's format is not recognized
     */
    StringUtil.toTitleCase = function (str) {
        var resStr = null;
        if (StringUtil.isCamelCase(str)) {
            resStr = str.charAt(0).toUpperCase() + str.substr(1);
        }
        else if (StringUtil.isTitleCase(str)) {
            resStr = str;
        }
        else if (StringUtil.isUnderscoreCase(str)) {
            var res = [str.charAt(0).toUpperCase()];
            for (var i = 1, size = str.length; i < size; i++) {
                var ch = str.charAt(i);
                if (ch === '_') {
                    if (i < size - 1) {
                        res.push(str.charAt(i + 1));
                        i++;
                    }
                }
                else {
                    res.push(ch);
                }
            }
            resStr = res.join('');
        }
        else {
            throw new Error("unknown case of str '" + str + "'");
        }
        return resStr;
    };
    /** Check if a string is camel case.
     * For example: {@code isUnderscoreCase("javaScript")}
     * returns: {@code true}
     * Or example: {@code isUnderscoreCase("Case")}
     * returns: {@code false}
     * @param {String} str: the string to check
     * @param {Boolean} true if {@code str} is camel case, false if not
     */
    StringUtil.isCamelCase = function (str) {
        var underscoreIndex = str.indexOf('_');
        if (underscoreIndex === 0) {
            throw new Error("invalid camelCase string starting with underscore '" + str + "'");
        }
        return underscoreIndex === -1 && str.charAt(0) !== str.charAt(0).toUpperCase();
    };
    /** Convert a string from title case or underscore case to camel case
     * @param {String} str: the string to convert
     * @return {String} the {@code str} converted to camel case if possible,
     * throws an error if the string's format is not recognized
     */
    StringUtil.toCamelCase = function (str) {
        var resStr = null;
        if (StringUtil.isCamelCase(str)) {
            resStr = str;
        }
        else if (StringUtil.isTitleCase(str)) {
            resStr = str.charAt(0).toUpperCase() + str.substr(1);
        }
        else if (StringUtil.isUnderscoreCase(str)) {
            var res = [str.charAt(0).toLowerCase()];
            for (var i = 1, size = str.length; i < size; i++) {
                var ch = str.charAt(i);
                if (ch === '_') {
                    if (i < size - 1) {
                        res.push(str.charAt(i + 1));
                        i++;
                    }
                }
                else {
                    res.push(ch);
                }
            }
            resStr = res.join('');
        }
        else {
            throw new Error("unknown case of str '" + str + "'");
        }
        return resStr;
    };
    StringUtil.testStringCase = function () {
        ["At_Bat_Cat", "ABC", "atBatCat", "CharAt"].forEach(function (str) {
            console.log(str + ": CamelCase: " + StringUtil.toCamelCase(str) +
                ", titleCase: " + StringUtil.toTitleCase(str) +
                ", toUnderscoreCase: " + StringUtil.toUnderscoreCase(str));
        });
    };
    return StringUtil;
})();
module.exports = StringUtil;
