using System;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /** An entity class that represents auditable entity.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    [DataContract]
    public abstract class AuditableEntity : IdentifiableEntity
    {
        /// <summary>
        /// Represents the last update date.
        /// </summary>
        private DateTime lastUpdateDate = DateTime.UtcNow;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditableEntity"/> class.
        /// </summary>
        protected AuditableEntity()
        {
        }

        /// <value>The last update date. It can hold any value.</value>
        [DataMember]
        public DateTime LastUpdateDate
        {
            get
            {
                return lastUpdateDate;
            }
            set
            {
                lastUpdateDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
            }
        }
    }
}
