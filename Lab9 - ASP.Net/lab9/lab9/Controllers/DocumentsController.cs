using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using lab9.Models;
using lab9.DataAbstractionLayer;

namespace lab9.Controllers
{
    public class DocumentsController : ApiController
    {
        // GET: Documents/getAll
        public List<Document> getAll()
        {
            DAL dal = new DAL();
            List<Document> list = dal.getAllDocuments();
            return list;
        }


        // DELETE: Documents/delete
        public bool delete(int id)
        {
            System.Diagnostics.Debug.WriteLine(id);
            DAL dal = new DAL();
            return dal.deleteDocument(id);
        }

        // PUT: Documents/putDoc
        public bool putDoc([FromBody]Document updatedDoc)
        {
            System.Diagnostics.Debug.WriteLine(updatedDoc.id);
            DAL dal = new DAL();
            return dal.updateDocument(updatedDoc);
        }

        // POST: Documents/addDoc
        public bool addDoc([FromBody]Document newDoc)
        {
            System.Diagnostics.Debug.WriteLine(newDoc.id);
            DAL dal = new DAL();
            return dal.addDocument(newDoc);
        }

        // GET: Documents/getFormats
        public List<string> getFormats()
        {
            DAL dal = new DAL();
            return dal.getFormats();
        }

        // GET: Documents/getAllForFormat?format=
        public List<Document> getAllForFormat(string format)
        {
            DAL dal = new DAL();
            return dal.getDocsWithFormat(format);   
        }

        // GET: Documents/getTypes
        public List<string> getTypes()
        {
            DAL dal = new DAL();
            return dal.getTypes();
        }

        // GET: Documents/getAllForType?type=
        public List<Document> getAllForType(string type)
        {
            DAL dal = new DAL();
            return dal.getDocsWithType(type);
        }



    }
}