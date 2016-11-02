using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Newly_Read.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login() {
            return View();
        }
        // GET: Account
        public ActionResult Manage()
        {
            return View();
        }
    }
}