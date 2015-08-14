/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Searching;
using System.ServiceModel.Channels;

namespace HDSMobileApp.Services
{
    /// <summary>
    /// <para>
    /// This interface provides the contract for manage user master action.
    /// </para>
    /// </summary>
    /// <remarks>
    /// <para>
    /// Implementations are expected to be effectively thread-safe.
    /// </para>
    /// </remarks>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
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
        SearchResult<UserMaster> Search(UserMasterSearchCriteria criteria);
    }
}
