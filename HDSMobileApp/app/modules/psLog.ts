/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

import LocalStoreByDate = require("./LocalStoreByDate");

/** PsLogs class
 * error/info logging instances for HDSMobileApp, uses 'log4javascript' library
 * @since 2015-2-10
 */
class PsLog {
    public static localStoreInst: UniqueStoreI = LocalStoreByDate.getDefaultInst();
    private static _defaultLog: log4javascript.Logger;
    private static _logs: PsLogs;
    private static _localStoreAppender: log4javascript.Appender;
    private static _browserConsoleAppender: log4javascript.Appender;


    static get log() {
        return PsLog._defaultLog ? PsLog._defaultLog : PsLog.initDefaultLog();
    }

    private static initDefaultLog() {
        var log = log4javascript.getLogger("hdsmobileapp");
        log.addAppender(PsLog.getBrowserConsoleAppender());
        PsLog._defaultLog = log;
        return PsLog._defaultLog;
    }


    static get logs() {
        return PsLog._logs ? PsLog._logs : PsLog.initLogs();
    }

    private static initLogs() {
        PsLog._logs = {
            login: log4javascript.getLogger("login"),
            syncing: log4javascript.getLogger("syncing"),
            services: log4javascript.getLogger("services")
        };

        var log = PsLog.getBrowserConsoleAppender();
        var localStoreAppender = PsLog.getLocalStoreAppender();

        PsLog._logs.login.addAppender(log);
        PsLog._logs.login.addAppender(localStoreAppender);

        PsLog._logs.syncing.addAppender(log);
        PsLog._logs.syncing.addAppender(localStoreAppender);

        PsLog._logs.services.addAppender(log);
        PsLog._logs.services.addAppender(localStoreAppender);

        return PsLog._logs;
    }


    private static getBrowserConsoleAppender() {
        if (PsLog._browserConsoleAppender == null) {
            var log = new log4javascript.BrowserConsoleAppender();
            log.setLayout(new log4javascript.SimpleLayout()); //new log4javascript.PatternLayout(log4javascript.PatternLayout.DEFAULT_CONVERSION_PATTERN);
            PsLog._browserConsoleAppender = log;
        }
        return PsLog._browserConsoleAppender;
    }


    private static getLocalStoreAppender() {
        if (PsLog._localStoreAppender == null) {
            PsLog._localStoreAppender = <log4javascript.Appender><any>new LocalStoreAppender(LocalStoreByDate.getDefaultInst());
        }
        return PsLog._localStoreAppender;
    }

}


/** A {@link log4javascript.Append} that appends to a {@link UniqueStoreI}.
 * With the option to consolidate events from a {@code #group(String) groups} into single log entries
 * @author Benjamin
 * @since 2015-2-16
 */
class LocalStoreAppender /*extends log4javascript.Appender */{
    // TODO poor workaround for 'extends' not working correctly
    static tmp = (function () {
        LocalStoreAppender.prototype = <any>new log4javascript.Appender();
        LocalStoreAppender.prototype["appender"] = new log4javascript.Appender();
        LocalStoreAppender.prototype["layout"] = new log4javascript.NullLayout();
        LocalStoreAppender.prototype["threshold"] = log4javascript.Level.DEBUG;
    } ());

    private store: UniqueStoreI;
    private mergeGroups: boolean;
    private inGroup: boolean;
    private currentGroupName: string;
    private currentGroupEvents: log4javascript.LoggingEvent[] = [];


    constructor(localStore: UniqueStoreI, mergeGroupEvents: boolean = false) {
        this.store = localStore;
        this.mergeGroups = mergeGroupEvents;
    }


    append(loggingEvent: log4javascript.LoggingEvent) {
        if (this.inGroup === true && this.mergeGroups === true) {
            this.currentGroupEvents.push(loggingEvent);
        }
        else {
            var value = JSON.stringify(loggingEvent);
            if (loggingEvent.level.isGreaterOrEqual(this["threshold"])) {
                this.store.addItem(value);
            }
        }
    }


    group(name) {
        this.inGroup = true;
        this.currentGroupName = name;
        this.currentGroupEvents = [];
    }


    groupEnd() {
        var groupName = this.currentGroupName;
        var groupEvents = this.currentGroupEvents;

        if (this.mergeGroups === true) {
            // consolidate multiple log events from a group into a single object
            this.store.addItem(JSON.stringify({
                groupName: groupName,
                events: groupEvents
            }));
        }

        this.inGroup = false;
        this.currentGroupName = null;
        this.currentGroupEvents = null;
    }


    toString() {
        return "LocalStoreAppender";
    }

}


export = PsLog;
