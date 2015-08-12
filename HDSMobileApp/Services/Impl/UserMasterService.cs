/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Searching;
using System.Linq;
using HDSMobileApp.Helpers;
using log4net;
using System.Configuration;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.ServiceModel.Channels;
using System;
using System.Web;
using System.ServiceModel.Activation;
using System.Collections.Generic;

namespace HDSMobileApp.Services.Impl
{
    /// <summary>
    /// <para>
    /// This class provides the contract for manage vendor master action.
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
    public class UserMasterService : IUserMasterService
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(UserMasterService).Name);

        private static readonly string SearchMethodName = typeof(UserMasterService).FullName + ".Search";


        public SearchResult<UserMaster> Search(UserMasterSearchCriteria criteria)
        {
            var result = new SearchResult<UserMaster>();
            result.TotalRecords = 2;
            result.Items = new List<UserMaster>()
            {
                new UserMaster
                {
                    UserIdentifier = "b55",
                    UserNumber = 55,
                    Name = "Billy",
                    EmailAddress = "billy.deathray@imaginary.bla",
                    Fax = "N/A",
                    Mobile = "N/A",
                    Phone = "N/A",
                    PrimaryBranchNumber = 123,
                },
                new UserMaster
                {
                    UserIdentifier = "c22",
                    UserNumber = 22,
                    Name = "Charles Carmichael",
                    EmailAddress = "chuck@buy.more",
                    Fax = "N/A",
                    Mobile = "N/A",
                    Phone = "N/A",
                    PrimaryBranchNumber = 007,
                }
            };

            result.PageNumber = Helper.GetPageNumber(criteria.PageNumber, result.TotalRecords);
            result.TotalPages = Helper.GetTotalPages(criteria.PageNumber, criteria.PageSize, result.TotalRecords);
            HttpUtils.Response.setupCurrentWebResponseNoCache();
            return result;

            //return QueryHelper.ApplyGenericSearch(PowerScopeDataStores.UserMaster, Logger, SearchMethodName, criteria, "UserIdentifier", this.ConstructQueryConditions);
        }


        /// <summary>
        ///  Construct query conditions by applying given UserMaster criteria to query object.
        /// </summary>
        /// <param name="query"> the query.</param>
        /// <param name="criteria"> the criteria.</param>
        /// <returns>The updated query.</returns>
        private IQueryable<UserMaster> ConstructQueryConditions(IQueryable<UserMaster> query, UserMasterSearchCriteria criteria)
        {
            decimal userNumber;
            if (criteria.UserIdentifier != null && decimal.TryParse(criteria.UserIdentifier, out userNumber))
            {
                query = query.Where(i => i.UserNumber == userNumber);
            }
            return query;
        }

    }

}
