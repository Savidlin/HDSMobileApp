using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class CustomerSvc : ICustomerSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(CustomerSvc).Name);

        private static readonly string SearchMethodName = typeof(CustomerSvc).FullName + ".Search";


        public SearchResult<Customer> Search(Searchable<CustomerSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Customer, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "customerId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<Customer> ConstructQueryConditions(IQueryable<Customer> query, SearchRange rangeCriteria, CustomerSearcher criteria)
        {
            //if (criteria.customerId != null) {
            //    long entityId = criteria.customerId;
            //    query = query.Where(i => i.customerId == entityId);
            //}
            return query;
        }

    }

}
