using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class SalesOrderHeaderSearcher
    {

        [DataMember]
        public long salesOrderId { get; set; }

    }

}
