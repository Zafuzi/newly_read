using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using static Newly_Read.Models.IdentityModel;
using System.Security.Claims;
using Microsoft.Owin.Security;
using Microsoft.Owin.Host.SystemWeb;
using System.Web.Mvc;

namespace Newly_Read.App_Start {
    public class IdentityConfig {
        public class ApplicationUserStore : UserStore<ApplicationUser> {
            public ApplicationUserStore(ApplicationDbContext context) : base(context) {
            }
            public class ApplicationUserManager : UserManager<ApplicationUser> {
                public ApplicationUserManager(IUserStore<ApplicationUser> store) : base(store) {
                }
            }
        }
    }
}