using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class SalesPerson {

        [DataMember]
        [Column("BusinessEntityID")]
        public long businessEntityId { get; set; }

        [DataMember]
        [Column("TerritoryID")]
        public long? territoryId { get; set; }

        [DataMember]
        [Column("SalesQuota")]
        public double? salesQuota { get; set; }

        [DataMember]
        [Column("Bonus")]
        public double bonus { get; set; }

        [DataMember]
        [Column("CommissionPct")]
        public double commissionPct { get; set; }

        [DataMember]
        [Column("SalesYTD")]
        public double salesYTD { get; set; }

        [DataMember]
        [Column("SalesLastYear")]
        public double salesLastYear { get; set; }

    }

}
