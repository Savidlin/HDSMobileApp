/* @license (c) Copyright 2015 HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.Linq;
using LinqExpression = System.Linq.Expressions.Expression;
using HDSMobileApp.Entities.Searching;
using System.Data.Entity;
using System.Transactions;
using HDSMobileApp.Services.Impl;
using System.Collections.Generic;
using HDSMobileApp.Entities.Base;

namespace HDSMobileApp.Helpers
{
    /// <summary>
    /// <para>
    /// This class add OrderBy and OrderByDescending to support string column.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>HDS Author</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2015 HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    public static class QueryHelper
    {

        /// <summary>
        /// Use Expression to add extention method to  IQueryable
        /// currently it support order by for nested property name
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="source">the queryable source</param>
        /// <param name="orderName">the order name</param>
        /// <param name="colName">the column name</param>
        /// <returns>the new queryable with order column</returns>
        private static IQueryable<T> OrderbyFromColumnName<T>(IQueryable<T> source, string orderName, string colName)
        {
            string[] props = colName.Split('.');
            Type type = typeof(T);
            var arg = LinqExpression.Parameter(type, "x");
            LinqExpression expr = arg;
            foreach (string prop in props)
            {
                var pi = type.GetProperty(prop);
                expr = LinqExpression.Property(expr, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            var lambda = LinqExpression.Lambda(delegateType, expr, arg);
            var resultExp = LinqExpression.Call(typeof(Queryable),
                orderName, new [] { typeof(T), type }, source.Expression, lambda);
            return source.Provider.CreateQuery<T>(resultExp);
        }


        /// <summary>
        /// Create Queryable when OrderBy with columnName
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="source">the queryable source</param>
        /// <param name="ordering">the order column name</param>
        /// <param name="values">the param values</param>
        /// <returns>the new queryable with orderby column</returns>
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string ordering, params object[] values)
        {
            return OrderbyFromColumnName(source, "OrderBy", ordering);
        }


        /// <summary>
        /// Create Queryable with ordering column name and sort type.
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="source">the queryable source</param>
        /// <param name="ordering">the order column name</param>
        /// <param name="SortOrder">the sort type</param>
        /// <param name="values">the param values</param>
        /// <returns>the new queryable with orderby column</returns>
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string ordering,
           SortOrder SortOrder, params object[] values)
        {
            return OrderbyFromColumnName(source, 
                SortOrder.Descending == SortOrder ? "OrderByDescending" : "OrderBy", ordering);
        }


        /// <summary>
        /// Create Queryable when OrderByDescending with columnName
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="source">the queryable source</param>
        /// <param name="ordering">the order column name</param>
        /// <param name="values">the param values</param>
        /// <returns>the new queryable with orderbydescending column</returns>
        public static IQueryable<T> OrderByDescending<T>(this IQueryable<T> source,
            string ordering, params object[] values)
        {
            return OrderbyFromColumnName(source, "OrderByDescending", ordering);
        }


        /// <summary>
        /// Sorts, orders, and takes the correct number of items for a result page from an IQueryable source based on SearchCriteria
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="source">the queryable source</param>
        /// <param name="criteria">this search criteria's 'SortBy' field is modified and other fields are used to determine queryable source ordering and number of results to return</param>
        /// <param name="sortBy">the name of the field to sort by</param>
        /// <returns></returns>
        public static IQueryable<T> SortOrderAndPageSize<T>(IQueryable<T> source, SearchCriteria criteria, string sortBy)
        {
            if (string.IsNullOrEmpty(criteria.SortBy))
            {
                criteria.SortBy = sortBy;
            }

            if (SortOrder.Ascending.Equals(criteria.SortOrder))
            {
                source = source.OrderBy(criteria.SortBy);
            }
            else
            {
                source = source.OrderByDescending(criteria.SortBy);
            }

            if (criteria.PageNumber > 0)
            {
                source = source.Skip(criteria.PageSize * (criteria.PageNumber - 1)).Take(criteria.PageSize);
            }

            return source;
        }


        public static SearchResult<R> ApplyGenericSearch<T, R, S>(DbSetInfo<T> dbSetRef, log4net.ILog Logger, string methodName,
            S criteria, string sortFieldName, Func<IQueryable<T>, S, IQueryable<R>> queryConstructor,
            Func<HDSMobileAppDbContext, DbSet<T>, IQueryable<T>> dbSetModifier = null, Action<HDSMobileAppDbContext, IList<R>> resultModifier = null, bool useInitialQueryForTotalCount = false)
            where T : class
            where R : class
            where S : SearchCriteria
        {
            return ApplyGenericSearchWithDb(dbSetRef, Logger, methodName, criteria, sortFieldName, (db, query, searchCriteria) => queryConstructor(query, searchCriteria), dbSetModifier);
        }


        public static SearchResult<R> ApplyGenericSearchWithDb<T, R, S>(DbSetInfo<T> dbSetRef, log4net.ILog Logger, string methodName,
            S criteria, string sortFieldName, Func<HDSMobileAppDbContext, IQueryable<T>, S, IQueryable<R>> queryConstructor,
            Func<HDSMobileAppDbContext, DbSet<T>, IQueryable<T>> dbSetModifier = null, Action<HDSMobileAppDbContext, IList<R>> resultModifier = null, bool useInitialQueryForTotalCount = false)
            where T : class
            where R : class
            where S : SearchCriteria
        {
            return Helper.LoggingWrapper(Logger, delegate()
            {
                Helper.CheckNotNull(criteria, "criteria");
                Helper.CheckSearchCriteria(criteria);

                using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted }))
                {
                    var result = new SearchResult<R>();
                    using (var db = new HDSMobileAppDbContext())
                    {
                        int totalCount = 0;
                        IQueryable<T> query = dbSetModifier != null ? dbSetModifier(db, db.GetDbSet(dbSetRef)) : db.GetDbSet(dbSetRef);
                        IQueryable<R> resQuery = queryConstructor(db, query, criteria);

                        //if (useInitialQueryForTotalCount)
                        //{
                            totalCount = resQuery.Count();
                        //}

                        resQuery = QueryHelper.SortOrderAndPageSize(resQuery, criteria, sortFieldName);

                        /*if (!useInitialQueryForTotalCount)
                        {
                            IQueryable<T> allQuery = db.GetDbSet(dbSetRef);
                            IQueryable<R> allResQuery = queryConstructor(db, allQuery, criteria);
                            totalCount = allResQuery.Count();
                        }*/

                        result.TotalRecords = totalCount;
                        result.Items = resQuery.ToList();

                        if (resultModifier != null)
                        {
                            resultModifier(db, result.Items);
                        }
                    }
                    scope.Complete();

                    result.PageNumber = Helper.GetPageNumber(criteria.PageNumber, result.TotalRecords);
                    result.TotalPages = Helper.GetTotalPages(criteria.PageNumber, criteria.PageSize, result.TotalRecords);
                    HttpUtils.Response.setupCurrentWebResponseNoCache();
                    return result;
                }
            }, methodName, new string[] { "criteria" }, criteria);
        }


        /// <summary>
        ///  No-op query condition.
        /// </summary>
        /// <param name="query"> the query.</param>
        /// <param name="criteria"> the criteria.</param>
        /// <returns>The updated query.</returns>
        public static IQueryable<T> IdentityQuery<T>(IQueryable<T> query, SearchCriteria criteria)
        {
            return query;
        }


        /// <summary>
        ///  Construct query conditions by applying given UserCustomer criteria to query object.
        /// </summary>
        /// <param name="query"> the query.</param>
        /// <param name="criteria"> the criteria.</param>
        /// <returns>The updated query.</returns>
        public static IQueryable<T> UserIdAndLastUpdateQuery<T>(IQueryable<T> query, UserCustomizableEntitySearchCriteria criteria)
            where T : UserCustomizableEntity
        {
            if (criteria.UserIdentifier != null)
            {
                query = query.Where(i => i.UserIdentifier == criteria.UserIdentifier);
            }
            if (criteria.LastUpdateDate != null)
            {
                query = query.Where(i => i.LastUpdateDate > criteria.LastUpdateDate);
            }
            return query;
        }

    }

}
