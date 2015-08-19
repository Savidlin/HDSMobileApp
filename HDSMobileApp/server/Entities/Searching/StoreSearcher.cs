using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class StoreSearcher
    {

        [DataMember]
        public long businessEntityId { get; set; }

    }

}
