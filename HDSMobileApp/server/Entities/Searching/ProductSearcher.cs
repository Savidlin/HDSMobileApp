using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class ProductSearcher
    {

        [DataMember]
        public long productId { get; set; }

    }

}
