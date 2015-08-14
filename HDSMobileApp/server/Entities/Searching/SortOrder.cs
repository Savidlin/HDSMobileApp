/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An enum class that represents sort order property.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public enum SortOrder
    {
        /// <summary>
        /// The ascending sort order
        /// </summary>
        [EnumMember]
        Ascending,

        /// <summary>
        /// the descending sort order
        /// </summary>
        [EnumMember]
        Descending
    }
}
