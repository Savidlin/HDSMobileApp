/// <reference path="../tsDefinitions/lib/Q.d.ts" />
/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var Q = require("q");
/** Defer namespace
 * Miscellaneous functions for simplifying promise and async handling
 * @author Benjamin
 * @since 2015-1-26
 */
var Defer = (function () {
    function Defer() {
    }
    /** Create a deferred object with a 'promise' property
     * @return {PsDeferred} a PS deferred object with success and error return values
     */
    Defer.newDefer = function () {
        return Q.defer();
    };
    Defer.when = function (promises) {
        return Q.all(promises);
    };
    /** Run each object from {@code args} through {@code actionFunc} and return a deferred promise that completes when all of the actions complete
     * @param {Array} args: an array of objects to pass individually to {@code actionFunc}
     * @param {Function(Deferred, Object} actionFunc: this action is called with a unique deferred promise that must be resolved or rejected
     * somewhere in the action, and each object from {@code args} as a parameter
     * @return {Promise} a promise that returns an array of all of the results returned from the calls to {@code actionFunc}
     */
    Defer.runActionForAll = function (args, actionFunc) {
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var defs = args.map(function runActionForArg(arg) {
            var def = Q.defer();
            actionFunc(def, arg);
            return def.promise;
        });
        return Q.all(defs);
    };
    /** Run each object from {@code args} through {@code actionFunc} and return a deferred promise that completes when all of the actions complete
     * @param {Array} args: an array of objects to pass individually to {@code actionFunc}
     * @param {Function(Deferred, Object} actionFunc: this action is called with a unique deferred promise that must be resolved or rejected
     * somewhere in the action, and each object from {@code args} as a parameter
     * @param {Boolean} failOnFirstError: true to stop running the actions when the first one throws an error,
     * else continue running and return a list of successful results
     * @return {Promise} a promise that returns an array of all of the results returned from the calls to {@code actionFunc}
     */
    Defer.runActionForAllInSeries = function (args, actionFunc, stopOnFirstError) {
        if (stopOnFirstError === void 0) { stopOnFirstError = false; }
        if (typeof actionFunc !== "function") {
            throw new Error("incorrect arguments (" + args + "," + actionFunc + "), expected (Array, Function)");
        }
        var initalDfd = Q.defer();
        initalDfd.resolve(null);
        var results = [];
        var errors = [];
        // for each action/argument combination, chain it to the previous action result
        var promise = args.reduce(function runActionForArgInSeries(promise, arg) {
            function successCallNextAction(res) {
                results.push(res);
                var dfd = Q.defer();
                actionFunc(dfd, arg);
                return dfd.promise;
            }
            function failureCallNextAction(err) {
                errors.push(err);
                var dfd = Q.defer();
                actionFunc(dfd, arg);
                return dfd.promise;
            }
            // handle errors if all actions need to run
            if (!stopOnFirstError) {
                return promise.then(successCallNextAction, failureCallNextAction);
            }
            else {
                return promise.then(successCallNextAction);
            }
        }, initalDfd.promise);
        return promise.then(function (res) {
            results.push(res);
            // remove the first item since the initial promise in the args.reduce(...) call is a dummy promise to start the chain
            results.shift();
            return results;
        });
    };
    /** Chain one deferred to another, so resolve and reject callbacks pass from {@code srcPromise} to {@code dstPromise}
     * @param {Promise} srcPromise: the source promise to listen to via {@link Promise#then}
     * @param {Promise} dstPromise: the destination to pipe {@code srcPromise} {@link Promise#resolve} and {@link Promise#reject} callbacks to
     */
    Defer.chainTo = function (srcPromise, dstDfd) {
        srcPromise.then(function chainedPromiseSuccess(res) {
            dstDfd.resolve(res);
        }, function chainedPromiseFailure(err) {
            dstDfd.reject(err);
        });
    };
    /** Chain one deferred to another, so resolve and reject callbacks pass from {@code srcPromise} to {@code dstPromise}.
     * With optional success and failure functions that are called before the {@code dstProimse} is resolved/rejected.
     * @param {Promise} srcPromise: the source promise to listen to via {@link Promise#then}
     * @param {Promise} dstPromise: the destination to pipe {@code srcPromise} {@link Promise#resolve} and {@link Promise#reject} callbacks to
     * @param {Function(Object res):[Object]} [successCall]: optional function to call if {@code srcPromise} succeeds,
     * which can optionally modify the result forwarded to {@code dstPromise}
     * @param {Function(Object err):[Object]} [failureCall]: optional function to call if {@code srcPromise} fails,
     * which can optionally modify the error forwarded to {@code dstPromise}
     */
    Defer.chainToWith = function (srcPromise, dstDfd, successCall, failureCall) {
        if (srcPromise == null || dstDfd == null) {
            throw new Error("incorrect usage (" + srcPromise + ", " + dstDfd + ", ...), expected (Q.IPromise srcPromise, Q.Deferred: dstDfd, ...)");
        }
        srcPromise.then(function chainedWithActionPromiseSucess(res) {
            if (successCall) {
                var newRes = null;
                try {
                    newRes = successCall(res);
                }
                catch (successCallErr) {
                    dstDfd.reject(successCallErr);
                }
                if (newRes != null) {
                    res = newRes;
                }
            }
            dstDfd.resolve(res);
        }, function chainedWithActionPromiseFailure(err) {
            if (failureCall) {
                var newErr = null;
                try {
                    newErr = failureCall(err);
                }
                catch (failureCallErr) {
                    newErr = failureCallErr;
                }
                if (newErr != null) {
                    err = newErr;
                }
            }
            dstDfd.reject(err);
        });
    };
    return Defer;
})();
module.exports = Defer;
