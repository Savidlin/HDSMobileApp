using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class SalesOrderDetailSearcher
    {

        [DataMember]
        public long salesOrderId { get; set; }

    }

}
