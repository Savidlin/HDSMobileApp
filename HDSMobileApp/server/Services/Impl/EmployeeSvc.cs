using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class EmployeeSvc : IEmployeeSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(EmployeeSvc).Name);

        private static readonly string SearchMethodName = typeof(EmployeeSvc).FullName + ".Search";


        public SearchResult<Employee> Search(Searchable<EmployeeSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Employee, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<Employee> ConstructQueryConditions(IQueryable<Employee> query, SearchRange rangeCriteria, EmployeeSearcher criteria)
        {
            //if (criteria.businessEntityId != null) {
            //    long entityId = criteria.businessEntityId;
            //    query = query.Where(i => i.businessEntityId == entityId);
            //}
            return query;
        }

    }

}
