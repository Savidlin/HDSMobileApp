/// <reference path="../tsDefinitions/mobileapp.d.ts" />
"use strict";

module ModelsImpl {


    interface UserMasterConstructorProps extends Models.UserMasterOptional { }

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
            this.User_Number = ((obj.User_Number) || 0);
            this.Name = (obj.Name || null);
            this.User_Identifier = ((obj.User_Identifier) || null);
            this.Primary_Branch_Number = ((obj.Primary_Branch_Number) || 0);
            this.Email_Address = ((obj.Email_Address) || null);
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

    }

}

export = ModelsImpl;
