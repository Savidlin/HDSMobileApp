using System.Runtime.Serialization;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using HDSMobileApp.Entities.Base;

namespace HDSMobileApp.Entities
{
    /// <summary>
    /// <para>
    /// An entity class that represents entity with user profile.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>HDS Author</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    [DataContract]
    public class UserProfile : UserCustomizableEntity
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="UserProfile"/> class.
        /// </para>
        /// </summary>
        public UserProfile()
        {
        }

        /// <value>The user number. It can hold any value.</value>
        [DataMember]
        public decimal? UserNumber
        {
            get;
            set;
        }

        /// <value>The name. It can hold any value.</value>
        [DataMember]
        public string Name
        {
            get;
            set;
        }

        /// <value>The primary branch number. It can hold any value.</value>
        [DataMember]
        public decimal PrimaryBranchNumber
        {
            get;
            set;
        }

        /// <value>The pricing profile number 1. It can hold any value.</value>
        [DataMember]
        public string PricingProfileNumber1
        {
            get;
            set;
        }

        /// <value>The pricing profile number 2. It can hold any value.</value>
        [DataMember]
        public string PricingProfileNumber2
        {
            get;
            set;
        }

        /// <value>The pricing profile number 3. It can hold any value.</value>
        [DataMember]
        public string PricingProfileNumber3
        {
            get;
            set;
        }

        /// <value>The pricing profile number 4. It can hold any value.</value>
        [DataMember]
        public String PricingProfileNumber4
        {
            get;
            set;
        }

        /// <value>The pricing profile number 5. It can hold any value.</value>
        [DataMember]
        public string PricingProfileNumber5
        {
            get;
            set;
        }

        /// <value>The pricing profile number 6. It can hold any value.</value>
        [DataMember]
        public string PricingProfileNumber6
        {
            get;
            set;
        }

        /// <value>The email address. It can hold any value.</value>
        [DataMember]
        public string EmailAddress
        {
            get;
            set;
        }

        /// <value>The phone. It can hold any value.</value>
        [DataMember]
        public string Phone
        {
            get;
            set;
        }

        /// <value>The fax. It can hold any value.</value>
        [DataMember]
        public string Fax
        {
            get;
            set;
        }

        /// <value>The mobile. It can hold any value.</value>
        [DataMember]
        public string Mobile
        {
            get;
            set;
        }

        /// <value>The currency code. It can hold any value.</value>
        [DataMember]
        public string CurrencyCode
        {
            get;
            set;
        }

        /// <value>The language Id. It can hold any value.</value>
        [DataMember]
        public decimal LanguageId
        {
            get;
            set;
        }

        /// <value>Value indicating whether the print part numbers Bid print option is Y or N. It can hold any value.</value>
        [DataMember]
        public bool PrintPartNum
        {
            get;
            set;
        }

        /// <value>Value indicating whether or not special items of headers added to the bid
        ///   include blank lines before, after, or around the header item. It can hold any value.</value>
        [DataMember]
        public string HeaderPrintOption
        {
            get;
            set;
        }

        /// <value>The submittal group id. It can hold any value.</value>
        [DataMember]
        public decimal? SubmittalGroupId
        {
            get;
            set;

        }

        /// <value>Value indicating which item description to use when printing.
        ///   Includes standard, metric, salese, spanish, french. It can hold any value.</value>
        [DataMember]
        public string ItemDescriptionPrintOption
        {
            get;
            set;
        }

        /// <value>The last login date. It can hold any value.</value>
        [DataMember]
        [NotMapped]
        public DateTime? LastLoginDate
        {
            get;
            set;
        }

        /// <value>Flag indicating whether a login issue has been recorded. It can hold any value.</value>
        [DataMember]
        [NotMapped]
        public bool? HasLoginSyncIssue
        {
            get;
            set;
        }
    }
}
