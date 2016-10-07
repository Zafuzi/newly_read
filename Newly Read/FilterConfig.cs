using System;
using System.Web.Mvc;

namespace Newly_Read{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new ErrorHandler.AiHandleErrorAttribute());
        }

        internal static void Configure(GlobalFilterCollection filters)
        {
            throw new NotImplementedException();
        }
    }
}