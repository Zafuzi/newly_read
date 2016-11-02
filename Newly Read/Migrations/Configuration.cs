namespace Newly_Read.Migrations {
    using Models;
    using Newtonsoft.Json.Linq;
    using RestSharp;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Diagnostics;
    using System.Linq;
    using System.Runtime.CompilerServices;

    internal sealed class Configuration : DbMigrationsConfiguration<Newly_Read.Models.MyDbContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
        protected override void Seed(MyDbContext context) {
            bool keep = false;
            if (keep) {
                return;
            } else {
                seedSources(context);
                seedArticles(context);
            }
        }

        /// <summary>
        ///     Returns JSON from RestSharp request for the specified resource from NewsApi
        /// </summary>
        /// <param name="resource"></param>
        /// <returns></returns>
        private JObject newsRequest(string resource) {
            //  This method will be called after migrating to the latest version.
            var client = new RestClient("https://newsapi.org/v1");
            var request = new RestRequest();
            request.Resource = resource;
            request.AddHeader("ContentType", "application/json");

            // execute the request
            // TODO add a fallback method to handle request failure.
            var restResponse = client.Execute(request);
            var content = restResponse.Content;

            return JObject.Parse(content);
        }

        // Seed the articles DB
        private void seedArticles(MyDbContext context) {
            var storedSources = context.Sources.ToList();
            // Add each article for each source to server
            string apiKey = "ccfdc66609fc4b7b87258020b85d4380";
            
            foreach (var source in storedSources) {
                Debug.WriteLine(source.ToString());
                JObject data = newsRequest("articles/?source=" + source.sourceID + "&apikey=" + apiKey);
                try {
                    JToken[] articles = data.GetValue("articles").Children().ToArray();
                    if (articles == null) {
                        return;
                    }
                    foreach (var article in articles) {
                        Articles asdf = new Articles {
                            author = article.Children().ElementAt(0).Last().ToString(),
                            title = article.Children().ElementAt(1).Last().ToString(),
                            description = article.Children().ElementAt(2).Last().ToString(),
                            url = article.Children().ElementAt(3).Last().ToString(),
                            category = source.category,
                            urlToImage = article.Children().ElementAt(4).Last().ToString(),
                            publishedAt = article.Children().ElementAt(5).Last().ToString()
                        };
                        context.Articles.AddOrUpdate(p => p.id, asdf);
                    }
                }
                catch (NullReferenceException) {
                    // TODO find appharbor error solution
                    //System.IO.File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory + @"\Logs\ErrorLogs.txt", " Time: " + DateTime.Now + "\n Exception: " + data.ToString() + " END OF Exception \n\n");
                    throw new Exception(data.ToString());
                }
            }
        }

        // Seed the sources DB
        private void seedSources(MyDbContext context) {
            JObject data = newsRequest("sources/?language=en");
            JToken[] source = data.GetValue("sources").Children().ToArray();

            if (context.Sources == null) {
                return;
            } else {
                foreach (var entity in context.Sources)
                    context.Sources.Remove(entity);
                context.SaveChanges();
                foreach (var entity in context.Articles)
                    context.Articles.Remove(entity);
                context.SaveChanges();

                foreach (var key in source) {
                    if (key == null) {
                        return;
                    } else {
                        // Add each source to the database as a fallback in case the newsapi does not respond
                        context.Sources.AddOrUpdate(p => p.id,
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
                            });
                        context.SaveChanges();
                    }
                }
            }
        }
    }

}
