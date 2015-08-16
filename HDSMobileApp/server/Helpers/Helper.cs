using System;
using System.Net;
using System.Runtime.CompilerServices;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;
using log4net;
using HDSMobileApp.Entities.Searching;

namespace HDSMobileApp.Helpers {
    /// <summary>
    /// <para>
    /// Defines helper methods used in this component.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is immutable and thread-safe.
    /// </threadsafety>
    /// <author>HDS Author</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2015 HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    internal static class Helper {
        private static JavaScriptSerializer loggerSerializer = new JavaScriptSerializer();


        /// <summary>
        /// <para>
        /// Ensure that a string doesn't exceed maximum allowed length
        /// </para>
        /// </summary>
        /// <param name="str">Input string</param>
        /// <param name="maxLength">Maximum length</param>
        /// <returns>Input string if its lengh is OK; otherwise, truncated input string</returns>
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static string EnsureMaximumLength(string str, int maxLength) {
            return (str != null && str.Length > maxLength) ? str.Substring(0, maxLength) : str;
        }


        /// <summary>
        /// <para>
        /// Ensures that a string only contains numeric values
        /// </para>
        /// </summary>
        /// <param name="str">Input string</param>
        /// <returns>Input string with only numeric values, empty string if input is null/empty</returns>
        public static string EnsureNumericOnly(string str) {
            if (String.IsNullOrEmpty(str)) {
                return string.Empty;
            }

            var result = new StringBuilder();
            foreach (char c in str) {
                if (Char.IsDigit(c)) {
                    result.Append(c);
                }
            }
            return result.ToString();
        }


        /// <summary>
        /// <para>
        /// Checks whether the given value is zero or negative.
        /// </para>
        /// </summary>
        /// <param name="value">The value to check.</param>
        /// <param name="parameterName">The actual parameter name of the argument being checked.</param>
        /// <exception cref="ArgumentException">If value is zero or negative.</exception>
        internal static void CheckPositive(long value, string parameterName) {
            if (value <= 0) {
                throw new ArgumentException(
                    parameterName, string.Format("The parameter '{0}' can not be zero or negative.", parameterName));
            }
        }


        /// <summary>
        /// <para>
        /// Checks whether the given value is zero or negative.
        /// </para>
        /// </summary>
        /// <param name="value">The value to check.</param>
        /// <param name="parameterName">The actual parameter name of the argument being checked.</param>
        /// <exception cref="ArgumentException">If value is zero or negative.</exception>
        internal static void CheckPositive(decimal? value, string parameterName) {
            if (value <= 0) {
                throw new ArgumentException(
                    parameterName, string.Format("The parameter '{0}' can not be zero or negative.", parameterName));
            }
        }


        /// <summary>
        /// <para>
        /// Checks whether the given object is null.
        /// </para>
        /// </summary>
        /// <param name="value">The object to check.</param>
        /// <param name="parameterName">The actual parameter name of the argument being checked.</param>
        /// <exception cref="ArgumentNullException">If object is null.</exception>
        internal static void CheckNotNull(object value, string parameterName) {
            if (value == null) {
                throw new ArgumentNullException(
                    parameterName, string.Format("The parameter '{0}' can not be null.", parameterName));
            }
        }


        /// <summary>
        /// <para>
        /// Checks whether the given string is null or empty.
        /// </para>
        /// </summary>
        /// <param name="value">The object to check.</param>
        /// <param name="parameterName">The actual parameter name of the argument being checked.</param>
        /// <exception cref="ArgumentNullException">If the string is null.</exception>
        /// <exception cref="ArgumentException">If the given string is empty string.</exception>
        internal static void CheckNotNullOrEmpty(string value, string parameterName) {
            CheckNotNull(value, parameterName);
            if (value.Trim().Length == 0) {
                throw new ArgumentException(
                    string.Format("The parameter '{0}' can not be empty string.", parameterName), parameterName);
            }
        }


        /// <summary>
        /// <para>
        /// Checks whether the given input is valid.
        /// </para>
        /// </summary>
        /// <param name="valid">The condation to check.</param>
        /// <param name="errorMessage">The actual parameter name of the argument being checked.</param>
        /// <exception cref="ArgumentException">If input is invalid.</exception>
        internal static void CheckInput(bool valid, string errorMessage) {
            if (!valid) {
                throw new ArgumentException(errorMessage);
            }
        }


        /// <summary>
        /// <para>
        /// Gets the string representation of the given object.
        /// </para>
        /// </summary>
        /// <param name="obj">The object to describe.</param>
        /// <returns>The string representation of the object.</returns>
        internal static string GetObjectDescription(object obj) {
            if (obj == null) {
                return "NULL";
            }
            if (obj is string || obj.GetType().IsValueType) {
                return obj.ToString();
            }
            try {
                return loggerSerializer.Serialize(obj);
            }
            catch {
                return "Object cannot be represented.";
            }
        }


        /// <summary>
        /// Logs a method entry at DEBUG level.
        /// </summary>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="methodName">The method name.</param>
        /// <param name="paramterNames">The method parameter Names.</param>
        /// <param name="parameters">The method parameters.</param>
        /// <returns>The method start date time.</returns>
        /// <exception cref="ArgumentException">throws if length of input paramters not same with paramter names</exception>
        private static DateTime LogMethodEntry(ILog logger, string methodName,
            string[] paramterNames, params object[] parameters) {
            StringBuilder logFormat = new StringBuilder();

            if (parameters != null && paramterNames != null && paramterNames.Length != parameters.Length) {
                throw new ArgumentException(string.Format(
                    "The number of provided parameters for method '{0}' is wrong.", methodName), "parameters");
            }

            logFormat.AppendFormat("Entering method {0}", methodName).AppendLine();

            if (parameters != null && paramterNames != null) {
                logFormat.AppendLine("Argument Values:");

                for (int i = 0; i < paramterNames.Length; i++) {
                    logFormat.Append("\t").Append(paramterNames[i]).Append(": ");
                    logFormat.AppendLine(GetObjectDescription(parameters[i]));
                }
            }
            LogDebug(logger, logFormat.ToString());

            return DateTime.Now;
        }


        /// <summary>
        /// Logs a method exit at DEBUG level.
        /// </summary>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="methodName">The method name.</param>
        /// <param name="start">The method start date time.</param>
        private static void LogMethodExit(ILog logger, string methodName, DateTime start) {
            LogDebug(logger, string.Format("Exiting method {0}. Execution time: {1}ms",
                methodName, (DateTime.Now - start).TotalMilliseconds));
        }


        /// <summary>
        /// Logs the return value and method exit on DEBUG level.
        /// </summary>
        /// <typeparam name="R">The method return type.</typeparam>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="methodName">The method name.</param>
        /// <param name="returnValue">The return value to log.</param>
        /// <param name="start">The method start date time.</param>
        /// <returns>the method return value</returns>
        private static R LogReturnValue<R>(ILog logger, string methodName, R returnValue, DateTime start) {
            LogDebug(logger, string.Format("Exiting method {0} Execution time: {1}ms. Return value: {2}",
                methodName, (DateTime.Now - start).TotalMilliseconds,
                GetObjectDescription(returnValue)));
            return returnValue;
        }


        /// <summary>
        /// Logs the given exception on ERROR level.
        /// </summary>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="methodName">The method name.</param>
        /// <param name="ex">The exception to be logged.</param>
        private static void LogException(ILog logger, string methodName, Exception ex) {
            // Write an ERROR log.
            LogError(logger, string.Format("Error in method {0}\n\nDetails:\n{1}\n{2}", methodName, ex, ex.StackTrace));
        }


        /// <summary>
        /// Logs the given message on DEBUG level.
        /// </summary>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="message">The message to log.</param>
        private static void LogDebug(ILog logger, string message) {
            if (logger == null) {
                return;
            }

            try {
                logger.Debug(message);
            }
            catch { }
        }


        /// <summary>
        /// Logs the given message on ERROR level.
        /// </summary>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="message">The message to log.</param>
        private static void LogError(ILog logger, string message) {
            if (logger == null) {
                return;
            }

            try {
                logger.Error(message);
            }
            catch { }
        }


        /// <summary>
        /// This is a helper method to provide logging wrapper.
        /// </summary>
        /// <typeparam name="T">The return type.</typeparam>
        /// <remarks>Any exception will throw to caller directly.</remarks>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="call">The delegation to execute the business logic.</param>
        /// <param name="parameters">The parameters in the delegation method.</param>
        /// <exception cref="WebFaultException">throws if any error happen when call methods</exception>
        /// <returns>The value returned by <paramref name="call"/>.</returns>
        internal static T LoggingWrapper<T>(ILog logger, Func<T> call,
            string methodName, string[] paramterNames, params object[] parameters) {
            // Log method entry
            DateTime start = LogMethodEntry(logger, methodName, paramterNames, parameters);
            T ret;
            try {
                // Delegation
                ret = call();
            }
            catch (ArgumentException e) {
                LogException(logger, methodName, e);
                throw new WebFaultException<String>(e.Message, HttpStatusCode.BadRequest);
            }
            catch (Exception e) {
                LogException(logger, methodName, e);
                throw e is WebFaultException<String> ? e : new WebFaultException<String>(e.Message,
                        HttpStatusCode.InternalServerError);
            }

            // Log method exit with return value
            return LogReturnValue(logger, methodName, ret, start);
        }


        /// <summary>
        /// This is a helper method to provide logging wrapper.
        /// </summary>
        /// <typeparam name="T">The return type.</typeparam>
        /// <remarks>Any exception will throw to caller directly.</remarks>
        /// <param name="logger">The logger instance to be used for logging.</param>
        /// <param name="call">The delegation to execute the business logic.</param>
        /// <param name="parameters">The parameters in the delegation method.</param>
        /// <exception cref="WebFaultException">throws if any error happen when call methods</exception>
        /// <returns>The value returned by <paramref name="call"/>.</returns>
        internal static void LoggingWrapper(ILog logger, Action call,
            string methodName, string[] paramterNames, params object[] parameters) {
            // Log method entry
            DateTime start = LogMethodEntry(logger, methodName, paramterNames, parameters);
            try {

                call();
            }
            catch (ArgumentException e) {
                LogException(logger, methodName, e);
                throw new WebFaultException<String>(e.Message, HttpStatusCode.BadRequest);
            }
            catch (Exception e) {
                LogException(logger, methodName, e);
                throw e is WebFaultException<String> ? e : new WebFaultException<String>(e.Message, HttpStatusCode.InternalServerError);
            }
            LogMethodExit(logger, methodName, start);
        }


        /// <summary>
        /// Check page number and page size in criteria valid or not
        /// </summary>
        /// <param name="criteria">the criteria</param>
        /// <exception cref="ArgumentException">throws if page number or page size invalid.</exception>
        internal static void CheckSearchRange(SearchRange criteria) {
            if (criteria.Offset < 0) {
                throw new ArgumentException("search criteria offset must be >= 0");
            }
            if (criteria.Offset > 0 && criteria.Size <= 0) {
                throw new ArgumentException("search criteria size must be >= 0 if offset > 0");
            }
        }


        /** Between [0, count - 1]
         */
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        internal static int GetOffset(int offset, int totalRecords) {
            return Math.Min(Math.Max(offset, 0), totalRecords - 1);
        }


        /** Clamp a size to a maximum, including an offset
         */
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        internal static int ClampCount(int offset, int size, int totalRecords) {
            return Math.Min(offset + Math.Max(size, 1), totalRecords) - offset;
        }

    }

}
