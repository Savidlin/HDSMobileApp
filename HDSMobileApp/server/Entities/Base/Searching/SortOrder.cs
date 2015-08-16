using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /** An enum class that represents sort order property.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
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
