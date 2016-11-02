using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newly_Read.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Newly_Read.Controllers {
    public class SourcesController : Controller {
        private MyDbContext db = new MyDbContext();

        // GET: Sources
        public ActionResult Index() {
            if (db.Sources.Count() > 0) {
                return View(db.Sources.ToList());
            } else {
                return View();
            }
        }

        public string GetArticles(string category) {
            string result = JsonConvert.SerializeObject("[{message: There was an error obtaining the source material}]");
            if (db.Articles != null) {
                result = JsonConvert.SerializeObject(db.Articles.Where(i => i.category == category));
            }
            return result;
        }

        public string GetSources() {
            string result = JsonConvert.SerializeObject("[{message: There was an error obtaining the source material}]");
            if (db.Sources != null) {
                result = JsonConvert.SerializeObject(db.Sources);
            }
            return result;
        }

        public string GetPopular() {
            string result = JsonConvert.SerializeObject("[{message: There was an error obtaining the source material}]");
            if (db.PopularArticle != null) {
                result = JsonConvert.SerializeObject(db.PopularArticle.OrderByDescending(i => i.popularity));
            }
            return result;
        }

        public string AddToPopular(string url) {
            string result = JsonConvert.SerializeObject("[{message: There was an error obtaining the source material}]");
            if (url != null && db.Articles != null) {
                Articles art = db.Articles.Where(i => i.url == url).ToList()[0];
                PopularArticle pa = new PopularArticle {
                    author = art.author,
                    description = art.description,
                    publishedAt = art.publishedAt,
                    title = art.title,
                    url = art.url,
                    urlToImage = art.urlToImage,
                    category = art.category,
                    popularity = 1
                };
                if(db.PopularArticle.Where(i => i.url == url).ToArray().Length > 0) {
                    db.PopularArticle.Where(i => i.url == url).ToList()[0].popularity++;
                } else {
                    db.PopularArticle.Add(pa);
                }
                db.SaveChanges();
                result = JsonConvert.SerializeObject(pa);
            }
            return result;
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
