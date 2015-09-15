"use strict";
var Data = require("./Data");
var Filter;
(function (Filter) {
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
    Filter.filterSalesBySalesPersonId = filterSalesBySalesPersonId;
    /** Filter a list of person-like objects by first/last name
     */
    function filterName(name, ary) {
        // TODO for-loop, compare to 'name' parameter
    }
    Filter.filterName = filterName;
})(Filter || (Filter = {}));
module.exports = Filter;
