using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /** An entity class that represents identifiable entity.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    [DataContract]
    public abstract class IdentifiableEntity
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="IdentifiableEntity"/> class.
        /// </summary>
        protected IdentifiableEntity()
        {
        }

        /// <value>The Id. It can hold any value.</value>
        [DataMember]
        [Key]
        public decimal Id
        {
            get; 
            set;
        }

    }

}
