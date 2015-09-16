"use strict";
import Dialogs = require("./Dialogs");

/** ErrorUtil namespace - utility functions for constructing/throwing common errors in HDSMobileApp
 * @author Benjamin
 * @since 2015-2-9
 */
class ErrorUtil {

    static showUserError(...msgs) {
        var msgStrs: string[] = [];
        var errs;
        for (var i = 0, size = msgs.length; i < size; i++) {
            var msg = msgs[i];
            if (!(msg instanceof Error)) {
                msgStrs.push(typeof msg === "string" ? msg : msg.valueOf().toString());
            }
            else {
                errs = (errs == null ? [] : errs);
                errs.push(msg);
            }
        }
        Dialogs.openDialog(msgStrs.join(" ") + "<br/>\n" +
            errs.map(function (err) { return err.stack; }).join("<br/>\n"));
    }


    static showServiceError(svcError, ...msgs) {
        Dialogs.openDialog(ErrorUtil.getErrorMessage(svcError, msgs.join(" ")));
    }


    static getErrorMessage(error: string | ServiceError | ServiceTransactionError, msg?: string): string {
        if (typeof error === "string") {
            return error;
        }
        else if (error.hasOwnProperty("xhr")) {
            return ErrorUtil.getServiceErrorMessage(<ServiceError>error, msg);
        }
        else if (error.hasOwnProperty("error")) {
            return ErrorUtil.getServiceTransactionErrorMessage(<ServiceTransactionError>error, msg);
        }
        else {
            return JSON.stringify(error);
        }
    }


    /** Return an error message for an error returned from one of the {@link Services} functions
     * such as: {@link Services#callHandshakeGetService()}
     * @param {Object} error: the error returned from a {@link Services} call
     * @param {String} [msg]: optional additional error message to include
     * @return {String} an error message containing as much relevent information
     * as possible from the error and optional message
     */
    static getServiceTransactionErrorMessage(error: ServiceTransactionError, msg?: string): string {
        if (error.isHandshakeError) {
            return "Check connection to server";
        }
        else {
            return ErrorUtil.getServiceErrorMessage(error.error);
        }
    }


    /** Return an error message for an error returned from one of the {@link Services} functions
     * such as: {@link Services#callGetService()}
     * @param {Object} error: the error returned from a {@link Services} call
     * @param {String} [msg]: optional additional error message to include
     * @return {String} an error message containing as much relevent information
     * as possible from the error and optional message
     */
    static getServiceErrorMessage(error: ServiceError, msg?: string): string {
        if (error && (error.xhr.status == 404 || error.xhr.status == 0 || error.textStatus.indexOf("abort") != -1 || error.textStatus == "timeout")) {
            return error.xhr.status + " " + error.xhr.statusText + ": " + (msg || '');
        }
        else if (error && error.xhr.responseText) {
            return (msg ? msg + ": " : "") + error.xhr.responseText;
        }
        else {
            return ((msg || error["Message"] || error["message"] || error) || "Please make sure the server is online.");
        }
    }


    /** Calls an error callback if not null and passes it the error message from the {@code err} parameter
     * @param {Function(Object)} errorCallback: the error callback to call
     * @param {Error|Object|String} err: an error or error message string to pass to {@code errorCallback}
     * @param {Boolean} [errorToString=true]: true or undefined to convert the {@code err} to a string
     * before passing it to {@code errorCallback}, false to pass the error without modifying it
     */
    static callFailureCallback(errorCallback: (err: string) => void, err, errorToString: boolean = true) {
        /** convert a error object or string to a string error message
         * @param {Error|Object|String} error the error object to conver to a message
         * @return {String} the error converted to a string message
         */
        function toStringFunc(error) {
            return (error != null ? (typeof error === "string" ? error : JSON.stringify(error)) : "error: null");
        }

        if (typeof errorCallback === "function") {
            if (errorToString === true || errorToString === undefined) {
                errorCallback(toStringFunc(err));
            }
            else if (errorToString === false) {
                errorCallback(toStringFunc(err));
            }
            else {
                throw new Error("incorrect usage (" + errorCallback + ", " + err + ", " + errorToString + "), expected (Function errorCallback, Object err[, Boolean errorToString])" +
                    ", error occurred: " + toStringFunc(err));
            }
        }
    }


    static newIllegalArgError(argName: string, arg: any, expected: string) {
        return new Error("illegal argument '" + argName + "': " + arg + ", expected: " + expected);
    }


    static newNullArgError(argName: string, arg: any, expected: string) {
        return new Error("null argument '" + argName + "': " + arg + ", expected: " + expected);
    }

}

// TypeScript syntax to nest static classes in a parent class
module ErrorUtil {

    /** Message class - utility methods for creating uniformly formated error messages across the app
     * @author Benjamin
     * @since 2015-2-9
     */
    export class Message {
        "use strict";

        static bidIdToString(bidId) {
            return "bid ID '" + bidId + "'";
        }


        static customerIdToString(customerId) {
            return "customer ID '" + customerId + "'";
        }

    }

}


export = ErrorUtil;
