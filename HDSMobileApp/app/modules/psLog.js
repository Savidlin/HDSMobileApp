/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var LocalStoreByDate = require("./LocalStoreByDate");
/** PsLogs class
 * error/info logging instances for HDSMobileApp, uses 'log4javascript' library
 * @since 2015-2-10
 */
var PsLog = (function () {
    function PsLog() {
    }
    Object.defineProperty(PsLog, "log", {
        get: function () {
            return PsLog._defaultLog ? PsLog._defaultLog : PsLog.initDefaultLog();
        },
        enumerable: true,
        configurable: true
    });
    PsLog.initDefaultLog = function () {
        var log = log4javascript.getLogger("hdsmobileapp");
        log.addAppender(PsLog.getBrowserConsoleAppender());
        PsLog._defaultLog = log;
        return PsLog._defaultLog;
    };
    Object.defineProperty(PsLog, "logs", {
        get: function () {
            return PsLog._logs ? PsLog._logs : PsLog.initLogs();
        },
        enumerable: true,
        configurable: true
    });
    PsLog.initLogs = function () {
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
    };
    PsLog.getBrowserConsoleAppender = function () {
        if (PsLog._browserConsoleAppender == null) {
            var log = new log4javascript.BrowserConsoleAppender();
            log.setLayout(new log4javascript.SimpleLayout()); //new log4javascript.PatternLayout(log4javascript.PatternLayout.DEFAULT_CONVERSION_PATTERN);
            PsLog._browserConsoleAppender = log;
        }
        return PsLog._browserConsoleAppender;
    };
    PsLog.getLocalStoreAppender = function () {
        if (PsLog._localStoreAppender == null) {
            PsLog._localStoreAppender = new LocalStoreAppender(LocalStoreByDate.getDefaultInst());
        }
        return PsLog._localStoreAppender;
    };
    PsLog.localStoreInst = LocalStoreByDate.getDefaultInst();
    return PsLog;
})();
/** A {@link log4javascript.Append} that appends to a {@link UniqueStoreI}.
 * With the option to consolidate events from a {@code #group(String) groups} into single log entries
 * @author Benjamin
 * @since 2015-2-16
 */
var LocalStoreAppender /*extends log4javascript.Appender */ = (function () {
    function LocalStoreAppender /*extends log4javascript.Appender */(localStore, mergeGroupEvents) {
        if (mergeGroupEvents === void 0) { mergeGroupEvents = false; }
        this.currentGroupEvents = [];
        this.store = localStore;
        this.mergeGroups = mergeGroupEvents;
    }
    LocalStoreAppender /*extends log4javascript.Appender */.prototype.append = function (loggingEvent) {
        if (this.inGroup === true && this.mergeGroups === true) {
            this.currentGroupEvents.push(loggingEvent);
        }
        else {
            var value = JSON.stringify(loggingEvent);
            if (loggingEvent.level.isGreaterOrEqual(this["threshold"])) {
                this.store.addItem(value);
            }
        }
    };
    LocalStoreAppender /*extends log4javascript.Appender */.prototype.group = function (name) {
        this.inGroup = true;
        this.currentGroupName = name;
        this.currentGroupEvents = [];
    };
    LocalStoreAppender /*extends log4javascript.Appender */.prototype.groupEnd = function () {
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
    };
    LocalStoreAppender /*extends log4javascript.Appender */.prototype.toString = function () {
        return "LocalStoreAppender";
    };
    // TODO poor workaround for 'extends' not working correctly
    LocalStoreAppender /*extends log4javascript.Appender */.tmp = (function () {
        LocalStoreAppender.prototype = new log4javascript.Appender();
        LocalStoreAppender.prototype["appender"] = new log4javascript.Appender();
        LocalStoreAppender.prototype["layout"] = new log4javascript.NullLayout();
        LocalStoreAppender.prototype["threshold"] = log4javascript.Level.DEBUG;
    }());
    return LocalStoreAppender /*extends log4javascript.Appender */;
})();
module.exports = PsLog;
