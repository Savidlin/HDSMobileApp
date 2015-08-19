using System.Runtime.Serialization;

namespace HDSMobileApp.Entities.Base {
    /** An entity class that represents user customizable entity.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    [DataContract]
    public abstract class UserCustomizableEntity : SyncableEntity {

        /// <summary>
        /// Initializes a new instance of the <see cref="UserCustomizableEntity"/> class.
        /// </summary>
        protected UserCustomizableEntity() {
        }

        /// <value>The user identifier. It can hold any value.</value>
        [DataMember]
        public string UserIdentifier {
            get;
            set;
        }

    }

}
