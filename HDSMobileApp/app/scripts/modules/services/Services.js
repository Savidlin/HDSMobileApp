/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-2-9
 */
"use strict";
var _ = require("lodash");
var psLog = require("../psLog");
var ObjectUtil = require("../utils/ObjectUtil");
var ServiceData = require("./ServiceData");
var Ps = require("../main");
/** Services namespace
 * Utility functions for invoking Powerscope web API services
 * @author Benjamin
 * @since 2014-11-25
 */
var Services = (function () {
    function Services() {
    }
    Services.pageBaseUrl = function () {
        return Services._pageBaseUrl;
    };
    /** a url which, when added to the beginning of the current url, relatives it to the base powerscope app directory */
    Services.baseUrl = function () {
        return Services._baseUrl;
    };
    /** the default service call timeout period in milliseconds */
    Services.defaultTimeOut = function () {
        return Services._defaultTimeOut;
    };
    /** the default server handshake timeout period in milliseconds */
    Services.handshakeTimeout = function () {
        return Services._handshakeTimeout;
    };
    /** Call when a new page has been loaded (or the current page reloaded) by an outside source, such as the user
     * @param url optional new page URL being navigated to
     */
    Services.navigated = function (url) {
        Services._baseUrl = "/";
    };
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
    Services.callGetService = function (relativeUrl, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties, $http) {
        if (parameterNames === void 0) { parameterNames = null; }
        if (parameterValues === void 0) { parameterValues = null; }
        if (expectArrayResponse === void 0) { expectArrayResponse = false; }
        if (responseDataPropertyName === void 0) { responseDataPropertyName = null; }
        if (requestProperties === void 0) { requestProperties = {}; }
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
        var requestDefaults = {
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
        var ajaxSettings = _.extend(requestProperties, requestDefaults);
        return $http(ajaxSettings);
    };
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
    Services.callPostService = function (relativeUrl, data, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties, $http) {
        if (parameterNames === void 0) { parameterNames = null; }
        if (parameterValues === void 0) { parameterValues = null; }
        if (expectArrayResponse === void 0) { expectArrayResponse = false; }
        if (responseDataPropertyName === void 0) { responseDataPropertyName = null; }
        if (requestProperties === void 0) { requestProperties = {}; }
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
        var defaultProperties = {
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
        var ajaxSettings = _.extend(requestProperties, defaultProperties);
        if (data != null) {
            ajaxSettings.data = JSON.stringify(data);
        }
        return $http(ajaxSettings);
    };
    Services._baseUrl = "./";
    Services._pageBaseUrl = "/app/pages/";
    Services._defaultTimeOut = 600000;
    Services._handshakeTimeout = 30000;
    //checks online status
    Services.offlineChecked = false;
    return Services;
})();
var Services;
(function (Services) {
    var Employee = (function () {
        function Employee() {
        }
        Employee.search = function ($http, rangeCriteria, employeeCriteria) {
            var promise = Util.svcCall("EmployeeSvc.svc/Employee/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeeCriteria }, undefined, $http);
            return promise;
        };
        return Employee;
    })();
    Services.Employee = Employee;
    var Util = (function () {
        function Util() {
        }
        Util.svcCall = function (url, callType, urlParameters, postDataType, postData, requestProperties, $http) {
            switch (callType) {
                case ServiceData.SvcType.GET:
                    var urlParamKeys = null;
                    var urlParamVals = null;
                    if (urlParameters != null) {
                        urlParamKeys = Object.keys(urlParameters);
                        urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                    }
                    return Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties, ($http || Ps.getJQuery().ajax));
                case ServiceData.SvcType.DELETE:
                    throw new Error("unimplemented service call type 'DELETE'");
                case ServiceData.SvcType.POST:
                    return Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties, ($http || Ps.getJQuery().ajax));
                default:
                    throw new Error("unknown SvcType '" + callType + "'");
            }
        };
        return Util;
    })();
})(Services || (Services = {}));
module.exports = Services;
