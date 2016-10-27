using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;

namespace Auroratech.InvestmentPlatform.Mobile
{
    public class Common
    {
        public static bool UserValidate(string name, string password)
        {
            List<User> users = Common.GetUsers();
            User user = users.Find(u => u.UserName == name && u.Password == password);
            return user != null;
        }

        public static bool ModifyPassword(string sUserName, string sPassword, string sNewPassword)
        {
            string sPath = Common.GetUserTextPath();
            FileStream fs = null;
            StreamWriter sw = null;
            try
            {
                List<User> users = Common.GetUsers();
                User user = users.Find(u => u.UserName == sUserName && u.Password == sPassword);

                if (user == null)
                {
                    throw new Exception("用户名或密码错误！");
                }
                user.Password = sNewPassword;
                StringBuilder sb = new StringBuilder();
                foreach (var u in users)
                {
                    sb.Append(string.Format("{0},{1}\n", u.UserName, u.Password));
                }
                fs = new FileStream(sPath, FileMode.Create);
                sw = new StreamWriter(fs);
                string s = sb.ToString();
                sw.Write(s);
                return true;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (sw != null)
                {
                    sw.Close();
                }
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }

        public static string GetUserTextPath()
        {
            return System.Web.HttpContext.Current.Request.PhysicalApplicationPath + "config\\Users.txt";
        }

        public static List<User> GetUsers()
        {
            FileStream fs = null;
            StreamReader sr = null;
            List<User> users = new List<User>();
            try
            {
                string sPath = Common.GetUserTextPath();
                fs = new FileStream(sPath, FileMode.Open);
                sr = new StreamReader(fs);
                string sUser = string.Empty;
                while (!string.IsNullOrEmpty(sUser = sr.ReadLine()))
                {
                    string[] sArr = sUser.Split(',');
                    if (sArr.Length == 2)
                    {
                        User user = new User();
                        user.UserName = sArr[0];
                        user.Password = sArr[1];
                        users.Add(user);
                    }
                }
            }
            catch (System.Exception ex)
            {
                throw;
            }
            finally
            {
                if (sr != null)
                {
                    sr.Close();
                }
                if (fs != null)
                {
                    fs.Close();
                }
            }
            return users;
        }
    }


    public class User
    {
        public string UserName
        {
            get;
            set;
        }

        public string Password
        {
            get;
            set;
        }
    }
}