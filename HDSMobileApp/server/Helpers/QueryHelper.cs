using System;
using System.Linq;
using System.Data.Entity;
using System.Transactions;
using System.Collections.Generic;
using HDSMobileApp.Entities.Searching;
using HDSMobileApp.Services.Impl;
using HDSMobileApp.Entities.Base;
using LinqExpression = System.Linq.Expressions.Expression;

namespace HDSMobileApp.Helpers
{
    /** This class add OrderBy and OrderByDescending to support string column.
     * @threadsafety This class is mutable, so it is not thread-safe.
     * @version 1.0
     * @copyright Copyright (c) 2015 HDS IP Holdings, LLC. All Rights Reserved
     */
    public static class QueryHelper
    {

        /** Use Expression to add extention method to  IQueryable
         * currently it support order by for nested property name
         * @typeparam <T>the type
         * @param source  the queryable source
         * @param orderName  the order name
         * @param colName  the column name
         * @returns  the new queryable with order column
         */
        private static IQueryable<T> OrderbyFromColumnName<T>(IQueryable<T> source, string orderName, string colName) {
            string[] props = colName.Split('.');
            Type type = typeof(T);
            var arg = LinqExpression.Parameter(type, "x");
            LinqExpression expr = arg;
            foreach (string prop in props) {
                var pi = type.GetProperty(prop);
                expr = LinqExpression.Property(expr, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            var lambda = LinqExpression.Lambda(delegateType, expr, arg);
            var resultExp = LinqExpression.Call(typeof(Queryable), orderName, new [] { typeof(T), type }, source.Expression, lambda);
            return source.Provider.CreateQuery<T>(resultExp);
        }


        /** Create Queryable when OrderBy with columnName
         * @typeparam <T> the type
         * @param source  the queryable source
         * @param ordering  the order column name
         * @param values  the param values
         * @returns the new queryable with orderby column
         */
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string ordering, params object[] values) {
            return OrderbyFromColumnName(source, "OrderBy", ordering);
        }


        /** Create Queryable with ordering column name and sort type.
         * @typeparam <T> the type
         * @param source  the queryable source
         * @param ordering  the order column name
         * @param SortOrder the sort type
         * @param values  the param values
         * @returns the new queryable with orderby column
         */
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string ordering,
           SortOrder SortOrder, params object[] values) {
            return OrderbyFromColumnName(source, SortOrder.Descending == SortOrder ? "OrderByDescending" : "OrderBy", ordering);
        }


        /** Create Queryable when OrderByDescending with columnName
         * @typeparam <T> the type
         * @param source  the queryable source
         * @param ordering  the order column name
         * @param values  the param values
         * @returns the new queryable with orderbydescending column
         */
        public static IQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string ordering, params object[] values) {
            return OrderbyFromColumnName(source, "OrderByDescending", ordering);
        }


        /** Sorts, orders, and takes the correct number of items for a result page from an IQueryable source based on SearchCriteria
         * @typeparam <T> the source data type
         * @param source  the queryable source
         * @param criteria  this search criteria's 'SortBy' field is modified and other fields are used to determine queryable source ordering and number of results to return
         * @param sortBy  the name of the field to sort by
         * @returns the sorted and sized input {@code source}
         */
        public static IQueryable<T> SortOrderAndPageSize<T>(IQueryable<T> source, SearchRange rangeCriteria, string sortBy) {
            if (string.IsNullOrEmpty(rangeCriteria.SortBy)) {
                rangeCriteria.SortBy = sortBy;
            }

            if (SortOrder.Ascending.Equals(rangeCriteria.SortOrder)) {
                source = source.OrderBy(rangeCriteria.SortBy);
            }
            else {
                source = source.OrderByDescending(rangeCriteria.SortBy);
            }

            if (rangeCriteria.Offset > 0) {
                source = source.Skip(rangeCriteria.Offset).Take(rangeCriteria.Size);
            }

            return source;
        }


        public static SearchResult<R> ApplyGenericSearch<T, R, S>(DbSetInfo<T> dbSetRef, log4net.ILog logger, string methodName,
            SearchRange rangeCriteria, S objCriteria, string sortFieldName, Func<IQueryable<T>, SearchRange, S, IQueryable<R>> queryConstructor,
            Func<HDSMobileAppDbContext, DbSet<T>, IQueryable<T>> dbSetModifier = null, Action<HDSMobileAppDbContext, IList<R>> resultModifier = null, bool useInitialQueryForTotalCount = false)
            where T : class
            where R : class
            where S : class
        {
            return ApplyGenericSearchWithDb(dbSetRef, logger, methodName, rangeCriteria, objCriteria, sortFieldName,
                (db, query, listSearch, objSearch) => queryConstructor(query, listSearch, objSearch), dbSetModifier);
        }


        public static SearchResult<R> ApplyGenericSearchWithDb<T, R, S>(DbSetInfo<T> dbSetRef, log4net.ILog logger, string methodName,
            SearchRange rangeCriteria, S objCriteria, string sortFieldName, Func<HDSMobileAppDbContext, IQueryable<T>, SearchRange, S, IQueryable<R>> queryConstructor,
            Func<HDSMobileAppDbContext, DbSet<T>, IQueryable<T>> dbSetModifier = null, Action<HDSMobileAppDbContext, IList<R>> resultModifier = null, bool useInitialQueryForTotalCount = false)
            where T : class
            where R : class
            where S : class
        {
            return Helper.LoggingWrapper(logger, delegate()
            {
                Helper.CheckNotNull(rangeCriteria, "rangeCriteria");
                Helper.CheckNotNull(objCriteria, "objCriteria");
                Helper.CheckSearchRange(rangeCriteria);

                //using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted })) {
                    var result = new SearchResult<R>();
                    using (var db = new HDSMobileAppDbContext()) {

                        IQueryable<T> query = dbSetModifier != null ? dbSetModifier(db, db.GetDbSet(dbSetRef)) : db.GetDbSet(dbSetRef);

                        IQueryable<R> resQuery = queryConstructor(db, query, rangeCriteria, objCriteria);

                        int totalCount = resQuery.Count();
                        result.TotalRecords = totalCount;

                        resQuery = QueryHelper.SortOrderAndPageSize(resQuery, rangeCriteria, sortFieldName);

                        result.Items = resQuery.ToList();

                        if (resultModifier != null) {
                            resultModifier(db, result.Items);
                        }
                    }
                    //scope.Complete();

                    result.ResultOffset = Helper.GetOffset(rangeCriteria.Offset, result.TotalRecords);
                    result.ResultCount = Helper.ClampCount(rangeCriteria.Offset, rangeCriteria.Size, result.TotalRecords);
                    HttpUtils.Response.setupCurrentWebResponseNoCache();
                    return result;
                //}
            }, methodName, new string[] { "rangeCriteria", "objCriteria" }, rangeCriteria, objCriteria);
        }


        /** No-op query condition.
         * @returns The unmodified query.
         */
        public static IQueryable<T> IdentityQuery<T>(IQueryable<T> query, SearchRange rangeCriteria) {
            return query;
        }


        /** Construct query conditions by applying given UserCustomer criteria to query object.
         * @param query  the query
         * @param criteria  the criteria
         * @returns The updated query
         */
        public static IQueryable<T> UserIdAndLastUpdateQuery<T>(IQueryable<T> query, UserCustomizableEntitySearchCriteria criteria)
            where T : UserCustomizableEntity {
            if (criteria.UserIdentifier != null) {
                query = query.Where(i => i.UserIdentifier == criteria.UserIdentifier);
            }
            if (criteria.LastUpdateDate != null) {
                query = query.Where(i => i.LastUpdateDate > criteria.LastUpdateDate);
            }
            return query;
        }

    }

}
