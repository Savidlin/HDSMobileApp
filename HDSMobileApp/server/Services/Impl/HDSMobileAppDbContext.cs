using System.Data.Entity;
using System;
using HDSMobileApp.Entities;
using System.Data.SQLite;
using System.Configuration;
using System.Data.Entity.Core.Common;
using System.Data.SQLite.EF6;
using log4net;
using System.IO;

namespace HDSMobileApp.Services.Impl
{

    public class DbSetInfo<T> where T : class
    {
        public Type DtoType { get; set; }

        public Func<HDSMobileAppDbContext, DbSet<T>> DbSetGetter { get; set; }

    }


    public class HDSMobileAppDataStores {

        public static DbSetInfo<Customer> Customer = new DbSetInfo<Customer> {
            DtoType = typeof(Customer),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.CustomerSet,
        };

        public static DbSetInfo<Employee> Employee = new DbSetInfo<Employee> {
            DtoType = typeof(Employee),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.EmployeeSet,
        };

        public static DbSetInfo<EmployeePayHistory> EmployeePayHistory = new DbSetInfo<EmployeePayHistory> {
            DtoType = typeof(EmployeePayHistory),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.EmployeePayHistorySet,
        };

        public static DbSetInfo<Person> Person = new DbSetInfo<Person> {
            DtoType = typeof(Person),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.PersonSet,
        };

        public static DbSetInfo<Product> Product = new DbSetInfo<Product> {
            DtoType = typeof(Product),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.ProductSet,
        };

        public static DbSetInfo<SalesOrderDetail> SalesOrderDetail = new DbSetInfo<SalesOrderDetail> {
            DtoType = typeof(SalesOrderDetail),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.SalesOrderDetailSet,
        };

        public static DbSetInfo<SalesOrderHeader> SalesOrderHeader = new DbSetInfo<SalesOrderHeader> {
            DtoType = typeof(SalesOrderHeader),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.SalesOrderHeaderSet,
        };

        public static DbSetInfo<SalesPerson> SalesPerson = new DbSetInfo<SalesPerson> {
            DtoType = typeof(SalesPerson),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.SalesPersonSet,
        };

        public static DbSetInfo<SalesTerritory> SalesTerritory = new DbSetInfo<SalesTerritory> {
            DtoType = typeof(SalesTerritory),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.SalesTerritorySet,
        };

        public static DbSetInfo<Store> Store = new DbSetInfo<Store> {
            DtoType = typeof(Store),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.StoreSet,
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
        private static readonly ILog Logger = LogManager.GetLogger(typeof(HDSMobileAppDbContext).Name);

        private static readonly string SqliteConnectionString = ConfigurationManager.AppSettings["SqliteDatabaseFilePathRelative"];

        private static readonly string ConnectionString = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, SqliteConnectionString);


        /// <summary>
        /// Initializes a new instance of the <see cref="HDSMobileAppDbContext"/> class.
        /// </summary>
        public HDSMobileAppDbContext(): base(new SQLiteConnection("Data Source=" + ConnectionString), true)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            Logger.Debug("Initializing database: ");
        }


        public DbSet<T> GetDbSet<T>(DbSetInfo<T> dbSetInfo) where T : class
        {
            return dbSetInfo.DbSetGetter(this);
        }


        public DbSet<Employee> EmployeeSet { get; set; }

        public DbSet<Customer> CustomerSet { get; set; }

        public DbSet<EmployeePayHistory> EmployeePayHistorySet { get; set; }

        public DbSet<Person> PersonSet { get; set; }

        public DbSet<Product> ProductSet { get; set; }

        public DbSet<SalesOrderDetail> SalesOrderDetailSet { get; set; }

        public DbSet<SalesOrderHeader> SalesOrderHeaderSet { get; set; }

        public DbSet<SalesPerson> SalesPersonSet { get; set; }

        public DbSet<SalesTerritory> SalesTerritorySet { get; set; }

        public DbSet<Store> StoreSet { get; set; }


        /// <summary>
        /// Custom Model Creating to not create table when application start.
        /// </summary>
        /// <param Name="modelBuilder">the model builder.</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<HDSMobileAppDbContext>(null);

            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Employee>().HasKey(i => i.businessEntityId);
            /*
            modelBuilder.Entity<Employee>().HasKey(i => i.businessEntityId);
            modelBuilder.Entity<Employee>().Property(i => i.nationalIdNumber);
            modelBuilder.Entity<Employee>().Property(i => i.loginId);
            modelBuilder.Entity<Employee>().Property(i => i.organizationLevel);
            modelBuilder.Entity<Employee>().Property(i => i.jobTitle);
            modelBuilder.Entity<Employee>().Property(i => i.birthDate);
            modelBuilder.Entity<Employee>().Property(i => i.maritalStatus);
            modelBuilder.Entity<Employee>().Property(i => i.gender);
            modelBuilder.Entity<Employee>().Property(i => i.hireDate);
            modelBuilder.Entity<Employee>().Property(i => i.salariedFlag);
            modelBuilder.Entity<Employee>().Property(i => i.vacationHours);
            modelBuilder.Entity<Employee>().Property(i => i.sickLeaveHours);
            modelBuilder.Entity<Employee>().Property(i => i.currentFlag);
            modelBuilder.Entity<Employee>().Property(i => i.personType);
            modelBuilder.Entity<Employee>().Property(i => i.nameStyle);
            modelBuilder.Entity<Employee>().Property(i => i.title);
            modelBuilder.Entity<Employee>().Property(i => i.firstName);
            modelBuilder.Entity<Employee>().Property(i => i.middleName);
            modelBuilder.Entity<Employee>().Property(i => i.lastName);
            modelBuilder.Entity<Employee>().Property(i => i.suffix);
            modelBuilder.Entity<Employee>().Property(i => i.emailPromotion);
            */

            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Customer>().HasKey(i => i.customerId);
            /*
            modelBuilder.Entity<Customer>().HasKey(i => i.customerId);
            modelBuilder.Entity<Customer>().Property(i => i.personId);
            modelBuilder.Entity<Customer>().Property(i => i.storeId);
            modelBuilder.Entity<Customer>().Property(i => i.territoryId);
            modelBuilder.Entity<Customer>().Property(i => i.accountNumber);
            */

            modelBuilder.Entity<EmployeePayHistory>().ToTable("EmployeePayHistory");
            modelBuilder.Entity<EmployeePayHistory>().HasKey(i => i.businessEntityId);

            modelBuilder.Entity<Person>().ToTable("Person");
            modelBuilder.Entity<Person>().HasKey(i => i.businessEntityId);

            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Product>().HasKey(i => i.productId);

            modelBuilder.Entity<SalesOrderDetail>().ToTable("SalesOrderDetail");
            modelBuilder.Entity<SalesOrderDetail>().HasKey(i => i.salesOrderDetailId);

            modelBuilder.Entity<SalesOrderHeader>().ToTable("SalesOrderHeader");
            modelBuilder.Entity<SalesOrderHeader>().HasKey(i => i.salesOrderId);

            modelBuilder.Entity<SalesPerson>().ToTable("SalesPerson");
            modelBuilder.Entity<SalesPerson>().HasKey(i => i.businessEntityId);

            modelBuilder.Entity<SalesTerritory>().ToTable("SalesTerritory");
            modelBuilder.Entity<SalesTerritory>().HasKey(i => i.territoryId);

            modelBuilder.Entity<Store>().ToTable("Store");
            modelBuilder.Entity<Store>().HasKey(i => i.businessEntityId);

            base.OnModelCreating(modelBuilder);
        }


        /*
        string connString = "Data Source=C:/Users/TeamworkGuy2/Documents/Visual Studio 2015/Projects/HDSTeamBuilding/Lib/adventure_works.sqlite";
        using (SQLiteConnection conn = new SQLiteConnection(connString)) {
            StringBuilder query = new StringBuilder();
            query.Append("SELECT * FROM employee ORDER BY businessentityid");
            using (SQLiteCommand cmd = new SQLiteCommand(query.ToString(), conn)) {
                conn.Open();
                using (SQLiteDataReader dr = cmd.ExecuteReader()) {
                    Logger.Debug("reading database: ");
                    while (dr.Read()) {
                        Logger.Debug(dr.GetValue(0) + " " + dr.GetValue(1) + " " + dr.GetValue(2));
                    }
                }
            }
        }*/

    }

}
