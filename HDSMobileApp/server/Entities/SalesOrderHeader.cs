using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class SalesOrderHeader {

        [DataMember]
        [Column("SalesOrderID")]
        public long salesOrderId { get; set; }

        [DataMember]
        [Column("OrderDate")]
        public DateTime? orderDate { get; set; }

        [DataMember]
        [Column("DueDate")]
        public DateTime? dueDate { get; set; }

        [DataMember]
        [Column("ShipDate")]
        public DateTime? shipDate { get; set; }

        [DataMember]
        [Column("OnlineOrderFlag")]
        public string onlineOrderFlag { get; set; }

        [DataMember]
        [Column("SalesOrderNumber")]
        public string salesOrderNumber { get; set; }

        [DataMember]
        [Column("PurchaseOrderNumber")]
        public string purchaseOrderNumber { get; set; }

        [DataMember]
        [Column("AccountNumber")]
        public string accountNumber { get; set; }

        [DataMember]
        [Column("CustomerID")]
        public long customerId { get; set; }

        [DataMember]
        [Column("SalesPersonID")]
        public long? salesPersonId { get; set; }

        [DataMember]
        [Column("TerritoryID")]
        public long territoryId { get; set; }

        [DataMember]
        [Column("ShipToAddressID")]
        public long shipToAddressId { get; set; }

        [DataMember]
        [Column("SubTotal")]
        public double subTotal { get; set; }

        [DataMember]
        [Column("TaxAmt")]
        public double taxAmt { get; set; }

        [DataMember]
        [Column("Freight")]
        public double freight { get; set; }

        [DataMember]
        [Column("TotalDue")]
        public double totalDue { get; set; }

    }

}
