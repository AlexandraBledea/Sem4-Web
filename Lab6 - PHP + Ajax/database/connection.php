<?php

function OpenConnection(): mysqli
{
    $server = "127.0.0.1"; //"127.0.0.1";
    $user = "root";
    $password = "";
    $database = "documents_database";

    $con = mysqli_connect($server, $user, $password, $database);

    if(!$con){
        die('Could not connect to DB');
    }
    
    return $con;
}

function CloseConnection(mysqli $con)
{
    $con->close();
}