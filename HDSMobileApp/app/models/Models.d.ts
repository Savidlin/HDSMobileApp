/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */

declare module Models {

    interface Customer {
        customerId: number;
        personId: number;
        storeId: number;
        territoryId: number;
        accountNumber: string;
    }


    interface Employee {
        businessEntityId: number;
        nationalIdNumber: number;
        loginId: string;
        organizationLevel: number;
        jobTitle: string;
        birthDate: string;
        maritalStatus: string;
        gender: string;
        hireDate: string;
        salariedFlag: string;
        vacationHours: number;
        sickLeaveHours: number;
        currentFlag: string;
        personType: string;
        nameStyle: string;
        title: string;
        firstName: string;
        middleName: string;
        lastName: string;
        suffix: string;
        emailPromotion: number;
    }


    interface EmployeePayHistory {
        businessEntityId: number;
        rateChangeDate: string;
        rate: number;
        payFrequency: number;
    }


    interface Person {
        businessEntityId: number;
        personType: string;
        nameStyle: string;
        title: string;
        firstName: string;
        middleName: string;
        lastName: string;
        suffix: string;
        emailPromotion: number;
        demographics: string;
    }


    interface Product {
        productId: number;
        name: string;
        productNumber: string;
        color: string;
        standardCost: number;
        listPrice: number;
        size: string;
        weight: number;
        daysToManufacture: number;
        productLine: string;
        Class: string;
        style: string;
        productSubcategoryId: number;
        productModelId: number;
        sellStartDate: string;
        sellEndDate: string;
        discontinuedDate: string;
    }


    interface SalesOrderDetail {
        salesOrderId: number;
        salesOrderDetailId: number;
        carrierTrackingNumber: string;
        orderQty: number;
        productId: number;
        unitPrice: number;
        unitPriceDiscount: number;
        lineTotal: number;
    }


    interface SalesOrderHeader {
        salesOrderId: number;
        orderDate: string;
        dueDate: string;
        shipDate: string;
        onlineOrderFlag: string;
        salesOrderNumber: string;
        purchaseOrderNumber: string;
        accountNumber: string;
        customerId: number;
        salesPersonId: number;
        territoryId: number;
        shipToAddressId: number;
        subTotal: number;
        taxAmt: number;
        freight: number;
        totalDue: number;
    }


    interface SalesPerson {
        businessEntityId: number;
        territoryId: number;
        salesQuota: number;
        bonus: number;
        commissionPct: number;
        salesYTD: number;
        salesLastYear: number;
    }


    interface SalesTerritory {
        territoryId: number;
        name: string;
        countryRegionCode: string;
        group: string;
        salesYTD: number;
        salesLastYear: number;
        costYTD: number;
        costLastYear: number;
    }


    interface Store {
        businessEntityId: number;
        name: string;
        salesPersonId: number;
        demographics: string;
    }


    // custom models
    export interface SalesOrderObj {
        salesOrderHeader: SalesOrderHeader;
        salesOrderDetails: SalesOrderDetail[];
    }

    interface SalesPeopleEmployee extends SalesPerson, Employee {
    }


    // left over test code
    export interface UserMasterOptional {
        User_Number?: number;
        Name?: string;
        User_Identifier?: string;
        Primary_Branch_Number?: number;
        Email_Address?: string;
        Phone?: string;
        Fax?: string;
        Mobile?: string;
    }


    export interface UserMaster {
        User_Number: number;
        Name: string;
        User_Identifier: string;
        Primary_Branch_Number: number;
        Email_Address: string;
        Phone: string;
        Fax: string;
        Mobile: string;
    }

}
