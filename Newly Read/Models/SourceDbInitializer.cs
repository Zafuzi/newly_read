using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace Newly_Read.Models {
    public class SourceDbInitializer : CreateDatabaseIfNotExists<MyDbContext> {
        protected override void Seed(MyDbContext context) {
            //  This method will be called after migrating to the latest version.
            var client = new RestClient("https://newsapi.org/v1");
            var request = new RestRequest();
            request.Resource = "sources/?language=en";

            // easily add HTTP Headers
            request.AddHeader("ContentType", "application/json");

            // execute the request
            var restResponse = client.Execute(request);
            var content = restResponse.Content;
            JObject data = JObject.Parse(content);
            JToken[] source = data.GetValue("sources").Children().ToArray();

            if (context.Sources != null) {
                foreach (var entity in context.Sources)
                    context.Sources.Remove(entity);
                context.SaveChanges();
            }

            if (source == null) {
                return;
            } else {
                foreach (var key in source) {
                    if (key == null) {
                        return;
                    } else {
                        context.Sources.AddOrUpdate(p => p.sourceID,
                            new Sources {
                                sourceID = key.Children().ElementAt(0).Last().ToString(),
                                name = key.Children().ElementAt(1).Last().ToString(),
                                description = key.Children().ElementAt(2).Last().ToString(),
                                url = key.Children().ElementAt(3).Last().ToString(),
                                category = key.Children().ElementAt(4).Last().ToString(),
                                language = key.Children().ElementAt(5).Last().ToString(),
                                country = key.Children().ElementAt(6).Last().ToString(),
                                urlsToLogos = key.Children().ElementAt(7).ToString(),
                                sortBysAvailable = key.Children().ElementAt(8).ToString()
                            }
                        );
                    }
                }
            }
        }
    }
}