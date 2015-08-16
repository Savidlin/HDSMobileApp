using log4net;
using System.Linq;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Helpers;
using HDSMobileApp.Entities;
using System.Data.SQLite;
using System.Text;

namespace HDSMobileApp.Services.Impl
{

    public class EmployeeSvc : IEmployeeSvc
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(EmployeeSvc).Name);

        private static readonly string SearchMethodName = typeof(EmployeeSvc).FullName + ".Search";


        public SearchResult<Employee> Search(Searchable<EmployeeSearcher> searchData)
        {
            /*
            string connString = "Data Source=C:/Users/TeamworkGuy2/Documents/Visual Studio 2015/Projects/HDSTeamBuilding/Lib/adventure_works.sqlite";
            using (SQLiteConnection conn = new SQLiteConnection(connString)) {
                StringBuilder query = new StringBuilder();
                query.Append("SELECT * FROM employee ORDER BY businessentityid");
                using (SQLiteCommand cmd = new SQLiteCommand(query.ToString(), conn)) {
                    conn.Open();
                    using (SQLiteDataReader dr = cmd.ExecuteReader()) {
                        Logger.Debug("reading database: ");
                        while (dr.Read()) {
                            Logger.Debug(dr.GetValue(0) + " " + dr.GetValue(1) + " " + dr.GetValue(2));
                        }
                    }
                }
            }*/

            /*
            <add name="SQLite Data Provider" invariant="System.Data.SQLite" description="Data Provider for SQLite" type="System.Data.SQLite.SQLiteFactory, System.Data.SQLite" />
            <provider invariantName="System.Data.SqlClient" type="System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer" />
            <provider invariantName="System.Data.SQLite" type="System.Data.SQLite.SQLiteProviderServices, System.Data.SQLite.Linq, Culture=neutral, PublicKeyToken=db937bc2d44ff139" />
            <defaultConnectionFactory type="System.Data.Entity.Infrastructure.LocalDbConnectionFactory, EntityFramework">
            */

            return QueryHelper.ApplyGenericSearch(HDSMobileAppDataStores.Employee, Logger, SearchMethodName, searchData.searchRange, searchData.searchCriteria, "businessEntityId", this.ConstructQueryConditions);
        }


        /// <summary>
        ///  Construct query conditions by applying given UserMaster criteria to query object.
        /// </summary>
        /// <param name="query"> the query.</param>
        /// <param name="criteria"> the criteria.</param>
        /// <returns>The updated query.</returns>
        private IQueryable<Employee> ConstructQueryConditions(IQueryable<Employee> query, SearchRange rangeCriteria, EmployeeSearcher criteria)
        {
            if (criteria.businessEntityId != null) {
                string entityId = criteria.businessEntityId;
                query = query.Where(i => i.businessEntityId == entityId);
            }
            return query;
        }

    }

}
