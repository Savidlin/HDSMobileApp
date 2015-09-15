"use strict";
/** EnumUtil namespace
 * for creating Javscript enums similar to Java enums
 * @author Benjamin
 * @since 2014-10-24
 */
var EnumUtils;
(function (EnumUtils) {
    /** EnumClass
     * The base class for all enum types
     * @author Benjamin
     * @since 2015-2-4
     */
    var EnumClass = (function () {
        function EnumClass(enumConstants, enumClass, enumConstantClass) {
            this.enumConstants = enumConstants;
            this.enumClass = enumClass;
            this.enumConstantClass = enumConstantClass;
        }
        EnumClass.prototype.isInstance = function (obj) {
            return obj != null && (obj.constructor != null &&
                ((obj.constructor.name === this.enumConstantClass.name) || obj instanceof this.enumConstantClass));
        };
        EnumClass.prototype.values = function () {
            return this.enumConstants;
        };
        EnumClass.prototype.parse = function (name) {
            var enumVal = null;
            if (this.enumClass.hasOwnProperty(name)) {
                enumVal = this.enumClass[name];
            }
            if (enumVal === null) {
                throw new Error("enum '" + name + "' is not a constant of enum class " + this.enumClass);
            }
            return enumVal;
        };
        return EnumClass;
    })();
    EnumUtils.EnumClass = EnumClass;
    /** EnumConstant
     * The base class for all enum constants to extend
     * @author Benjamin
     * @since 2015-2-4
     */
    var EnumConstantImpl = (function () {
        function EnumConstantImpl(name) {
            this._name = name;
        }
        EnumConstantImpl.prototype.name = function () {
            return this._name;
        };
        EnumConstantImpl.prototype.toString = function () {
            return this._name;
        };
        return EnumConstantImpl;
    })();
    EnumUtils.EnumConstantImpl = EnumConstantImpl;
})(EnumUtils || (EnumUtils = {}));
module.exports = EnumUtils;
