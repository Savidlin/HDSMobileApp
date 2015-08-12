/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Collections.Generic;
using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents search result entity.
    /// </para>
    /// </summary>
    /// <typeparam name="T">
    /// the entity type
    /// </typeparam>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public class SearchResult<T>
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="SearchResult{T}"/> class.
        /// </para>
        /// </summary>
        public SearchResult()
        {
        }

        /// <value>The total pages. It can hold any value.</value>
        [DataMember]
        public int TotalPages
        {
            get;
            set;
        }

        /// <value>The page number. It can hold any value.</value>
        [DataMember]
        public int PageNumber
        {
            get;
            set;
        }

        /// <value>The total records. It can hold any value.</value>
        [DataMember]
        public int TotalRecords
        {
            get;
            set;
        }

        /// <value>The search result  items. It can hold any value.</value>
        [DataMember]
        public IList<T> Items
        {
            get;
            set;
        }
    }
}
