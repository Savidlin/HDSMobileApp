/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents user profile search criteria entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public class UserProfileSearchCriteria : UserCustomizableEntitySearchCriteria
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserProfileSearchCriteria"/> class.
        /// </para>
        /// </summary>
        public UserProfileSearchCriteria()
        {
        }

        /// <value>The admin request flag. It can hold any value.</value>
        [DataMember]
        public bool? IsAdmin
        {
            get;
            set;
        }

    }
}
