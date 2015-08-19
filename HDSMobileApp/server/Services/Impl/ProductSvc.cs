using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class ProductSvc : IProductSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(ProductSvc).Name);

        private static readonly string SearchMethodName = typeof(ProductSvc).FullName + ".Search";


        public SearchResult<Product> Search(Searchable<ProductSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Product, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "productId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<Product> ConstructQueryConditions(IQueryable<Product> query, SearchRange rangeCriteria, ProductSearcher criteria)
        {
            //if (criteria.productId != null) {
            //    long entityId = criteria.productId;
            //    query = query.Where(i => i.productId == entityId);
            //}
            return query;
        }

    }

}
