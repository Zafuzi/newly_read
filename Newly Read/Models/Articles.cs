using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Newly_Read.Models {
    public class Articles {
        public long id { get; set; }
        public string author { get; set; }
        public string description { get; set; }
        public string publishedAt { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public string urlToImage { get; set; }
        public string category { get; set; }
    }
}