using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class EmployeePayHistorySvc : IEmployeePayHistorySvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(EmployeePayHistorySvc).Name);

        private static readonly string SearchMethodName = typeof(EmployeePayHistorySvc).FullName + ".Search";


        public SearchResult<EmployeePayHistory> Search(Searchable<EmployeePayHistorySearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.EmployeePayHistory, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<EmployeePayHistory> ConstructQueryConditions(IQueryable<EmployeePayHistory> query, SearchRange rangeCriteria, EmployeePayHistorySearcher criteria)
        {
            //if (criteria.businessEntityId != null) {
            //    long entityId = criteria.businessEntityId;
            //    query = query.Where(i => i.businessEntityId == entityId);
            //}
            return query;
        }

    }

}
