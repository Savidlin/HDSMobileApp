/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-1-20
 */
var _ = require("lodash");
var ProcessLogs;
(function (ProcessLogs) {
    /* ProcessLog class
     * Loading and Performance tracking
     * @author Benjamin
     * @since 2014-10-1
     */
    var ProcessLog = (function () {
        function ProcessLog(name, steps, start) {
            this.setProcessStoppedCallback = function (cb) {
                if (typeof cb !== "function") {
                    throw new Error("process stopped callback '" + cb + "' must be a function");
                }
                this.processStoppedCallback = cb;
            };
            this.setProcessCompletedCallback = function (cb) {
                if (typeof cb !== "function") {
                    throw new Error("process completed callback '" + cb + "' must be a function");
                }
                this.processCompletedCallback = cb;
            };
            this.setProcessErrorCallback = function (cb) {
                if (typeof cb !== "function") {
                    throw new Error("process error callback '" + cb + "' must be a function");
                }
                this.processErrorCallback = cb;
            };
            "use strict";
            this.name = name ? name : "";
            this.startTime = null;
            this.endTime = null;
            this.errorStop = false;
            this.error = null;
            this.errorMsg = null;
            this.initialStepCount = steps != null ? steps : -1;
            this.stepCount = 0;
            this.steps = [];
            this.stepCompletedCallback = null;
            this.processStoppedCallback = null;
            this.processCompletedCallback = null;
            this.processErrorCallback = null;
            /** functions that are called when a step is completed or all steps are completed */
            this.stepDone = function (step) {
                if (this.stepCompletedCallback) {
                    this.stepCompletedCallback(step || this.steps[this.steps.length - 1]);
                }
            };
            this.processStopped = function () {
                if (this.processStoppedCallback) {
                    this.processStoppedCallback();
                }
            };
            this.processDone = function () {
                if (this.processCompletedCallback) {
                    this.processCompletedCallback();
                }
            };
            this.processError = function (err, errorMsg) {
                if (this.processErrorCallback) {
                    this.processErrorCallback(err || this.error, errorMsg || this.errorMsg);
                }
            };
            if (start === true) {
                this.startLog();
            }
        }
        ProcessLog.prototype.setStepCompletedCallback = function (cb) {
            if (typeof cb !== "function") {
                throw new Error("steps completed callback '" + cb + "' must be a function");
            }
            this.stepCompletedCallback = cb;
        };
        ProcessLog.prototype.startLog = function (steps) {
            "use strict";
            if (this.startTime != null) {
                throw new Error("cannot start process log more than once");
            }
            if (steps) {
                this.initialStepCount = steps;
                this.stepCount = 0;
            }
            this.startTime = Date.now();
        };
        ProcessLog.prototype.stopLog = function () {
            "use strict";
            if (this.endTime != null) {
                return;
            }
            this.endTime = Date.now();
            if (this.errorStop === false) {
                if (this.stepCount === this.initialStepCount) {
                    this.processDone();
                }
                else {
                    this.processStopped();
                }
            }
            else {
                this.processError(this.error, this.errorMsg);
            }
        };
        ProcessLog.prototype.errorLog = function (error, errorMsg) {
            "use strict";
            this.errorStop = true;
            this.error = error;
            this.errorMsg = errorMsg;
            this.stopLog();
        };
        ProcessLog.prototype.completeStep = function (msg) {
            "use strict";
            if (this.stepCount === this.initialStepCount) {
                throw new Error("cannot complete any more steps, all steps have already been completed");
            }
            if (this.errorStop === true) {
                throw new Error("cannot complete any more steps, process threw error");
            }
            this.stepCount++;
            var deltaTime = null;
            var timeStamp = Date.now();
            if (this.steps.length > 0) {
                deltaTime = timeStamp - this.steps[this.steps.length - 1].timeStamp;
            }
            else if (this.startTime != null) {
                deltaTime = timeStamp - this.startTime;
            }
            else {
                throw new Error("cannot complete a step before calling startLog()");
            }
            var completedStep = new LogStep(timeStamp, deltaTime, msg ? msg : "", this.stepCount, this.initialStepCount > -1 ? this.initialStepCount : null);
            this.steps.push(completedStep);
            this.stepDone(completedStep);
            if (this.stepCount === this.initialStepCount) {
                this.stopLog();
            }
            return completedStep;
        };
        ProcessLog.prototype.isRunning = function () {
            return this.startTime != null && this.endTime == null;
        };
        ProcessLog.prototype.isStopped = function () {
            return this.endTime != null;
        };
        ProcessLog.prototype.hasCompletedAllSteps = function () {
            return this.stepCount === this.initialStepCount && this.errorStop === false;
        };
        ProcessLog.prototype.hasEncounteredError = function () {
            return this.errorStop === true;
        };
        ProcessLog.prototype.getTotalSteps = function () {
            return this.initialStepCount;
        };
        ProcessLog.prototype.getStepsCompleted = function () {
            return this.stepCount;
        };
        ProcessLog.prototype.getTotalLogTime = function () {
            if (this.endTime == null) {
                throw new Error("cannot get total log time before process has finished");
            }
            return this.endTime - this.startTime;
        };
        ProcessLog.prototype.getName = function () {
            return this.name;
        };
        ProcessLog.prototype.getSteps = function () {
            return _.clone(this.steps);
        };
        ProcessLog.prototype.getStepTimes = function () {
            return _.pluck(this.steps, "deltaTime");
        };
        ProcessLog.prototype.getStepMessages = function () {
            return _.pluck(this.steps, "stepMessage");
        };
        ProcessLog.prototype.toString = function () {
            "use strict";
            var stepsStr = " " + this.stepCount + " steps" + (this.initialStepCount > -1 ? " of " + this.initialStepCount : "");
            return this.endTime != null ?
                "process '" + this.name + "' took " + this.getTotalLogTime() + " ms," + stepsStr :
                "process '" + this.name + "' not complete," + stepsStr;
        };
        /* static functions and properties */
        ProcessLog.startSimpleLog = function (message) {
            "use strict";
            return new LogStep(Date.now(), null, message ? message : "");
        };
        ProcessLog.stopSimpleLog = function (simpleLog) {
            "use strict";
            if (!simpleLog.hasOwnProperty("deltaTime") || !simpleLog.hasOwnProperty("timeStamp")) {
                throw new Error("invalid parameter '" + simpleLog + "', signature is ProcessLog.stopSimpleLog(LogStep step)");
            }
            simpleLog.deltaTime = Date.now() - simpleLog.timeStamp;
            return simpleLog;
        };
        return ProcessLog;
    })();
    ProcessLogs.ProcessLog = ProcessLog;
    /* end ProcessLog class definition */
    /** LogStep class */
    var LogStep = (function () {
        function LogStep(timeStamp, deltaTime, message, stepNumber, totalSteps) {
            "use strict";
            this.timeStamp = timeStamp != null ? timeStamp : null;
            this.deltaTime = deltaTime != null ? deltaTime : null;
            this.stepMessage = message ? message : "";
            this.stepNumber = stepNumber != null ? stepNumber : null;
            this.totalSteps = totalSteps != null ? totalSteps : null;
        }
        LogStep.prototype.toString = function () {
            "use strict";
            var stepsStr = (this.stepNumber || "") + (this.totalSteps != null ? " of " + this.totalSteps : "");
            return this.deltaTime != null ?
                "step " + stepsStr + " '" + this.stepMessage + "' took " + this.deltaTime + " ms" :
                "step " + stepsStr + " '" + this.stepMessage + "' not complete";
        };
        return LogStep;
    })();
    ProcessLogs.LogStep = LogStep;
})(ProcessLogs || (ProcessLogs = {}));
module.exports = ProcessLogs;
