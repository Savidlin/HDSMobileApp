"use strict";
import ArrayUtil = require("../utils/ArrayUtil");
import DataCache = require("./DataCache");

module Data {

    export function getCustomerById(customerId: number): Models.Customer {
        return ArrayUtil.findPropValue(getCustomers(), "customerId", customerId);
    }

    export function getCustomers(): Models.Customer[] {
        return DataCache.customerData;
    }


    export function getEmployeeById(businessEntityId: number): Models.Employee {
        return ArrayUtil.findPropValue(getEmployees(), "businessEntityId", businessEntityId);
    }

    export function getEmployees(): Models.Employee[] {
        return DataCache.employeeData;
    }


    export function getEmployeePayHistoryByEmployeeId(businessEntityId: number): Models.EmployeePayHistory[]{
        return ArrayUtil.findAllPropValue(getEmployeePayHistory(), "businessEntityId", businessEntityId);
    }

    export function getEmployeePayHistory(): Models.EmployeePayHistory[] {
        return DataCache.employeePayHistoryData;
    }


    export function getPersonById(businessEntityId: number): Models.Person {
        return ArrayUtil.findPropValue(getPersons(), "businessEntityId", businessEntityId);
    }

    export function getPersons(): Models.Person[] {
        return DataCache.personData;
    }


    export function getProductById(productId: number): Models.Product {
        return ArrayUtil.findPropValue(getProducts(), "productId", productId);
    }

    export function getProducts(): Models.Product[] {
        return DataCache.productData;
    }


    export function getSalesOrderDetailBySalesOrderId(salesOrderId: number): Models.SalesOrderDetail[] {
        return ArrayUtil.findAllPropValue(getSalesOrderDetails(), "salesOrderId", salesOrderId);
    }

    export function getSalesOrderDetailById(salesOrderDetailId: number): Models.SalesOrderDetail {
        return ArrayUtil.findPropValue(getSalesOrderDetails(), "salesOrderDetailId", salesOrderDetailId);
    }

    export function getSalesOrderDetails(): Models.SalesOrderDetail[] {
        return DataCache.salesOrderDetailData;
    }


    export function getSalesOrderHeaderById(salesOrderId: number): Models.SalesOrderHeader {
        return ArrayUtil.findPropValue(getSalesOrderHeaders(), "salesOrderId", salesOrderId);
    }

    export function getSalesOrderHeaders(): Models.SalesOrderHeader[] {
        return DataCache.salesOrderHeaderData;
    }


    export function getSalesPersonById(businessEntityId: number): Models.SalesPerson {
        return ArrayUtil.findPropValue(getSalesPersons(), "businessEntityId", businessEntityId);
    }

    export function getSalesPeopleByTerritoryId(territoryId: number): Models.SalesPerson[]{

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

    //couldn't use newley created model Models.SalesPeopleEmployee[] as return type
    //another jquery extend issue
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

    export function getSalesPersons(): Models.SalesPerson[] {
        return DataCache.salesPersonData;
    }


    export function getSalesTerritoryById(territoryId: number): Models.SalesTerritory {
        return ArrayUtil.findPropValue(getSalesTerritorys(), "territoryId", territoryId);
    }

    export function getSalesTerritorys(): Models.SalesTerritory[]{
        return DataCache.salesTerritoryData;
    }


    export function getStoreById(businessEntityId: number): Models.Store {
        return ArrayUtil.findPropValue(getStores(), "businessEntityId", businessEntityId);
    }

    export function getStores(): Models.Store[]{
        return DataCache.storeData;
    }

}

export = Data;
