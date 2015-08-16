using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Searching
{
    /** An entity class that represents user master search criteria entity.
     * @threadsafety  This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.
     */
    [DataContract]
    public class UserMasterSearcher
    {

        public UserMasterSearcher() {
        }

        /// <value>The number for the user of the application. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier { get; set; }

    }

}
