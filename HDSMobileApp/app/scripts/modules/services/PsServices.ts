/// <reference path="../../tsDefinitions/lib/Q.d.ts" />
/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */

import SvcModels = require("../../models/SvcModels");
import Models = require("../../models/models");
import ObjectUtil = require("../psUtils/ObjectUtil");
import ServiceData = require("./ServiceData");
import Services = require("./Services");

/** PsServices module
 * Enumeration of PowerScope service call parameter/return types
 * @author Benjain
 * @since 2015-1-29
 */
module PsServices {
    "use strict";

    export interface SearchResult<T> {
        TotalPages: number;
        PageNumber: number;
        TotalRecords: number;
        Items: T[];
    }


    export interface BidSubmission {
        Bid: Models.Bid;
        BidLocation: Models.BidLocation;
        WinningCustomer: { Customer_Number: number };
        Items: Models.BidItem[];
        BidTracker: Models.BidTracker;
        OsrCustomer: { OSR_Number: string };
    }


    export interface SubmitBid {
        order_type: string;
        customer_no: string;
        sales_id: string;
        user_id: string;
        bid_id: string;
        bid_name: string;
        bid_status: string;
        branch_no: string;
        job_name: string;
        engineer_name: string;
        tax_jurisdiction: string;
        currency_code: string;
        bid_address_1: string;
        bid_address_2: string;
        bid_city: string;
        bid_state: string;
        bid_zip: string;
        pricing_profile: string;
        market_class: string;
        due_date: string;
        tax_amount: string;
        purchase_order: string;
        delivery_location: string;
        notes: string;
        date_required: string;
        method_of_shipment: string;
        lump_sum_discount: string;
        line_items: {
            sequence_no: string;
            fast_lookup: string;
            item_no: string;
            quantity: string;
            description: string;
            unit_of_measure: string;
            sell_price: string;
            special_price: string;
            dflt_print_flag: string;
            multiplier: string;
            cost: string;
            markup_percentage: string;
            list_price: string;
            section: string;
            group: string;
            category: string;
            description_2: string;
            description_3: string;
            description_4: string;
            weight: string;
        }[];
    }


    export interface BidData {
        Message?: string;
        Bid: SvcModels.Bid;
        BidJob: SvcModels.Job;
        BidCustomers: SvcModels.BidCustomer[];
        BidTotals: SvcModels.BidTotals[];
        BidLocations: SvcModels.BidLocation[];
        BidTrackers: SvcModels.BidTracker[];
        BidItems: SvcModels.BidItem[];
        BidSubmissions: SvcModels.BidSubmission[];
    }


    export interface BidLockUnlock {
        UserIdentifier: string;
        BidId: number;
        force?: boolean;
    }


    export interface GetItemMasterResponse {
        item_number: string;
        product_number: string;
        category: string;
        category_description: string;
        cost: string;
        group: string;
        group_description: string;
        list: string;
        manuf_list: string;
        multiplier: string;
        sell: string[];
        section: string;
        section_description: string;
        unit_of_measure: string;
        vendor_number: string;
        weight: string;
        fast_lookup: string[];
        description: string[];
        ALTDescription: string[];
        METDescription: string[];
        SLSDescription: string[];
        SPNDescription: string[];
    }


    export interface OrderInfo {
        error_code: number;
        order_no: string;
        order_type: string;
        last_update_date: any;
    }


    export interface GetBidTax {
        user_id: string;
        tax_jurisdiction: string;
        currency_code: string;
        bid_address_1: string;
        bid_address_2: string;
        bid_city: string;
        bid_state: string;
        bid_zip: string;
        date_required?: string;
        lump_sum_discount?: string;
        line_items: { item_no?: string; quantity?: string; sell_price?: string; special_price?: string; cost?: string }[];
    }

    export enum SortOrder {
        Ascending,
        Descending,
    }


    export interface IdentifiableEntity {
        Id: number; // gt(0)
    }


    export interface Competitor extends IdentifiableEntity {
        Name: string; // required; length(50)
        Competitor_Type: number; // byte
    }


    export interface SearchCriteria {
        PageSize?: number;
        PageNumber?: number; // if page number is present, page size must be present
        SortBy?: string;
        SortOrder?: SortOrder | number | boolean;
    }


    export interface BidHeaderSearchCriteria extends SearchCriteria {
        UserIdentifier: string;
        BidDateRange?: number;
        BidId?: number;
        BidName?: string;
        BidStatusId?: number;
        Branches?: number[];
        Competitor?: string;
        County?: string;
        CurrentBids?: boolean;
        Customer?: string;
        CustomerId?: number; // server accepts: string, converts to: decimal
        District?: number;
        JobId?: number;
        JobLocation?: string;
        Location?: string;
        LocationId?: number; // server accepts: string, unused
        MinDueDate?: string | number; // locally stored: Timestamp, server accepts: MS JSON Date (DateTime)
        MaxDueDate?: string | number; // locally stored: Timestamp, server accepts: MS JSON Date (DateTime)
        MyBids?: boolean;
        PricingProfile?: string;
        Region?: number;
    }


    export interface BidHeader {
        BidId: number;
        BidName: string;
        DueDate: string;
        Status: number;
        JobName: string;
        BidCustomers: SvcModels.BidCustomer[];
        BidLocations: SvcModels.BidLocation[];
        Locked: boolean;
        LockedUserIdentifier: string;
        LockedUserName: string;
        PricingProfileNumber: string;
        JobLocation: string;
        JobId?: number;
    }


    export interface BidTotalsSearchCriteria extends SearchCriteria {
        BidId?: number; // decimal
    }


    export interface SubmittalGroup extends IdentifiableEntity {
        Name: string;
        LastUpdateDate: number;
    }


    export interface SubmittalDocumentHeader extends IdentifiableEntity {
        SubmittalGroupId?: number; // server side: decimal?
        ItemNumber?: number; // server side: decimal?
        LastUpdateDate: number;
    }


    export interface SubmittalDocumentSearchCriteria extends SearchCriteria {
        UserIdentifier: string;
        SubmittalGroupId?: number; // server side: decimal?
        ItemNumbers: number[]; // server side: decimal[]
    }


    export interface UserCustomizableEntitySearchCriteria {
        UserIdentifier: string;
        LastUpdateDate?: number;
    }


    export interface UserProfileBranchSearchCriteria extends UserCustomizableEntitySearchCriteria {
        Primary?: boolean;
    }


    export interface UserProfileSearchCriteria extends UserCustomizableEntitySearchCriteria {
        IsAdmin?: boolean;
    }


    export interface UserProfileCustomerSearchCriteria extends UserCustomizableEntitySearchCriteria {
    }


    export interface UserProfileEngineerSearchCriteria extends UserCustomizableEntitySearchCriteria {
    }


    export interface UserProfileFavoriteUserSearchCriteria extends UserCustomizableEntitySearchCriteria {
    }


    export interface UserProfilePackageSearchCriteria extends UserCustomizableEntitySearchCriteria {
    }


    export class ItemMaster {
    "use strict";

        static getItemMaster(postData: ItemMasterSearchCriteria): PsPromise<ServiceResult<GetItemMasterResponse[]>, ServiceError> {
            return <any>Util.svcCall(false, "ItemMasterService.svc/GetItemMaster", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class Bid {
    "use strict";

        static submit(postData: PsServices.SubmitBid): PsPromise<ServiceResult<PsServices.OrderInfo>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/SubmitBid", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static retrieve(urlParams: { userIdentifier: string; bidId: number; force?: boolean; }): PsPromise<ServiceResult<PsServices.BidData>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/Retrieve", ServiceData.SvcType.POST, {
                    userIdentifier: urlParams.userIdentifier,
                    bidId: (urlParams.bidId ? urlParams.bidId.toString() : "null"),
                    force: (urlParams.force ? "true" : "false"),
                }, ServiceData.SvcDataType.JSON, null);
        }

        static search(postData: PsServices.BidHeaderSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<PsServices.BidHeader>>, ServiceError> {
            return <any>Util.svcCall(false, "BidSearchService.svc/BidSearch", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static syncTo(urlParams: { userIdentifier: string; overwrite?: boolean; }, postData: PsServices.BidData): PsPromise<ServiceResult<PsServices.BidData>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/SyncTo", ServiceData.SvcType.POST, {
                    userIdentifier: urlParams.userIdentifier,
                    overwrite: (urlParams.overwrite ? "true" : "false"),
                }, ServiceData.SvcDataType.JSON, postData);
        }

        static syncFrom(urlParams: { userIdentifier: string; }): PsPromise<ServiceResult<PsServices.BidData[]>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/SyncFrom", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, null);
        }

        static getBidTax(postData: PsServices.GetBidTax): PsPromise<ServiceResult<{ tax_amount: string }>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/GetBidTax", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static lock(postData: PsServices.BidLockUnlock): PsPromise<ServiceResult<SvcModels.Bid>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/Lock", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static unlock(postData: PsServices.BidLockUnlock): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "BidService.svc/Bid/Unlock", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class BidTotalsSvc {
    "use strict";

        static search(postData: PsServices.BidTotalsSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.BidTotals>>, ServiceError> {
            return <any>Util.svcCall(false, "BidTotalsService.svc/BidTotals/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class CompetitorSvc {
    "use strict";

        static search(urlParams: { searchPhrase: string; }): PsPromise<ServiceResult<PsServices.SearchResult<PsServices.Competitor>>, ServiceError> {
            return <any>Util.svcCall(false, "CompetitorService.svc/Competitor/Search", ServiceData.SvcType.GET, { searchPhrase: urlParams.searchPhrase, }, ServiceData.SvcDataType.JSON, null);
        }

        static getById(urlParams: { userIdentifier: string; competitorId: number; }): PsPromise<ServiceResult<PsServices.Competitor>, ServiceError> {
            return <any>Util.svcCall(false, "CompetitorService.svc/Competitor/GetById", ServiceData.SvcType.GET, {
                    userIdentifier: urlParams.userIdentifier,
                    competitorId: (urlParams.competitorId ? urlParams.competitorId.toString() : "null"),
                }, ServiceData.SvcDataType.JSON, null);
        }

    }

    export class SubmittalDocumentSvc {
    "use strict";

        static getAllSubmittalGroup(): PsPromise<ServiceResult<PsServices.SubmittalGroup[]>, ServiceError> {
            return <any>Util.svcCall(false, "SubmittalDocumentService.svc/SubmittalGroup/GetAll", ServiceData.SvcType.GET, null, ServiceData.SvcDataType.JSON, null, {"cache":false});
        }

        static search(postData: PsServices.SubmittalDocumentSearchCriteria): PsPromise<SearchResult<PsServices.SubmittalDocumentHeader>, ServiceError> {
            return <any>Util.svcCall(false, "SubmittalDocumentService.svc/SubmittalDocument/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData, {"contentType":"application/json; charset=utf-8"});
        }

    }

    export class UserProfile {
    "use strict";

        static search(postData: PsServices.UserProfileSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfile>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfile.svc/UserProfile/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(postData: SvcModels.UserProfile): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfile.svc/UserProfile/Sync", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static requireNewUser(userIdentifier: string): PsPromise<ServiceResult<SvcModels.UserProfile>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfile.svc/UserProfile/RequireNewUser", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, userIdentifier);
        }

        static reset(userIdentifier: string): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfile.svc/UserProfile/Sync", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, userIdentifier);
        }

    }

    export class UserProfileBranch {
    "use strict";

        static search(postData: PsServices.UserProfileBranchSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfileBranch>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileBranchService.svc/UserProfileBranch/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(urlParams: { userIdentifier: string; }, postData: SvcModels.UserProfileBranch[]): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileBranchService.svc/UserProfileBranch/Sync", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class UserProfileCustomer {
    "use strict";

        static search(postData: PsServices.UserProfileBranchSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfileCustomer>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileCustomerService.svc/UserProfileCustomer/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(urlParams: { userIdentifier: string; }, postData: SvcModels.UserProfileCustomer[]): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileCustomerService.svc/UserProfileCustomer/Sync", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class UserProfileEngineer {
    "use strict";

        static search(postData: PsServices.UserProfileEngineerSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfileEngineer>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileEngineerService.svc/UserProfileEngineer/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(urlParams: { userIdentifier: string; }, postData: SvcModels.UserProfileEngineer[]): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileEngineerService.svc/UserProfileEngineer/Sync", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class UserProfileFavoriteUser {
    "use strict";

        static search(postData: PsServices.UserProfileFavoriteUserSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfileFavoriteUser>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileFavoriteUserService.svc/UserProfileFavoriteUser/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(urlParams: { userIdentifier: string; }, postData: SvcModels.UserProfileFavoriteUser[]): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfileFavoriteUserService.svc/UserProfileFavoriteUser/Sync", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, postData);
        }

    }

    export class UserProfilePackage {
    "use strict";

        static search(postData: PsServices.UserProfilePackageSearchCriteria): PsPromise<ServiceResult<PsServices.SearchResult<SvcModels.UserProfilePackage>>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfilePackageService.svc/UserProfilePackage/Search", ServiceData.SvcType.POST, null, ServiceData.SvcDataType.JSON, postData);
        }

        static sync(urlParams: { userIdentifier: string; }, postData: SvcModels.UserProfilePackage[]): PsPromise<ServiceResult<void>, ServiceTransactionError> {
            return <any>Util.svcCall(true, "UserProfilePackageService.svc/UserProfilePackage/Sync", ServiceData.SvcType.POST, { userIdentifier: urlParams.userIdentifier, }, ServiceData.SvcDataType.JSON, postData);
        }

    }



    class Util {
        "use strict";

        static svcCall<T>(requireHandshake: boolean, url: string, callType: ServiceData.SvcType, urlParameters: { [index: string]: string },
                postDataType: ServiceData.SvcDataType, postData: any, requestProperties?: JQueryAjaxSettings): Q.Promise<T> {
            if (requireHandshake) {
                var urlParamKeys = null;
                var urlParamVals = null;
                if(urlParameters != null) {
                    urlParamKeys = Object.keys(urlParameters);
                    urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                }

                switch (callType) {
                case ServiceData.SvcType.GET:
                    return <any>Services.callHandshakeGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                case ServiceData.SvcType.DELETE:
                    throw new Error("unimplemented service call type 'DELETE'");
                case ServiceData.SvcType.POST:
                    return <any>Services.callHandshakePostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                default:
                    throw new Error("unknown SvcType '" + callType + "'");
                }
            }
            else {
                switch (callType) {
                case ServiceData.SvcType.GET:
                    var urlParamKeys = null;
                    var urlParamVals = null;
                    if(urlParameters != null) {
                        urlParamKeys = Object.keys(urlParameters);
                        urlParamVals = ObjectUtil.values(urlParameters, urlParamKeys);
                    }
                    return <any>Services.callGetService(url, urlParamKeys, urlParamVals, false, null, requestProperties);
                case ServiceData.SvcType.DELETE:
                    throw new Error("unimplemented service call type 'DELETE'");
                case ServiceData.SvcType.POST:
                    return <any>Services.callPostService(url, postData, urlParamKeys, urlParamVals, false, null, requestProperties);
                default:
                    throw new Error("unknown SvcType '" + callType + "'");
                }
            }
        }

    }

}


export = PsServices;
