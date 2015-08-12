/// <reference path="./lib/log4javascript.d.ts" />
/// <reference path="./lib/numeral.d.ts" />
/// <reference path="./lib/Q.d.ts" />
/// <reference path="../scripts/models/Models.d.ts" />
/// <reference path="../scripts/models/SvcModels.d.ts" />
/// <reference path="../scripts/models/OptionalPropModels.d.ts" />
/// <reference path="../scripts/models/OptionalPropSvcModels.d.ts" />
/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @author Benjamin
 * @since 2015-2-9
 */


/** static jQuery plugins/custom extensions used by the project */
interface JQueryStatic {
    cookie: (key: string, value?, options?) => string;
    removeCookie: (key: string, options?) => boolean;

    Storage: {
        set(key: string, value: string): string;
        set(obj: { [index: string]: string }): string;
        get(key: string): string;
        remove: (key: string) => boolean;
    }

}

/** jQuery plugins/custom extensions used by the project */
interface JQuery {
    /** centers the CSS position of an object within the window using "position: absolute" */
    center(): void;

    /** jquery.scrollTableBody library interface */
    scrollTableBody(options: { rowsToDisplay: number; }): void;

    /** script.js customSelect library interface
     * Custom jQuery dropdown box widget
     * @param {String} command: the command to carry out on the select
     * @param {String|Number} param: a number or string who's use depends on the command being called:
     * used by {@code command=="value"} to select the dropdown item who's 'data-value' attribute matches this value,
     * used by {@code command=="valueIndex"} to select the the Nth dropdown item via {@code $(...).eq(param)} (expects a number),
     */
    customSelect(command?: "reset", param?: string | number): JQuery;
    customSelect(command?: "value", param?: string | number): JQuery;
    customSelect(command?: "valueIndex", param?: string | number): JQuery;
    customSelect(command?: "previousValue", param?: string | number): JQuery;
    customSelect(command?: string, param?: string | number): JQuery;

    /** jquery.handsontable.full.js StickyTableHeaders plugin
     */
    stickyTableHeaders(options?: string | { fixedOffset?: number | JQuery; scrollableArea?: Element | JQuery; }): JQuery;
}

interface ArrayLike<T> {
    length: number;
    [index: number]: T;
}

interface GetSize {
    (): number;
}

interface GetIndex<T> {
    (index: number): T;
}

interface IndexedData<T> {
    get(index: number): T;
}

interface IndexedSized<T> extends IndexedData<T> {
    size: GetSize;
}


interface ItemMasterSearchCriteria {
    user_identifier: string;
    branches: number[]; // Branch_Number
    customers: number[]; // Customer_Number
    pricing_profiles: string[]; // Pricing_Profile_Number_# [1, 6]
    packages: string[]; // Package_Number
    language: string;
    pricing?: boolean;
    fast_lookups?: string[];
}

interface UserProfileData {
    user_identifier: string;
    branches: number[];
    customers: number[];
    pricing_profiles: string[];
    packages: string[];
    language: string;
}

interface PsLogs {
    login: log4javascript.Logger;
    syncing: log4javascript.Logger;
    services: log4javascript.Logger;
}

interface PsBidRelatedData {
    Bid_ID: number;
}

interface PsBidRelatedDataOptionalModel {
    Bid_ID?: number;
}

interface PsSyncable {
    Last_Update_Date: number;
    Synched: boolean;
    Deleted: boolean;
}

interface PsSyncableOptionalModel {
    Last_Update_Date?: number;
    Synched?: boolean;
    Deleted?: boolean;
}

interface PsBidStatus {
    Bid_Status_ID: number;
    Name: string;
}

interface PsPromise<T, R> extends Q.Promise<T> {
    then<U>(onFulfill?: (value: T) => U | Q.IPromise<U>, onReject?: (error: R) => U | Q.IPromise<U>, onProgress?: (progress: any) => any): Q.Promise<U>;
    done<U>(onFulfilled?: (value: T) => U | Q.IPromise<U>, onRejected?: (reason: R) => U | Q.IPromise<U>, onProgress?: (progress: any) => any): void;
}

interface PsPromiseVoid extends PsPromise<void, void> {
}

interface PsPromiseError<R> extends PsPromise<void, R> {
}

interface PsPromiseErrorString extends PsPromise<void, string> {
}

interface PsDeferred<T, R> extends Q.Deferred<T> {
    promise: PsPromise<T, R>;
    reject(reason: R): void;
}

interface PsDeferredVoid extends Q.Deferred<void> {
    promise: PsPromise<void, void>
    resolve(result?: void);
    reject(reason?: void);
}

interface PsDeferredError<R> extends PsDeferred<void, R> {
    resolve();
    reject(error: R);
}

interface PsDeferredErrorString extends PsDeferredError<string> {
}


interface UrlInfo {
    url: string;
    parameterNames: string[];
    absolute: boolean;
}


interface UrlInst {
    pageInfo: UrlInfo;
    parameterValues: string[];
}

interface StringMap<T> {
    [id: string]: T
}

interface ServiceErrorFunction {
    (xhr: JQueryXHR, textStatus: string, errorThrown: string): void;
}

interface ServiceError {
    xhr: JQueryXHR;
    textStatus: string;
    errorThrown: string;
}

interface ServiceTransactionError {
    error: ServiceError;
    isHandshakeError: boolean;
}

interface ServiceResult<T> {
    xhr: JQueryXHR;
    result: T;
}


// TODO remove once all package functionality is moved to TypeScript and PackageGrid can directly access EditPackagePage's current package, similar to link between GridHelper and editBid.js
interface PackageLegacyProxy {
    addItemAction(index, rows);
    getPackageInfo(): PackageInfo;
}


interface PackageInfo {
    packageId: number;
    isMaster: boolean;
    seq: number;
    itemIds: any[];
}


interface ModelProperty {
    /** the property's data type, used to fill in default 'value', 'toService', 'toLocal', etc. */
    type: string; //PropertyType;
    /** default value of the property */
    value?: any;
    /** overrides 'properties.toServiceNameConverter' */
    serviceName?: string;
    /** the service property's data type, defaults to the same value as 'type' */
    serviceType?: string; //PropertyType;
    /** template code can be used to convert the property to a value that can be sent to a web service */
    toService?: string;
    /** template code can be used to get this property from another object and convert it to a valid value for this model */
    toLocal?: string;
    /** true if this property is a primary key for the model, false or absent if not */
    primaryKey?: boolean;
    /** true if this property should be automatically generated (only applies to 'primaryKey: true' properties), false or absent if not */
    autoGenerate?: boolean;
    /** true to require this property in model with optional properties,
     * 'primaryKey' properties are implicitely required */
    required?: boolean;
}


interface ModelDefinition {
    toServiceNameConverter: (string) => string; // a function that takes a 'properties.propName' string and converts it to a different format for service calls
    /** the properties/fields this model has, see {@link ModelProperty} */
    properties: { [id: string]: ModelProperty };
}


interface TypeInfo {
    dataType: string;
}


interface PropInfo extends TypeInfo {
    paramName?: string;
    required?: boolean
}


interface LocalStoreI {

    /** Get the value associated with a key
     * @param {String} key: the name of the value to retrieve
     * @param {Boolean} [plainString=false]: true to return the retrieved value as is, false to parse it before returning it
     * @param {Object} the value associated with the key, or null if the key does not exist
     */
    getItem(key: string, plainString?: boolean): any;

    /**
     * @param {String} key: the key to lookup
     * @return true if the item exist, false if not
     */
    hasItem(key: string): boolean;

    /** Associate a value with a specific key
     * @param {String} key: the key
     * @param {Object} value: the value to associate with the key
     * @param {Boolean} [plainString=false]: true to return the retrieved value as is, false to parse it before returning it
     */
    setItem(key: string, value: any, plainString?: boolean);

    /** Remove a key and it's associated value
     * @param {String} key: the key to remove
     */
    removeItem(key: string);

    /**
     * @return {Array<String>} a set of all the keys this collection contains
     */
    getKeys(): string[];
}

interface UniqueStoreI {

    /** Get the value associated with a key
     * @param {String} key: the name of the value to retrieve
     * @param {Boolean} [plainString=false]: true to return the retrieved value as is, false to parse it before returning it
     * @param {Object} the value associated with the key, or null if the key does not exist
     */
    getItem(key: string, plainString?: boolean): any;

    /**
     * @param {String} key: the key to lookup
     * @return true if the item exist, false if not
     */
    hasItem(key: string): boolean;

    /** Add a new value to this collection
     * @param {String} key: the key
     * @param {Object} value: the value to associate with the key
     * @param {Boolean} [plainString=false]: true to return the retrieved value as is, false to parse it before returning it
     * @return {String} the newly generated unique key for {@code value}
     */
    addItem(value: any, plainString?: boolean): string;

    /** Remove a key and it's associated value
     * @param {String} key: the key to remove
     */
    removeItem(key: string);

    /**
     * @return {Array<String>} a set of all the keys this collection contains
     */
    getKeys(): string[];
}


interface Exporter {
    Excel: {
        exportExcel: (headers: string[], data: any[][]| any[], fileName: string, saveAs, requireJS) => void;
    };
    Ecb: {
        exportEcb: (fileContent, fileName: string, saveAs) => void;
    };
    Pdf: {
        exportPdf: (headers: { name: string; prompt: string; width: number; }[], data: any[][]| any[], fileName: string, jsPDF) => void;
    };
    Util: {
        isIPad(): boolean;
        toBase64(str: string): string;
        base64toBlob(a, b): Blob;
    };
}


interface UiUtilI {

    /* these are used in dynamic loading of values to provide a spinner as a placeholder until a value is obtained - used in Tax Calculation on Summary page, for example*/
    showSpinner(selector: string, ctx?: JQuery | Element);

    hideSpinner(selector: string, ctx?: JQuery | Element);

}

/* Additions to add to lib.d.ts until ES6 is fully supported by TypeScript
parseFloat(val: string | number): number;
parseInt(val: string | number, radix?: number): number;
Number {
    EPSILON: number;
    MIN_SAFE_INTEGER: number;
    MAX_SAFE_INTEGER: number;
    isFinite(val: number): boolean;
    isInteger(val: number): boolean;
    isSafeInteger(val: number): boolean;
    isNaN(val: string | number): boolean;
    parseFloat(val: string | number): number;
    parseInt(val: string | number, radix?: number): number;
}
*/
