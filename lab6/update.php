<?php

use FTP\Connection;

include ('database/connection.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $con =OpenConnection();
    if(isset($_POST['update'])){
        $id = $_POST['id'];
        $title = $con->real_escape_string($_POST['title']);
        $author = $con->real_escape_string($_POST['author']);
        $numberPages = $con->real_escape_string($_POST['numberPages']);
        $type = $con->real_escape_string($_POST['type']);
        $format = $con->real_escape_string($_POST['format']);
        $query = "UPDATE document SET title='$title', author='$author', numberPages='$numberPages', type='$type', format='$format' WHERE id='$id'";
        // $con->query($query);
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
</head>

<body>
<button type="button" onclick="location.href='./index.html'">HOME </button>
<!-- <button type="button" onclick="location.href='./crud_documents.php'">BACK </button> -->
<br>

</body>

<section class="update_form">
    <form class="update" action="update.php" method="post">
        <input id="title" type="text" name="title" placeholder="title" value="<?=$title?>" required/>
        <input id="author" type="text" name="author" placeholder="author" value="<?=$author?>" required/>
        <input id="numberPages" type="text" name="numberPages" placeholder="numberPages" value="<?=$numberPages?>" required/>
        <input id="type" type="text" name="type" placeholder="type" value="<?=$type?>" required/>
        <input id="format" type="text" name="format" placeholder="format" value="<?=$format?>" required/>
        <input id="update" type="submit" name="update" value="Update document">
    </form>
</section>


</html>
