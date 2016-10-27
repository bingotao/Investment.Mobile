using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Net;

namespace Auroratech.InvestmentPlatform.Mobile
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //bool bSuccess = false;
            //string secret = Request.QueryString["x"];
            //string uap_token = Request.QueryString["uap_token"];
            //string uap_username = Request.QueryString["uap_username"];

            //try
            //{
            //    if (secret == "x")
            //    {
            //        bSuccess = true;
            //        uap_username = "zdww";
            //    }
            //    else if (string.IsNullOrEmpty(uap_token) || string.IsNullOrEmpty(uap_username))
            //    {
            //        bSuccess = false;
            //    }
            //    else
            //    {
            //        WebClient wc = new WebClient();
            //        JObject pObj = new JObject();
            //        pObj.Add("token", uap_token);
            //        pObj.Add("username", uap_username);
            //        string sData = pObj.ToString();
            //        wc.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            //        wc.Headers.Add("ContentLength", sData.Length.ToString());

            //        byte[] pData = Encoding.UTF8.GetBytes(sData);
            //        string pUrl = ConfigurationManager.AppSettings["validate"];
            //        byte[] rData = wc.UploadData(string.Format("{0}?token={1}&username={2}", pUrl, uap_token, uap_username), "POST", pData);
            //        string sReturn = Encoding.UTF8.GetString(rData);
            //        JObject rObj = JObject.Parse(sReturn);
            //        bSuccess = rObj.Value<int>("code") == 0 ? true : false;
            //    }
            //}
            //catch
            //{
            //    bSuccess = false;
            //}
            //finally
            //{
            //    if (bSuccess)
            //    {
            //        this.Session["USER_ID"] = uap_username;
            //        this.Response.Redirect("map.aspx");
            //    }
            //}

#if DEBUG
            this.Session["USER_ID"] = "admin";
            this.Response.Redirect("map.aspx");
#endif
        }
    }
}