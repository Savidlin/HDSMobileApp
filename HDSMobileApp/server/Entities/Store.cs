using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class Store {

        [DataMember]
        [Column("BusinessEntityID")]
        public long businessEntityId { get; set; }

        [DataMember]
        [Column("name")]
        public string name { get; set; }

        [DataMember]
        [Column("SalesPersonID")]
        public long salesPersonId { get; set; }

        [DataMember]
        [Column("Demographics")]
        public string demographics { get; set; }

    }

}
