/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

/** NumberUtil class
 * utility functions for converting numeric values to and from other formats
 * @author Benjamin
 * @since 2015-1-30
 */
class NumberUtil {


    /** Returns true if the input argument is a number or a valid string representation of a number, false if not
     */
    static isNumeric(n: number | string) {
        return NumberUtil.toNumber(n) != null;
    }


    /** Returns a number if the input argument is a number or a string representing a valid number, else returns null
     */
    static toNumber(n: string | number) {
        var val = null;
        return !isNaN((val = parseFloat(<any>n))) && isFinite(val) ? val : null;
    }


    /**
     * @param {Number} n: the number to check
     * @return {Boolean} true if the parameter is null or zero, false if not
     */
    static isNullOrZero(n: number): boolean {
        return n == null || n === 0;
    }


    static getNullableNumeric(val: JQuery): number {
        var value = <string>val.val();
        if ((<string>value.trim()).length === 0) {
            return null;
        }
        var num: number = <any>value * 1;
        return isNaN(num) ? null : num;
    }


    static roundTo(num: number, decimalPlaces: number): number {
        return parseFloat(num.toFixed(decimalPlaces));
    }


    static getNullableNumericPercent(val: JQuery): number {
        var value = <string>val.val();
        value = value.replace("%", "");
        if (value.trim().length === 0) {
            return null;
        }
        var num: number = <any>value * 1;
        return isNaN(num) ? null : num;
    }


    /** Convert NaN, null, or undefined numbers to zero, infinity remains as is.
     * Example: {@code orZero("string")}
     * returns: {@code 0}
     * Or example: {@code orZero("-12")}
     * returns: {@code -12}
     *
     * @param {String|Number} num: the number to check
     * @param {Boolean} infinityToZero: true to convert infinity (Infinity, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
     * to zero, false to leave it as is
     * @return {Number} the parsed number
     */
    static orZero(num: string, infinityToZero?: boolean): number;
    static orZero(num: number, infinityToZero?: boolean): number;
    static orZero(num: any, infinityToZero?: boolean): number {
        "use strict";
        var val = (num == null || typeof (num) == "number") ? num : parseFloat(num);
        return (num == null || isNaN(val) ||
            (infinityToZero === true && (val === Infinity ||
                val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
    }


    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param {String} value a value to convert to a currency value
     * @param {Number} decimalPlaces the number of decimal places to include
     * @param {Boolean} includeSeparator true to include a separator every {@code digitsBetweenSeparators} digits,
     * false for no separator
     * @param {Number} digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return {String} a string representing the formatted numeric value
     */
    static format(value: any, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string {
        return NumberUtil.formatNumeric(value, decimalPlaces, includeSeparator);
    }


    /** remove all non [0-9] or '.' characters and return the resulting parsed number
     */
    static formatToNumber(input): number {
        var num = Number(input.toString().replace(/[^0-9\.]+/g, "")); //parseFloat(input.toString().replace(/,/g, ''));
        return num;
    }


    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param {String} value a value to convert to a currency value
     * @param {Number} decimalPlaces the number of decimal places to include
     * @param {Boolean} includeSeparator true to include a separator every {@code digitsBetweenSeparators}
     * digits, false for no separator
     * @param {Number} digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return {String} a string representing the formatted numeric value
     */
    static formatNumeric(value: any, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string {
        "use strict";
        if (value == null) {
            return value;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (/(^(\+|\-)(0|([1-9][0-9]*))(\.[0-9]+)?$)|(^(0{0,1}|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num: string = Number(val).toFixed(decimalPlaces);
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
        var result: string = "";
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
    }



    /** Prepend padding to a string or number until it reaches a maximum length
     * @param {Object|String|Number}: the value to convert to a string and pad
     * @param {Integer} maxDigits: the maximum length of the returned string
     * @param {String} [padChar]: an optional character to use as the left padding instead of '0'
     * @return {String} the {@code value} converted to a string padded with {@code padChar} or '0'
     */
    static padZeroLeft(value, maxDigits: number, padChar?: string): string {
        "use strict";
        if (String(value).length > maxDigits) {
            return value;
        }
        if (value && value.toString().indexOf(".") > 0) {
            value = parseFloat(value).toFixed(2);
            value = value.toString().replace(".", "");
        }
        return value ? new Array(maxDigits - String(value).length + 1).join(padChar || '0') + value : value;
    }


    /*static getValidNumberValue(value: any): number {
        if (value) {
            var v = value * 1;
            return (isNaN(v) || v == Number.POSITIVE_INFINITY || v == Number.NEGATIVE_INFINITY) ? 0 : value;
        } else {
            return 0;
        }
    }*/

}


export = NumberUtil;