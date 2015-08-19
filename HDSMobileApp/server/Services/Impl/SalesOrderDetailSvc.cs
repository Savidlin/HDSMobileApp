using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class SalesOrderDetailSvc : ISalesOrderDetailSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(SalesOrderDetailSvc).Name);

        private static readonly string SearchMethodName = typeof(SalesOrderDetailSvc).FullName + ".Search";


        public SearchResult<SalesOrderDetail> Search(Searchable<SalesOrderDetailSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.SalesOrderDetail, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "salesOrderId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<SalesOrderDetail> ConstructQueryConditions(IQueryable<SalesOrderDetail> query, SearchRange rangeCriteria, SalesOrderDetailSearcher criteria)
        {
            //if (criteria.salesOrderId != null) {
            //    long entityId = criteria.salesOrderId;
            //    query = query.Where(i => i.salesOrderId == entityId);
            //}
            return query;
        }

    }

}
