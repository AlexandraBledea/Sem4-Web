<?php

use FTP\Connection;
session_start();
include ('database/connection.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $con = OpenConnection();
    if(isset($_POST['add'])){
        $id = $con->real_escape_string($_POST['id']);
        $title = $con->real_escape_string($_POST['title']);
        $author = $con->real_escape_string($_POST['author']);
        $numberPages = $con->real_escape_string($_POST['numberPages']);
        $type = $con->real_escape_string($_POST['type']);
        $format = $con->real_escape_string($_POST['format']);
        // $query = "INSERT INTO document VALUES('$id', '$title', '$author', '$numberPages', '$type', '$format')";
        // $con->query($query);

        // $id = $_POST['id'];
        // $title = $_POST['title'];
        // $author = $_POST['author'];
        // $numberPages = $_POST['numberPages'];
        // $type = $_POST['type'];
        // $format = $_POST['format'];
        // $query = mysqli_prepare($con, "UPDATE document SET title=?, author=?, numberPages=?, type=?, format=? WHERE id=?");
        // mysqli_stmt_bind_param($query, "ssissi", $title, $author, $numberPages, $type, $format, $id);
        // mysqli_stmt_execute($query);
        // mysqli_stmt_close($query);
        $stmt = $con->prepare("INSERT INTO document(id, title, author, numberPages, type, format) VALUES(?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ississ", $id, $title, $author, $numberPages, $type, $format);
        $stmt->execute();

    }
    CloseConnection($con);
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Documents Processing </title>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="script.js"></script>
</head>

<body>
<button class="home" type="button" onclick="location.href='./index.html'">HOME </button>
<br>

<section class="add_form">
    <form action="add.php" method="post">
        <input id="id" type="text" name="id" placeholder="id">
        <input id="title" type="text" name="title" placeholder="title">
        <input id="author" type="text" name="author" placeholder="author">
        <input id="numberPages" type="text" name="numberPages" placeholder="numberPages">
        <input id="type" type="text" name="type" placeholder="type">
        <input id="format" type="text" name="format" placeholder="format">
        <input id="add" type="submit" name="add" value="Add new document">
        <!-- <input id="update" type="submit" name="update" value="Update document"> -->
    </form>
</section>

<section class="display_add">
    <br>
    <table class="display-table">
        <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>NumberPages</th>
            <th>Type</th>
            <th>Format</th>
        </thead>
        <tbody>

            <?php
            $con = OpenConnection();
            $result_set = mysqli_query($con, "SELECT * FROM document");
            
            while($row = mysqli_fetch_array($result_set)){
                echo "<tr>";
                echo  "<td>" . $row['id'] . "</td>";
                echo  "<td>" . $row['title'] . "</td>";
                echo  "<td>" . $row['author'] . "</td>";
                echo  "<td>" . $row['numberPages'] . "</td>";
                echo  "<td>" . $row['type'] . "</td>";
                echo  "<td>" . $row['format'] . "</td>";
                echo   "</tr>";
            }
            CloseConnection($con);
            ?>

        </tbody>
    </table>
</section>


<!-- <button class='btnUpdate' id='edit' name='edit' type='button' value= ". $row['id'] . " onclick=\"location.href='./update.php'\">Update</button> -->
</body>

</html>
