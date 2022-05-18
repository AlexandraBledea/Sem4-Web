<?php


require_once '../repo/DBUtils.php';
require_once 'entity/document.php';


class Model{
    private $db;

    public function __construct()
    {
        $this->db = new DBUtils();
    }

    public function getTypes()
    {
        $typesSet = $this->db->getTypes();
        $types = array();
        foreach($typesSet as $t){
            array_push($types, $t['type']);
        }
        return $types;
    }

    public function getFormats(){
        $formatsSet = $this->db->getFormats();
        $formats = array();
        foreach($formatsSet as $f){
            array_push($formats, $f['format']);
        }
        return $formats;
    }

    public function getFilteredDocsByType($type){
        $resultSet = $this->db->getFilteredDocsByType($type);
        $docs = array();
        foreach($resultSet as $key=>$val){
            $doc = new Document($val['id'], $val['title'], $val['author'], $val['numberPages'], $val['type'], $val['format']);
            array_push($docs, $doc);
        }
        return $docs;
    }

    public function getFilteredDocsByFormat($format){
        $resultSet = $this->db->getFilteredDocsByFormat($format);
        $docs = array();
        foreach($resultSet as $key=>$val){
            $doc = new Document($val['id'], $val['title'], $val['author'], $val['numberPages'], $val['type'], $val['format']);
            array_push($docs, $doc);
        }
        return $docs;
    }

    public function selectAllDocuments(){
        $resultSet = $this->db->selectAllDocuments();
        $documents = array();
        foreach($resultSet as $key=>$val){
            $doc = new Document($val['id'], $val['title'], $val['author'], $val['numberPages'], $val['type'], $val['format']);
            array_push($documents, $doc);
        }
        return $documents;
    }

    public function addDocument($id, $title, $author, $numberPages, $type, $format){
        return $this->db->addDocument($id, $title, $author, $numberPages, $type, $format);
    }

    public function deleteDocument($id){
        return $this->db->deleteDocument($id);
    }

    public function updateDocument($id, $title, $author, $numberPages, $type, $format){
        return $this->db->updateDocument($id, $title, $author, $numberPages, $type, $format);
    }

}

?>