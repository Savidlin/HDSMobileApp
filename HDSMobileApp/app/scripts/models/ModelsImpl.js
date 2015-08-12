/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */
"use strict";
var ModelUtil = require("./ModelUtil");
var Models;
(function (Models) {
    var UserMaster = (function () {
        function UserMaster(obj) {
            this.User_Number = ((obj.User_Number || obj.UserNumber) || 0);
            this.Name = (obj.Name || null);
            this.User_Identifier = ((obj.User_Identifier || obj.UserIdentifier) || null);
            this.Primary_Branch_Number = ((obj.Primary_Branch_Number || obj.PrimaryBranchNumber) || 0);
            this.Email_Address = ((obj.Email_Address || obj.EmailAddress) || null);
            this.Phone = (obj.Phone || "");
            this.Fax = (obj.Fax || "");
            this.Mobile = (obj.Mobile || "");
        }
        UserMaster.copy = function (obj) {
            return new UserMaster(obj);
        };
        UserMaster.newInst = function (obj, timestamp) {
            return new UserMaster(obj);
        };
        UserMaster.toServiceEntity = function (obj) {
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
        };
        return UserMaster;
    })();
    Models.UserMaster = UserMaster;
    var UserProfile = (function () {
        function UserProfile(obj) {
            var lastUpdateDate = ((obj.Last_Update_Date || obj.LastUpdateDate) ? ModelUtil.getRealDate((obj.Last_Update_Date || obj.LastUpdateDate)) : ModelUtil.getTime());
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
        UserProfile.setSynched = function (obj, synched) {
            if (synched !== undefined) {
                obj.Synched = synched ? true : false;
            }
            else {
                obj.Synched = true;
                obj.Deleted = false;
            }
            return obj;
        };
        UserProfile.unsync = function (obj, timestamp) {
            return ModelUtil.setTimeAndState(obj, false, false, timestamp);
        };
        UserProfile.setDeleted = function (obj, timestamp) {
            return ModelUtil.setTimeAndState(obj, false, true, timestamp);
        };
        UserProfile.newInstUnsynced = function (obj, timestamp) {
            return UserProfile.unsync(new UserProfile(obj), timestamp);
        };
        UserProfile.newInstSynced = function (obj, timestamp) {
            return ModelUtil.setTimeAndState(new UserProfile(obj), true, false, timestamp);
        };
        UserProfile.copy = function (obj) {
            return new UserProfile(obj);
        };
        UserProfile.newInst = function (obj, timestamp) {
            return new UserProfile(obj);
        };
        UserProfile.toServiceEntity = function (obj) {
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
        };
        return UserProfile;
    })();
    Models.UserProfile = UserProfile;
})(Models || (Models = {}));
module.exports = Models;
