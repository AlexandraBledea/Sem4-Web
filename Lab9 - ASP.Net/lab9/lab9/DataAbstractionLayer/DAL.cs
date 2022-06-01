using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using lab9.Models;
namespace lab9.DataAbstractionLayer
{
    public class DAL
    {
        public MySqlConnection getConnection()
        {
            string myConnectionString;
            myConnectionString = "Server=localhost;Database=documents_database;Uid=root;Pwd=;";
            return new MySqlConnection(myConnectionString);

        }

        public bool login(string username, string password)
        {

            List<String> users = new List<String>();

            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * from user where username =  @Username AND password = @password";

                cmd.Parameters.AddWithValue("@Username", username);
                cmd.Parameters.AddWithValue("@Password", password);
                Console.Write(username);
                Console.Write(password);
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    users.Add(myreader.GetString("username"));
                }

                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
                return false;
            }

            return users.Count == 1;
        }

        public List<Document> getAllDocuments()
        {
            List<Document> res = new List<Document>();

            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "SELECT * FROM document";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Document doc = new Document();
                    doc.id = myreader.GetInt32("id");
                    doc.title = myreader.GetString("title");
                    doc.author = myreader.GetString("author");
                    doc.numberPages = myreader.GetInt32("numberPages");
                    doc.type = myreader.GetString("type");
                    doc.format = myreader.GetString("format");
                    res.Add(doc);
                }
                myreader.Close();

                conn.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return res;
        }

        public bool deleteDocument(int id)
        {

            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "DELETE FROM document WHERE id = " + id;
                int cnt = cmd.ExecuteNonQuery();
                conn.Close();
                return cnt == 1;
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return false;
        }

        public bool updateDocument(Document doc)
        {
            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "UPDATE document SET title='" + doc.title +
                                                       "',author='" + doc.author +
                                                       "',numberPages='" + doc.numberPages +
                                                       "',type='" + doc.type +
                                                       "',format='" + doc.format +
                                                       "' WHERE id='" + doc.id + "';";

                int cnt = cmd.ExecuteNonQuery();
                conn.Close();
                return cnt == 1;
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return false;
        }

        public bool addDocument(Document doc)
        {
            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "INSERT INTO document(title, author, numberPages, type, format) VALUES ('" +
                    doc.title + "', '" + doc.author + "', '" + doc.numberPages + "', '" + doc.type + "', '" + doc.format + "');";

                int cnt = cmd.ExecuteNonQuery();
                conn.Close();

                return cnt == 1;

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return false;
        }


        public List<string> getFormats()
        {
            List<string> formats = new List<string>();

            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "SELECT DISTINCT format from document";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    formats.Add(myreader.GetString("format"));
                    System.Diagnostics.Debug.WriteLine(myreader.GetString("format"));
                }

                myreader.Close();
                conn.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return formats;
        }


        public List<string> getTypes()
        {
            List<string> types = new List<string>();

            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "SELECT DISTINCT type from document";

                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    types.Add(myreader.GetString("type"));
                    System.Diagnostics.Debug.WriteLine(myreader.GetString("type"));
                }

                myreader.Close();
                conn.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return types;
        }


        public List<Document> getDocsWithFormat(string format)
        {
            List<Document> docList = new List<Document>();
            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "SELECT * FROM document WHERE format='" + format + "';";


                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Document doc = new Document();
                    doc.id = myreader.GetInt32("id");
                    doc.title = myreader.GetString("title");
                    doc.author = myreader.GetString("author");
                    doc.numberPages = myreader.GetInt32("numberPages");
                    doc.type = myreader.GetString("type");
                    doc.format = myreader.GetString("format");
                    docList.Add(doc);
                }

                myreader.Close();
                conn.Close();

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return docList;
        }


        public List<Document> getDocsWithType(string type)
        {
            List<Document> docList = new List<Document>();
            try
            {
                MySqlConnection conn = getConnection();
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;

                cmd.CommandText = "SELECT * FROM document WHERE type='" + type + "';";


                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Document doc = new Document();
                    doc.id = myreader.GetInt32("id");
                    doc.title = myreader.GetString("title");
                    doc.author = myreader.GetString("author");
                    doc.numberPages = myreader.GetInt32("numberPages");
                    doc.type = myreader.GetString("type");
                    doc.format = myreader.GetString("format");
                    docList.Add(doc);
                }

                myreader.Close();
                conn.Close();

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return docList;
        }

    }
}