using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class EmployeeSearcher
    {

        [DataMember]
        public string businessEntityId { get; set; }

    }

}
