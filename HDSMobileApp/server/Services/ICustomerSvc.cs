using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface ICustomerSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/Customer/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<Customer> Search(Searchable<CustomerSearcher> searchData);

    }

}
