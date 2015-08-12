/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
var DateConverter = require("../modules/DateConverter");
/** ModelUtil namespace
 * @author Benjamin
 * @since 2015-2-2
 */
var ModelUtil = (function () {
    function ModelUtil() {
    }
    ModelUtil.setTimeAndState = function (obj, synced, deleted, timestamp) {
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
    };
    ModelUtil.getRealDate = DateConverter.Timestamp.createFromService;
    ModelUtil.getTime = DateConverter.Timestamp.now;
    ModelUtil.createServiceTimestamp = DateConverter.Timestamp.toServiceTimestamp;
    return ModelUtil;
})();
module.exports = ModelUtil;
