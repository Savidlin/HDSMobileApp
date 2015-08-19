using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching {

    [DataContract]
    public class SalesTerritorySearcher
    {

        [DataMember]
        public long salesTerritoryId { get; set; }

    }

}
