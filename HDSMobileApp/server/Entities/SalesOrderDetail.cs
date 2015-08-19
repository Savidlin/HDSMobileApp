using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class SalesOrderDetail {

        [DataMember]
        [Column("SalesOrderID")]
        public long salesOrderId { get; set; }

        [DataMember]
        [Column("SalesOrderDetailID")]
        public long salesOrderDetailId { get; set; }

        [DataMember]
        [Column("CarrierTrackingNumber")]
        public string carrierTrackingNumber { get; set; }

        [DataMember]
        [Column("OrderQty")]
        public long orderQty { get; set; }

        [DataMember]
        [Column("ProductID")]
        public long productId { get; set; }

        [DataMember]
        [Column("UnitPrice")]
        public double unitPrice { get; set; }

        [DataMember]
        [Column("UnitPriceDiscount")]
        public double unitPriceDiscount { get; set; }

        [DataMember]
        [Column("LineTotal")]
        public double lineTotal { get; set; }

    }

}
