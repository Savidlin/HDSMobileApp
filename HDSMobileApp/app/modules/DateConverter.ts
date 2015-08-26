/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved. */


/** DateConverter namespace
 * Contains sub-classes for various types of date/time manipulation, including
 * 'Date' for working with JS Date objects and
 * 'Timestamp' for working with integer epoch millisecond offsets
 * @since 2014-12-16
 */
module DateConverter {

    export class Dates {

        static createFromTimestamp(value: number): Date {
            return DateConverter.Timestamp.toDate(value);
        }


        /** from utils.js (2014-12-8 Benjamin)
         * Parse date string return by rest service
         * it returns date in its time zone, so we have to convert it to UTC and then to JS time zone
         * @param {String} value: the service date string to convert to a {@link Date} object.
         * Can be null, returns the current date/time.
         * @return {Date} a new date object created from the {@code value}
         */
        static createFromService(value: string): Date {
            if (!value) {
                return new Date();
            }

            var time = DateConverter.Timestamp.createFromService(value);
            //Use the UTC epoch to build a new local date
            return new Date(time);
        }


        static toMsJson(date) {
            return DateConverter.Dates.toServiceTimestamp(date);
        }


        /** Convert a date to a string to pass to web services
         * @param {Date|null} date: the date to convert. Or null to use the current date/time.
         * @return {String} the string representation of the date to pass to service calls
         */
        static toServiceTimestamp(date: Date): string {
            if (date == null) {
                date = new Date();
            }

            var tz;
            var offset = date.getTimezoneOffset();
            if (offset < 0) {
                offset = -offset;
                tz = '+';
            } else {
                tz = '-';
            }
            tz += (offset / 60 < 10 ? '0' : '') + offset / 60;
            tz += (offset % 60 < 10 ? '0' : '') + offset % 60;

            var dateStr = '/Date(' + date.getTime() + tz + ')/';
            return dateStr;
        }


        /** Get minutes of the day (0 - 1439) from a date. The date is in the current timezone.
         * @param {Date} date: the date to get the minute of the day from
         * @return {Integer} the number of minutes that have elapsed since the last midnight of the timestamp
         */
        static getDayMinutes(date: Date): number {
            var dt = new Date(date.getTime());
            return dt.getHours() * 60 + dt.getMinutes();
        }


        /** Convert a date to a date string. The display date is in the current timezone.
         * @param {Date} date: the date to convert to a display date string
         * @param {String} [separator='/']: optional separator such as '/' or '-' between 'mm', 'dd', and 'yyyy'
         * @return {String} the date represented by the timestamp in the format 'mm/dd/yyyy'
         */
        static toDisplayDate(date: Date, separator: string = "/"): string {
            var dt = new Date(date.getTime());
            var d = dt.getDate();
            var mon = dt.getMonth() + 1;
            var y = dt.getFullYear();
            return (mon <= 9 ? '0' + mon : '' + mon) + separator + (d <= 9 ? '0' + d : '' + d) + separator + y;
        }


        /** Convert a date to a date-time string. The display date is in the current timezone.
         * @param {Date} date: the date to convert to a date-time string
         * @return {String} the date-time representated by the timestamp in the format 'mm/dd/yyyy hh:mm am/pm'
         */
        static toDisplayDateTime(date: Date, includingMidnight?: boolean): string {
            var dt = new Date(date.getTime());
            var hrs = dt.getHours();
            var mins = dt.getMinutes();
            if (!includingMidnight && hrs === 0 && mins === 0) {
                return DateConverter.Dates.toDisplayDate(date);
            }
            var ampm = hrs < 12 ? 'a.m.' : 'p.m.';
            hrs = hrs % 12;
            if (hrs === 0) {
                hrs = 12;
            }
            return DateConverter.Dates.toDisplayDate(date) +
                ' ' + (hrs <= 9 ? '0' + hrs : '' + hrs) +
                ':' + (mins <= 9 ? '0' + mins : '' + mins) + ' ' + ampm;
        }


        /** number of days between {@code dtLeft - dtRight}
         * @param {Boolean} [incrementAtMidnight=false]: assumes dtRight's time is midnight and counts from dtRight's date
         * (i.e.if {@code incrementAtMidnight == true } then 2001-3-15 2:43 is the same day as 2001-3-15 19:39, even though the dates are more than 12 hours apart)
         */
        static dayDiff(dtLeft: Date, dtRight: Date, incrementAtMidnight: boolean = false): number {
            var msPerDay = (1000 * 60 * 60) * 24;
            var daysDiff = ((dtLeft.getTime() - dtRight.getTime()) / msPerDay);
            var dateDiff = (incrementAtMidnight ? Math.floor(daysDiff) : Math.round(daysDiff)); // TODO this does not handle leap years or other non-gregorian calendar days in a year
            return dateDiff;
        }

    }




    export class Timestamp {
        private static _timezoneOffsetMs;

        private static get currentTimezoneOffsetMs() {
            return Timestamp._timezoneOffsetMs || (Timestamp._timezoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000);
        }

        static MS_PER_DAY = 1000 * 60 * 60 * 24;

        /**
         * @return {Integer} a millisecond timestamp of the current UTC time
         */
        static now(): number {
            var now = new Date();
            var offset = now.getTimezoneOffset() * 60 * 1000; // * 1 minute
            return (now.getTime() + offset);
        }


        /**
         * @param {Integer} timestamp: convert a timestamp to a {@link Date}
         * @param {Boolean} isUtc: true to assume the timestamp is UTC, false to assume
         * it is a local timezone timestamp and apply the correct offset to it
         * @return {Date} the date created from the timestamp
         */
        static toDate(timestamp: number, isUtc: boolean = true): Date {
            // if UTC, apply an inverse timezone offset since {@code new Date()} automatically assumes the timestamp is local
            return new Date(timestamp - (isUtc ? Timestamp.currentTimezoneOffsetMs : 0));
        }


        /** Parse a Microsoft DateTime timestamp format JSON string
         * @param {String|Integer} dateString: a service date string in the format {@code "/Date(1415354400000-0500)/"},
         * or a timestamp which is returned as-is
         * @param {Boolean} ignoreTimezoneAssumeUtc: true to ignore any embeded timezone in the
         * date string and treat the date string as a UTC timestamp and apply the current timezone offset,
         * false to use any embeded timezone from the date string or apply no timezone offset if there is none
         * @return {Number} the millisecond timestamp value of the input {@code dateString}
         */
        static createFromService(dateString: string | number, ignoreTimezoneAssumeUtc: boolean = true/*(2015-4-20) default = true because server incorrect appends its own timezone offset to all the UTC timestamps returned from service calls, change to false once server timestamps fixed (Axosoft ticket DBI 1650)*/): number {
            if (!dateString) {
                return Date.now();
            }
            if ((typeof <any>dateString === "number" && isFinite(<any>dateString) && Math.floor(<any>dateString) === <any>dateString)) {
                return (<number><any>dateString);
            }

            //Split date string up into parts. Ex: "/Date(1415354400000-0500)/" gets parsed into "1415354400000", "-", and "0500"
            var dateObj = (<string>dateString).match(/(\d+)|([+-])|(\d{4})/g);
            var timeZoneOffsetMs = 0;
            if (dateObj.length > 2) {
                if (ignoreTimezoneAssumeUtc) {
                    timeZoneOffsetMs = -Timestamp.currentTimezoneOffsetMs;
                }
                else {
                    // parse the +/-#### at the end of the date string as a hhmm timezone offset
                    var offsetVal = parseInt(dateObj[2]);
                    var sign = dateObj[1];
                    if ((sign !== '+' && sign !== '-') || isNaN(offsetVal)) {
                        throw new Error("unrecognized date string '" + dateString + "'");
                    }
                    var timeZoneOffsetHrMin = (sign === '+' ? -1 : 1) * offsetVal;
                    timeZoneOffsetMs = (Math.round(timeZoneOffsetHrMin / 100) * 60 + timeZoneOffsetHrMin % 100) * 60 * 1000;
                }
            }
            var time = parseInt(dateObj[0], 10) + timeZoneOffsetMs;
            return time;
        }


        static toMsJson(timestamp: number): string {
            return Timestamp.toServiceTimestamp(timestamp);
        }


        /** Convert a timestamp to a string to pass to web services
         * @param {Integer} timestamp: the timestamp to convert.
         * @param {Boolean} isUtc: true to assume the timestamp is UTC, false to assume
         * it is a local timezone timestamp and apply the correct offset to it
         * @return {String} the string representation of the date to pass to service calls
         */
        static toServiceTimestamp(timestamp: number, isUtc: boolean = true): string {
            return DateConverter.Dates.toServiceTimestamp(DateConverter.Timestamp.toDate(timestamp, isUtc));
        }


        /** Get minutes of the day (0 - 1439) from a timestamp. The date is in the current timezone.
         * @param {Integer} timestamp: the timestamp to get the minute of the day from
         * @return {Integer} the number of minutes that have elapsed since the last midnight of the timestamp
         */
        static getDayMinutes(timestamp: number): number {
            return DateConverter.Dates.getDayMinutes(new Date(timestamp));
        }


        /** Convert a timestamp to a date string. The display date is in the current timezone.
         * @param {Integer} timestamp: the timestamp to convert to a date
         * @return {String} the date represented by the timestamp in the format 'mm/dd/yyyy'
         */
        static toDisplayDate(timestamp: number): string {
            return DateConverter.Dates.toDisplayDate(new Date(timestamp));
        }


        /** Convert a timestamp to a date-time string. The display date is in the current timezone.
         * @param {Integer} timestamp: the timestamp to convert to a date-time string
         * @return {String} the date-time representated by the timestamp in the format 'mm/dd/yyyy hh:mm am/pm'
         */
        static toDisplayDateTime(timestamp: number, includingMidnight?: boolean): string {
            return DateConverter.Dates.toDisplayDateTime(new Date(timestamp), includingMidnight);
        }

    }

}


export = DateConverter;
