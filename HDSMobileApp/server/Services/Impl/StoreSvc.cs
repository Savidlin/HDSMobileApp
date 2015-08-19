using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class StoreSvc : IStoreSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(StoreSvc).Name);

        private static readonly string SearchMethodName = typeof(StoreSvc).FullName + ".Search";


        public SearchResult<Store> Search(Searchable<StoreSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Store, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<Store> ConstructQueryConditions(IQueryable<Store> query, SearchRange rangeCriteria, StoreSearcher criteria)
        {
            //if (criteria.businessEntityId != null) {
            //    long entityId = criteria.businessEntityId;
            //    query = query.Where(i => i.businessEntityId == entityId);
            //}
            return query;
        }

    }

}
