/// <reference path="../../tsDefinitions/lib/Q.d.ts" />
/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */
var ObjectUtil = require("../psUtils/ObjectUtil");
var ServiceData = require("./ServiceData");
var Services = require("./Services");
/** PsServices module
 * Enumeration of PowerScope service call parameter/return types
 * @author Benjain
 * @since 2015-1-29
 */
var PsServices;
(function (PsServices) {
    "use strict";
    (function (SortOrder) {
        SortOrder[SortOrder["Ascending"] = 0] = "Ascending";
        SortOrder[SortOrder["Descending"] = 1] = "Descending";
    })(PsServices.SortOrder || (PsServices.SortOrder = {}));
    var SortOrder = PsServices.SortOrder;
    var ItemMaster = (function () {
        function ItemMaster() {
        }
        ItemMaster.getItemMaster = function (postData) {
            return Util.svcCall(false, "ItemMasterService.svc/GetItemMaster", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        return ItemMaster;
    })();
    PsServices.ItemMaster = ItemMaster;
    var Bid = (function () {
        function Bid() {
        }
        Bid.submit = function (postData) {
            return Util.svcCall(true, "BidService.svc/Bid/SubmitBid", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        Bid.retrieve = function (urlParams) {
            return Util.svcCall(true, "BidService.svc/Bid/Retrieve", 0 /* POST */, {
                userIdentifier: urlParams.userIdentifier,
                bidId: (urlParams.bidId ? urlParams.bidId.toString() : "null"),
                force: (urlParams.force ? "true" : "false"),
            }, 0 /* JSON */, null);
        };
        Bid.search = function (postData) {
            return Util.svcCall(false, "BidSearchService.svc/BidSearch", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        Bid.syncTo = function (urlParams, postData) {
            return Util.svcCall(true, "BidService.svc/Bid/SyncTo", 0 /* POST */, {
                userIdentifier: urlParams.userIdentifier,
                overwrite: (urlParams.overwrite ? "true" : "false"),
            }, 0 /* JSON */, postData);
        };
        Bid.syncFrom = function (urlParams) {
            return Util.svcCall(true, "BidService.svc/Bid/SyncFrom", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, null);
        };
        Bid.getBidTax = function (postData) {
            return Util.svcCall(true, "BidService.svc/Bid/GetBidTax", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        Bid.lock = function (postData) {
            return Util.svcCall(true, "BidService.svc/Bid/Lock", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        Bid.unlock = function (postData) {
            return Util.svcCall(true, "BidService.svc/Bid/Unlock", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        return Bid;
    })();
    PsServices.Bid = Bid;
    var BidTotalsSvc = (function () {
        function BidTotalsSvc() {
        }
        BidTotalsSvc.search = function (postData) {
            return Util.svcCall(false, "BidTotalsService.svc/BidTotals/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        return BidTotalsSvc;
    })();
    PsServices.BidTotalsSvc = BidTotalsSvc;
    var CompetitorSvc = (function () {
        function CompetitorSvc() {
        }
        CompetitorSvc.search = function (urlParams) {
            return Util.svcCall(false, "CompetitorService.svc/Competitor/Search", 1 /* GET */, { searchPhrase: urlParams.searchPhrase, }, 0 /* JSON */, null);
        };
        CompetitorSvc.getById = function (urlParams) {
            return Util.svcCall(false, "CompetitorService.svc/Competitor/GetById", 1 /* GET */, {
                userIdentifier: urlParams.userIdentifier,
                competitorId: (urlParams.competitorId ? urlParams.competitorId.toString() : "null"),
            }, 0 /* JSON */, null);
        };
        return CompetitorSvc;
    })();
    PsServices.CompetitorSvc = CompetitorSvc;
    var SubmittalDocumentSvc = (function () {
        function SubmittalDocumentSvc() {
        }
        SubmittalDocumentSvc.getAllSubmittalGroup = function () {
            return Util.svcCall(false, "SubmittalDocumentService.svc/SubmittalGroup/GetAll", 1 /* GET */, null, 0 /* JSON */, null, { "cache": false });
        };
        SubmittalDocumentSvc.search = function (postData) {
            return Util.svcCall(false, "SubmittalDocumentService.svc/SubmittalDocument/Search", 0 /* POST */, null, 0 /* JSON */, postData, { "contentType": "application/json; charset=utf-8" });
        };
        return SubmittalDocumentSvc;
    })();
    PsServices.SubmittalDocumentSvc = SubmittalDocumentSvc;
    var UserProfile = (function () {
        function UserProfile() {
        }
        UserProfile.search = function (postData) {
            return Util.svcCall(true, "UserProfile.svc/UserProfile/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfile.sync = function (postData) {
            return Util.svcCall(true, "UserProfile.svc/UserProfile/Sync", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfile.requireNewUser = function (userIdentifier) {
            return Util.svcCall(true, "UserProfile.svc/UserProfile/RequireNewUser", 0 /* POST */, null, 0 /* JSON */, userIdentifier);
        };
        UserProfile.reset = function (userIdentifier) {
            return Util.svcCall(true, "UserProfile.svc/UserProfile/Sync", 0 /* POST */, null, 0 /* JSON */, userIdentifier);
        };
        return UserProfile;
    })();
    PsServices.UserProfile = UserProfile;
    var UserProfileBranch = (function () {
        function UserProfileBranch() {
        }
        UserProfileBranch.search = function (postData) {
            return Util.svcCall(true, "UserProfileBranchService.svc/UserProfileBranch/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfileBranch.sync = function (urlParams, postData) {
            return Util.svcCall(true, "UserProfileBranchService.svc/UserProfileBranch/Sync", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, postData);
        };
        return UserProfileBranch;
    })();
    PsServices.UserProfileBranch = UserProfileBranch;
    var UserProfileCustomer = (function () {
        function UserProfileCustomer() {
        }
        UserProfileCustomer.search = function (postData) {
            return Util.svcCall(true, "UserProfileCustomerService.svc/UserProfileCustomer/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfileCustomer.sync = function (urlParams, postData) {
            return Util.svcCall(true, "UserProfileCustomerService.svc/UserProfileCustomer/Sync", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, postData);
        };
        return UserProfileCustomer;
    })();
    PsServices.UserProfileCustomer = UserProfileCustomer;
    var UserProfileEngineer = (function () {
        function UserProfileEngineer() {
        }
        UserProfileEngineer.search = function (postData) {
            return Util.svcCall(true, "UserProfileEngineerService.svc/UserProfileEngineer/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfileEngineer.sync = function (urlParams, postData) {
            return Util.svcCall(true, "UserProfileEngineerService.svc/UserProfileEngineer/Sync", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, postData);
        };
        return UserProfileEngineer;
    })();
    PsServices.UserProfileEngineer = UserProfileEngineer;
    var UserProfileFavoriteUser = (function () {
        function UserProfileFavoriteUser() {
        }
        UserProfileFavoriteUser.search = function (postData) {
            return Util.svcCall(true, "UserProfileFavoriteUserService.svc/UserProfileFavoriteUser/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfileFavoriteUser.sync = function (urlParams, postData) {
            return Util.svcCall(true, "UserProfileFavoriteUserService.svc/UserProfileFavoriteUser/Sync", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, postData);
        };
        return UserProfileFavoriteUser;
    })();
    PsServices.UserProfileFavoriteUser = UserProfileFavoriteUser;
    var UserProfilePackage = (function () {
        function UserProfilePackage() {
        }
        UserProfilePackage.search = function (postData) {
            return Util.svcCall(true, "UserProfilePackageService.svc/UserProfilePackage/Search", 0 /* POST */, null, 0 /* JSON */, postData);
        };
        UserProfilePackage.sync = function (urlParams, postData) {
            return Util.svcCall(true, "UserProfilePackageService.svc/UserProfilePackage/Sync", 0 /* POST */, { userIdentifier: urlParams.userIdentifier, }, 0 /* JSON */, postData);
        };
        return UserProfilePackage;
    })();
    PsServices.UserProfilePackage = UserProfilePackage;
    var Util = (function () {
        function Util() {
        }
        Util.svcCall = function (requireHandshake, url, callType, urlParameters, postDataType, postData, requestProperties) {
            if (requireHandshake) {
                var urlParamKeys = null;
                var urlParamVals = null;
                if (urlParameters != null) {
                    urlParamKeys = Object.keys(urlParameters);
                    urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                }
                switch (callType) {
                    case 1 /* GET */:
                        return Services.callHandshakeGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                    case 2 /* DELETE */:
                        throw new Error("unimplemented service call type 'DELETE'");
                    case 0 /* POST */:
                        return Services.callHandshakePostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                    default:
                        throw new Error("unknown SvcType '" + callType + "'");
                }
            }
            else {
                switch (callType) {
                    case 1 /* GET */:
                        var urlParamKeys = null;
                        var urlParamVals = null;
                        if (urlParameters != null) {
                            urlParamKeys = Object.keys(urlParameters);
                            urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                        }
                        return Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                    case 2 /* DELETE */:
                        throw new Error("unimplemented service call type 'DELETE'");
                    case 0 /* POST */:
                        return Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                    default:
                        throw new Error("unknown SvcType '" + callType + "'");
                }
            }
        };
        return Util;
    })();
})(PsServices || (PsServices = {}));
module.exports = PsServices;
