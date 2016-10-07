using Newly_Read.Infrastructure;
using System;
using System.Diagnostics;
using System.Web.Mvc;
using System.Web.Routing;

namespace Newly_Read.App_Start
{
    public class FilterConfig
    {
        public static void Configure(System.Web.Mvc.GlobalFilterCollection filters)
        {
            filters.Add(new Infrastructure.HandleErrorAttribute());
        }
    }
}
