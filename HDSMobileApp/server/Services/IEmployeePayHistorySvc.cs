using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface IEmployeePayHistorySvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/EmployeePayHistory/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<EmployeePayHistory> Search(Searchable<EmployeePayHistorySearcher> searchData);

    }

}
