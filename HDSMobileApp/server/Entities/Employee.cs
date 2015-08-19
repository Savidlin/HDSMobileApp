using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class Employee {

        [DataMember]
        [Column("BusinessEntityID")]
        public long businessEntityId { get; set; }

        [DataMember]
        [Column("NationalIDNumber")]
        public long nationalIdNumber { get; set; }

        [DataMember]
        [Column("LoginID")]
        public string loginId { get; set; }

        [DataMember]
        [Column("OrganizationLevel")]
        public long organizationLevel { get; set; }

        [DataMember]
        [Column("JobTitle")]
        public string jobTitle { get; set; }

        [DataMember]
        [Column("BirthDate")]
        public DateTime? birthDate { get; set; }

        [DataMember]
        [Column("MaritalStatus")]
        public string maritalStatus { get; set; }

        [DataMember]
        [Column("Gender")]
        public string gender { get; set; }

        [DataMember]
        [Column("HireDate")]
        public DateTime? hireDate { get; set; }

        [DataMember]
        [Column("SalariedFlag")]
        public string salariedFlag { get; set; }

        [DataMember]
        [Column("VacationHours")]
        public int vacationHours { get; set; }

        [DataMember]
        [Column("SickLeaveHours")]
        public int sickLeaveHours { get; set; }

        [DataMember]
        [DefaultValue(null)]
        [Column("CurrentFlag")]
        public string currentFlag { get; set; }

        [DataMember]
        [Column("PersonType")]
        public string personType { get; set; }

        [DataMember]
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

    }

}
