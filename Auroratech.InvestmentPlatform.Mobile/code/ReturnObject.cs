using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Auroratech.InvestmentPlatform.Mobile
{
    public class ReturnObject
    {
        public string ErrorMessage = string.Empty;
        public Dictionary<string, object> Data = new Dictionary<string, object>();

        public ReturnObject()
        {

        }

        public ReturnObject(string ErrorMessage)
        {
            this.ErrorMessage = ErrorMessage;
        }

        public void AddData(string key, object value)
        {
            this.Data.Add(key, value);
        }
    }
}