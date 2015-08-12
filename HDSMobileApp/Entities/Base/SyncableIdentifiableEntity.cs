/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /// <summary>
    /// <para>
    /// A syncable, identifiable entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>Benjamin</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class SyncableIdentifiableEntity : SyncableEntity
    {
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
