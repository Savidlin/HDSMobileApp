using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class CustomerSearcher
    {

        [DataMember]
        public long customerId { get; set; }

    }

}
