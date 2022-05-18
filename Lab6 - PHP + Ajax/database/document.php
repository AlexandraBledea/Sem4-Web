<?php

class Document{
    public $id;
    public $title;
    public $author;
    public $numberPages;
    public $type;
    public $format;


    function __construct($id, $title, $author, $numberPages, $type, $format)
    {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->numberPages = $numberPages;
        $this->type = $type;
        $this->format = $format;        
    }

    function get_id(){
        return $this->id;
    }

    function set_id($newId){
        $this->id = $newId;
    }

    function get_title(){
        return $this->title;
    }

    function set_title($newTitle){
        $this->title = $newTitle;
    }

    function get_author(){
        return $this->author;
    }

    function set_author($newAuthor){
        $this->author = $newAuthor;
    }

    function get_numberPages(){
        return $this->numberPages;
    }

    function set_numberPages($newNumberPages){
        $this->numberPages = $newNumberPages;
    }

    function get_type(){
        return $this->type;
    }

    function set_type($newType){
        $this->type = $newType;
    }

    function get_format(){
        return $this->format;
    }

    function set_format($newFormat){
        $this->format = $newFormat;
    }

}