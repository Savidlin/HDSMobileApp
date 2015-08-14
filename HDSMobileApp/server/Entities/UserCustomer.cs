/*
* Copyright (c) 2013, TopCoder, Inc. All rights reserved.
*/
using System.Runtime.Serialization;
namespace Corningstone.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents entity with user customer.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2013, TopCoder, Inc. All rights reserved.</copyright>
     [DataContract]
    public class UserCustomer
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref=" UserCustomer"/> class.
        /// </para>
        /// </summary>
        public UserCustomer()
        {
        }

        /// <summary>
        /// <para>
        /// Gets or sets the user id .
        /// </para>
        /// </summary>
        /// <value>The user id. It can hold any value.</value>
        [DataMember]
        public decimal UserId
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the customer id.
        /// </para>
        /// </summary>
        /// <value>The customer id. It can hold any value.</value>
        [DataMember]
        public decimal CustomerId
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the name.
        /// </para>
        /// </summary>
        /// <value>The name. It can hold any value.</value>
        [DataMember]
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the address1.
        /// </para>
        /// </summary>
        /// <value>The address1. It can hold any value.</value>
        [DataMember]
        public string Address1
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the address2.
        /// </para>
        /// </summary>
        /// <value>The address1. It can hold any value.</value>
        [DataMember]
        public string Address2
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the address3.
        /// </para>
        /// </summary>
        /// <value>The address1. It can hold any value.</value>
        [DataMember]
        public string Address3
        {
            get; 
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the phone.
        /// </para>
        /// </summary>
        /// <value>The phone. It can hold any value.</value>
        [DataMember]
        public string Phone
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the fax.
        /// </para>
        /// </summary>
        /// <value>The fax. It can hold any value.</value>
        [DataMember]
        public string Fax
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the email address.
        /// </para>
        /// </summary>
        /// <value>The email address. It can hold any value.</value>
        [DataMember]
        public string EmailAddress
        {
            get;
            set;
        }
    }
}