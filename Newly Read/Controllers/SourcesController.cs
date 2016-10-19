using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newly_Read.Models;

namespace Newly_Read.Controllers
{
    public class SourcesController : Controller
    {
        private MyDbContext db = new MyDbContext();

        // GET: Sources
        public ActionResult Index()
        {
            return View(db.Sources.ToList());
        }

        // GET: Sources/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sources sources = db.Sources.Find(id);
            if (sources == null)
            {
                return HttpNotFound();
            }
            return View(sources);
        }

        // GET: Sources/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Sources/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,sourceID,name,description,url,category,language,country,urlsToLogos,sortsBysAvailable")] Sources sources)
        {
            if (ModelState.IsValid)
            {
                db.Sources.Add(sources);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(sources);
        }

        // GET: Sources/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sources sources = db.Sources.Find(id);
            if (sources == null)
            {
                return HttpNotFound();
            }
            return View(sources);
        }

        // POST: Sources/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,name,sourceID,description,url,category,language,country,urlsToLogos,sortsBysAvailable")] Sources sources)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sources).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sources);
        }

        // GET: Sources/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sources sources = db.Sources.Find(id);
            if (sources == null)
            {
                return HttpNotFound();
            }
            return View(sources);
        }

        // POST: Sources/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Sources sources = db.Sources.Find(id);
            db.Sources.Remove(sources);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
