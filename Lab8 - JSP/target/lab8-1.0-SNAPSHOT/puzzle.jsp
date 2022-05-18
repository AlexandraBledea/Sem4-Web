<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String isLoggedIn = (String) session.getAttribute("login");
    if (isLoggedIn == null || !isLoggedIn.equals("true")) {
        response.sendRedirect("loginError.html");
        return;
    }
%>
<html>
<head>
    <title>Puzzle</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="puzzle.js" defer></script>
</head>
<body>
<nav>
    <form class="continue" action="controller" method="get">
        <input type="submit" value="Continue the puzzle" id="continue"/>
    </form>
    <form class="reset" action="controller" method="post">
        <input type="submit" value="Reset puzzle" id="reset"/>
    </form>
</nav>
</body>
</html>


