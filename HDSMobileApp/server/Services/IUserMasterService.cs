using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Base.Searching;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{
    /** This interface provides the contract for manage user master action.
     * @threadsafety Implementations are expected to be effectively thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.
     */
    [ServiceContract]
    public interface IUserMasterService
    {

        /// <summary>
        /// Search user master entities.
        /// </summary>
        /// <param name="criteria">the  search criteria</param>
        /// <returns>the search result</returns>
        /// <exception cref="WebFaultException">
        /// throws if any error happen when call methods
        /// </exception>
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/UserMaster/Search",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        SearchResult<UserMaster> Search(Searchable<UserMasterSearcher> userMasterCriteria);
    }
}
