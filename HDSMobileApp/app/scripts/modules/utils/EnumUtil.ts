"use strict";
import ArrayUtil = require("./ArrayUtil");
import ObjectUtil = require("./ObjectUtil");

/** EnumUtil namespace
 * for creating Javscript enums similar to Java enums
 * @author Benjamin
 * @since 2014-10-24
 */
module EnumUtils {

    /** EnumType
     * The interface that all enum classes should inherit from
     * @author Benjamin
     * @since 2014-11-3
     */
    export interface EnumType<T> /* extends Object */ {

        isInstance(obj): boolean;

        values(): T[];

        parse(name: string): T;

    }


    export interface EnumConstantInterface {

        name(): string;

        toString(): string;

    }


    /** EnumClass
     * The base class for all enum types
     * @author Benjamin
     * @since 2015-2-4
     */
    export class EnumClass<T> implements EnumType<T> {
        private enumConstants: T[];
        private enumClass;
        private enumConstantClass;


        constructor(enumConstants: T[], enumClass, enumConstantClass) {
            this.enumConstants = enumConstants;
            this.enumClass = enumClass;
            this.enumConstantClass = enumConstantClass;
        }


        public isInstance(obj): boolean {
            return obj != null && (obj.constructor != null &&
                ((obj.constructor.name === this.enumConstantClass.name) || obj instanceof this.enumConstantClass));
        }


        public values() {
            return this.enumConstants;
        }


        public parse(name: string): T {
            var enumVal: T = null;
            if (this.enumClass.hasOwnProperty(name)) {
                enumVal = this.enumClass[name];
            }
            if (enumVal === null) {
                throw new Error("enum '" + name + "' is not a constant of enum class " + this.enumClass);
            }
            return enumVal;
        }

    }


    /** EnumConstant
     * The base class for all enum constants to extend
     * @author Benjamin
     * @since 2015-2-4
     */
    export class EnumConstantImpl implements EnumConstantInterface {
        private _name: string;


        constructor(name: string) {
            this._name = name;
        }


        public name() {
            return this._name;
        }


        public toString() {
            return this._name;
        }

    }

}


export = EnumUtils;
