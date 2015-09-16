"use strict";
import ArrayUtil = require("../utils/ArrayUtil");
import DataCache = require("./DataCache");

module Data {

    /** Get a single customer matching the specified primary key
     */
    export function getCustomerById(customerId: number): Models.Customer {
        return ArrayUtil.findPropValue(getCustomers(), "customerId", customerId);
    }

    /** Get all customers as an array
     */
    export function getCustomers(): Models.Customer[] {
        return DataCache.customerData;
    }

    /** Get all sales orders from a specific customer ID
     */
    export function getSalesOrderHeadersByCustomerId(customerId: number): Models.SalesOrderHeader[] {
        //return ArrayUtil.findPropValue(getSalesPersons(), "territoryId", territoryId);
        var saleHeaders = DataCache.salesOrderHeaderData;
        var retMe: Models.SalesOrderHeader[] = [];

        for (var i = 0; i < saleHeaders.length; i++) {
            if (saleHeaders[i].customerId == customerId) {
                retMe.push(saleHeaders[i]);
            }
        }

        return retMe;
    }

    export function joinSalesPersonWithEmpAndPerson(salesPersons: Models.SalesPerson[]): Models.SalesPerson[] {
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


    /** Get a single employee matching the specified primary key
     */
    export function getEmployeeById(businessEntityId: number): Models.Employee {
        return ArrayUtil.findPropValue(getEmployees(), "businessEntityId", businessEntityId);
    }

    /** Get all employees as an array
     */
    export function getEmployees(): Models.Employee[] {
        return DataCache.employeeData;
    }


    /** Get a single employee's pay history as an array
     */
    export function getEmployeePayHistoryByEmployeeId(businessEntityId: number): Models.EmployeePayHistory[] {
        return ArrayUtil.findAllPropValue(getEmployeePayHistory(), "businessEntityId", businessEntityId);
    }

    /** Get all pay histories for all employees as an array
     */
    export function getEmployeePayHistory(): Models.EmployeePayHistory[] {
        return DataCache.employeePayHistoryData;
    }


    /** Get a single person entity matching the specified primary key
     */
    export function getPersonById(businessEntityId: number): Models.Person {
        return ArrayUtil.findPropValue(getPersons(), "businessEntityId", businessEntityId);
    }

    /** Get all person entities as an array
     */
    export function getPersons(): Models.Person[] {
        return DataCache.personData;
    }


    /** Get a single product matching the specified primary key
     */
    export function getProductById(productId: number): Models.Product {
        return ArrayUtil.findPropValue(getProducts(), "productId", productId);
    }

    /** Get all products as an array
     */
    export function getProducts(): Models.Product[] {
        return DataCache.productData;
    }


    /** Get all the sales order details (line items) associated with a sales order ID as an array
     */
    export function getSalesOrderDetailBySalesOrderId(salesOrderId: number): Models.SalesOrderDetail[] {
        return ArrayUtil.findAllPropValue(getSalesOrderDetails(), "salesOrderId", salesOrderId);
    }

    /** Get a single sales order detail (line item) matching the specified primary key
     */
    export function getSalesOrderDetailById(salesOrderDetailId: number): Models.SalesOrderDetail {
        return ArrayUtil.findPropValue(getSalesOrderDetails(), "salesOrderDetailId", salesOrderDetailId);
    }

    /** Get all sales order details (all line items for all sales orders) as an array
     */
    export function getSalesOrderDetails(): Models.SalesOrderDetail[] {
        return DataCache.salesOrderDetailData;
    }

    /** Get all sales orders made by a specific sales person ID
     */
    export function getSalesOrderHeaderBySalesPersonId(salesPersonId: number): Models.SalesOrderHeader[] {
        return ArrayUtil.findAllPropValue(Data.getSalesOrderHeaders(), "salesPersonId", salesPersonId);
    }

    /** Get a single sales order header matching the specified primary key
     */
    export function getSalesOrderHeaderById(salesOrderId: number): Models.SalesOrderHeader {
        return ArrayUtil.findPropValue(getSalesOrderHeaders(), "salesOrderId", salesOrderId);
    }

    /** Get all sales order headers as an array
     */
    export function getSalesOrderHeaders(): Models.SalesOrderHeader[] {
        return DataCache.salesOrderHeaderData;
    }


    /** Create a sales order object containing order information and line items for a give sales order
     */
    export function joinSalesOrderHeaderToDetails(salesOrderId: number): Models.SalesOrderObj {
        return {
            salesOrderHeader: Data.getSalesOrderHeaderById(salesOrderId),
            salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesOrderId)
        }
    }


    /** Get a single sales person matching the specified primary key
     */
    export function getSalesPersonById(businessEntityId: number): Models.SalesPerson {
        return ArrayUtil.findPropValue(getSalesPersons(), "businessEntityId", businessEntityId);
    }

    /** Get all sales persons assigned to a specific territory as an array
     */
    export function getSalesPeopleByTerritoryId(territoryId: number): Models.SalesPerson[] {
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


    /** Join Sales person info (yearly sales, region, etc.) with employee info (name, DOB, vacation hours) to get all information about a sales person
     */
    export function joinEmployeeSalesPeople(territoryId: number): Models.SalesPeopleEmployee[] {
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
        return <Models.SalesPeopleEmployee[]>salesPeople;
    }

    /** Get all sales persons as an array
     */
    export function getSalesPersons(): Models.SalesPerson[] {
        return DataCache.salesPersonData;
    }


    /** Get a single sales territory matching the specified primary key
     */
    export function getSalesTerritoryById(territoryId: number): Models.SalesTerritory {
        return ArrayUtil.findPropValue(getSalesTerritorys(), "territoryId", territoryId);
    }

    /** Get all sales territories as an array
     */
    export function getSalesTerritorys(): Models.SalesTerritory[]{
        return DataCache.salesTerritoryData;
    }


    /** Get a single customer store matching the specified primary key
     */
    export function getStoreById(businessEntityId: number): Models.Store {
        return ArrayUtil.findPropValue(getStores(), "businessEntityId", businessEntityId);
    }

    /** Get all customer stores as an array
     */
    export function getStores(): Models.Store[] {
        return DataCache.storeData;
    }


    // ==== filtering ====

    /** Returns a list of sales orders made by a specific sales person
     */
    export function filterSalesBySalesPersonId(salesPersonId: number): Models.SalesOrderObj[] {
        var salesHeaders = Data.getSalesOrderHeaders();

        var salesPersonSalesHeaders: Models.SalesOrderHeader[] = [];

        for (var i = 0, size = salesHeaders.length; i < size; i++) {
            var salesHeader = salesHeaders[i];
            if (salesHeader.salesPersonId == salesPersonId) {
                salesPersonSalesHeaders.push(salesHeader);
            }
        }

        var salesOrders: { salesOrderHeader: Models.SalesOrderHeader; salesOrderDetails: Models.SalesOrderDetail[] }[] = [];

        for (var i = 0, size = salesPersonSalesHeaders.length; i < size; i++) {
            var salesHeader = salesPersonSalesHeaders[i];
            salesOrders.push({
                salesOrderHeader: salesHeader,
                salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesHeader.salesOrderId)
            });
        }

        return salesOrders;
    }


    /** Filter a list of person-like objects by first/last name
     */
    export function filterName<T extends { firstName?: string; lastName?: string }>(name: string, ary: T[]) {
        // example: for-loop, compare to 'name' parameter
    }

}

export = Data;
