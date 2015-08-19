using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class SalesTerritorySvc : ISalesTerritorySvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(SalesTerritorySvc).Name);

        private static readonly string SearchMethodName = typeof(SalesTerritorySvc).FullName + ".Search";


        public SearchResult<SalesTerritory> Search(Searchable<SalesTerritorySearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.SalesTerritory, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "territoryId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<SalesTerritory> ConstructQueryConditions(IQueryable<SalesTerritory> query, SearchRange rangeCriteria, SalesTerritorySearcher criteria)
        {
            //if (criteria.salesTerritoryId != null) {
            //    long entityId = criteria.salesTerritoryId;
            //    query = query.Where(i => i.salesTerritoryId == entityId);
            //}
            return query;
        }

    }

}
