/// <reference path="../tsDefinitions/mobileapp.d.ts" />
"use strict";
var ModelsImpl;
(function (ModelsImpl) {
    var UserMaster = (function () {
        function UserMaster(obj) {
            this.User_Number = ((obj.User_Number) || 0);
            this.Name = (obj.Name || null);
            this.User_Identifier = ((obj.User_Identifier) || null);
            this.Primary_Branch_Number = ((obj.Primary_Branch_Number) || 0);
            this.Email_Address = ((obj.Email_Address) || null);
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
        return UserMaster;
    })();
    ModelsImpl.UserMaster = UserMaster;
})(ModelsImpl || (ModelsImpl = {}));
module.exports = ModelsImpl;
