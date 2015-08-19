using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class Person {

        [DataMember]
        [Column("BusinessEntityID")]
        public long businessEntityId { get; set; }

        [DataMember]
        [Column("PersonType")]
        public string personType { get; set; }

        [DataMember]
        [DefaultValue(null)]
        [Column("NameStyle")]
        public string nameStyle { get; set; }

        [DataMember]
        [Column("Title")]
        public string title { get; set; }

        [DataMember]
        [Column("FirstName")]
        public string firstName { get; set; }

        [DataMember]
        [Column("MiddleName")]
        public string middleName { get; set; }

        [DataMember]
        [Column("LastName")]
        public string lastName { get; set; }

        [DataMember]
        [Column("Suffix")]
        public string suffix { get; set; }

        [DataMember]
        [Column("EmailPromotion")]
        public long emailPromotion { get; set; }

        [DataMember]
        [Column("Demographics")]
        public string demographics { get; set; }

    }

}
