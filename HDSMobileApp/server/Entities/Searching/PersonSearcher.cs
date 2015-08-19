using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class PersonSearcher
    {

        [DataMember]
        public long businessEntityId { get; set; }

    }

}
