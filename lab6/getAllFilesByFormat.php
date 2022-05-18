<?php
use FTP\Connection;
include ('database/connection.php');
include ('database/document.php');
try{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $con = OpenConnection();
        $format = json_decode(file_get_contents('php://input'), true)['format'];
        $sql ="SELECT * FROM document WHERE format = '".$format."'";
        $result_set = $con->query($sql);
        $rows = array();
        while ($row = mysqli_fetch_array($result_set, MYSQLI_NUM)) {
            $rows[] = new Document($row[0],$row[1],$row[2],$row[3], $row[4],$row[5]);
        }
        header('HTTP/1.1 200 OK');
        echo json_encode($rows);
        CloseConnection($con);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            'status' => false,
            'error' => $e->getMessage(),
            'error_code' => $e->getCode()
        )
    );
    CloseConnection($con);
    exit;
}