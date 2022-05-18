<?php

class DBUtils {

    private $host = "127.0.0.1"; //"127.0.0.1";
    private $user = "root";
    private $password = "";
    private $db = "documents_database";
    private $charset = 'utf8';

    private $pdo;
    private $error;

    public function __construct()
    {
		$dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
		$opt = array(PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false);
		try {
			$this->pdo = new PDO($dsn, $this->user, $this->password, $opt);		
		} // Catch any errors
		catch(PDOException $e){
			$this->error = $e->getMessage();
			echo "Error connecting to DB: " . $this->error;
		}        
    }

    public function getFilteredDocsByType($type){
        $stmt = $this->pdo->query("SELECT * FROM document WHERE type = '" . $type ."' ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFilteredDocsByFormat($format){
        $stmt = $this->pdo->query("SELECT * FROM document WHERE format = '" . $format . "' ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFormats(){
        $stmt = $this->pdo->query("SELECT DISTINCT format FROM document");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTypes(){
        $stmt = $this->pdo->query("SELECT DISTINCT type FROM document");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function selectAllDocuments(){
        $stmt = $this->pdo->query("SELECT * FROM document");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addDocument($id, $title, $author, $numberPages, $type, $format){    
        $affected_rows = $this->pdo->exec("INSERT INTO document(id, title, author, numberPages, type, format) values(" . $id . ", '" . $title . "', '" . $author . "', " . $numberPages .", '". $type . "', '" . $format . "')");

        return $affected_rows;
    }

    public function deleteDocument($id){
        $affected_rows = $this->pdo->exec("DELETE FROM document WHERE id = ". $id ."");
        
        return $affected_rows;
    }

    public function updateDocument($id, $title, $author, $numberPages, $type, $format){
        $affected_rows = $this->pdo->exec("UPDATE document SET title = '" . $title . "', author = '" . $author . "', numberPages = " . $numberPages . ", type = '" . $type . "', format = '" . $format . "' WHERE id = " . $id . "");
   
        return $affected_rows;
    }


}

?>