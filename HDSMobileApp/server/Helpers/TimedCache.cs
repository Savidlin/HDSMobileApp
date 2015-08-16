using System;

namespace HDSMobileApp.Helpers
{
    /// <summary>
    /// <para>
    /// A timed cache that returns a cached value until an internal timer expires. 
    /// After the timer expires, the next access to Value causes the value to be re-fetched.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not thread-safe.
    /// </threadsafety>
    /// <author>HDS WaterWorks</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2015 HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    public class TimedCache<T>
    {
        /// <summary>
        /// The cached value.
        /// </summary>
        private T CachedValue;

        /// <summary>
        /// The timestamp when the value was last refreshed
        /// </summary>
        private DateTime? LastValueRefreshTimestamp = null;

        /// <summary>
        /// The interval (in milliseconds) before refreshing the value
        /// </summary>
        private long ValueRefreshIntervalMs;

        /// <summary>
        /// The source to retrieve refreshed data values from
        /// </summary>
        private Func<T> RefreshSrc;


        public TimedCache(long RefreshIntervalMs, Func<T> DataSrc)
        {
            this.RefreshSrc = DataSrc;
            this.ValueRefreshIntervalMs = RefreshIntervalMs;
        }


        public T GetValue()
        {
            bool Cached;
            return GetValue(out Cached);
        }


        public T GetValue(out bool IsCached) {
            IsCached = true;
            T val = CachedValue;
            var utcNow = DateTime.UtcNow;
            if (val == null || !LastValueRefreshTimestamp.HasValue || utcNow > (LastValueRefreshTimestamp.Value.AddMilliseconds(ValueRefreshIntervalMs)))
            {
                val = RefreshSrc();

                IsCached = false;
                CachedValue = val;
                LastValueRefreshTimestamp = utcNow;
            }
            else
            {
                // use cached value
            }
            return val;
        }


        public TimeSpan GetTimeSpanUntilNextRefresh()
        {
            var NextRefresh = (LastValueRefreshTimestamp.HasValue
                ? (LastValueRefreshTimestamp.Value.AddMilliseconds(ValueRefreshIntervalMs) - DateTime.UtcNow)
                : TimeSpan.FromMilliseconds(ValueRefreshIntervalMs)
            );
            return NextRefresh;
        }

    }
}
