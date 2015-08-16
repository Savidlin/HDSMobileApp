using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HDSMobileApp.Entities
{

    [DataContract]
    public class Employee
    {

        [DataMember]
        public string businessEntityId { get; set; }

        [DataMember]
        public string nationalIdNumber { get; set; }

        [DataMember]
        public string loginId { get; set; }

        [DataMember]
        public string jobTitle { get; set; }

        [DataMember]
        public string birthDate { get; set; }

        [DataMember]
        public string maritalStatus { get; set; }

        [DataMember]
        public string gender { get; set; }

        [DataMember]
        public string hireDate { get; set; }

        [DataMember]
        public string salariedFlag { get; set; }

        [DataMember]
        public string vacationHours { get; set; }

        [DataMember]
        public string sickLeaveHours { get; set; }

        [DataMember]
        public string currentFlag { get; set; }

    }

}
