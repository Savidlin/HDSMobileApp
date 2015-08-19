using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;

namespace HDSMobileApp.Services.Impl
{

    public class PersonSvc : IPersonSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(PersonSvc).Name);

        private static readonly string SearchMethodName = typeof(PersonSvc).FullName + ".Search";


        public SearchResult<Person> Search(Searchable<PersonSearcher> searchData)
        {
            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Person, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /** Construct query conditions by applying given UserMaster criteria to query object.
         * @return The updated query
         */
        private IQueryable<Person> ConstructQueryConditions(IQueryable<Person> query, SearchRange rangeCriteria, PersonSearcher criteria)
        {
            //if (criteria.businessEntityId != null) {
            //    long entityId = criteria.businessEntityId;
            //    query = query.Where(i => i.businessEntityId == entityId);
            //}
            return query;
        }

    }

}
