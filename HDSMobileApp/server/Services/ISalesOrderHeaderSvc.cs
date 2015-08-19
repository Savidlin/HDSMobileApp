using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface ISalesOrderHeaderSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/SalesOrderHeader/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<SalesOrderHeader> Search(Searchable<SalesOrderHeaderSearcher> searchData);

    }

}
