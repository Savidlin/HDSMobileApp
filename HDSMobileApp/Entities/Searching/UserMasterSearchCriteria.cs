/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents user master search criteria entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public class UserMasterSearchCriteria : SearchCriteria
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserMasterSearchCriteria"/> class.
        /// </para>
        /// </summary>
        public UserMasterSearchCriteria()
        {
        }

        /// <value>The number for the user of the application. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier
        {
            get;
            set;
        }
    }
}
