/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */

declare module SvcModels {

    export interface UserMaster {
        UserNumber: number;
        Name: string;
        UserIdentifier: string;
        PrimaryBranchNumber: number;
        EmailAddress: string;
        Phone: string;
        Fax: string;
        Mobile: string;
    }


    export interface UserProfile {
        UserNumber: number;
        Name: string;
        UserIdentifier: string;
        PrimaryBranchNumber: number;
        PricingProfileNumber1: string;
        PricingProfileNumber2: string;
        PricingProfileNumber3: string;
        PricingProfileNumber4: string;
        PricingProfileNumber5: string;
        PricingProfileNumber6: string;
        EmailAddress: string;
        Phone: string;
        Fax: string;
        Mobile: string;
        CurrencyCode: string;
        LanguageId: number;
        PrintPartNum: boolean;
        HeaderPrintOption: string;
        SubmittalGroupId: number;
        ItemDescriptionPrintOption: string;
        Deleted: boolean;
        Synched: boolean;
        LastUpdateDate: string;
    }

}
