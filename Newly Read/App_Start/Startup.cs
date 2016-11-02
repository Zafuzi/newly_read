using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using System.Web.Helpers;
using System.Security.Claims;
using Newly_Read.Controllers;
using System.Data.Entity;
using Stormpath.SDK;
using Stormpath.SDK.Account;
using Stormpath.SDK.Client;
using Stormpath.SDK.Error;
using System.Diagnostics;
using Microsoft.ApplicationInsights.Extensibility;
using Stormpath.AspNet;
using Stormpath.Configuration.Abstractions;
using System.Collections.Generic;

[assembly: OwinStartup(typeof(Newly_Read.App_Start.Startup))]
namespace Newly_Read.App_Start {
    public partial class Startup {

        public void Configuration(IAppBuilder app) {
            DisableApplicationInsightsOnDebug();
            ConfigureAuth(app);
        }

        /// <summary>
        /// Disables the application insights locally.
        /// </summary>
        [Conditional("DEBUG")]
        private static void DisableApplicationInsightsOnDebug() {
            TelemetryConfiguration.Active.DisableTelemetry = true;
        }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app) {
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/login")
            });

            app.UseStormpath(new StormpathConfiguration() {
                Application = new ApplicationConfiguration() {
                    Href = "https://api.stormpath.com/v1/applications/62B2kYdwnBf3mNunfBxMTG"
                },
                Client = new ClientConfiguration() {
                    ApiKey = new ClientApiKeyConfiguration() {
                        Id = "4RSZV4PM99VG4YNT4MW5OUNMS",
                        Secret = "wRb1UOvPqqKJO+yvEMsPedUVJGmMgwHt5p/hGFQXz9g"
                    }
                },
                Web = new WebConfiguration() {
                    Register = new WebRegisterRouteConfiguration() {
                        Enabled = true
                    },
                    Login = new WebLoginRouteConfiguration() {
                        Enabled = true
                    }
                }
            });
        }
    }
}
