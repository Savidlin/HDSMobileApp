/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Searching;
using System.Linq;
using System.Transactions;
using HDSMobileApp.Helpers;
using log4net;

namespace HDSMobileApp.Services.Impl
{
    /// <summary>
    /// <para>
    /// This class provides the contract for manage user profile action.
    /// </para>
    /// </summary>
    /// <remarks>
    /// <para>
    /// This class is immutable, so it is thread-safe.
    /// </para>
    /// </remarks>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    public class UserProfileService : IUserProfileService
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(UserProfileService).Name);

        private static readonly string SyncMethodName = typeof(UserProfileService).FullName + ".Sync";

        private static readonly string SearchMethodName = typeof(UserProfileService).FullName + ".Search";

        private static readonly string RequireNewUserMethodName = typeof(UserProfileService).FullName + ".RequireNewUser";

        private static readonly string ResetMethodName = typeof(UserProfileService).FullName + ".Reset";


        [OperationBehavior(TransactionScopeRequired = true)]
        public void Sync(UserProfile profile)
        {
            Logger.Debug("user profile sync: " + (profile != null ? profile.UserNumber + "" : "") + ", " + profile);

            Helper.LoggingWrapper(Logger, delegate()
            {
                Helper.CheckNotNull(profile, "profile");
                Helper.CheckNotNullOrEmpty(profile.UserIdentifier, "profile.UserIdentifier");
                using (var db = new HDSMobileAppDbContext())
                {
                    var profileInDb = db.UserProfileSet.FirstOrDefault(u => u.UserIdentifier == profile.UserIdentifier);
                    if (profileInDb != null)
                    {
                        Logger.Debug("user profile sync: DB LastUpdate: " + profileInDb.LastUpdateDate + ", New LastUpdate: " + profile.LastUpdateDate + ", diff (ms): " + (profileInDb.LastUpdateDate - profile.LastUpdateDate));
                        //if ((profileInDb.LastUpdateDate - profile.LastUpdateDate).TotalMilliseconds > 50)
                        //{
                        //    Logger.Debug("Not updating time diff not enough!");
                        //    db.UserProfileSet.Add(profile);
                        //    return;
                        //}
                        if (profile.Deleted)
                        {
                            Logger.Debug("deleting user profile: " + profile.UserIdentifier);

                            profileInDb.Deleted = true;
                            profileInDb.LastUpdateDate = profile.LastUpdateDate;
                        }
                        else
                        {
                            Logger.Debug("updating user profile: " + profile.UserIdentifier);

                            profileInDb.CurrencyCode = profile.CurrencyCode;
                            profileInDb.EmailAddress = profile.EmailAddress;
                            profileInDb.Fax = profile.Fax;
                            profileInDb.HeaderPrintOption = profile.HeaderPrintOption;
                            profileInDb.LanguageId = profile.LanguageId;
                            profileInDb.LastUpdateDate = DateTime.UtcNow;
                            profileInDb.Mobile = profile.Mobile;
                            profileInDb.Name = profile.Name;
                            profileInDb.Phone = profile.Phone;
                            profileInDb.PricingProfileNumber1 = profile.PricingProfileNumber1;
                            profileInDb.PricingProfileNumber2 = profile.PricingProfileNumber2;
                            profileInDb.PricingProfileNumber3 = profile.PricingProfileNumber3;
                            profileInDb.PricingProfileNumber4 = profile.PricingProfileNumber4;
                            profileInDb.PricingProfileNumber5 = profile.PricingProfileNumber5;
                            profileInDb.PricingProfileNumber6 = profile.PricingProfileNumber6;
                            profileInDb.PrimaryBranchNumber = profile.PrimaryBranchNumber;
                            profileInDb.PrintPartNum = profile.PrintPartNum;
                            profileInDb.SubmittalGroupId = profile.SubmittalGroupId;
                            profileInDb.UserNumber = profile.UserNumber;
                            profileInDb.ItemDescriptionPrintOption = profile.ItemDescriptionPrintOption;
                        }
                    }
                    else if (!profile.Deleted)
                    {
                        db.UserProfileSet.Add(profile);
                    }
                    db.SaveChanges();
                    HttpUtils.Response.setupCurrentWebResponseNoCache();
                }
            },
            SyncMethodName,
            new string[] { "profile" }, profile);
        }

    }

}
