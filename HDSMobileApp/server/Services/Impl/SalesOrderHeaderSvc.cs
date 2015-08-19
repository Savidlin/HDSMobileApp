using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class SalesOrderHeaderSvc : ISalesOrderHeaderSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(SalesOrderHeaderSvc).Name);

        private static readonly string SearchMethodName = typeof(SalesOrderHeaderSvc).FullName + ".Search";


        public SearchResult<SalesOrderHeader> Search(Searchable<SalesOrderHeaderSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.SalesOrderHeader, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "salesOrderId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<SalesOrderHeader> ConstructQueryConditions(IQueryable<SalesOrderHeader> query, SearchRange rangeCriteria, SalesOrderHeaderSearcher criteria)
        {
            //if (criteria.salesOrderId != null) {
            //    long entityId = criteria.salesOrderId;
            //    query = query.Where(i => i.salesOrderId == entityId);
            //}
            return query;
        }

    }

}
