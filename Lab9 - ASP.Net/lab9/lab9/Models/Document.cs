using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lab9.Models
{
    public class Document
    {
        public int id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public int numberPages { get; set; }
        public string type { get; set; }
        public string format { get; set; }
    }
}