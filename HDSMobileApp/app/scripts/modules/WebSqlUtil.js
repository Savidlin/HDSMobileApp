/// <reference path="../../tsDefinitions/lib/Q.d.ts" />
/// <reference path="../../tsDefinitions/websql.d.ts" />
var Q = require("q");
/*! websql.js | MIT license | http://bitbucket.org/nonplus/websql-js
 * converted to TypeScript at 2015-2-2 by Benjamin
 */
(function () {
}());
/*jslint undef: true, white: true, browser: true, devel: true, indent: 4, sloppy: false */
/*global alert: false, define: true*/
//      (c) 2012 Stepan Riha
//      websql.js may be freely distributed under the MIT license.
//
// Module that wraps asynchronous WebSQL calls with deferred promises and provides SQL utility
// methods.
//
// Promises are **resolved** when asynchronous database callback is finished.
// Promises are **rejected** with an `Error` object that may contain one or more of the following:
//
// * `message`: Describing what failed
// * `exception`: Exception that was thrown
// * `sqlError`: Error returned by WebSQL
// * `sql`: statement that was executing
//
// ## Getting Started
//
// Websql can be loaded as
// * a `<script>` tag (creating a `websql` global)
// * an AMD module
//
// Websql can produce deferred promises using
// * [`when.js`](https://github.com/cujojs/when)
// * [`Q.js`](https://github.com/kriskowal/q)
// * [`jQuery's Deferred`](http://api.jquery.com/category/deferred-object/)
// * Other...
//
// ### To use in `<script>` tag
//
// The module will autodetect and use one of the supported promise providers
// if it's included in your HTML before `websql`:
//          <script src="path/to/when.js"></script>
//          <script src="path/to/websql.js"></script>
//          ...
//
// ### To use as an AMD module
//
// If a promise provider isn't loaded into the global scope, you need to use
// the `websql.config()` method to tell it which provider to use.
//
//          // Using a CommonJS Promisses/A implementation:
//          define(["websql", "when"], function(websql, when) {
//              websql.config({
//                  defer: when.defer
//              });
//              ...
//          })
//
//          // Using jQuery Deferred implementation:
//          define(["websql", "jquery"], function(websql, $) {
//              websql.config({
//                  defer: $.Deferred
//              });
//              ...
//          })
//
// ## Using the API
//
// Example:
//      var wsdb = websql("test");
//      wsdb.read("SELECT * FROM ...");
//          .then(function(resultSet) { ... });
// ## Public Methods ##
// ### websql() or websql(Database) or websql(name, _version_, _displayName_, _estimatedSize_)
// Constructor for `WebsqlDatabase` wrapper objects.
// * `websql()` creates an uninitialized instance.  Use the `openDatabase` method to initialize it.
// * `websql(Database)` creates an instance from an native Database opened via `window.openDatabase(...)`
// * `websql(name, ...)` takes the same parameters as the `window.openDatabase` function, but supplies
// default values for unspecified parameters.
// Returns: new instance of `WebsqlDatabase` wrapper class.
// Usage:
//      var wsdb = websql("test", "Test Database", 2 * 1024 * 1024);
//      wsdb.execute("INSERT INTO ...")
//          .then(function(resultSet) { ... })
// More usage:
//      var wsdb = websql("test");
//      wsdb.execute("INSERT INTO ...")
//          .then(function(resultSet) { ... })
//
//      var database = window.openDatabase(...);
//      var wsdb = websql(database);
var WebSqlUtil;
(function (WebSqlUtil) {
    var WebSqlDatabase = (function () {
        function WebSqlDatabase(util, name, _version_, _displayName_, _estimatedSize_) {
            this.util = util;
            this.self = this;
            this.transaction = this.transaction.bind(this);
            this.readTransaction = this.readTransaction.bind(this);
            // Initialize db from native Database or by opening `name`
            if (util._isDatabase(name)) {
                this.initDb(name);
                var dfd = util.defer();
                this.promise = util.promise(dfd);
                dfd.resolve(this);
            }
            else if (name) {
                this.openDatabase(name, _version_, _displayName_, _estimatedSize_);
            }
        }
        /** initialize this WebSqlDatabase's underlying WebSql interface to the specific Database instance
         * @param {Database} db: the database to use as this instance's underlying WebSQL interface
         */
        WebSqlDatabase.prototype.initDb = function (db) {
            this.db = db;
            this.dbFuncs = {
                version: db.version,
                transaction: db.transaction.bind(db),
                readTransaction: db.readTransaction.bind(db),
                changeVersion: db.changeVersion.bind(db)
            };
        };
        // ### openDatabase(name, _version_, _displayName_, _estimatedSize_) ###
        // Calls window.openDatabase().
        //  * version defaults to `""`
        //  * displayName defaults to `name`
        //  * estimatedSize defaults to `2 * 1024 * 1024`
        // Returns: promise that resolves with this `WebsqlDatabase` instance
        // Usage:
        //      wsdb.openDatabase("test", "Test Database", 2 * 1024 * 1024))
        //          .then(function(wsdb) {...});
        // More usage:
        //      wsdb.openDatabase("test"))
        //          .then(function(wsdb) {...});
        WebSqlDatabase.prototype.openDatabase = function (name, version, displayName, estimatedSize) {
            var util = this.util;
            var self = this.self;
            util.log(util.DEBUG, "openDatabase", name, version, displayName, estimatedSize);
            if (!displayName) {
                displayName = name;
            }
            if (!version) {
                version = "";
            }
            if (!estimatedSize) {
                if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_0/i)) {
                    estimatedSize = 5 * 1024 * 1024;
                }
                else {
                    estimatedSize = 50 * 1024 * 1024;
                }
            }
            var dfd = util.defer();
            try {
                if (!window.openDatabase) {
                    util.log(util.ERROR, "WebSQL not implemented");
                    util._rejectError(dfd, "WebSQL not implemented");
                }
                else {
                    // seems to synchronously open WebSQL, even though window.openDatabase is async
                    var db = window.openDatabase(name, version, displayName, estimatedSize);
                    self.initDb(db);
                    if (self.db) {
                        dfd.resolve(self);
                    }
                    else {
                        util._rejectError(dfd, "Failed to open database");
                    }
                }
            }
            catch (ex) {
                util.log(util.ERROR, "Failed to open database " + name);
                util._rejectError(dfd, "Failed to open database " + name, { exception: ex });
            }
            this.promise = util.promise(dfd);
            return this.promise;
        };
        // ### changeVersion(oldVersion, newVersion, xactCallback) ###
        // Returns: promise that resolves with the changed `WebsqlDatabase`
        // Usage:
        //      wsdb.changeVersion("1", "2",
        //              function (xact) {
        //                  xact.executeSQL(...);
        //              }
        //      ).then(function(wsdb) {...});
        WebSqlDatabase.prototype.changeVersion = function (oldVersion, newVersion, xactCallback) {
            var util = this.util;
            util.log(util.DEBUG, "openDatabase", this.db, oldVersion, newVersion, xactCallback);
            var dfd = this.util.defer();
            try {
                if (!util._isDatabase(this.db)) {
                    util._rejectError(dfd, "Database not specified (db='" + this.db + "')");
                }
                else {
                    this.dbFuncs.changeVersion(oldVersion, newVersion, xactCallback, function (sqlError) {
                        util.log(util.ERROR, sqlError);
                        util._rejectError(dfd, "Failed to change version", { sqlError: sqlError });
                        return;
                    }, function () {
                        util.log(util.DEBUG, "SUCCESS changeVersion");
                        dfd.resolve(this); // this == window
                        return;
                    });
                }
            }
            catch (ex) {
                util.log(util.ERROR, ex);
                util._rejectError(dfd, "Failed changeVersion(db, '" + oldVersion + "', '" + newVersion + "'')", { exception: ex });
            }
            return util.promise(dfd);
        };
        // ### getTables() ###
        // Queries the sqlite_master table for user tables
        // Returns: promise that resolves with an array of table information records
        // Usage:
        //      wsdb.getTables()
        //          .then(function(tables) {
        //          for(var i = 0; i < tables.length; i++) {
        //              var name = tables[i].name;
        //              var sql = tables[i].sql;
        //              ...
        //          }
        //      });
        WebSqlDatabase.prototype.getTables = function () {
            var sql = "SELECT name, type, sql FROM sqlite_master " + "WHERE type in ('table') AND name NOT LIKE '?_?_%' ESCAPE '?'";
            return this.execSqlStatement(this.readTransaction, sql, undefined, function (rs) {
                var tables = [];
                var rows = rs.rows;
                for (var i = 0, size = rows.length; i < size; i++) {
                    tables.push(rows.item(i));
                }
                return tables;
            }, "read");
        };
        // ### tableExists(name) ###
        // Queries the sqlite_master for a table by name
        // Returns: promise that resolves with table info or with `undefined` if table
        // does not exist.
        // Usage:
        //      wsdb.tableExists("person")
        //          .then(function (table) {
        //              if(table) {
        //                  alert("table exists");
        //              } else {
        //                  alert("does not exist");
        //              }
        //          });
        WebSqlDatabase.prototype.tableExists = function (name) {
            var sql = "SELECT * FROM sqlite_master WHERE name = ?";
            return this.readRow(sql, [name], function (row) {
                return row || undefined;
            });
        };
        // ### destroyDatabase() ###
        // Drops all the tables in the database.
        // Returns: promise that resolves with this `WebsqlDatabase`
        // Usage:
        //      wsdb.destroyDatabase()
        //          .then(function (wsdb) {...});
        WebSqlDatabase.prototype.destroyDatabase = function () {
            return this.changeVersion(this.db.version, "", function (xact) {
                var sql = "SELECT name FROM sqlite_master " + "WHERE type in ('table') AND name NOT LIKE '?_?_%' ESCAPE '?'";
                xact.executeSql(sql, [], function (xact, rs) {
                    var rows = rs.rows;
                    for (var i = 0, size = rows.length; i < size; i++) {
                        var sql = 'DROP TABLE "' + rows.item(i).name + '"';
                        xact.executeSql(sql);
                    }
                });
            });
        };
        // ### transaction(xactCallback) ###
        // Calls xactCallback(xact) from within a database transaction
        // Returns: promise that resolves with the database
        // Usage:
        //      wsdb.transaction(
        //              function (xact) {
        //                  xact.executeSQL(...);
        //              }
        //      ).then(function (wsdb) {...});
        // More usage:
        //      var addressId;
        //      var personId;
        //
        //      function insertPerson(xact) {
        //          return xact.executeSql(
        //              "INSERT INTO person ...", [...],
        //              function (xact, rs) {
        //                  personId = rs.insertId;
        //                  insertAddress(xact, personId);
        //              }
        //          )
        //      }
        //
        //      function insertAddress(xact, personId) {
        //          return wsdb.executeSql(xact,
        //              "INSERT INTO address (person, ...) VALUES (?, ...)",
        //              [personId, ...],
        //              function (xact, rs) {
        //                  addressId = rs.insertId;
        //              }
        //          )
        //      }
        //
        //      wsdb.transaction(
        //              function (xact) {
        //                  insertPerson(xact);
        //              }
        //      ).then(function(wsdb) {
        //          alert("Created person " + personId + " with address " + addressId);
        //      });
        WebSqlDatabase.prototype.transaction = function (xactCallback) {
            return this.executeTransaction(this.dbFuncs.transaction, "transaction", xactCallback);
        };
        // ### readTransaction(xactCallback) ###
        // Calls xactCallback(xact) from within a database read transaction
        // Returns: promise that resolves with the database
        // Usage:
        //      wsdb.readTransaction(
        //              function (xact) {
        //                  xact.executeSQL(...);
        //              }
        //      ).then(function (wsdb) {...});
        WebSqlDatabase.prototype.readTransaction = function (xactCallback) {
            return this.executeTransaction(this.dbFuncs.readTransaction, "readTransaction", xactCallback);
        };
        // ### execute(sqlStatement(s), _args(s)_, _rsCallback_) ###
        // Method for executing a transaction with a one or more `sqlStatement`
        // with the specified `args`, calling the `rsCallback` with the result set(s).
        // The `args` and `rsCallback` are optional.
        // * Passing a _single_ `sqlStatement` string with `args` that is an _array of arrays_,
        // the statement is executed with each row in the `args`.
        // * Passing an array of `{ sql, args}` objects to `sqlStatement`
        // executes the `sql` in each row with the row's `args` (or the parameter `args`).
        //
        // Returns: promise that resolves with `rsCallback` result
        // or the resultSet, if no `rsCallback` specified.  If an array of statements or arguments
        // is specified, the promise resolves with an array of results/resultSets.
        //
        // Basic Usage:
        //      wsdb.execute("DELETE FROM person")
        //          .then(function (resultSet) {...});
        // Other Usage:
        //      wsdb.execute(
        //                  "INSERT INTO person (first, last) VALUES (?, ?)",
        //                  ["John", "Doe"],
        //                  function (rs) {
        //                      console.log("Inserted person", rs.insertId);
        //                      return rs.insertId;
        //                  }
        //      ).then(function (result) {...});
        // Other Usage: (single `sqlStatement` with multiple sets of `args`)
        //      wsdb.execute(
        //                  "INSERT INTO person (first, last) VALUES (?, ?)",
        //                  [
        //                      ["John", "Doe"],
        //                      ["Jane", "Doe"]
        //                  ],
        //                  // called for each row in args
        //                  function (rs) {
        //                      console.log("Inserted person", rs.insertId);
        //                      return rs.insertId;
        //                  }
        //      ).then(function (insertIds) {
        //          var personId1 = insertIds[0], personId2 = insertIds[1];
        //          ...
        //      });
        // Other Usage: (multiple `sqlStatement` with multiple sets of `args`)
        //      wsdb.execute(
        //                  [{
        //                      sql: "UPDATE person SET (first=?, last=?) WHERE id=?",
        //                      args: ["Robert", "Smith", 23]
        //                  }, {
        //                      sql: "UPDATE address SET (street=?, city=?, zip=?) WHERE id=?",
        //                      args: ["Sesame St.", "Austin", "78758", 45]
        //
        //                  }],
        //                  // called for each object in args
        //                  function (rs) {
        //                      console.log("Updated object: ", rs.rowsAffected);
        //                      return rs.rowsAffected;
        //                  }
        //      ).then(function (results) {
        //          var numPersons = results[0], numAddresses = results[1];
        //          ...
        //      });
        WebSqlDatabase.prototype.executeQuery = function (sqlStatement, args) {
            return this.execSqlStatementQuery(this.transaction, sqlStatement, args, 'execute');
        };
        WebSqlDatabase.prototype.executeQueries = function (sqlStatement, args) {
            return this.execSqlStatementQuery(this.transaction, sqlStatement, args, 'execute');
        };
        WebSqlDatabase.prototype.execute = function (sqlStatement, args, rsCallback) {
            return this.execSqlStatements(this.transaction, sqlStatement, args, rsCallback, 'execute');
        };
        // ### read(sqlStatement(s), _args(s)_, _rsCallback_) ###
        // Method for executing a readTransaction with a one or more `sqlStatement`
        // with the specified `args`, calling the `rsCallback` with the result set(s).
        // The `args` and `rsCallback` are optional.
        // * Passing a _single_ `sqlStatement` string with `args` that is an _array of arrays_,
        // the statement is executed with each row in the `args`.
        // * Passing an array of `{ sql, args}` objects to `sqlStatement`
        // executes the `sql` in each row with the row's `args` (or the parameter `args`).
        // Returns: promise that resolves with `rsCallback` result
        // or the resultSet, if no `rsCallback` specified.  If an array of statements or arguments
        // is specified, the promise resolves with an array of results/resultSets.
        // Usage:
        //      wsdb.read("SELECT * FROM person WHERE first = ?",
        //                  ["Bob"],
        //                  function (rs) {
        //                      var rows = rs.rows;
        //                      for(var i = 0; i < rows.length; i++) {
        //                          ...
        //                      }
        //                      return result;
        //                  }
        //      ).then(function (result) {...});
        // Other usage:
        //      wsdb.read("SELECT * FROM person WHERE first = ?",
        //                  ["Bob"]
        //      ).then(function (resultSet) {...});
        // Other Usage: (single `sqlStatement` with multiple sets of `args`)
        //      wsdb.read("SELECT * FROM person WHERE first = ?",
        //                  [
        //                      ["Bob"],
        //                      ["John"]
        //                  ],
        //                  // called for each row in args
        //                  function (rs) {
        //                      return rs.rows;
        //                  }
        //      ).then(function (results) {
        //          var bobRows = results[0], johnRows = results[1];
        //          ...
        //      });
        // Other Usage: (multiple `sqlStatement` with multiple sets of `args`)
        //      wsdb.read([{
        //                      sql: "SELECT * FROM person WHERE id=?",
        //                      args: [23]
        //                  }, {
        //                      sql: "SELECT * FROM address WHERE state in (?, ?, ?)",
        //                      args: ["CA", "FL", "TX"]
        //
        //                  }],
        //                  // called for each object in args
        //                  function (rs) {
        //                      return rs.rows;
        //                  }
        //      ).then(function (results) {
        //          var person23rows = results[0], addressRows = results[1];
        //          ...
        //      });
        WebSqlDatabase.prototype.read = function (sqlStatement, args, rsCallback) {
            return this.execSqlStatements(this.readTransaction, sqlStatement, args, rsCallback, 'read');
        };
        // ### readRow(sqlStatement, _args_, _rowCallback_, _defaultRow_) ###
        // Method for executing a readTransaction with a single `sqlStatement`
        // that's expected to return a single row.
        // The specified `rowCallback` is called with the row in the resultset
        // or with `undefined` if resolutSet contains no rows.
        // If the query does not return a row, the `_defaultRow_` is returned instead.
        // The `args`, `rowCallback` and `defaultRow` are optional.
        // Returns: promise that resolves with the `rowCallback` result
        // or the row, if no `rowCallback` specified.
        // If no rows are selected and `rowCallback` isn't specified, the promise
        // resolves with the `defaultRow`.
        // The promise is rejected if the query returns multiple rows or if it returns
        // zero rows and no `rowCallback` and `defaultRow` were specified.
        // Usage:
        //      wsdb.readRow(
        //                  "SELECT * FROM person WHERE id = ?",
        //                  [123],
        //                  function (row) {
        //                      if(!row) {
        //                          // person not found
        //                          return;
        //                      }
        //                      var login = row.login;
        //                      ...
        //                      return result;
        //                  }
        //      ).then(function (result) {...});
        // Other Usage:
        //      wsdb.readRow(
        //                  "SELECT * FROM person WHERE id = ?",
        //                  [123]
        //      ).then(function (row) {...});
        WebSqlDatabase.prototype.readRow = function (sqlStatement, args, rowCallback, defaultValue) {
            var rowCallback, defaultValue;
            var util = this.util;
            var idx = 1;
            if (arguments[idx] instanceof Array) {
                args = arguments[idx];
                idx++;
            }
            if (arguments[idx] instanceof Function) {
                rowCallback = arguments[idx];
                idx++;
            }
            if (arguments[idx] instanceof Object) {
                defaultValue = arguments[idx];
                idx++;
            }
            return util.pipe(this.read(sqlStatement, args), function (rs) {
                var row;
                if (rs.rows.length > 1) {
                    return util._rejectError(util.defer(), new Error("Query returned " + rs.rows.length + " rows"));
                }
                if (rs.rows.length === 0) {
                    if (defaultValue) {
                        row = defaultValue;
                    }
                    else if (rowCallback) {
                        row = rowCallback();
                    }
                    else {
                        return util._rejectError(util.defer(), new Error("Query returned 0 rows"));
                    }
                }
                else {
                    row = rs.rows.item(0);
                    if (rowCallback) {
                        row = rowCallback(row);
                    }
                }
                return row;
            });
        };
        // #### executeTransaction(xactType, xactCallback)
        // Call 'webSqlFunc' method on 'db'
        // Implements common behavior for 'wsdb.transaction' and 'wsdb.readTransaction'
        WebSqlDatabase.prototype.executeTransaction = function (webSqlFunc, webSqlFuncName, xactCallback) {
            var util = this.util;
            var dfd = util.defer();
            util.log(util.DEBUG, webSqlFuncName + ": in");
            try {
                if (!util._isDatabase(this.db)) {
                    util._rejectError(dfd, "Database not specified (db='" + this.db + "')");
                }
                else {
                    webSqlFunc(function (xact) {
                        try {
                            xactCallback(xact);
                        }
                        catch (exception) {
                            util.log(util.ERROR, webSqlFuncName + ": exception " + exception.message);
                            util._rejectError(dfd, webSqlFuncName + " callback threw an exception", { exception: exception });
                            util.log(util.DEBUG, webSqlFuncName + ": rejected");
                        }
                        return;
                    }, function (sqlError) {
                        util.log(util.ERROR, webSqlFuncName + ": error " + sqlError);
                        util._rejectError(dfd, "Failed executing " + webSqlFuncName.replace(/transaction/i, "") + " transaction", { sqlError: sqlError });
                        util.log(util.DEBUG, webSqlFuncName + ": rejected");
                        return;
                    }, function () {
                        util.log(util.DEBUG, webSqlFuncName + ": resolving");
                        dfd.resolve(this); // this == window
                        util.log(util.DEBUG, webSqlFuncName + ": resolved");
                        return;
                    });
                }
            }
            catch (exception) {
                util.log(util.ERROR, webSqlFuncName + ": exception " + exception);
                util._rejectError(dfd, "Failed calling " + webSqlFuncName, { exception: exception });
                util.log(util.DEBUG, webSqlFuncName + ": rejected");
            }
            util.log(util.DEBUG, webSqlFuncName + ": out");
            return util.promise(dfd);
        };
        // #### execSqlStatements(xactMethod, sqlStatement, args, rsCallback)
        // Execute sqlStatement in the context of `xactMethod`
        // Implements common behavior for `wsdb.execute` and `wsdb.read`
        WebSqlDatabase.prototype.execSqlStatement = function (xactMethod, sqlStatement, args, rsCallback, xactMethodType) {
            return this.execSqlStatements(xactMethod, sqlStatement, args, rsCallback, xactMethodType);
        };
        WebSqlDatabase.prototype.execSqlStatementQuery = function (xactMethod, sqlStatement, args, xactMethodType) {
            return this.execSqlStatements(xactMethod, sqlStatement, args, null, xactMethodType);
        };
        WebSqlDatabase.prototype.execSqlStatements = function (xactMethod, sqlStatement, args, rsCallback, xactMethodType) {
            var start = new Date().getTime();
            if (!window["startQueriesTime"]) {
                window["startQueriesTime"] = start;
            }
            var results = [];
            if (typeof (args) === "function") {
                rsCallback = args;
                args = undefined;
            }
            function execCommand(xact, sql, args) {
                xact.executeSql(sql, args || [], function (xact, rs) {
                    results.push(rsCallback ? rsCallback(rs) : rs);
                    return;
                });
            }
            var util = this.util;
            var isArray;
            var pipeReturn = util.pipe(xactMethod(function (xact) {
                var i;
                if (util._isArray(sqlStatement)) {
                    isArray = true;
                    for (i = 0; i < sqlStatement.length; i++) {
                        var cmnd = sqlStatement[i];
                        var params = util._isUndefined(cmnd.args) ? args : cmnd.args;
                        execCommand(xact, cmnd.sql, params);
                    }
                }
                else {
                    isArray = util._isArray(args) && util._isArray(args[0]);
                    var argSets = isArray ? args : [args];
                    for (i = 0; i < argSets.length; i++) {
                        execCommand(xact, sqlStatement, argSets[i]);
                    }
                }
                return;
            }), function () {
                return isArray ? results : results[0];
            }, function (err) {
                err.sql = sqlStatement;
                return err;
            });
            if (util.timingLogging) {
                pipeReturn.done(function () {
                    var end = new Date().getTime();
                    var time = end - start;
                    window["endQueriesTime"] = end;
                    console.log("websql finish args: ", xactMethodType, sqlStatement.length, sqlStatement);
                    console.log("websql runtime: ", time);
                });
            }
            return pipeReturn;
        };
        WebSqlDatabase.newWebSqlDbInst = function (name, version, displayName, estimatedSize) {
            var util = new DbUtils();
            var db = new WebSqlDatabase(util, name, version, displayName, estimatedSize);
            return db;
        };
        return WebSqlDatabase;
    })();
    WebSqlUtil.WebSqlDatabase = WebSqlDatabase;
    /** Utility functions used by WebSqlDatabase class
     * @since 2015-2-4
     */
    var DbUtils = (function () {
        function DbUtils() {
            this.logLevels = {
                NONE: this.NONE,
                ERROR: this.ERROR,
                DEBUG: this.DEBUG
            };
            this.config = function (settings) {
                if (this._isFunction(settings.defer)) {
                    this.defer = settings.defer;
                }
                if (this._isFunction(settings.trace)) {
                    this.trace = settings.trace;
                }
                if (!this._isUndefined(settings.logVerbosity)) {
                    this.verbosity = settings.logVerbosity;
                }
            };
            this.NONE = 0;
            this.ERROR = 1;
            this.DEBUG = 2;
            this.verbosity = this.NONE;
            this.trace = console;
            this.defer = Q.defer;
            this.timingLogging = (localStorage.getItem("LogWebsql"));
            this._isArray = Array.isArray || function (obj) {
                return this._toString(obj) === '[object Array]';
            };
            this._isArray = this._isArray.bind(this);
            this._toString = this._toString.bind(this);
            this._isString = this._isString.bind(this);
            this._isDatabase = this._isDatabase.bind(this);
            this._isFunction = this._isFunction.bind(this);
            this._isUndefined = this._isUndefined.bind(this);
            this._isPromise = this._isPromise.bind(this);
            this.promise = this.promise.bind(this);
            this.pipe = this.pipe.bind(this);
            this.log = this.log.bind(this);
            this.setConsole = this.setConsole.bind(this);
            this._rejectError = this._rejectError.bind(this);
        }
        // Internal Functions
        DbUtils.prototype._toString = function (obj) {
            return Object.prototype.toString.call(obj);
        };
        DbUtils.prototype._isString = function (fn) {
            return this._toString(fn) === '[object String]';
        };
        DbUtils.prototype._isDatabase = function (db) {
            return this._toString(db) === '[object Database]';
        };
        DbUtils.prototype._isFunction = function (fn) {
            return this._toString(fn) === '[object Function]';
        };
        DbUtils.prototype._isUndefined = function (obj) {
            return typeof (obj) === 'void';
        };
        DbUtils.prototype._isPromise = function (obj) {
            return obj && this._isFunction(obj.then);
        };
        // #### promise(deferred)
        // Returns the promise from a deferred object
        DbUtils.prototype.promise = function (dfd) {
            return this._isFunction(dfd.pipe) ? dfd.promise() : dfd.promise;
        };
        // #### pipe(promise, onSuccess, onError)
        // Calls `onSuccess` or `onError` when `promise` is resolved.
        // Returns a new promise that is resolved/rejected based on the
        // values returned from the callbacks.
        DbUtils.prototype.pipe = function (p, onSuccess, onError) {
            var self = this;
            var dfd = this.defer();
            p.then(function (val) {
                var res;
                if (onSuccess) {
                    res = onSuccess(val);
                }
                if (self._isPromise(res)) {
                    res.then(dfd.resolve, dfd.reject);
                }
                else {
                    dfd.resolve(res);
                }
            }, function (err) {
                if (onError) {
                    err = onError(err);
                }
                if (self._isPromise(err)) {
                    err.then(dfd.resolve, dfd.reject);
                }
                else {
                    dfd.reject(err);
                }
            });
            return this.promise(dfd);
        };
        // #### log(level, msg1, msg2, ...)
        // Log statement unless level > verbosity
        // Usage:
        //      log(DEBUG, "Calling function", functionName);
        //      log(ERROR, "Something horrible happened:", error);
        DbUtils.prototype.log = function (level) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (level <= this.verbosity && this.trace) {
                //var args = Array.prototype.slice.call(arguments, 1);
                args.unshift("WebSQL:");
                if (this._isFunction(this.trace["text"])) {
                    this.trace["text"](args, "color: purple");
                }
                else if (this._isFunction(this.trace.log)) {
                    this.trace.log(args.join(' '));
                }
            }
        };
        DbUtils.prototype.setConsole = function (console) {
            this.trace = console;
        };
        DbUtils.prototype._rejectError = function (dfd, error, options) {
            if (this._isString(error)) {
                error = new Error(error);
            }
            if (options && options.exception) {
                error.exception = options.exception;
            }
            if (options && options.sqlError) {
                error.sqlError = options.sqlError;
            }
            this.log(this.ERROR, "ERROR: " + error.message || error.exception || error.sqlError);
            dfd.reject(error);
            return this.promise(dfd);
        };
        return DbUtils;
    })();
    WebSqlUtil.DbUtils = DbUtils;
})(WebSqlUtil || (WebSqlUtil = {}));
module.exports = WebSqlUtil;
