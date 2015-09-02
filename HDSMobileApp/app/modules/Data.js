"use strict";
var ArrayUtil = require("../utils/ArrayUtil");
var DataCache = require("./DataCache");
var Data;
(function (Data) {
    function getCustomerById(customerId) {
        return ArrayUtil.findPropValue(getCustomers(), "customerId", customerId);
    }
    Data.getCustomerById = getCustomerById;
    function getCustomers() {
        return DataCache.customerData;
    }
    Data.getCustomers = getCustomers;
    function getEmployeeById(businessEntityId) {
        return ArrayUtil.findPropValue(getEmployees(), "businessEntityId", businessEntityId);
    }
    Data.getEmployeeById = getEmployeeById;
    function getEmployees() {
        return DataCache.employeeData;
    }
    Data.getEmployees = getEmployees;
    function getEmployeePayHistoryByEmployeeId(businessEntityId) {
        return ArrayUtil.findAllPropValue(getEmployeePayHistory(), "businessEntityId", businessEntityId);
    }
    Data.getEmployeePayHistoryByEmployeeId = getEmployeePayHistoryByEmployeeId;
    function getEmployeePayHistory() {
        return DataCache.employeePayHistoryData;
    }
    Data.getEmployeePayHistory = getEmployeePayHistory;
    function getPersonById(businessEntityId) {
        return ArrayUtil.findPropValue(getPersons(), "businessEntityId", businessEntityId);
    }
    Data.getPersonById = getPersonById;
    function getPersons() {
        return DataCache.personData;
    }
    Data.getPersons = getPersons;
    function getProductById(productId) {
        return ArrayUtil.findPropValue(getProducts(), "productId", productId);
    }
    Data.getProductById = getProductById;
    function getProducts() {
        return DataCache.productData;
    }
    Data.getProducts = getProducts;
    function getSalesOrderDetailBySalesOrderId(salesOrderId) {
        return ArrayUtil.findAllPropValue(getSalesOrderDetails(), "salesOrderId", salesOrderId);
    }
    Data.getSalesOrderDetailBySalesOrderId = getSalesOrderDetailBySalesOrderId;
    function getSalesOrderDetailById(salesOrderDetailId) {
        return ArrayUtil.findPropValue(getSalesOrderDetails(), "salesOrderDetailId", salesOrderDetailId);
    }
    Data.getSalesOrderDetailById = getSalesOrderDetailById;
    function getSalesOrderDetails() {
        return DataCache.salesOrderDetailData;
    }
    Data.getSalesOrderDetails = getSalesOrderDetails;
    function getSalesOrderHeaderById(salesOrderId) {
        return ArrayUtil.findPropValue(getSalesOrderHeaders(), "salesOrderId", salesOrderId);
    }
    Data.getSalesOrderHeaderById = getSalesOrderHeaderById;
    function getSalesOrderHeaders() {
        return DataCache.salesOrderHeaderData;
    }
    Data.getSalesOrderHeaders = getSalesOrderHeaders;
    function getSalesPersonById(businessEntityId) {
        return ArrayUtil.findPropValue(getSalesPersons(), "businessEntityId", businessEntityId);
    }
    Data.getSalesPersonById = getSalesPersonById;
    function getSalesPeopleByTerritoryId(territoryId) {
        //return ArrayUtil.findPropValue(getSalesPersons(), "territoryId", territoryId);
        var salesPpl = DataCache.salesPersonData;
        var retMe = [];
        for (var i = 0; i < salesPpl.length; i++) {
            if (salesPpl[i].territoryId == territoryId) {
                retMe.push(salesPpl[i]);
            }
        }
        return retMe;
    }
    Data.getSalesPeopleByTerritoryId = getSalesPeopleByTerritoryId;
    //couldn't use newley created model Models.SalesPeopleEmployee[] as return type
    //another jquery extend issue
    function joinEmployeeSalesPeople(territoryId) {
        var salesPeople = Data.getSalesPeopleByTerritoryId(territoryId);
        var employees = DataCache.employeeData;
        var temp = new Object();
        for (var i = 0; i < salesPeople.length; i++) {
            for (var j = 0; j < employees.length; j++) {
                if (salesPeople[i].businessEntityId == employees[j].businessEntityId) {
                    jQuery.extend(salesPeople[i], employees[j]);
                }
            }
        }
        return salesPeople;
    }
    Data.joinEmployeeSalesPeople = joinEmployeeSalesPeople;
    function getSalesPersons() {
        return DataCache.salesPersonData;
    }
    Data.getSalesPersons = getSalesPersons;
    function getSalesTerritoryById(territoryId) {
        return ArrayUtil.findPropValue(getSalesTerritorys(), "territoryId", territoryId);
    }
    Data.getSalesTerritoryById = getSalesTerritoryById;
    function getSalesTerritorys() {
        return DataCache.salesTerritoryData;
    }
    Data.getSalesTerritorys = getSalesTerritorys;
    function getStoreById(businessEntityId) {
        return ArrayUtil.findPropValue(getStores(), "businessEntityId", businessEntityId);
    }
    Data.getStoreById = getStoreById;
    function getStores() {
        return DataCache.storeData;
    }
    Data.getStores = getStores;
})(Data || (Data = {}));
module.exports = Data;
