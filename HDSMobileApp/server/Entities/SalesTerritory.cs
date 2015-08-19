using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class SalesTerritory {

        [DataMember]
        [Column("TerritoryID")]
        public long territoryId { get; set; }

        [DataMember]
        [Column("name")]
        public string name { get; set; }

        [DataMember]
        [Column("CountryRegionCode")]
        public string countryRegionCode { get; set; }

        [DataMember]
        [Column("group")]
        public string group { get; set; }

        [DataMember]
        [Column("SalesYTD")]
        public double salesYTD { get; set; }

        [DataMember]
        [Column("SalesLastYear")]
        public double salesLastYear { get; set; }

        [DataMember]
        [Column("CostYTD")]
        public double costYTD { get; set; }

        [DataMember]
        [Column("CostLastYear")]
        public double costLastYear { get; set; }

    }

}
