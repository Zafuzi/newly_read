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

        public ActionResult Article(string id)
        {

            ViewBag.UrlMasterID = id;
            ViewBag.Url = "Home/Article";
            return View();
        }
    }
}