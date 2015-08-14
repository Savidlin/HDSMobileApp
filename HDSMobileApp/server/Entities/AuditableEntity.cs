/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Corningstone.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents auditable entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>Yeung</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class AuditableEntity : IdentifiableEntity
    {
        /// <summary>
        /// Represents the last update date.
        /// </summary>
        private DateTime lastUpdateDate = DateTime.UtcNow;

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="AuditableEntity"/> class.
        /// </para>
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
