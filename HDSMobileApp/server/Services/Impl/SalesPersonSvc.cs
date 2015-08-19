using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class SalesPersonSvc : ISalesPersonSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(SalesPersonSvc).Name);

        private static readonly string SearchMethodName = typeof(SalesPersonSvc).FullName + ".Search";


        public SearchResult<SalesPerson> Search(Searchable<SalesPersonSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.SalesPerson, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<SalesPerson> ConstructQueryConditions(IQueryable<SalesPerson> query, SearchRange rangeCriteria, SalesPersonSearcher criteria)
        {
            //if (criteria.businessEntityId != null) {
            //    long entityId = criteria.businessEntityId;
            //    query = query.Where(i => i.businessEntityId == entityId);
            //}
            return query;
        }

    }

}
