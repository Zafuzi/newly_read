using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using static Newly_Read.Models.IdentityModel;
using static Newly_Read.App_Start.IdentityConfig;
using static Newly_Read.App_Start.IdentityConfig.ApplicationUserStore;

namespace Newly_Read.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        public string AddUser()
        {
            ApplicationUser user;
            ApplicationUserStore Store = new ApplicationUserStore(new ApplicationDbContext());
            ApplicationUserManager userManager = new ApplicationUserManager(Store);
            user = new ApplicationUser
            {
                UserName = "TestUser",
                Email = "TestUser@test.com"
            };

            var result = userManager.Create(user);
            if (!result.Succeeded)
            {
                return result.Errors.First();
            }
            return "User Added";
        }
    }
}