/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */


/** ServiceData module
 * information about a service call/interface
 * @since 2015-1-20
 */
module ServiceData {

    export enum SvcType {
        POST,
        GET,
        DELETE
    }

    export enum SvcDataType {
        JSON,
        PLAIN,
    }

}


export = ServiceData;
