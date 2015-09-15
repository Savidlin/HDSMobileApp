"use strict";
/** NumberUtil class
 * utility functions for converting numeric values to and from other formats
 * @author Benjamin
 * @since 2015-1-30
 */
var NumberUtil = (function () {
    function NumberUtil() {
    }
    /** Returns true if the input argument is a number or a valid string representation of a number, false if not
     */
    NumberUtil.isNumeric = function (n) {
        return NumberUtil.toNumber(n) != null;
    };
    /** Returns a number if the input argument is a number or a string representing a valid number, else returns null
     */
    NumberUtil.toNumber = function (n) {
        var val = null;
        return !isNaN((val = parseFloat(n))) && isFinite(val) ? val : null;
    };
    /**
     * @param {Number} n: the number to check
     * @return {Boolean} true if the parameter is null or zero, false if not
     */
    NumberUtil.isNullOrZero = function (n) {
        return n == null || n === 0;
    };
    NumberUtil.getNullableNumeric = function (val) {
        var value = val.val();
        if (value.trim().length === 0) {
            return null;
        }
        var num = value * 1;
        return isNaN(num) ? null : num;
    };
    NumberUtil.roundTo = function (num, decimalPlaces) {
        return parseFloat(num.toFixed(decimalPlaces));
    };
    NumberUtil.getNullableNumericPercent = function (val) {
        var value = val.val();
        value = value.replace("%", "");
        if (value.trim().length === 0) {
            return null;
        }
        var num = value * 1;
        return isNaN(num) ? null : num;
    };
    NumberUtil.orZero = function (num, infinityToZero) {
        "use strict";
        var val = (num == null || typeof (num) == "number") ? num : parseFloat(num);
        return (num == null || isNaN(val) ||
            (infinityToZero === true && (val === Infinity ||
                val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
    };
    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param {String} value a value to convert to a currency value
     * @param {Number} decimalPlaces the number of decimal places to include
     * @param {Boolean} includeSeparator true to include a separator every {@code digitsBetweenSeparators} digits,
     * false for no separator
     * @param {Number} digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return {String} a string representing the formatted numeric value
     */
    NumberUtil.format = function (value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        return NumberUtil.formatNumeric(value, decimalPlaces, includeSeparator);
    };
    /** remove all non [0-9] or '.' characters and return the resulting parsed number
     */
    NumberUtil.formatToNumber = function (input) {
        var num = Number(input.toString().replace(/[^0-9\.]+/g, "")); //parseFloat(input.toString().replace(/,/g, ''));
        return num;
    };
    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param {String} value a value to convert to a currency value
     * @param {Number} decimalPlaces the number of decimal places to include
     * @param {Boolean} includeSeparator true to include a separator every {@code digitsBetweenSeparators}
     * digits, false for no separator
     * @param {Number} digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return {String} a string representing the formatted numeric value
     */
    NumberUtil.formatNumeric = function (value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        "use strict";
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        if (value == null) {
            return value;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (/(^(\+|\-)(0|([1-9][0-9]*))(\.[0-9]+)?$)|(^(0{0,1}|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num = Number(val).toFixed(decimalPlaces);
        // split the number into decimal and whole number parts
        var valueParts = num.toString().trim().split(".");
        var valueStr = valueParts[0];
        // remove leading +- sign, so that values like -821999.00 does not become -,821,999.00
        var isNegative = false;
        if (valueStr.indexOf("+") === 0) {
            valueStr = valueStr.substr(1, valueStr.length - 1);
        }
        else if (valueStr.indexOf("-") === 0) {
            valueStr = valueStr.substr(1, valueStr.length - 1);
            isNegative = true;
        }
        var result = "";
        if (decimalPlaces > 0) {
            var decimals = valueParts[1];
            result = "." + decimals;
        }
        // add separators every N-characters
        if (includeSeparator === true) {
            for (var size = valueStr.length; size > 0; size -= digitsBetweenSeparators) {
                result = (size - digitsBetweenSeparators > 0 ? "," : "") + valueStr.substring((size - digitsBetweenSeparators > 0 ? size - digitsBetweenSeparators : 0), size) + result;
            }
        }
        else {
            result = valueStr + result;
        }
        result = (isNegative ? "-" + result : result);
        return result;
    };
    /** Prepend padding to a string or number until it reaches a maximum length
     * @param {Object|String|Number}: the value to convert to a string and pad
     * @param {Integer} maxDigits: the maximum length of the returned string
     * @param {String} [padChar]: an optional character to use as the left padding instead of '0'
     * @return {String} the {@code value} converted to a string padded with {@code padChar} or '0'
     */
    NumberUtil.padZeroLeft = function (value, maxDigits, padChar) {
        "use strict";
        if (String(value).length > maxDigits) {
            return value;
        }
        if (value && value.toString().indexOf(".") > 0) {
            value = parseFloat(value).toFixed(2);
            value = value.toString().replace(".", "");
        }
        return value ? new Array(maxDigits - String(value).length + 1).join(padChar || '0') + value : value;
    };
    return NumberUtil;
})();
module.exports = NumberUtil;
