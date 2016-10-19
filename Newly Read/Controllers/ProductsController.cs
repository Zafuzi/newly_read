using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newly_Read.Models;
using RestSharp;

namespace Newly_Read.Controllers {
    public class ProductsController : ApiController {

        Sources[] sources = new Sources[66];
        

        public IEnumerable<Sources> GetAllProducts() {
            var client = new RestClient("https://newsapi.org/v1");
            var request = new RestRequest();
            request.Resource = "sources/?language=en";

            // easily add HTTP Headers
            //request.AddHeader("header", "value");

            // execute the request
            IRestResponse restResponse = client.Execute(request);
            var content = restResponse.Content; // raw content as string
            if(sources != null) {
                return sources;
            }else {
                return null;
            }   
        }

        public IHttpActionResult GetProduct(int id) {
            var source = sources[id];
            if(sources != null) {
                return Ok(source);
            }else {
                return NotFound();
            }
        }
    }
}
