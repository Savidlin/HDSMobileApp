using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class SalesPersonSearcher
    {

        [DataMember]
        public long businessEntityId { get; set; }

    }

}
