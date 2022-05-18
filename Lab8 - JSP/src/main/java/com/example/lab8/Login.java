package com.example.lab8;


import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "login", value="/login")
public class Login extends HttpServlet {

    private int getCount(String username, String password, Connection connection) throws SQLException{

        PreparedStatement checkCredentials = connection.prepareStatement("SELECT COUNT(*) FROM user WHERE username = ? AND password = ?");
        return  retrieveValue(username, password, checkCredentials);
    }

    /*
    With this function we get the userID based on the username and password
     */
    private int getUserId(String username, String password){
        int userID = 0;
        try(Connection connection = DBConnection.initializeDB()){
            PreparedStatement checkCredentials = connection.prepareStatement("SELECT ID FROM user WHERE username = ? AND password = ?");
            userID = retrieveValue(username, password, checkCredentials);
        } catch (SQLException | ClassNotFoundException ex){
            ex.printStackTrace();
        }

        return userID;
    }

    private boolean areCredentialsValid(String username, String password){
        boolean areValid = false;

        try(Connection connection = DBConnection.initializeDB()){
            if(this.getCount(username, password, connection) == 1){
                areValid = true;
            }
        } catch (SQLException | ClassNotFoundException ex){
            ex.printStackTrace();
        }

        return areValid;
    }

    private int retrieveValue(String username, String password, PreparedStatement checkCredentials) throws SQLException{
        checkCredentials.setString(1, username);
        checkCredentials.setString(2, password);
        ResultSet result = checkCredentials.executeQuery();
        result.next();
        int count = result.getInt(1);
        result.close();
        checkCredentials.close();
        return count;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");

        // we check if there exists a user in the database with the given username and password
        if(this.areCredentialsValid(request.getParameter("username"), request.getParameter("password"))){
            // we set the session for the current user
            HttpSession session = request.getSession();
            session.setAttribute("login", "true");
            session.setAttribute("userID", this.getUserId(request.getParameter("username"), request.getParameter("password")));
            session.setAttribute("username", request.getParameter("username"));
            response.sendRedirect("puzzle.jsp");
        }
        else {
            response.sendRedirect("loginError.html");
        }
    }
}
