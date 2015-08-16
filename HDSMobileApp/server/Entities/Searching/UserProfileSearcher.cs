using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /** An entity class that represents user profile search criteria entity.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    [DataContract]
    public class UserProfileSearcher : UserCustomizableEntitySearchCriteria
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserProfileSearcher"/> class.
        /// </summary>
        public UserProfileSearcher() {
        }

        /// <value>The admin request flag. It can hold any value.</value>
        [DataMember]
        public bool? IsAdmin { get; set; }

    }

}
