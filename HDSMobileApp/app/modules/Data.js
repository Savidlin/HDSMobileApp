"use strict";
var ArrayUtil = require("../utils/ArrayUtil");
var DataCache = require("./DataCache");
var Data;
(function (Data) {
    /** Get a single customer matching the specified primary key
     */
    function getCustomerById(customerId) {
        return ArrayUtil.findPropValue(getCustomers(), "customerId", customerId);
    }
    Data.getCustomerById = getCustomerById;
    /** Get all customers as an array
     */
    function getCustomers() {
        return DataCache.customerData;
    }
    Data.getCustomers = getCustomers;
    /** Get all sales orders from a specific customer ID
     */
    function getSalesOrderHeadersByCustomerId(customerId) {
        //return ArrayUtil.findPropValue(getSalesPersons(), "territoryId", territoryId);
        var saleHeaders = DataCache.salesOrderHeaderData;
        var retMe = [];
        for (var i = 0; i < saleHeaders.length; i++) {
            if (saleHeaders[i].customerId == customerId) {
                retMe.push(saleHeaders[i]);
            }
        }
        return retMe;
    }
    Data.getSalesOrderHeadersByCustomerId = getSalesOrderHeadersByCustomerId;
    function joinSalesPersonWithEmpAndPerson(salesPersons) {
        // loop through all sales people
        for (var i = 0; i < salesPersons.length; i++) {
            // loop through all employees to find a record that matches for the current sales person in loop
            var employee = Data.getEmployeeById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], employee);
            // loop through all person records for a matching sales person
            var person = Data.getPersonById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], person);
        }
        return salesPersons;
    }
    Data.joinSalesPersonWithEmpAndPerson = joinSalesPersonWithEmpAndPerson;
    /** Get a single employee matching the specified primary key
     */
    function getEmployeeById(businessEntityId) {
        return ArrayUtil.findPropValue(getEmployees(), "businessEntityId", businessEntityId);
    }
    Data.getEmployeeById = getEmployeeById;
    /** Get all employees as an array
     */
    function getEmployees() {
        return DataCache.employeeData;
    }
    Data.getEmployees = getEmployees;
    /** Get a single employee's pay history as an array
     */
    function getEmployeePayHistoryByEmployeeId(businessEntityId) {
        return ArrayUtil.findAllPropValue(getEmployeePayHistory(), "businessEntityId", businessEntityId);
    }
    Data.getEmployeePayHistoryByEmployeeId = getEmployeePayHistoryByEmployeeId;
    /** Get all pay histories for all employees as an array
     */
    function getEmployeePayHistory() {
        return DataCache.employeePayHistoryData;
    }
    Data.getEmployeePayHistory = getEmployeePayHistory;
    /** Get a single person entity matching the specified primary key
     */
    function getPersonById(businessEntityId) {
        return ArrayUtil.findPropValue(getPersons(), "businessEntityId", businessEntityId);
    }
    Data.getPersonById = getPersonById;
    /** Get all person entities as an array
     */
    function getPersons() {
        return DataCache.personData;
    }
    Data.getPersons = getPersons;
    /** Get a single product matching the specified primary key
     */
    function getProductById(productId) {
        return ArrayUtil.findPropValue(getProducts(), "productId", productId);
    }
    Data.getProductById = getProductById;
    /** Get all products as an array
     */
    function getProducts() {
        return DataCache.productData;
    }
    Data.getProducts = getProducts;
    /** Get all the sales order details (line items) associated with a sales order ID as an array
     */
    function getSalesOrderDetailBySalesOrderId(salesOrderId) {
        return ArrayUtil.findAllPropValue(getSalesOrderDetails(), "salesOrderId", salesOrderId);
    }
    Data.getSalesOrderDetailBySalesOrderId = getSalesOrderDetailBySalesOrderId;
    /** Get a single sales order detail (line item) matching the specified primary key
     */
    function getSalesOrderDetailById(salesOrderDetailId) {
        return ArrayUtil.findPropValue(getSalesOrderDetails(), "salesOrderDetailId", salesOrderDetailId);
    }
    Data.getSalesOrderDetailById = getSalesOrderDetailById;
    /** Get all sales order details (all line items for all sales orders) as an array
     */
    function getSalesOrderDetails() {
        return DataCache.salesOrderDetailData;
    }
    Data.getSalesOrderDetails = getSalesOrderDetails;
    /** Get all sales orders made by a specific sales person ID
     */
    function getSalesOrderHeaderBySalesPersonId(salesPersonId) {
        return ArrayUtil.findAllPropValue(Data.getSalesOrderHeaders(), "salesPersonId", salesPersonId);
    }
    Data.getSalesOrderHeaderBySalesPersonId = getSalesOrderHeaderBySalesPersonId;
    /** Get a single sales order header matching the specified primary key
     */
    function getSalesOrderHeaderById(salesOrderId) {
        return ArrayUtil.findPropValue(getSalesOrderHeaders(), "salesOrderId", salesOrderId);
    }
    Data.getSalesOrderHeaderById = getSalesOrderHeaderById;
    /** Get all sales order headers as an array
     */
    function getSalesOrderHeaders() {
        return DataCache.salesOrderHeaderData;
    }
    Data.getSalesOrderHeaders = getSalesOrderHeaders;
    /** Create a sales order object containing order information and line items for a give sales order
     */
    function joinSalesOrderHeaderToDetails(salesOrderId) {
        return {
            salesOrderHeader: Data.getSalesOrderHeaderById(salesOrderId),
            salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesOrderId)
        };
    }
    Data.joinSalesOrderHeaderToDetails = joinSalesOrderHeaderToDetails;
    /** Get a single sales person matching the specified primary key
     */
    function getSalesPersonById(businessEntityId) {
        return ArrayUtil.findPropValue(getSalesPersons(), "businessEntityId", businessEntityId);
    }
    Data.getSalesPersonById = getSalesPersonById;
    /** Get all sales persons assigned to a specific territory as an array
     */
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
    /** Join Sales person info (yearly sales, region, etc.) with employee info (name, DOB, vacation hours) to get all information about a sales person
     */
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
    /** Get all sales persons as an array
     */
    function getSalesPersons() {
        return DataCache.salesPersonData;
    }
    Data.getSalesPersons = getSalesPersons;
    /** Get a single sales territory matching the specified primary key
     */
    function getSalesTerritoryById(territoryId) {
        return ArrayUtil.findPropValue(getSalesTerritorys(), "territoryId", territoryId);
    }
    Data.getSalesTerritoryById = getSalesTerritoryById;
    /** Get all sales territories as an array
     */
    function getSalesTerritorys() {
        return DataCache.salesTerritoryData;
    }
    Data.getSalesTerritorys = getSalesTerritorys;
    /** Get a single customer store matching the specified primary key
     */
    function getStoreById(businessEntityId) {
        return ArrayUtil.findPropValue(getStores(), "businessEntityId", businessEntityId);
    }
    Data.getStoreById = getStoreById;
    /** Get all customer stores as an array
     */
    function getStores() {
        return DataCache.storeData;
    }
    Data.getStores = getStores;
    // ==== filtering ====
    /** Returns a list of sales orders made by a specific sales person
     */
    function filterSalesBySalesPersonId(salesPersonId) {
        var salesHeaders = Data.getSalesOrderHeaders();
        var salesPersonSalesHeaders = [];
        for (var i = 0, size = salesHeaders.length; i < size; i++) {
            var salesHeader = salesHeaders[i];
            if (salesHeader.salesPersonId == salesPersonId) {
                salesPersonSalesHeaders.push(salesHeader);
            }
        }
        var salesOrders = [];
        for (var i = 0, size = salesPersonSalesHeaders.length; i < size; i++) {
            var salesHeader = salesPersonSalesHeaders[i];
            salesOrders.push({
                salesOrderHeader: salesHeader,
                salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesHeader.salesOrderId)
            });
        }
        return salesOrders;
    }
    Data.filterSalesBySalesPersonId = filterSalesBySalesPersonId;
    /** Filter a list of person-like objects by first/last name
     */
    function filterName(name, ary) {
        // example: for-loop, compare to 'name' parameter
    }
    Data.filterName = filterName;
})(Data || (Data = {}));
module.exports = Data;
