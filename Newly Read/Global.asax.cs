using Microsoft.Owin;
using Newly_Read.App_Start;
using Newly_Read.Migrations;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Web.Mvc;
using System.Web.Routing;

namespace Newly_Read {
    public class Global : System.Web.HttpApplication {

        protected void Application_Start(object sender, EventArgs e) {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<Models.MyDbContext, Migrations.Configuration>());

            var migrator = new DbMigrator(new Migrations.Configuration());
                Debug.WriteLine(migrator.ToString());
            migrator.Update();

            App_Start.WebApiConfig.Configure(RouteTable.Routes);
            App_Start.FilterConfig.Configure(GlobalFilters.Filters);
            App_Start.RouteConfig.Configure(RouteTable.Routes);
        }
        protected void Session_Start(object sender, EventArgs e) {

        }

        protected void Application_BeginRequest(object sender, EventArgs e) {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e) {

        }

        protected void Application_Error(object sender, EventArgs e) {
            Exception ex = Server.GetLastError();
            if (ex != null) {
                Trace.TraceError(ex.ToString());
            }
        }

        protected void Session_End(object sender, EventArgs e) {

        }

        protected void Application_End(object sender, EventArgs e) {

        }
    }
}