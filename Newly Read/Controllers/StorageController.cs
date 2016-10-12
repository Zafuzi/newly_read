using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Newly_Read.Controllers
{
    public class StorageController : Controller
    {
        Newly_Read.Models.ArticleEntity storeDB = new Newly_Read.Models.ArticleEntity();
        // GET: Storage
        public ActionResult Index()
        {
            var articles = storeDB.Articles.ToString();
            return View(articles);
        }
    }
}
