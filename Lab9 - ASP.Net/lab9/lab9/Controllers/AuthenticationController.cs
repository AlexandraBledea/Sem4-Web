using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Web.Http;
using lab9.DataAbstractionLayer;

namespace lab9.Controllers
{
    public class AuthenticationController : ApiController
    {
        // POST: /Authentication/Login
        public bool Login([FromBody] dynamic value)
        {
            /*            string username = Request.Params["username"];
                        string password = Request.Params["password"];*/
            string username = value.username.Value;
            string password = value.password.Value;
            DAL dal = new DAL();
            Console.Write(username);
            Console.Write(password);
            return dal.login(username, password);
        }
    }
}