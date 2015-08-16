using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Searching;
using System.Linq;
using HDSMobileApp.Helpers;
using log4net;
using System.Collections.Generic;
using HDSMobileApp.Entities.Base.Searching;

namespace HDSMobileApp.Services.Impl
{
    /** This class provides the contract for manage vendor master action.
     * @threadsafety This class is immutable, so it is thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    public class UserMasterService : IUserMasterService
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(UserMasterService).Name);

        private static readonly string SearchMethodName = typeof(UserMasterService).FullName + ".Search";


        public SearchResult<UserMaster> Search(Searchable<UserMasterSearcher> criteria) {
            var result = new SearchResult<UserMaster>();
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
            result.TotalRecords = result.Items.Count;

            result.ResultOffset = Helper.GetOffset(0, result.TotalRecords);
            result.TotalRecords = Helper.ClampCount(criteria.searchRange.Offset, criteria.searchRange.Size, result.TotalRecords);
            HttpUtils.Response.setupCurrentWebResponseNoCache();
            return result;

            //return QueryHelper.ApplyGenericSearch(PowerScopeDataStores.UserMaster, Logger, SearchMethodName, criteria, "UserIdentifier", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @param query  the query
         * @param criteria  the criteria
         * @returns The updated query
         */
        private IQueryable<UserMaster> ConstructQueryConditions(IQueryable<UserMaster> query, SearchRange rangeCriteria, UserMasterSearcher criteria)
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
