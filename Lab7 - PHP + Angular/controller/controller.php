<?php

header("Access-Control-Allow-Origin: *");

require_once '../model/model.php';
require_once '../view/view.php';

class Controller
{
    private $view;
    private $model;

    public function __construct()
    {
        $this->view = new View();
        $this->model = new Model();
    }

    public function service(){
        if (isset($_GET['action']) && !empty($_GET['action'])){
            if( $_GET['action'] == "selectAllDocuments"){
                $this->{$_GET['action']}();
            }
            else if($_GET['action'] == 'addDocument'){
                $this->{$_GET['action']}($_GET['id'], $_GET['title'], $_GET['author'], $_GET['numberPages'], $_GET['type'], $_GET['format']);
            }
            else if($_GET['action'] == 'deleteDocument'){
                $this->{$_GET['action']}($_GET['id']);
            }
            else if($_GET['action'] == 'updateDocument'){
                $this->{$_GET['action']}($_GET['id'], $_GET['title'], $_GET['author'], $_GET['numberPages'], $_GET['type'], $_GET['format']);
            }
            else if($_GET['action'] == "getTypes"){
                $this->{$_GET['action']}();
            }
            else if($_GET['action'] == "getFormats"){
                $this->{$_GET['action']}();
            }
            else if($_GET['action'] == "getFilteredDocsByType"){
                $this->{$_GET['action']}($_GET['type']);
            }
            else if($_GET['action'] == "getFilteredDocsByFormat"){
                $this->{$_GET['action']}($_GET['format']);
            }
        }
    }


    private function selectAllDocuments(){
        $documents = $this->model->selectAllDocuments();
        return $this->view->output($documents);
    }

    private function getFormats(){
        $formats = $this->model->getFormats();
        $this->view->output($formats); 
    }

    private function getFilteredDocsByType($type){
        $docs = $this->model->getFilteredDocsByType($type);
        $this->view->output($docs);
    }

    private function getFilteredDocsByFormat($format){
        $docs = $this->model->getFilteredDocsByFormat($format);
        $this->view->output($docs);
    }

    private function getTypes(){
        $types = $this->model->getTypes();
        $this->view->output($types);
    }

    private function addDocument($id, $title, $author, $numberPages, $type, $format){
        $result = $this->model->addDocument($id, $title, $author, $numberPages, $type, $format);
        if($result > 0){
            $r = "Success";
        }
        else{
            $r = "Failure";
        }
        $this->view->returnResult($r);
    }

    private function deleteDocument($id){
        $result = $this->model->deleteDocument($id);
        if($result > 0){
            $r = "Success";
        }
        else{
            $r = "Failure";
        }
        $this->view->returnResult($r);
    }

    private function updateDocument($id, $title, $author, $numberPages, $type, $format){
        $result = $this->model->updateDocument($id, $title, $author, $numberPages, $type, $format);
        if($result > 0){
            $r = "Success";
        }
        else{
            $r = "Failure";
        }
        $this->view->returnResult($r);
    }

}

$controller = new Controller();
$controller->service();

?>