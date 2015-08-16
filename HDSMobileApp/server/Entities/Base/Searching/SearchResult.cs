using System.Collections.Generic;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /** An entity class that represents search result entity.
     * @typeparam <T> the entity type
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    [DataContract]
    public class SearchResult<T>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SearchResult{T}"/> class.
        /// </summary>
        public SearchResult()
        {
        }

        /// <value>The total pages. It can hold any value.</value>
        [DataMember]
        public int ResultCount { get; set; }

        /// <value>The page number. It can hold any value.</value>
        [DataMember]
        public int ResultOffset { get; set; }

        /// <value>The total records. It can hold any value.</value>
        [DataMember]
        public int TotalRecords { get; set; }

        /// <value>The search result  items. It can hold any value.</value>
        [DataMember]
        public IList<T> Items { get; set; }

    }

}
