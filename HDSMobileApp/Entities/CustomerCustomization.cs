/*
* Copyright (c) 2013, TopCoder, Inc. All rights reserved.
*/
using System.Runtime.Serialization;
using System;
namespace Corningstone.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents entity with customer customization.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2013, TopCoder, Inc. All rights reserved.</copyright>
     [DataContract]
    public class CustomerCustomization : UserCustomizableEntity
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="CustomerCustomization"/> class.
        /// </para>
        /// </summary>
        public CustomerCustomization()
        {
        }

        /// <summary>
        /// <para>
        /// Gets or sets the Customer number .
        /// </para>
        /// </summary>
        /// <value>The Customer number. It can hold any value.</value>
        [DataMember]
        public decimal CustomerNumber
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
        /// Gets or sets the contact name.
        /// </para>
        /// </summary>
        /// <value>The contact name. It can hold any value.</value>
        [DataMember]
        public string ContactName
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
        /// Gets or sets the market class code.
        /// </para>
        /// </summary>
        /// <value>The market class code. It can hold any value.</value>
        [DataMember]
        public string MarketClassCode
        {
            get;
            set;
        }
        }
}