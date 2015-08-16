using System.Data.Entity;
using System;
using HDSMobileApp.Entities;
using System.Data.SQLite;
using System.Configuration;
using System.Data.Entity.Core.Common;
using System.Data.SQLite.EF6;

namespace HDSMobileApp.Services.Impl
{

    public class DbSetInfo<T> where T : class
    {
        public Type DtoType { get; set; }

        public Func<HDSMobileAppDbContext, DbSet<T>> DbSetGetter { get; set; }

    }


    public class HDSMobileAppDataStores
    {
        public static DbSetInfo<Employee> Employee = new DbSetInfo<Employee>
        {
            DtoType = typeof(Employee),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.EmployeeSet,
        };

    }


    public class SQLiteConfiguration : DbConfiguration {
        public SQLiteConfiguration() {
            SetProviderFactory("System.Data.SQLite", SQLiteFactory.Instance);
            SetProviderFactory("System.Data.SQLite.EF6", SQLiteProviderFactory.Instance);
            SetProviderServices("System.Data.SQLite", (DbProviderServices)SQLiteProviderFactory.Instance.GetService(typeof(DbProviderServices)));
        }
    }


    /** This class provides the database context used in this assembly.
     * @threadsafety This class is mutable, so it is not thread-safe
     * @version 1.0
     * @copyright Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved
     */
    public class HDSMobileAppDbContext : DbContext
    {

        private static readonly string SqliteConnectionString = ConfigurationManager.AppSettings["SqliteConnectionString"];

        /// <summary>
        /// Initializes a new instance of the <see cref="HDSMobileAppDbContext"/> class.
        /// </summary>
        public HDSMobileAppDbContext(): base(new SQLiteConnection(SqliteConnectionString), true)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }


        public DbSet<T> GetDbSet<T>(DbSetInfo<T> dbSetInfo) where T : class
        {
            return dbSetInfo.DbSetGetter(this);
        }

        /// <value>The employee set. It can hold any value.</value>
        public DbSet<Employee> EmployeeSet { get; set; }

        /// <summary>
        /// Custom Model Creating to not create table when application start.
        /// </summary>
        /// <param Name="modelBuilder">the model builder.</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<HDSMobileAppDbContext>(null);

            modelBuilder.Entity<Employee>().ToTable("employee");
            modelBuilder.Entity<Employee>().HasKey(i => i.businessEntityId);
            modelBuilder.Entity<Employee>().Property(i => i.birthDate).HasColumnName("birthdate");
            modelBuilder.Entity<Employee>().Property(i => i.currentFlag).HasColumnName("currentflag");
            modelBuilder.Entity<Employee>().Property(i => i.gender).HasColumnName("gender");
            modelBuilder.Entity<Employee>().Property(i => i.hireDate).HasColumnName("hiredate");
            modelBuilder.Entity<Employee>().Property(i => i.jobTitle).HasColumnName("jobtitle");
            modelBuilder.Entity<Employee>().Property(i => i.loginId).HasColumnName("loginid");
            modelBuilder.Entity<Employee>().Property(i => i.maritalStatus).HasColumnName("maritalstatus");
            modelBuilder.Entity<Employee>().Property(i => i.nationalIdNumber).HasColumnName("nationalidnumber");
            modelBuilder.Entity<Employee>().Property(i => i.salariedFlag).HasColumnName("salariedflag");
            modelBuilder.Entity<Employee>().Property(i => i.sickLeaveHours).HasColumnName("sickleavehours");
            modelBuilder.Entity<Employee>().Property(i => i.vacationHours).HasColumnName("vacationhours");

            base.OnModelCreating(modelBuilder);
        }

    }

}
