using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface ISalesOrderDetailSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/SalesOrderDetail/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<SalesOrderDetail> Search(Searchable<SalesOrderDetailSearcher> searchData);

    }

}
