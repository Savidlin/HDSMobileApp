using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities {

    [DataContract]
    public class Product {

        [DataMember]
        [Column("ProductID")]
        public long productId { get; set; }

        [DataMember]
        [Column("Name")]
        public string name { get; set; }

        [DataMember]
        [Column("ProductNumber")]
        public string productNumber { get; set; }

        [DataMember]
        [Column("color")]
        public string color { get; set; }

        [DataMember]
        [Column("StandardCost")]
        public double standardCost { get; set; }

        [DataMember]
        [Column("ListPrice")]
        public double listPrice { get; set; }

        [DataMember]
        [Column("Size")]
        public string size { get; set; }

        [DataMember]
        [Column("weight")]
        public string weight { get; set; }

        [DataMember]
        [Column("DaysToManufacture")]
        public long daysToManufacture { get; set; }

        [DataMember]
        [Column("ProductLine")]
        public string productLine { get; set; }

        // TODO customized data member not yet added to generator
        [DataMember(Name = "class")]
        [Column("Class")]
        public string Class { get; set; }

        [DataMember]
        [Column("Style")]
        public string style { get; set; }

        [DataMember]
        [Column("ProductSubcategoryID")]
        public string productSubcategoryId { get; set; }

        [DataMember]
        [Column("ProductModelID")]
        public string productModelId { get; set; }

        [DataMember]
        [Column("SellStartDate")]
        public string sellStartDate { get; set; }

        [DataMember]
        [Column("SellEndDate")]
        public string sellEndDate { get; set; }

        [DataMember]
        [Column("DiscontinuedDate")]
        public string discontinuedDate { get; set; }
        
    }

}
