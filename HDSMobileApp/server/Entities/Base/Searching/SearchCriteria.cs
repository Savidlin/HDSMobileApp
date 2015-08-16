using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /** An entity class that represents base search criteria entity.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.
     */
    [DataContract]
    public class SearchRange
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SearchCriteria"/> class.
        /// </summary>
        protected SearchRange() {
        }


        /// <value>The result table offset. It can hold any value.</value>
        [DataMember]
        public int Offset
        {
            get;
            set;
        }

        /// <value>The number of results to return. It can hold any value.</value>
        [DataMember]
        public int Size {
            get;
            set;
        }

        /// <value>The sort by column. It can hold any value.</value>
        [DataMember]
        public string SortBy {
            get;
            set;
        }

        /// <value>The sort order. It can hold any value.</value>
        [DataMember]
        public SortOrder SortOrder {
            get;
            set;
        }

    }

}
