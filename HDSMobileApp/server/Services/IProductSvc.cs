using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface IProductSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/Product/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<Product> Search(Searchable<ProductSearcher> searchData);

    }

}
