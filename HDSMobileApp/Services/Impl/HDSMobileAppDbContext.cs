/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System.Data.Entity;
using HDSMobileApp.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace HDSMobileApp.Services.Impl
{

    public class DbSetInfo<T> where T : class
    {
        public Type DtoType
        {
            get;
            set;
        }

        public Func<HDSMobileAppDbContext, DbSet<T>> DbSetGetter
        {
            get;
            set;
        }

    }


    public class HDSMobileAppDataStores
    {
        public static DbSetInfo<UserMaster> UserMaster = new DbSetInfo<UserMaster>
        {
            DtoType = typeof(UserMaster),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.UserMasterSet,
        };

        public static DbSetInfo<UserProfile> UserProfile = new DbSetInfo<UserProfile>
        {
            DtoType = typeof(UserProfile),
            DbSetGetter = (HDSMobileAppDbContext ctx) => ctx.UserProfileSet,
        };

    }


    ///<summary>
    /// <para>
    /// This class provides the database context used in this assembly.
    /// </para>
    /// </summary>
    /// <threadsafety>
    /// This class is mutable, so it is not  thread-safe.
    /// </threadsafety>
    /// <author>TCSASSEMBLER</author>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    public class HDSMobileAppDbContext : DbContext
    {
        /// <summary>
        /// <para>
        /// Initializes a new instance of the <see cref="HDSMobileAppDbContext"/> class.
        /// </para>
        /// </summary>
        public HDSMobileAppDbContext()
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }


        public DbSet<T> GetDbSet<T>(DbSetInfo<T> dbSetInfo) where T : class
        {
            return dbSetInfo.DbSetGetter(this);
        }


        /// <value>The user  master set. It can hold any value.</value>
        public DbSet<UserMaster> UserMasterSet
        {
            get;
            set;
        }

        /// <value>The user profile set. It can hold any value.</value>
        public DbSet<UserProfile> UserProfileSet
        {
            get;
            set;
        }

        /// <summary>
        /// Custom Model Creating to not create table when application start.
        /// </summary>
        /// <param Name="modelBuilder">the model builder.</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<HDSMobileAppDbContext>(null);

            modelBuilder.Entity<UserMaster>().ToTable("User_Master");
            modelBuilder.Entity<UserMaster>().HasKey(i => i.UserIdentifier);
            modelBuilder.Entity<UserMaster>().Property(i => i.UserNumber).HasColumnName("User_Number");
            modelBuilder.Entity<UserMaster>().Property(i => i.Name).HasColumnName("Name");
            modelBuilder.Entity<UserMaster>().Property(i => i.UserIdentifier).HasColumnName("User_Identifier");
            modelBuilder.Entity<UserMaster>().Property(i => i.PrimaryBranchNumber).HasColumnName("Primary_Branch_Number");
            modelBuilder.Entity<UserMaster>().Property(i => i.EmailAddress).HasColumnName("Email_Address");
            modelBuilder.Entity<UserMaster>().Property(i => i.Phone).HasColumnName("Phone");
            modelBuilder.Entity<UserMaster>().Property(i => i.Fax).HasColumnName("Fax");
            modelBuilder.Entity<UserMaster>().Property(i => i.Mobile).HasColumnName("Mobile");

            modelBuilder.Entity<UserProfile>().ToTable("User_Profile");
            modelBuilder.Entity<UserProfile>().HasKey(i => i.UserIdentifier);
            modelBuilder.Entity<UserProfile>().Property(i => i.UserNumber).HasColumnName("User_Number");
            modelBuilder.Entity<UserProfile>().Property(i => i.Name).HasColumnName("Name");
            modelBuilder.Entity<UserProfile>().Property(i => i.UserIdentifier).HasColumnName("User_Identifier");
            modelBuilder.Entity<UserProfile>().Property(i => i.PrimaryBranchNumber).HasColumnName("Primary_Branch_Number");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber1).HasColumnName("Pricing_Profile_Number_1");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber2).HasColumnName("Pricing_Profile_Number_2");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber3).HasColumnName("Pricing_Profile_Number_3");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber4).HasColumnName("Pricing_Profile_Number_4");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber5).HasColumnName("Pricing_Profile_Number_5");
            modelBuilder.Entity<UserProfile>().Property(i => i.PricingProfileNumber6).HasColumnName("Pricing_Profile_Number_6");
            modelBuilder.Entity<UserProfile>().Property(i => i.EmailAddress).HasColumnName("Email_Address");
            modelBuilder.Entity<UserProfile>().Property(i => i.Phone).HasColumnName("Phone");
            modelBuilder.Entity<UserProfile>().Property(i => i.Fax).HasColumnName("Fax");
            modelBuilder.Entity<UserProfile>().Property(i => i.Mobile).HasColumnName("Mobile");
            modelBuilder.Entity<UserProfile>().Property(i => i.CurrencyCode).HasColumnName("Currency_Code");
            modelBuilder.Entity<UserProfile>().Property(i => i.LanguageId).HasColumnName("Language_ID");
            modelBuilder.Entity<UserProfile>().Property(i => i.PrintPartNum).HasColumnName("Print_Part_Num");
            modelBuilder.Entity<UserProfile>().Property(i => i.HeaderPrintOption).HasColumnName("Header_Print_Option");
            modelBuilder.Entity<UserProfile>().Property(i => i.SubmittalGroupId).HasColumnName("Submittal_Group_ID");
            modelBuilder.Entity<UserProfile>().Property(i => i.Deleted).HasColumnName("Deleted");
            modelBuilder.Entity<UserProfile>().Property(i => i.LastUpdateDate).HasColumnName("Last_Update_Date");
            modelBuilder.Entity<UserProfile>().Property(i => i.ItemDescriptionPrintOption).HasColumnName("Item_Description_Print_Option");

            base.OnModelCreating(modelBuilder);
        }

    }

}
