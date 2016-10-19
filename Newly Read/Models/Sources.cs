using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Newly_Read.Models {
    public class Sources {
        public int id { get; set; }
        public string sourceID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string category { get; set; }
        public string language { get; set; }
        public string country { get; set; }
        public string urlsToLogos { get; set; }
        public string sortBysAvailable { get; set; }
    }
}