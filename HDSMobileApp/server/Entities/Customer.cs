using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class Customer {

        [DataMember]
        [Column("CustomerID")]
        public long customerId { get; set; }

        [DataMember]
        [Column("PersonID")]
        public long? personId { get; set; }

        [DataMember]
        [Column("StoreID")]
        public long? storeId { get; set; }

        [DataMember]
        [Column("TerritoryID")]
        public long territoryId { get; set; }

        [DataMember]
        [Column("AccountNumber")]
        public string accountNumber { get; set; }

    }

}
