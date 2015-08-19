/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-2-9
 */
"use strict";
import _ = require("lodash");
import Defer = require("../Defer");
import psLog = require("../psLog");
import ObjectUtil = require("../utils/ObjectUtil");
import FunctionUtil = require("../utils/FunctionUtil");
import ServiceData = require("./ServiceData");
import Ps = require("../main");

/** Services namespace
 * Utility functions for invoking Powerscope web API services
 * @author Benjamin
 * @since 2014-11-25
 */
class Services {
    private static _baseUrl = "./";
    private static _pageBaseUrl = "/app/pages/";
    private static _defaultTimeOut = 600000;
    private static _handshakeTimeout = 30000;
    //checks online status
    static offlineChecked: boolean = false;


    static pageBaseUrl(): string {
        return Services._pageBaseUrl;
    }


    /** a url which, when added to the beginning of the current url, relatives it to the base powerscope app directory */
    static baseUrl(): string {
        return Services._baseUrl;
    }


    /** the default service call timeout period in milliseconds */
    static defaultTimeOut(): number {
        return Services._defaultTimeOut;
    }


    /** the default server handshake timeout period in milliseconds */
    static handshakeTimeout(): number {
        return Services._handshakeTimeout;
    }

    /** Call when a new page has been loaded (or the current page reloaded) by an outside source, such as the user
     * @param url optional new page URL being navigated to
     */
    static navigated(url?: string) {
        Services._baseUrl = "/";
    }


    /** call a web server using a GET request
     * @param {String} relativeUrl: the domain relative URL of the web service to call, for example "BidService.svc/Bid/GetById"
     * @param {Array<String>} parameterNames: an array of parameter names to include in the request URL, for example ["userIdentifier", "bidId"]
     * @param {Array<String>} parameterValues: an array of parameter values to include in the request URL, for example ["john_doe", 23848]
     * @param {Boolean} expectArrayResponse: true if the expected response is an array, false if the expected response is a single object
     * @param {String} [responseDataPropertyName]: the name of the property to return from the response object, if this value is null/undefined,
     * then the entire response object is returned as is when received
     * @return {Promise}
     * resolve: @return {ServiceResult} response objects
     * reject: @return {ServiceError} the error object containing the XHR request,
     * the error title/descriptor and the server's error response text
     */
    static callGetService(relativeUrl: string, parameterNames: string[] = null, parameterValues: string[] = null,
        expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties: angular.IRequestShortcutConfig = {},
        $http?: angular.IHttpService): angular.IHttpPromise<any> {
        var paramAry = [];
        if (parameterNames != null && parameterValues != null) {
            if (parameterNames.length !== parameterValues.length) {
                throw new Error("error calling service '" + relativeUrl + "', expected number of parameter names (" + parameterNames.length + ") to equal number of parameter values (" + parameterValues.length + ")");
            }
            for (var paramI = 0, size = parameterNames.length; paramI < size; paramI++) {
                paramAry.push(encodeURIComponent(parameterNames[paramI]) + "=" + encodeURIComponent(parameterValues[paramI]));
            }
        }

        // TODO workaround
        if ($http.defaults) {
            $http.defaults.headers.get["Content-Type"] = "application/json";
        }

        var requestDefaults: angular.IRequestConfig = {
            url: Services.baseUrl() + relativeUrl + (paramAry.length > 0 ? "?" + paramAry.join("&") : ""),
            method: "GET",
            timeout: Services.defaultTimeOut(),
            transformResponse: function (response) {
                var results = null;
                if (expectArrayResponse === true) {
                    results = [];
                    if (responseDataPropertyName != null) {
                        if (response[responseDataPropertyName] != null) {
                            results = response[responseDataPropertyName];
                        }
                    }
                    else {
                        results = response;
                    }
                }
                else {
                    if (responseDataPropertyName != null) {
                        results = response[responseDataPropertyName];
                    }
                    else {
                        results = response;
                    }
                }

                results = JSON.parse(results);
                return results;
            }
        };
        var ajaxSettings: angular.IRequestConfig = <any>_.extend(requestProperties, requestDefaults);

        return $http(ajaxSettings);
    }


    /** call a web server using a POST request
     * @param {String} relativeUrl: the domain relative URL of the web service to call, for example "BidSearchService.svc/BidSearch"
     * @param {Object} data: the object to encode using {@code JSON.stringify()} and send to the service
     * @param {Array<String>} parameterNames: an array of parameter names to include in the request URL, for example ["userIdentifier", "bidId"]
     * @param {Array<String>} parameterValues: an array of parameter values to include in the request URL, for example ["john_doe", 23848]
     * @param {Boolean} expectArrayResponse: true if the expected response is an array, false if the expected response is a single object
     * @param {String} [responseDataPropertyName]: the name of the property to return from the response object, if this value is null/undefined,
     * then the entire response object is returned as is when received
     * @return {Promise}
     * resolve: @return {ServiceResult} response objects
     * reject: @return {ServiceError} the error object containing the XHR request,
     * the error title/descriptor and the server's error response text
     */
    static callPostService(relativeUrl: string, data, parameterNames: string[] = null, parameterValues: string[] = null,
            expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties: angular.IRequestShortcutConfig = {},
            $http?: angular.IHttpService): angular.IHttpPromise<any> {
        var paramAry = [];
        if (parameterNames != null && parameterValues != null) {
            if (parameterNames.length !== parameterValues.length) {
                throw new Error("error calling service '" + relativeUrl + "', expected number of parameter names (" + parameterNames.length + ") to equal number of parameter values (" + parameterValues.length + ")");
            }
            for (var paramI = 0, size = parameterNames.length; paramI < size; paramI++) {
                paramAry.push(encodeURIComponent(parameterNames[paramI]) + "=" + encodeURIComponent(parameterValues[paramI]));
            }
        }
        psLog.logs.login.trace("calling post service", relativeUrl);

        // TODO workaround
        if ($http.defaults) {
            $http.defaults.headers.post["Content-Type"] = "application/json";
        }

        var defaultProperties: angular.IRequestConfig = {
            url: Services.baseUrl() + relativeUrl + (paramAry.length > 0 ? "?" + paramAry.join("&") : ""),
            method: "POST",
            timeout: Services.defaultTimeOut(),
            transformResponse: function (response) {
                var results = null;
                if (expectArrayResponse === true) {
                    results = [];
                    if (responseDataPropertyName != null) {
                        if (response[responseDataPropertyName] != null) {
                            results = response[responseDataPropertyName];
                        }
                    }
                    else {
                        results = response;
                    }
                }
                else {
                    if (responseDataPropertyName != null) {
                        results = response[responseDataPropertyName];
                    }
                    else {
                        results = response;
                    }
                }

                results = JSON.parse(results);
                return results;
            },
        };
        var ajaxSettings: angular.IRequestConfig = <any>_.extend(requestProperties, defaultProperties);

        if (data != null) {
            ajaxSettings.data = JSON.stringify(data);
        }

        return $http(ajaxSettings);
    }

}

module Services {

    export class Customer {
        static search($http: angular.IHttpService, rangeCriteria: any, employeeCriteria): angular.IHttpPromise<SearchResult<Models.Customer>> {
            return Util.svcCall("CustomerSvc.svc/Customer/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeeCriteria }, undefined, $http);
        }
    }


    export class Employee {
        static search($http: angular.IHttpService, rangeCriteria: any, employeeCriteria): angular.IHttpPromise<SearchResult<Models.Employee>> {
            return Util.svcCall("EmployeeSvc.svc/Employee/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeeCriteria }, undefined, $http);
        }
    }


    export class EmployeePayHistory {
        static search($http: angular.IHttpService, rangeCriteria: any, employeePayHistoryCriteria): angular.IHttpPromise<SearchResult<Models.EmployeePayHistory>> {
            return Util.svcCall("EmployeePayHistorySvc.svc/EmployeePayHistory/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeePayHistoryCriteria }, undefined, $http);
        }
    }


    export class Person {
        static search($http: angular.IHttpService, rangeCriteria: any, personCriteria): angular.IHttpPromise<SearchResult<Models.Person>> {
            return Util.svcCall("PersonSvc.svc/Person/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: personCriteria }, undefined, $http);
        }
    }


    export class Product {
        static search($http: angular.IHttpService, rangeCriteria: any, productCriteria): angular.IHttpPromise<SearchResult<Models.Product>> {
            return Util.svcCall("ProductSvc.svc/Product/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: productCriteria }, undefined, $http);
        }
    }


    export class SalesOrderDetail {
        static search($http: angular.IHttpService, rangeCriteria: any, salesOrderDetailCriteria): angular.IHttpPromise<SearchResult<Models.SalesOrderDetail>> {
            return Util.svcCall("SalesOrderDetailSvc.svc/SalesOrderDetail/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesOrderDetailCriteria }, undefined, $http);
        }
    }


    export class SalesOrderHeader {
        static search($http: angular.IHttpService, rangeCriteria: any, salesOrderHeaderCriteria): angular.IHttpPromise<SearchResult<Models.SalesOrderHeader>> {
            return Util.svcCall("SalesOrderHeaderSvc.svc/SalesOrderHeader/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesOrderHeaderCriteria }, undefined, $http);
        }
    }


    export class SalesPerson {
        static search($http: angular.IHttpService, rangeCriteria: any, salesPersonCriteria): angular.IHttpPromise<SearchResult<Models.SalesPerson>> {
            return Util.svcCall("SalesPersonSvc.svc/SalesPerson/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesPersonCriteria }, undefined, $http);
        }
    }


    export class SalesTerritory {
        static search($http: angular.IHttpService, rangeCriteria: any, salesTerritoryCriteria): angular.IHttpPromise<SearchResult<Models.SalesTerritory>> {
            return Util.svcCall("SalesTerritorySvc.svc/SalesTerritory/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesTerritoryCriteria }, undefined, $http);
        }
    }


    export class Store {
        static search($http: angular.IHttpService, rangeCriteria: any, storeCriteria): angular.IHttpPromise<SearchResult<Models.Store>> {
            return Util.svcCall("StoreSvc.svc/Store/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: storeCriteria }, undefined, $http);
        }
    }





    class Util {

        static svcCall<T>(url: string, callType: ServiceData.SvcType, urlParameters: { [index: string]: string },
                postDataType: ServiceData.SvcDataType, postData: any, requestProperties: angular.IRequestShortcutConfig,
                $http: angular.IHttpService): angular.IHttpPromise<T> {
            switch (callType) {
                case ServiceData.SvcType.GET:
                    var urlParamKeys = null;
                    var urlParamVals = null;
                    if (urlParameters != null) {
                        urlParamKeys = Object.keys(urlParameters);
                        urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                    }
                    return Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties, ($http || <any>Ps.getJQuery().ajax));
                case ServiceData.SvcType.DELETE:
                    throw new Error("unimplemented service call type 'DELETE'");
                case ServiceData.SvcType.POST:
                    return Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties, ($http || <any>Ps.getJQuery().ajax));
                default:
                    throw new Error("unknown SvcType '" + callType + "'");
            }
        }

    }

}


export = Services;
