/*
* Copyright (c) 2014, TopCoder, Inc. All rights reserved.
*/
using System.Runtime.Serialization;
using System;
namespace Corningstone.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents entity with user profile customer delivery location.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TrePe</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, TopCoder, Inc. All rights reserved.</copyright>
    [DataContract]
    public class UserProfileCustomerLocation : UserCustomizableEntity
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserProfileCustomerLocation"/> class.
        /// </para>
        /// </summary>
        public UserProfileCustomerLocation()
        {
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
        /// Gets or sets the customer number.
        /// </para>
        /// </summary>
        /// <value>The customer number. It can hold any value.</value>
        [DataMember]
        public decimal CustomerNumber
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
        /// <value>The address2. It can hold any value.</value>
        [DataMember]
        public string Address2
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the city.
        /// </para>
        /// </summary>
        /// <value>The city. It can hold any value.</value>
        [DataMember]
        public string City
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the state.
        /// </para>
        /// </summary>
        /// <value>The state. It can hold any value.</value>
        [DataMember]
        public string State
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the zip.
        /// </para>
        /// </summary>
        /// <value>The zip. It can hold any value.</value>
        [DataMember]
        public string Zip
        {
            get;
            set;
        }

        /// <summary>
        /// <para>
        /// Gets or sets the country.
        /// </para>
        /// </summary>
        /// <value>The country. It can hold any value.</value>
        [DataMember]
        public string Country
        {
            get;
            set;
        }
    }
}