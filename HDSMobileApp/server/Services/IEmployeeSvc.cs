using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface IEmployeeSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/Employee/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<Employee> Search(Searchable<EmployeeSearcher> searchData);

    }

}
