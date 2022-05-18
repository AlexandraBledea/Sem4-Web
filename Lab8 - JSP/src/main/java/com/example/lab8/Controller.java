package com.example.lab8;


import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@WebServlet(name = "controller", value="/controller")
public class Controller extends HttpServlet {
    HttpSession currentSession;
    int userId;

    public void writePuzzle(PrintWriter printWriter, String puzzleHtml) {
        printWriter.println("<html>");
        printWriter.println("<head>");
        printWriter.println("<title>Lab08_Puzzle_JSP</title>");
        printWriter.println("<link rel='stylesheet' type='text/css' href='style.css'>");
        printWriter.println("<script src=\"https://code.jquery.com/jquery-3.6.0.min.js\" integrity=\"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=\" crossorigin=\"anonymous\"></script>");
        printWriter.println("<script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.min.js\" integrity=\"sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=\" crossorigin=\"anonymous\"></script>");
        printWriter.println("<script src=\"puzzle.js\" defer></script> ");
        printWriter.println("</head>");
        printWriter.println("<body>");
        printWriter.println("<div id='score'>");
        printWriter.println("</div>");
        printWriter.println("<p> Hello " + currentSession.getAttribute("username") + "!</p>");
        printWriter.println("<div id='puzzle'>");
        printWriter.println(puzzleHtml);
        printWriter.println("</div>");
        printWriter.println("<div id='status'>");
        printWriter.println("</div>");
        printWriter.println("</body>");
        printWriter.println("</html>");
    }

    // handle http GET request
    public void doGet(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        currentSession = req.getSession();
        userId = (Integer) currentSession.getAttribute("userID");

        servletResponse.setContentType("text/html");
        DatabaseConnector db = new DatabaseConnector();
        writePuzzle(servletResponse.getWriter(), db.getPuzzle(userId));
//        db.close();
    }

    public void doPost(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        currentSession = req.getSession();
        userId = (int) currentSession.getAttribute("userID");

        servletResponse.setContentType("text/html");
        DatabaseConnector db = new DatabaseConnector();
        db.resetGame(userId);
        writePuzzle(servletResponse.getWriter(), db.getPuzzle(userId));
    }

    public void doPut(HttpServletRequest req, HttpServletResponse servletResponse) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));

        String data = br.readLine();
        System.out.println(data);
        Map<String, String> params = new HashMap<>();
        Stream.of(data.split("&", 2)).forEach((par) -> {
            String[] arr = par.split("=", 2);
            params.put(arr[0], arr[1]);
        });
        int id1 = Integer.parseInt(params.get("id1"));
        int id2 = Integer.parseInt(params.get("id2"));

        DatabaseConnector db = new DatabaseConnector();
        db.swap(id1, id2, userId);
        servletResponse.getWriter().println(db.getPuzzle(userId));
    }
}
