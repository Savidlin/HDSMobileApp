using System.Runtime.Serialization;

namespace HDSMobileApp.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents entity with user master.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>HDS Author</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public class UserMaster
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserMaster"/> class.
        /// </para>
        /// </summary>
        public UserMaster()
        {
        }

        /// <value>The user number. It can hold any value.</value>
        [DataMember]
        public decimal? UserNumber
        {
            get;
            set;
        }

        /// <value>The name. It can hold any value.</value>
        [DataMember]
        public string Name
        {
            get;
            set;
        }

        /// <value>The user identifier. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier
        {
            get;
            set;
        }

        /// <value>The primary branch number. It can hold any value.</value>
        [DataMember]
        public decimal PrimaryBranchNumber
        {
            get;
            set;
        }

        /// <value>The email address. It can hold any value.</value>
        [DataMember]
        public string EmailAddress
        {
            get;
            set;
        }

        /// <value>The phone. It can hold any value.</value>
        [DataMember]
        public string Phone
        {
            get;
            set;
        }

        /// <value>The fax. It can hold any value.</value>
        [DataMember]
        public string Fax
        {
            get;
            set;
        }

        /// <value>The mobile. It can hold any value.</value>
        [DataMember]
        public string Mobile
        {
            get;
            set;
        }
    }
}
