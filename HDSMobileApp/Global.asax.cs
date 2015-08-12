/* Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved. */

using System;
using System.Web.Routing;

namespace HDSMobileApp
{
    /// <summary>
    /// This class is the Global http application.
    /// </summary>
    /// <threadsafety>
    /// This class is immuable and Thread Safe.
    /// </threadsafety>
    /// <version>1.0</version>
    /// <copyright>Copyright (c) 2014, HDS IP Holdings, LLC. All Rights Reserved.</copyright>
    public class Global : System.Web.HttpApplication
    {
        /// <summary>
        /// The application start method, registers log4net
        /// </summary>
        protected void Application_Start(object sender, EventArgs e)
        {
            log4net.Config.XmlConfigurator.Configure();
            RegisterRoutes(RouteTable.Routes);
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("app", "app-pages/{action}/", "~/index.html");
        }

    }

}
