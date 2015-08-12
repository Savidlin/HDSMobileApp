/*
* Copyright (c) 2013, TopCoder, Inc. All rights reserved.
*/
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace Corningstone.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents user model.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2013, TopCoder, Inc. All rights reserved.</copyright>
     [DataContract]
    public class User : IdentifiableEntity
    {

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="User"/> class.
        /// </para>
        /// </summary>
        public User()
        {
        }

        /// <summary>
        /// <para>
        /// Gets or sets the user name .
        /// </para>
        /// </summary>
        /// <value>The user name. It can hold any value.</value>
        [DataMember]
        [Required]
        [StringLength(50)]
        public string UserName
        {
            get;
            set;
        }
    }
}