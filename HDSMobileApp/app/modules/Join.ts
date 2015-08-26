"use strict";
import Data = require("./Data");

module Join {

    /** Create a sales order object for the give sales order
     */
    export function getSalesOrder(salesOrderId: number): Models.SalesOrderObj {
        return {
            salesOrderHeader: Data.getSalesOrderHeaderById(salesOrderId),
            salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesOrderId)
        }
    }

}

export = Join;
