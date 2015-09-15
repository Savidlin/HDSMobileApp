/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-2-9
 */
"use strict";
var _ = require("lodash");
var Defer = require("../modules/Defer");
var psLog = require("../modules/psLog");
var ObjectUtil = require("../utils/ObjectUtil");
var ServiceData = require("./ServiceData");
var Ps = require("../modules/main");
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
        $http.defaults.headers.get["Content-Type"] = "application/json";
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
        var httpRes = $http(ajaxSettings);
        httpRes["done"] = function (successCb, failureCb) {
            if (successCb) {
                httpRes.success(successCb);
            }
            if (failureCb) {
                httpRes.error(failureCb);
            }
        };
        return httpRes;
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
        $http.defaults.headers.post["Content-Type"] = "application/json";
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
        var httpRes = $http(ajaxSettings);
        httpRes["done"] = function (successCb, failureCb) {
            if (successCb) {
                httpRes.success(successCb);
            }
            if (failureCb) {
                httpRes.error(failureCb);
            }
        };
        return httpRes;
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
    Services.callJQueryGetService = function (relativeUrl, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties) {
        if (parameterNames === void 0) { parameterNames = null; }
        if (parameterValues === void 0) { parameterValues = null; }
        if (expectArrayResponse === void 0) { expectArrayResponse = false; }
        if (responseDataPropertyName === void 0) { responseDataPropertyName = null; }
        if (requestProperties === void 0) { requestProperties = {}; }
        var def = Defer.newDefer();
        var paramAry = [];
        if (parameterNames != null && parameterValues != null) {
            if (parameterNames.length !== parameterValues.length) {
                throw new Error("error calling service '" + relativeUrl + "', expected number of parameter names (" + parameterNames.length + ") to equal number of parameter values (" + parameterValues.length + ")");
            }
            for (var paramI = 0, size = parameterNames.length; paramI < size; paramI++) {
                paramAry.push(encodeURIComponent(parameterNames[paramI]) + "=" + encodeURIComponent(parameterValues[paramI]));
            }
        }
        var xhr = null;
        var ajaxSettings = _.extend(requestProperties, {
            url: Services.baseUrl() + relativeUrl + (paramAry.length > 0 ? "?" + paramAry.join("&") : ""),
            method: "GET",
            contentType: "application/json",
            timeout: Services.defaultTimeOut(),
            success: function (response) {
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
                def.resolve(results);
                return results;
            },
            error: function (xhr, ts, et) {
                def.reject({ xhr: xhr, textStatus: ts, errorThrown: et });
                return null;
            }
        });
        xhr = Ps.getJQuery().ajax(ajaxSettings);
        return def.promise;
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
    Services.callJQueryPostService = function (relativeUrl, data, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties) {
        if (parameterNames === void 0) { parameterNames = null; }
        if (parameterValues === void 0) { parameterValues = null; }
        if (expectArrayResponse === void 0) { expectArrayResponse = false; }
        if (responseDataPropertyName === void 0) { responseDataPropertyName = null; }
        if (requestProperties === void 0) { requestProperties = {}; }
        var def = Defer.newDefer();
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
        var xhr = null;
        var ajaxSettings = _.extend(requestProperties, {
            url: Services.baseUrl() + relativeUrl + (paramAry.length > 0 ? "?" + paramAry.join("&") : ""),
            method: "POST",
            timeout: Services.defaultTimeOut(),
            success: function (response) {
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
                def.resolve(results);
                return results;
            },
            error: function (xhr, ts, et) {
                def.reject({ xhr: xhr, textStatus: ts, errorThrown: et });
                return null;
            }
        });
        if (data != null) {
            ajaxSettings.contentType = "application/json";
            ajaxSettings.data = JSON.stringify(data);
        }
        xhr = Ps.getJQuery().ajax(ajaxSettings);
        return def.promise;
    };
    Services._baseUrl = "/";
    Services._pageBaseUrl = "/app/pages/";
    Services._defaultTimeOut = 600000;
    Services._handshakeTimeout = 30000;
    //checks online status
    Services.offlineChecked = false;
    return Services;
})();
var Services;
(function (Services) {
    var Customer = (function () {
        function Customer() {
        }
        Customer.search = function ($http, rangeCriteria, employeeCriteria) {
            return Util.svcCall("CustomerSvc.svc/Customer/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeeCriteria }, undefined, $http);
        };
        return Customer;
    })();
    Services.Customer = Customer;
    var Employee = (function () {
        function Employee() {
        }
        Employee.search = function ($http, rangeCriteria, employeeCriteria) {
            return Util.svcCall("EmployeeSvc.svc/Employee/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeeCriteria }, undefined, $http);
        };
        return Employee;
    })();
    Services.Employee = Employee;
    var EmployeePayHistory = (function () {
        function EmployeePayHistory() {
        }
        EmployeePayHistory.search = function ($http, rangeCriteria, employeePayHistoryCriteria) {
            return Util.svcCall("EmployeePayHistorySvc.svc/EmployeePayHistory/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: employeePayHistoryCriteria }, undefined, $http);
        };
        return EmployeePayHistory;
    })();
    Services.EmployeePayHistory = EmployeePayHistory;
    var Person = (function () {
        function Person() {
        }
        Person.search = function ($http, rangeCriteria, personCriteria) {
            return Util.svcCall("PersonSvc.svc/Person/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: personCriteria }, undefined, $http);
        };
        return Person;
    })();
    Services.Person = Person;
    var Product = (function () {
        function Product() {
        }
        Product.search = function ($http, rangeCriteria, productCriteria) {
            return Util.svcCall("ProductSvc.svc/Product/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: productCriteria }, undefined, $http);
        };
        return Product;
    })();
    Services.Product = Product;
    var SalesOrderDetail = (function () {
        function SalesOrderDetail() {
        }
        SalesOrderDetail.search = function ($http, rangeCriteria, salesOrderDetailCriteria) {
            return Util.svcCall("SalesOrderDetailSvc.svc/SalesOrderDetail/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesOrderDetailCriteria }, undefined, $http);
        };
        return SalesOrderDetail;
    })();
    Services.SalesOrderDetail = SalesOrderDetail;
    var SalesOrderHeader = (function () {
        function SalesOrderHeader() {
        }
        SalesOrderHeader.search = function ($http, rangeCriteria, salesOrderHeaderCriteria) {
            return Util.svcCall("SalesOrderHeaderSvc.svc/SalesOrderHeader/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesOrderHeaderCriteria }, undefined, $http);
        };
        return SalesOrderHeader;
    })();
    Services.SalesOrderHeader = SalesOrderHeader;
    var SalesPerson = (function () {
        function SalesPerson() {
        }
        SalesPerson.search = function ($http, rangeCriteria, salesPersonCriteria) {
            return Util.svcCall("SalesPersonSvc.svc/SalesPerson/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesPersonCriteria }, undefined, $http);
        };
        return SalesPerson;
    })();
    Services.SalesPerson = SalesPerson;
    var SalesTerritory = (function () {
        function SalesTerritory() {
        }
        SalesTerritory.search = function ($http, rangeCriteria, salesTerritoryCriteria) {
            return Util.svcCall("SalesTerritorySvc.svc/SalesTerritory/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: salesTerritoryCriteria }, undefined, $http);
        };
        return SalesTerritory;
    })();
    Services.SalesTerritory = SalesTerritory;
    var Store = (function () {
        function Store() {
        }
        Store.search = function ($http, rangeCriteria, storeCriteria) {
            return Util.svcCall("StoreSvc.svc/Store/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, { searchRange: rangeCriteria, searchCriteria: storeCriteria }, undefined, $http);
        };
        return Store;
    })();
    Services.Store = Store;
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
                    if ($http) {
                        return Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties, $http);
                    }
                    else {
                        return Services.callJQueryGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                    }
                case ServiceData.SvcType.DELETE:
                    throw new Error("unimplemented service call type 'DELETE'");
                case ServiceData.SvcType.POST:
                    if ($http) {
                        return Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties, $http);
                    }
                    else {
                        return Services.callJQueryPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                    }
                default:
                    throw new Error("unknown SvcType '" + callType + "'");
            }
        };
        return Util;
    })();
})(Services || (Services = {}));
module.exports = Services;
