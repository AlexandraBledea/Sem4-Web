<?php

class Document implements JsonSerializable{
    private $id;
    private $title;
    private $author;
    private $numberPages;
    private $type;
    private $format;


    function __construct($id, $title, $author, $numberPages, $type, $format)
    {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->numberPages = $numberPages;
        $this->type = $type;
        $this->format = $format;        
    }

    public function get_id(){
        return $this->id;
    }

    public function get_title(){
        return $this->title;
    }

    public function get_author(){
        return $this->author;
    }

    public function get_numberPages(){
        return $this->numberPages;
    }

    public function get_type(){
        return $this->type;
    }

    public function get_format(){
        return $this->format;
    }


    public function set_id($newId){
        $this->id = $newId;
    }

    public function set_title($newTitle){
        $this->title = $newTitle;
    }

    public function set_author($newAuthor){
        $this->author = $newAuthor;
    }

    public function set_numberPages($newNumberPages){
        $this->numberPages = $newNumberPages;
    }

    public function set_type($newType){
        $this->type = $newType;
    }

    public function set_format($newFormat){
        $this->format = $newFormat;
    }

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;

    }

}

?>