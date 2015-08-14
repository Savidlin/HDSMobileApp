/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /// <summary>
    /// <para>
    /// An entity class that represents identifiable entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER (HDS Author)</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class IdentifiableEntity
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="IdentifiableEntity"/> class.
        /// </para>
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
