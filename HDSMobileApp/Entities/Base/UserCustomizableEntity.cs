/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /// <summary>
    /// <para>
    /// An entity class that represents user customizable entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>Yeung</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class UserCustomizableEntity : SyncableEntity
    {

        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserCustomizableEntity"/> class.
        /// </para>
        /// </summary>
        protected UserCustomizableEntity()
        {
        }

        /// <value>The user identifier. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier
        {
            get;
            set;
        }

    }

}
