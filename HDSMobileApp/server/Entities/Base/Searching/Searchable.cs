using System.Runtime.Serialization;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Entities.Base.Searching {

    [DataContract]
    public class Searchable<T> {

        [DataMember]
        public SearchRange searchRange { get; set; }

        [DataMember]
        public T searchCriteria { get; set; }

    }

}
