using System.Web.Mvc;

namespace Newly_Read.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category(string id)
        {
            ViewBag.UrlMasterID = id;
            return View();
        }

        public ActionResult Article(string id)
        {
            ViewBag.UrlMasterID = id;
            return View();
        }
    }
}