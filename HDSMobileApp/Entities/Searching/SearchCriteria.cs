/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Runtime.Serialization;
namespace HDSMobileApp.Entities.Searching
{
    /// <summary>
    /// <para>
    /// An entity class that represents base search criteria entity.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public abstract class SearchCriteria
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="SearchCriteria"/> class.
        /// </para>
        /// </summary>
        protected SearchCriteria()
        {
        }

        /// <value>The page size. It can hold any value.</value>
        [DataMember]
        public int PageSize
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

        /// <value>The sort by column. It can hold any value.</value>
        [DataMember]
        public string SortBy
        {
            get;
            set;
        }

        /// <value>The sort order. It can hold any value.</value>
        [DataMember]
        public SortOrder SortOrder
        {
            get;
            set;
        }
    }
}
