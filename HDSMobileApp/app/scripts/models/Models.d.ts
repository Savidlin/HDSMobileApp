/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @generated
 */

declare module Models {

    export interface UserMasterOptional {
        User_Number?: number;
        Name?: string;
        User_Identifier?: string;
        Primary_Branch_Number?: number;
        Email_Address?: string;
        Phone?: string;
        Fax?: string;
        Mobile?: string;
    }


    export interface UserMaster {
        User_Number: number;
        Name: string;
        User_Identifier: string;
        Primary_Branch_Number: number;
        Email_Address: string;
        Phone: string;
        Fax: string;
        Mobile: string;
    }


    export interface UserProfileOptional {
        User_Number?: number;
        Name?: string;
        User_Identifier?: string;
        Primary_Branch_Number?: number;
        Pricing_Profile_Number_1?: string;
        Pricing_Profile_Number_2?: string;
        Pricing_Profile_Number_3?: string;
        Pricing_Profile_Number_4?: string;
        Pricing_Profile_Number_5?: string;
        Pricing_Profile_Number_6?: string;
        Email_Address?: string;
        Phone?: string;
        Fax?: string;
        Mobile?: string;
        Currency_Code?: string;
        Language_ID?: number;
        Print_Part_Num?: boolean;
        Header_Print_Option?: string;
        Submittal_Group_ID?: number;
        Item_Description_Print_Option?: string;
        Deleted?: boolean;
        Synched?: boolean;
        Last_Update_Date?: number;
    }


    export interface UserProfile {
        User_Number: number;
        Name: string;
        User_Identifier: string;
        Primary_Branch_Number: number;
        Pricing_Profile_Number_1: string;
        Pricing_Profile_Number_2: string;
        Pricing_Profile_Number_3: string;
        Pricing_Profile_Number_4: string;
        Pricing_Profile_Number_5: string;
        Pricing_Profile_Number_6: string;
        Email_Address: string;
        Phone: string;
        Fax: string;
        Mobile: string;
        Currency_Code: string;
        Language_ID: number;
        Print_Part_Num: boolean;
        Header_Print_Option: string;
        Submittal_Group_ID: number;
        Item_Description_Print_Option: string;
        Deleted: boolean;
        Synched: boolean;
        Last_Update_Date: number;
    }

}
