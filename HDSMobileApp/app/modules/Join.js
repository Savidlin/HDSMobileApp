"use strict";
var Data = require("./Data");
var Join;
(function (Join) {
    /** Create a sales order object for the give sales order
     */
    function getSalesOrder(salesOrderId) {
        return {
            salesOrderHeader: Data.getSalesOrderHeaderById(salesOrderId),
            salesOrderDetails: Data.getSalesOrderDetailBySalesOrderId(salesOrderId)
        };
    }
    Join.getSalesOrder = getSalesOrder;
})(Join || (Join = {}));
module.exports = Join;
