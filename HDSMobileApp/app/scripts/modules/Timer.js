/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.
 * @since 2015-2-2
 */
/** Timer namespace
 * @author Assaf
 * @since 2015-1-0
 */
var Timer = (function () {
    function Timer() {
    }
    Timer.start = function (name) {
        var now = window.performance.now();
        var timerId = name.replace(/ /g, '_') + "___" + now;
        if (window.performance.mark) {
            window.performance.mark("start_" + timerId);
        }
        Timer.timerHash[timerId.toString()] = {
            name: name,
            time: now
        };
        return timerId;
    };
    Timer.end = function (timerId) {
        var time = null;
        if (window.performance.mark) {
            window.performance.mark("end_" + timerId);
            window.performance.measure("time_" + timerId, "start_" + timerId, "end_" + timerId);
            time = window.performance.getEntriesByName("time_" + timerId)[0].duration;
        }
        else {
            time = Timer.timerHash[timerId.toString()].time;
        }
        return time;
    };
    Timer.timerHash = {};
    return Timer;
})();
module.exports = Timer;
