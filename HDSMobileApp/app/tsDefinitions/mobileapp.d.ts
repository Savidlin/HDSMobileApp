/// <reference path="./lib/angularjs/angular.d.ts" />
/// <reference path="./lib/jquery/jquery.d.ts" />
/// <reference path="./lib/lodash.d.ts" />
/// <reference path="./lib/log4javascript.d.ts" />
/// <reference path="./lib/numeral.d.ts" />
/// <reference path="./lib/Q.d.ts" />
/// <reference path="../models/Models.d.ts" />
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

/*interface ArrayLike<T> {
    length: number;
    [index: number]: T;
}*/

interface StringMap<T> {
    [id: string]: T
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


interface PsLogs {
    login: log4javascript.Logger;
    syncing: log4javascript.Logger;
    services: log4javascript.Logger;
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

interface SearchResult<T> {
    TotalPages: number;
    PageNumber: number;
    TotalRecords: number;
    Items: T[];
}


/**
 * @param <T> the type of view object returned
 */
interface WidgetView<T> {
    initView: (appTools: Main, ngApp: ng.IModule) => T;
    deregister: (appTools: Main, view: T) => void;
}


interface NgAppBootstrapper<T> {
    initNgApp: (appTools: Main, ngAppName: string) => { app: T; ngAppModule: ng.IModule };
    deregisterApp: (appTools: Main, data: { app: T; ngAppModule: ng.IModule }) => void;
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


interface Main {

    getPageDocument(): Document;

    getJQuery(): JQueryStatic;

    getJQueryContext(): JQuery;

    getUiUtil(): UiUtilI;

    getPageWindow(): Window;

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
