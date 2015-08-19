using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class EmployeePayHistorySearcher
    {

        [DataMember]
        public long businessEntityId { get; set; }

    }

}
