/// <reference path="../../tsDefinitions/mobileapp.d.ts" />
/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */
"use strict";
import ModelUtil = require("./ModelUtil");

module ModelsImpl {


    interface UserMasterConstructorProps extends SvcModels.UserMasterOptional, Models.UserMasterOptional { }

    export class UserMaster {
        public User_Number: number;
        public Name: string;
        public User_Identifier: string;
        public Primary_Branch_Number: number;
        public Email_Address: string;
        public Phone: string;
        public Fax: string;
        public Mobile: string;


        constructor(obj: UserMasterConstructorProps) {
            this.User_Number = ((obj.User_Number || obj.UserNumber) || 0);
            this.Name = (obj.Name || null);
            this.User_Identifier = ((obj.User_Identifier || obj.UserIdentifier) || null);
            this.Primary_Branch_Number = ((obj.Primary_Branch_Number || obj.PrimaryBranchNumber) || 0);
            this.Email_Address = ((obj.Email_Address || obj.EmailAddress) || null);
            this.Phone = (obj.Phone || "");
            this.Fax = (obj.Fax || "");
            this.Mobile = (obj.Mobile || "");
        }


        static copy(obj: UserMaster): UserMaster {
            return new UserMaster(obj);
        }


        static newInst(obj: any, timestamp?: number): UserMaster {
            return new UserMaster(obj);
        }


        static toServiceEntity(obj: UserMaster): SvcModels.UserMaster {
            return {
                UserNumber: obj.User_Number,
                Name: obj.Name,
                UserIdentifier: obj.User_Identifier,
                PrimaryBranchNumber: obj.Primary_Branch_Number || 999,
                EmailAddress: obj.Email_Address || "",
                Phone: obj.Phone || "",
                Fax: obj.Fax || "",
                Mobile: obj.Mobile || ""
            };
        }

    }


    interface UserProfileConstructorProps extends SvcModels.UserProfileOptional, Models.UserProfileOptional { }

    export class UserProfile implements PsSyncable {
        public Deleted: boolean;
        public Last_Update_Date: number;
        public User_Number: number;
        public Name: string;
        public User_Identifier: string;
        public Primary_Branch_Number: number;
        public Pricing_Profile_Number_1: string;
        public Pricing_Profile_Number_2: string;
        public Pricing_Profile_Number_3: string;
        public Pricing_Profile_Number_4: string;
        public Pricing_Profile_Number_5: string;
        public Pricing_Profile_Number_6: string;
        public Email_Address: string;
        public Phone: string;
        public Fax: string;
        public Mobile: string;
        public Currency_Code: string;
        public Language_ID: number;
        public Print_Part_Num: boolean;
        public Header_Print_Option: string;
        public Submittal_Group_ID: number;
        public Item_Description_Print_Option: string;
        public Synched: boolean;


        constructor(obj: UserProfileConstructorProps) {
            var lastUpdateDate: number = ((obj.Last_Update_Date || obj.LastUpdateDate) ? ModelUtil.getRealDate((obj.Last_Update_Date || obj.LastUpdateDate)) : ModelUtil.getTime());

            this.Deleted = (obj.Deleted || false);
            this.Last_Update_Date = lastUpdateDate;
            this.User_Number = ((obj.User_Number || obj.UserNumber) || 0);
            this.Name = (obj.Name || null);
            this.User_Identifier = ((obj.User_Identifier || obj.UserIdentifier) || null);
            this.Primary_Branch_Number = ((obj.Primary_Branch_Number || obj.PrimaryBranchNumber) || 0);
            this.Pricing_Profile_Number_1 = ((obj.Pricing_Profile_Number_1 || obj.PricingProfileNumber1) || null);
            this.Pricing_Profile_Number_2 = ((obj.Pricing_Profile_Number_2 || obj.PricingProfileNumber2) || null);
            this.Pricing_Profile_Number_3 = ((obj.Pricing_Profile_Number_3 || obj.PricingProfileNumber3) || null);
            this.Pricing_Profile_Number_4 = ((obj.Pricing_Profile_Number_4 || obj.PricingProfileNumber4) || null);
            this.Pricing_Profile_Number_5 = ((obj.Pricing_Profile_Number_5 || obj.PricingProfileNumber5) || null);
            this.Pricing_Profile_Number_6 = ((obj.Pricing_Profile_Number_6 || obj.PricingProfileNumber6) || null);
            this.Email_Address = ((obj.Email_Address || obj.EmailAddress) || null);
            this.Phone = (obj.Phone || "");
            this.Fax = (obj.Fax || "");
            this.Mobile = (obj.Mobile || "");
            this.Currency_Code = ((obj.Currency_Code || obj.CurrencyCode) || null);
            this.Language_ID = ((obj.Language_ID || obj.LanguageId) || 0);
            this.Print_Part_Num = ((obj.Print_Part_Num || obj.PrintPartNum) || false);
            this.Header_Print_Option = ((obj.Header_Print_Option || obj.HeaderPrintOption) || null);
            this.Submittal_Group_ID = ((obj.Submittal_Group_ID || obj.SubmittalGroupId) || 0);
            this.Item_Description_Print_Option = ((obj.Item_Description_Print_Option || obj.ItemDescriptionPrintOption) || null);
            this.Synched = (obj.Synched == true);
        }


        static setSynched<S extends PsSyncable>(obj: S, synched?: boolean): S {
            if (synched !== undefined) {
                obj.Synched = synched ? true : false;
            }
            else {
                obj.Synched = true;
                obj.Deleted = false;
            }
            return obj;
        }


        static unsync<S extends PsSyncable>(obj: S, timestamp?: number): S {
            return ModelUtil.setTimeAndState(obj, false, false, timestamp);
        }


        static setDeleted<S extends PsSyncable>(obj: S, timestamp?: number): S {
            return ModelUtil.setTimeAndState(obj, false, true, timestamp);
        }


        static newInstUnsynced(obj: any, timestamp?: number): UserProfile {
            return UserProfile.unsync(new UserProfile(obj), timestamp);
        }


        static newInstSynced(obj: any, timestamp?: number): UserProfile {
            return ModelUtil.setTimeAndState(new UserProfile(obj), true, false, timestamp);
        }


        static copy(obj: UserProfile): UserProfile {
            return new UserProfile(obj);
        }


        static newInst(obj: any, timestamp?: number): UserProfile {
            return new UserProfile(obj);
        }


        static toServiceEntity(obj: UserProfile): SvcModels.UserProfile {
            return {
                Deleted: obj.Deleted ? true : false,
                LastUpdateDate: ModelUtil.createServiceTimestamp(obj.Last_Update_Date),
                UserNumber: obj.User_Number,
                Name: obj.Name,
                UserIdentifier: obj.User_Identifier,
                PrimaryBranchNumber: obj.Primary_Branch_Number || 999,
                PricingProfileNumber1: obj.Pricing_Profile_Number_1 ? obj.Pricing_Profile_Number_1 : null,
                PricingProfileNumber2: obj.Pricing_Profile_Number_2 ? obj.Pricing_Profile_Number_2 : null,
                PricingProfileNumber3: obj.Pricing_Profile_Number_3 ? obj.Pricing_Profile_Number_3 : null,
                PricingProfileNumber4: obj.Pricing_Profile_Number_4 ? obj.Pricing_Profile_Number_4 : null,
                PricingProfileNumber5: obj.Pricing_Profile_Number_5 ? obj.Pricing_Profile_Number_5 : null,
                PricingProfileNumber6: obj.Pricing_Profile_Number_6 ? obj.Pricing_Profile_Number_6 : null,
                EmailAddress: obj.Email_Address || "",
                Phone: obj.Phone || "",
                Fax: obj.Fax || "",
                Mobile: obj.Mobile || "",
                CurrencyCode: obj.Currency_Code || "USD",
                LanguageId: obj.Language_ID || 1,
                PrintPartNum: obj.Print_Part_Num ? true : false,
                HeaderPrintOption: obj.Header_Print_Option ? obj.Header_Print_Option : null,
                SubmittalGroupId: obj.Submittal_Group_ID ? obj.Submittal_Group_ID : null,
                ItemDescriptionPrintOption: obj.Item_Description_Print_Option ? obj.Item_Description_Print_Option : null,
                Synched: obj.Synched ? true : false
            };
        }

    }

}

export = ModelsImpl;
