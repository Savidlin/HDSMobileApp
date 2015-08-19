using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface ISalesPersonSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/SalesPerson/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<SalesPerson> Search(Searchable<SalesPersonSearcher> searchData);

    }

}
