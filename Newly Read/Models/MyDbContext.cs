using Newly_Read.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Newly_Read.Models {
    public class MyDbContext : DbContext {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public MyDbContext() : base("DefaultConnection") {

        }

        public System.Data.Entity.DbSet<Newly_Read.Models.Sources> Sources { get; set; }
        public System.Data.Entity.DbSet<Newly_Read.Models.Articles> Articles { get; set; }
        public System.Data.Entity.DbSet<Newly_Read.Models.PopularArticle> PopularArticle { get; set; }
    }
}
