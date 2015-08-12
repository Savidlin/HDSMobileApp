/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */

import DateConverter = require("../modules/DateConverter");


/** ModelUtil namespace
 * @author Benjamin
 * @since 2015-2-2
 */
class ModelUtil {

    static getRealDate = DateConverter.Timestamp.createFromService;

    static getTime = DateConverter.Timestamp.now;

    static createServiceTimestamp = DateConverter.Timestamp.toServiceTimestamp;


    static setTimeAndState<S extends PsSyncable>(obj: S, synced: boolean, deleted: boolean, timestamp?: number): S {
        if (timestamp == undefined) {
            timestamp = ModelUtil.getTime();
        }
        else if (!(typeof timestamp === "number" && isFinite(timestamp) && Math.floor(timestamp) === timestamp)) {
            throw new Error("timestamp must be an integer value: " + timestamp);
        }
        obj.Synched = synced;
        obj.Deleted = deleted;
        obj.Last_Update_Date = timestamp;
        return obj;
    }

}


export = ModelUtil;
