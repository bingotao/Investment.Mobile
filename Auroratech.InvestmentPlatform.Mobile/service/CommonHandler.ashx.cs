using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Auroratech.InvestmentPlatform.Mobile
{
    /// <summary>
    /// CommonHandler 的摘要说明
    /// </summary>
    public class CommonHandler : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.QueryString["action"];
            switch (action)
            {
                case "Login":
                    this.Login(context);
                    break;
                case "ModifyPassword":
                    this.ModifyPassword(context);
                    break;
                case "GetCFXQ":
                    this.GetCFXQ(context);
                    break;
                case "GetRooms":
                    this.GetRooms(context);
                    break;
                default: break;
            }
        }

        private void GetRooms(HttpContext context)
        {
            string bsm = context.Request["BSM"];
            ReturnObject ro = new ReturnObject();
            try
            {
                string sql = string.Format(@"select * from ztldfj where p_bsm='{0}' order by LC asc", bsm);
                DataTable dt = DBContext.Instance.ExecuteQuery(sql);
                ro.AddData("rooms", dt);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex.Message);
            }
            string rt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            this.ResponseResult(rt);
        }

        private void GetCFXQ(HttpContext context)
        {
            string bsm = context.Request["BSM"];
            ReturnObject ro = new ReturnObject();
            try
            {
                //使用可能有多个
                string sqlSYQK = string.Format(@"select * from cf_syqk t where sscfdm='{0}'", bsm);
                //闲置只有一个
                string sqlXZQK = string.Format(@"select * from cf_xzqk t where sscfdm='{0}'", bsm);
                //配套设置只有一个
                string sqlPTSS = string.Format(@"select t2.* from cf t1
left join cf_ptss t2 on t1.sscqdm=t2.bsm
where t1.bsm='{0}' ", bsm);

                DataTable dtSYQK = DBContext.Instance.ExecuteQuery(sqlSYQK);
                DataTable dtXZQK = DBContext.Instance.ExecuteQuery(sqlXZQK);
                DataTable dtPTSS = DBContext.Instance.ExecuteQuery(sqlPTSS);

                ro.AddData("SYQK", dtSYQK);
                ro.AddData("XZQK", EntityUtilities.DataTableToDict(dtXZQK));
                ro.AddData("PTSS", EntityUtilities.DataTableToDict(dtPTSS));
            }
            catch (System.Exception ex)
            {
                ro = new ReturnObject(ex.Message);
            }
            string rt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            this.ResponseResult(rt);
        }

        private void ModifyPassword(HttpContext context)
        {
            string sUserName = context.Request["USERNAME"];
            string sPassword = context.Request["PASSWORD"];
            string sPasswordNew = context.Request["PASSWORD_NEW"];
            string sReturn = string.Empty;
            try
            {
                if (Common.ModifyPassword(sUserName, sPassword, sPasswordNew))
                {
                    sReturn = "1";
                    context.Session["USER_ID"] = null;
                }
                else
                {
                    sReturn = "0";
                }
            }
            catch (System.Exception ex)
            {
                sReturn = ex.Message;
            }
            this.ResponseResult(sReturn);
        }

        private void Login(HttpContext context)
        {
            string sUserName = context.Request["USERNAME"];
            string sPassword = context.Request["PASSWORD"];
            string sSuccess = "0";
            if (Common.UserValidate(sUserName, sPassword))
            {
                context.Session["USER_ID"] = "admin";
                sSuccess = "1";
            }
            this.ResponseResult(sSuccess);
        }

        public void ResponseResult(string result)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.Write(result);
            HttpContext.Current.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}