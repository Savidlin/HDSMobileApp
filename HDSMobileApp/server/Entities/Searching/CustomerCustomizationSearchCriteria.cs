/*
*  Copyright (c) 2013, TopCoder, Inc. All rights reserved.
*/
using System.Runtime.Serialization;

namespace Corningstone.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents Customer Customization search criteria entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2013, TopCoder, Inc. All rights reserved.</copyright>
    [DataContract]
    public class CustomerCustomizationSearchCriteria : UserCustomizableEntitySearchCriteria
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="CustomerCustomizationSearchCriteria"/> class.
        /// </para>
        /// </summary>
        public CustomerCustomizationSearchCriteria()
        {
        }

    }
}