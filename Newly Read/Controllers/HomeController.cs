using System.Web.Mvc;

namespace Newly_Read.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index() {
            return View();
        }

        public ActionResult Category(string id, string category)
        {
            ViewBag.UrlMasterID = id;
            ViewBag.Category = category;
            return View();
        }

        public ActionResult Article(string id)
        {
            ViewBag.UrlMasterID = id;
            return View();
        }

        public ActionResult AppSettings() {
            return View();
        }

        public ActionResult About(string error) {
            ViewBag.Error = error;
            return View();
        }

        public ActionResult Comments() {

            // The plan is to eventually email this to the webmaster
            ViewBag.Email = Request.Form["email"];
            ViewBag.Comment = Request.Form["comment"];
            ViewBag.Consent = Request.Form["consent"];

            return View();
        }
    }
}