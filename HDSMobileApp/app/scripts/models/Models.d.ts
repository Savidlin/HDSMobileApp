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


    export interface EmployeeOptional {
        businessEntityId?: number;
        nationalIdNumber?: number;
        loginId?: string;
        jobTitle?: string;
        birthDate?: string;
        maritalStatus?: string;
        gender?: string;
        hireDate?: string;
        salariedFlag?: boolean;
        vacationHours?: number;
        sickLeaveHours?: number;
        currentFlag?: boolean;
    }


    export interface Employee {
        businessEntityId: number;
        nationalIdNumber: number;
        loginId: string;
        jobTitle: string;
        birthDate: string;
        maritalStatus: string;
        gender: string;
        hireDate: string;
        salariedFlag: boolean;
        vacationHours: number;
        sickLeaveHours: number;
        currentFlag: boolean;
    }

}
