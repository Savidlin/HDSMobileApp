"use strict";
var Defer = require("./Defer");
var Services = require("../services/Services");
var DataCache = (function () {
    function DataCache() {
    }
    DataCache.loadData = function ($http, forceReload) {
        DataCache.isLoading = true;
        // don't reload after first load, unless explicitly requested
        if (DataCache.isDoneLoading && !forceReload) {
            console.log("reusing existing data");
            var dfd = Defer.newDefer();
            dfd.resolve(null);
            return dfd.promise;
        }
        // array of services to call and setters to that store the results in this class' static fields
        var services = [
            { service: Services.Customer, setResult: function (data) { DataCache.customerData = data; } },
            { service: Services.Employee, setResult: function (data) { DataCache.employeeData = data; } },
            { service: Services.EmployeePayHistory, setResult: function (data) { DataCache.employeePayHistoryData = data; } },
            { service: Services.Person, setResult: function (data) { DataCache.personData = data; } },
            { service: Services.Product, setResult: function (data) { DataCache.productData = data; } },
            { service: Services.SalesOrderDetail, setResult: function (data) { DataCache.salesOrderDetailData = data; } },
            { service: Services.SalesOrderHeader, setResult: function (data) { DataCache.salesOrderHeaderData = data; } },
            { service: Services.SalesPerson, setResult: function (data) { DataCache.salesPersonData = data; } },
            { service: Services.SalesTerritory, setResult: function (data) { DataCache.salesTerritoryData = data; } },
            { service: Services.Store, setResult: function (data) { DataCache.storeData = data; } }
        ];
        // promises for each service call
        var svcDfds = [];
        for (var i = 0, size = services.length; i < size; i++) {
            var svcDfd = Defer.newDefer();
            var svc = services[i].service;
            (function (idx, serviceDfd, service) {
                console.log("start service " + idx);
                service.search($http, {}, {}).done(function (data) {
                    console.log("done service " + idx);
                    services[idx].setResult(data.Items);
                    serviceDfd.resolve(null);
                });
                svcDfds.push(serviceDfd.promise);
            }(i, svcDfd, svc));
        }
        // promise that completes when all services calls complete
        var dfd = Defer.newDefer();
        Defer.when(svcDfds).done(function () {
            DataCache.isDoneLoading = true;
            console.log("all services done");
            dfd.resolve(null);
        }, function (err) {
            DataCache.loadError = err;
            var errMsg = "context: loading all DB data; problem: service call error '" + err + "'";
            console.error(errMsg);
            dfd.reject(errMsg);
        });
        return dfd.promise;
    };
    DataCache.isLoading = false;
    DataCache.isDoneLoading = false;
    DataCache.loadError = null;
    return DataCache;
})();
module.exports = DataCache;
