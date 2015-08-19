using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{

    [ServiceContract]
    public interface IPersonSvc
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/Person/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        SearchResult<Person> Search(Searchable<PersonSearcher> searchData);

    }

}
