using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class EmployeeSearcher
    {

        [DataMember]
        public long businessEntityId { get; set; }

    }

}
