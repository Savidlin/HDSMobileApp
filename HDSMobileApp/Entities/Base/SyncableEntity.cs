﻿/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base
{
    /// <summary>
    /// <para>
    /// A 'syncable' entity that can be synchronized between the server and client.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>Benjamin</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class SyncableEntity
    {
        /// <summary>
        /// Represents the last update date.
        /// </summary>
        private DateTime lastUpdateDate = DateTime.UtcNow;


        /// <value>The deleted flag. It can hold any value.</value>
        [DataMember]
        public bool Deleted
        {
            get;
            set;
        }

        /// <value>The last update date. It can hold any value.</value>
        [DataMember]
        public DateTime LastUpdateDate
        {
            get
            {
                return lastUpdateDate;
            }
            set
            {
                lastUpdateDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
            }
        }

    }

}