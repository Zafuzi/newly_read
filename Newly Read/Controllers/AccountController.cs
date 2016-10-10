using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using static Newly_Read.Models.IdentityModel;
using static Newly_Read.App_Start.IdentityConfig;
using static Newly_Read.App_Start.IdentityConfig.ApplicationUserStore;
using Newly_Read.App_Start;
using System.Security.Claims;
using Microsoft.Owin.Security;
using System.Web.Routing;
using Newly_Read;

namespace Newly_Read.Controllers {
    public class AccountController : Controller {

        public ActionResult Index() {
            return View("Login");
        }
        public ActionResult Login() {
            return View("Login");
        }

        public ActionResult Register() {

            string name = "Zach";
            string userid = "asdf1234";
            IdentitySignin(name, userid);
            return View("Register");
        }

        // Identity Sign In/Out
        public void IdentitySignin(string userId, string name, string providerKey = null, bool isPersistent = false) {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, userId));
            claims.Add(new Claim(ClaimTypes.Name, name));

            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() {
                AllowRefresh = true,
                IsPersistent = isPersistent,
                ExpiresUtc = DateTime.UtcNow.AddDays(7)
            }, identity);
        }

        public ActionResult IdentitySignout() {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie,
                                          DefaultAuthenticationTypes.ExternalCookie);

            return View("Login");
        }

        private IAuthenticationManager AuthenticationManager {
            get {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
    }
}