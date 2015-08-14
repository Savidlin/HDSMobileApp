/*
*  Copyright (c) 2013, TopCoder, Inc. All rights reserved.
*/
using System.Runtime.Serialization;

namespace Corningstone.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents user customer search criteria entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2013, TopCoder, Inc. All rights reserved.</copyright>
    [DataContract]
    public class UserCustomerSearchCriteria : SearchCriteria
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserCustomerSearchCriteria"/> class.
        /// </para>
        /// </summary>
        public UserCustomerSearchCriteria()                         
        {
        }

        /// <summary>
        /// <para>
        /// Gets or sets the user id filter.
        /// </para>
        /// </summary>
        /// <value>The user id filter. It can hold any value.</value>
        [DataMember]
        public string UserId
        {
            get;
            set;
        }
    }
}