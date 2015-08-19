"use strict";
import Data = require("./Data");

module Filter {

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

        // TODO for-loop, compare to 'name' parameter

    }

}

export = Filter;
