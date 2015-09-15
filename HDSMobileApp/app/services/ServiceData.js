/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */
/** ServiceData module
 * information about a service call/interface
 * @since 2015-1-20
 */
var ServiceData;
(function (ServiceData) {
    (function (SvcType) {
        SvcType[SvcType["POST"] = 0] = "POST";
        SvcType[SvcType["GET"] = 1] = "GET";
        SvcType[SvcType["DELETE"] = 2] = "DELETE";
    })(ServiceData.SvcType || (ServiceData.SvcType = {}));
    var SvcType = ServiceData.SvcType;
    (function (SvcDataType) {
        SvcDataType[SvcDataType["JSON"] = 0] = "JSON";
        SvcDataType[SvcDataType["PLAIN"] = 1] = "PLAIN";
    })(ServiceData.SvcDataType || (ServiceData.SvcDataType = {}));
    var SvcDataType = ServiceData.SvcDataType;
})(ServiceData || (ServiceData = {}));
module.exports = ServiceData;
