using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface IStoreSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/Store/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<Store> Search(Searchable<StoreSearcher> searchData);

    }

}
