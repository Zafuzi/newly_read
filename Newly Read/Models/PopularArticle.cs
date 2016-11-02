using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Newly_Read.Models {
    public class PopularArticle {
        public long id { get; set; }
        public string author { get; set; }
        public string description { get; set; }
        public string publishedAt { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public string urlToImage { get; set; }
        public string category { get; set; }
        public int popularity { get; set; }
    }
}