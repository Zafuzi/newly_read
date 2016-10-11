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
using Microsoft.AspNet.Identity.EntityFramework;

namespace Newly_Read.Controllers {
    public class AccountController : Controller {

        public ActionResult Index() {
            return View("Login");
        }
        public ActionResult Login(string error) {
            ViewBag.Error = error;
            return View("Login");
        }

        public ActionResult Register(string error) {
            ViewBag.Error = error;
            return View("Register");
        }

        public void CreateUser() {
            // Initialize general page variables
            var userName = "";
            var email = "";
            var password = "";
            var confirmPassword = "";
            userName = Request.Form["userName"];
            email = Request.Form["email"];
            password = Request.Form["password"];
            confirmPassword = Request.Form["confirmPassword"];

            var userStore = new UserStore<IdentityUser>();
            var manager = new UserManager<IdentityUser>(userStore);

            var user = new IdentityUser() {
                UserName = userName,
                Email = email
            };

            try {
                var result = manager.Create(user, password);

                if (result.Succeeded) {
                    LoginUser();
                } else {
                    foreach (var error in result.Errors) {
                        Response.Redirect("~/Account/Register/?error=" + error);
                    }
                }
            }
            catch (Exception e) {
                string error = e.Message;
                string innerError = e.InnerException.Message;
                Response.Redirect("~/Account/Register/?error=Exception occured: " + error + " Inner Exception: " + innerError);
            }
        }
        public void LoginUser() {
            // Initialize general page variables
            var userName = "";
            var password = "";

            userName = Request.Form["userName"];
            password = Request.Form["password"];

            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            try {
                var user = userManager.Find(userName, password);
                if (user != null) {
                    var authManager = HttpContext.GetOwinContext().Authentication;
                    var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
                    authManager.SignIn(new AuthenticationProperties() { }, userIdentity);

                    Response.Redirect("~/Home");
                }
            }
            catch (Exception e) {
                Response.Redirect("~/Account/Login/?error=" + e.Message);
            }
        }

        public ActionResult IdentitySignout() {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie,
                                          DefaultAuthenticationTypes.ExternalCookie);

            return Redirect("~/Home");
        }

        private IAuthenticationManager AuthenticationManager {
            get {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
    }
}