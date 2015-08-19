using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class EmployeePayHistory {

        [DataMember]
        [Column("BusinessEntityID")]
        public long businessEntityId { get; set; }

        [DataMember]
        [Column("RateChangeDate")]
        public DateTime? rateChangeDate { get; set; }

        [DataMember]
        [Column("rate")]
        public double rate { get; set; }

        [DataMember]
        [Column("PayFrequency")]
        public long payFrequency { get; set; }

    }

}
