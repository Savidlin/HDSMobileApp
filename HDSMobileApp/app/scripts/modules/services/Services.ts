/// <reference path="../../../tsDefinitions/mobileapp.d.ts" />
/// <reference path="../../../tsDefinitions/lib/jquery.d.ts" />
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
            expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties: JQueryAjaxSettings = {}): PsPromise<ServiceResult<any>, ServiceError> {
        var def = Defer.newDefer<PsDeferred<ServiceResult<any>, ServiceError>>();
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
        var ajaxSettings: JQueryAjaxSettings = _.extend(requestProperties, {
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
                def.resolve({ result: results, xhr: xhr });
                return results;
            },
            error: function (xhr, ts, et) {
                def.reject({ xhr: xhr, textStatus: ts, errorThrown: et });
                return null;
            }
        });

        xhr = Ps.getJQuery().ajax(ajaxSettings);

        return def.promise;
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
            expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties: JQueryAjaxSettings = {}): PsPromise<ServiceResult<any>, ServiceError> {
        var def = Defer.newDefer<PsDeferred<ServiceResult<any>, ServiceError>>();
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
        var ajaxSettings: JQueryAjaxSettings = _.extend(requestProperties, {
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
                def.resolve({ result: results, xhr: xhr });
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
    }


    /** call {@link Services#doHandshake()} followed by a GET web service request
      * @return {Promise}
     * resolve: @return {ServiceResult} response objects
     * reject: @return {ServiceError, Boolean serverOffline} the error object containing the XHR request,
     * the error title/descriptor and the server's error response text.
     * Second parameter is true if the handshake failed, false if the service call failed
     * @see Services#doHandshake()
     * @see Services#callPostService()
     */
    static callHandshakeGetService(relativeUrl: string, parameterNames: string[], parameterValues: string[],
            expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties?: JQueryAjaxSettings): PsPromise<ServiceResult<any>, ServiceTransactionError> {
        var def = Defer.newDefer<PsDeferred<ServiceResult<any>, ServiceTransactionError>>();
        Services.doHandshake(function () {
            Services.callGetService(relativeUrl, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties).done(function (res) {
                def.resolve(res);
            }, function (svcErr) {
                def.reject({
                    error: svcErr,
                    isHandshakeError: false
                });
            });
        }, function (xhr, ts, et) {
            def.reject({
                error: { xhr: xhr, textStatus: ts, errorThrown: et },
                isHandshakeError: true
            }); // server offline
        });

        return def.promise;
    }


    /** call {@link Services#doHandshake()} followed by a POST web service request
     * @return {Promise}
     * resolve: @return {ServiceResult} response objects
     * reject: @return {ServiceError, Boolean serverOffline} the error object containing the XHR request,
     * the error title/descriptor and the server's error response text.
     * Second parameter is true if the handshake failed, false if the service call failed
     * @see Services#doHandshake()
     * @see Services#callPostService()
     */
    static callHandshakePostService(relativeUrl: string, data, parameterNames: string[] = null, parameterValues: string[] = null,
            expectArrayResponse: boolean = false, responseDataPropertyName: string = null, requestProperties?: JQueryAjaxSettings): PsPromise<ServiceResult<any>, ServiceTransactionError> {
        var def = Defer.newDefer<PsDeferred<ServiceResult<any>, ServiceTransactionError>>();
        Services.doHandshake(function () {
            Services.callPostService(relativeUrl, data, parameterNames, parameterValues, expectArrayResponse, responseDataPropertyName, requestProperties).done(function (res) {
                def.resolve(res);
            }, function (svcErr) {
                def.reject({
                    error: svcErr,
                    isHandshakeError: false
                });
            });
        }, function (xhr, ts, et) {
            def.reject({
                error: { xhr: xhr, textStatus: ts, errorThrown: et },
                isHandshakeError: true
            }); // server offline
        });

        return def.promise;
    }


    /** Same as doHandshake, except the failure function takes a {@link ServiceTransactionError}
     * @see Services#doHandshake
     */
    static callHandshake(successFunc: () => void, failureFunc: (err: ServiceTransactionError) => void) {
        return Services.doHandshake(successFunc, function (xhr: JQueryXHR, textStatus: string, errorThrown: string) {
            failureFunc({
                error: { xhr: xhr, textStatus: textStatus, errorThrown: errorThrown },
                isHandshakeError: true
            });
        });
    }


    static doHandshake(successfunction: () => void, failurefunction: ServiceErrorFunction) {
        console.log("doHandshake: ", Ps.getJQuery());

        Ps.getJQuery().ajax({
            url: Services.baseUrl() + "LoginHandshakeService.svc/iSynch",
            method: "GET",
            timeout: Services.handshakeTimeout(),
            cache: false,
            success: function (result) {
                FunctionUtil.tryCatch(successfunction, function (errMsg) {
                    console.error(errMsg);
                    failurefunction(null, '', errMsg);
                });
            },
            error: function (xhr, textStatus, errorThrown) {

                psLog.logs.services.error("initial handshake error", xhr);

                if (xhr.status == 0 || textStatus.indexOf("Abort") != -1) {
                    if (typeof failurefunction != "undefined") {
                        failurefunction(xhr, textStatus, errorThrown);
                        return;
                    }
                }

                if (xhr.status == 404 && !Services.offlineChecked) {
                    // If any ajax errors because of a 404, we need to figure out if it's
                    // a 404 because they are not authenticated with web-sso or if they are actually offline
                    //need to see if a call to a non-websso page exists
                    psLog.logs.services.error("check if index.html exists");
                    Ps.getJQuery().ajax({
                        url: Services.baseUrl() + "../index.html",
                        method: "GET",
                        cache: false,
                        success: function (result) {
                            psLog.logs.login.debug("we are online but need to reauthenticate with websso");

                            //read GET vars into variable
                            var vars = {};
                            // TODO unknown function definition
                            var parts = Ps.getPageWindow().location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, <any>function (m, key, value) {
                                vars[key] = value;
                            });

                            // prevent a reload loop if there's a config error that makes the login
                            // service give a false 404
                            psLog.logs.login.trace("reauthenticate vars: ", vars);
                            if ("reload" in vars) {
                                failurefunction(null, '', "Preventing redirect loop");
                                return;
                            }

                            // add query string to force a non-cached copy of the page we're on so
                            // web-sso picks it up and sends us to login page
                            var key = "reload";
                            var value = Math.floor(Math.random() * 90000) + 10000;
                            var kvp = Ps.getPageDocument().location.search.substr(1).split('&');
                            var i = kvp.length;

                            while (i--) {
                                var x = kvp[i].split('=');

                                if (x[0] == key) {
                                    x[1] = value.toString();
                                    kvp[i] = x.join('=');
                                    break;
                                }
                            }

                            if (kvp.length === 0) {
                                kvp[kvp.length] = [key, value].join('=');
                            }

                            Services.offlineChecked = true;
                            Ps.getPageDocument().location.search = kvp.join('&');
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            Services.offlineChecked = true;
                            psLog.logs.services.info("we are in offline mode");
                            if (typeof failurefunction != "undefined") {
                                failurefunction(xhr, textStatus, errorThrown);
                                return;
                            }
                        }
                    });

                } else {
                    if (typeof failurefunction != "undefined") {
                        failurefunction(xhr, textStatus, errorThrown);
                        return;
                    }
                }
            }
        });
    }

}

module Services {

    export class UserMaster {

        static search(postData: any): PsPromise<ServiceResult<any>, ServiceError> {
            return <any>Util.svcCall(false, "UserMasterService.svc/UserMaster/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

    }


    class Util {

        static svcCall<T>(requireHandshake: boolean, url: string, callType: ServiceData.SvcType, urlParameters: { [index: string]: string },
            postDataType: ServiceData.SvcDataType, postData: any, requestProperties?: JQueryAjaxSettings): Q.Promise<T> {
            if (requireHandshake) {
                var urlParamKeys = null;
                var urlParamVals = null;
                if (urlParameters != null) {
                    urlParamKeys = Object.keys(urlParameters);
                    urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                }

                switch (callType) {
                    case ServiceData.SvcType.GET:
                        return <any>Services.callHandshakeGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                    case ServiceData.SvcType.DELETE:
                        throw new Error("unimplemented service call type 'DELETE'");
                    case ServiceData.SvcType.POST:
                        return <any>Services.callHandshakePostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                    default:
                        throw new Error("unknown SvcType '" + callType + "'");
                }
            }
            else {
                switch (callType) {
                    case ServiceData.SvcType.GET:
                        var urlParamKeys = null;
                        var urlParamVals = null;
                        if (urlParameters != null) {
                            urlParamKeys = Object.keys(urlParameters);
                            urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                        }
                        return <any>Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                    case ServiceData.SvcType.DELETE:
                        throw new Error("unimplemented service call type 'DELETE'");
                    case ServiceData.SvcType.POST:
                        return <any>Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                    default:
                        throw new Error("unknown SvcType '" + callType + "'");
                }
            }
        }

    }

}


export = Services;
