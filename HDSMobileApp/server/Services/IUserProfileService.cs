/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.ServiceModel;
using System.ServiceModel.Web;
using HDSMobileApp.Entities;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Services
{
    /// <summary>
    /// <para>
    /// This interface provides the contract for manage user profile action.
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
    public interface IUserProfileService
    {
        /// <summary>
        /// Sync user profile.
        /// </summary>
        /// <param name="profile">the profile</param>
        /// <exception cref="WebFaultException">
        /// throws if any error happen when call methods
        /// </exception>
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/UserProfile/Sync",
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        void Sync(UserProfile profile);

    }

}
