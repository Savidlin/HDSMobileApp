/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-1-20
 */

import _ = require("lodash");


module ProcessLogs {

    /* ProcessLog class
     * Loading and Performance tracking
     * @author Benjamin
     * @since 2014-10-1
     */
    export class ProcessLog {
        private name: string;
        private startTime: number;
        private endTime: number;
        private errorStop: boolean;
        private error: any;
        private errorMsg: string;
        private initialStepCount: number;
        private stepCount: number;
        private steps: LogStep[];
        private stepCompletedCallback: (step: LogStep) => void;
        private processStoppedCallback: () => void;
        private processCompletedCallback: () => void;
        private processErrorCallback: (err: any) => void;
        /** functions that are called when a step is completed or all steps are completed */
        private stepDone: (step: LogStep) => void;
        private processStopped: () => void;
        private processDone: () => void;
        private processError: (err, errorMsg) => void;


        constructor(name, steps, start) {
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


        setStepCompletedCallback(cb: (step: LogStep) => void): void {
            if (typeof cb !== "function") { throw new Error("steps completed callback '" + cb + "' must be a function"); }
            this.stepCompletedCallback = cb;
        }


        setProcessStoppedCallback = function (cb: () => void): void {
            if (typeof cb !== "function") { throw new Error("process stopped callback '" + cb + "' must be a function"); }
            this.processStoppedCallback = cb;
        }


    setProcessCompletedCallback = function (cb: () => void): void {
            if (typeof cb !== "function") { throw new Error("process completed callback '" + cb + "' must be a function"); }
            this.processCompletedCallback = cb;
        }


    setProcessErrorCallback = function (cb: (err, errMsg) => void): void {
            if (typeof cb !== "function") { throw new Error("process error callback '" + cb + "' must be a function"); }
            this.processErrorCallback = cb;
        }


    startLog(steps?: number): void {
            "use strict";
            if (this.startTime != null) {
                throw new Error("cannot start process log more than once");
            }
            if (steps) {
                this.initialStepCount = steps;
                this.stepCount = 0;
            }
            this.startTime = Date.now();
        }


        stopLog(): void {
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
        }


        errorLog(error?: any, errorMsg?: string): void {
            "use strict";
            this.errorStop = true;
            this.error = error;
            this.errorMsg = errorMsg;
            this.stopLog();
        }


        completeStep(msg?: string) {
            "use strict";
            if (this.stepCount === this.initialStepCount) { throw new Error("cannot complete any more steps, all steps have already been completed"); }
            if (this.errorStop === true) { throw new Error("cannot complete any more steps, process threw error"); }
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
        }


        isRunning(): boolean {
            return this.startTime != null && this.endTime == null;
        }


        isStopped(): boolean {
            return this.endTime != null;
        }


        hasCompletedAllSteps(): boolean {
            return this.stepCount === this.initialStepCount && this.errorStop === false;
        }


        hasEncounteredError(): boolean {
            return this.errorStop === true;
        }


        getTotalSteps(): number {
            return this.initialStepCount;
        }


        getStepsCompleted(): number {
            return this.stepCount;
        }


        getTotalLogTime(): number {
            if (this.endTime == null) { throw new Error("cannot get total log time before process has finished"); }
            return this.endTime - this.startTime;
        }


        getName(): string {
            return this.name;
        }


        getSteps(): LogStep[] {
            return _.clone(this.steps);
        }


        getStepTimes(): number[] {
            return _.pluck(this.steps, "deltaTime");
        }


        getStepMessages(): string[] {
            return _.pluck(this.steps, "stepMessage");
        }


        toString(): string {
            "use strict";
            var stepsStr = " " + this.stepCount + " steps" + (this.initialStepCount > -1 ? " of " + this.initialStepCount : "");
            return this.endTime != null ?
                "process '" + this.name + "' took " + this.getTotalLogTime() + " ms," + stepsStr :
                "process '" + this.name + "' not complete," + stepsStr;
        }


        /* static functions and properties */
        static startSimpleLog(message?: string): LogStep {
            "use strict";
            return new LogStep(Date.now(), null, message ? message : "");
        }


        static stopSimpleLog(simpleLog: LogStep): LogStep {
            "use strict";
            if (!simpleLog.hasOwnProperty("deltaTime") || !simpleLog.hasOwnProperty("timeStamp")) { throw new Error("invalid parameter '" + simpleLog + "', signature is ProcessLog.stopSimpleLog(LogStep step)"); }
            simpleLog.deltaTime = Date.now() - simpleLog.timeStamp;
            return simpleLog;
        }

    }
    /* end ProcessLog class definition */


    /** LogStep class */
    export class LogStep {
        timeStamp: number;
        deltaTime: number;
        stepMessage: string;
        stepNumber: number;
        totalSteps: number;


        constructor(timeStamp: number, deltaTime?: number, message?: string, stepNumber?: number, totalSteps?: number) {
            "use strict";
            this.timeStamp = timeStamp != null ? timeStamp : null;
            this.deltaTime = deltaTime != null ? deltaTime : null;
            this.stepMessage = message ? message : "";
            this.stepNumber = stepNumber != null ? stepNumber : null;
            this.totalSteps = totalSteps != null ? totalSteps : null;
        }


        toString(): string {
            "use strict";
            var stepsStr = (this.stepNumber || "") + (this.totalSteps != null ? " of " + this.totalSteps : "");
            return this.deltaTime != null ?
                "step " + stepsStr + " '" + this.stepMessage + "' took " + this.deltaTime + " ms" :
                "step " + stepsStr + " '" + this.stepMessage + "' not complete";
        }

    }
    /* end LogStep class definition */

}

export = ProcessLogs;
