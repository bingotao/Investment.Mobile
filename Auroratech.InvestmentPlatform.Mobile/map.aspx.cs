﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auroratech.InvestmentPlatform.Mobile
{
    public partial class map : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (this.Session["USER_ID"] == null)
            {
                this.Response.Redirect("login.aspx");
            }
        }
    }
}