<?php

class User{
    private $id;
    private $username;
    private $email;
    private $phone;
    private $userRole;
    private $isForbiddenToUpdate;
    private $created_at;

    public function __construct($id, $username, $email, $phone, $userRole, $isForbiddenToUpdate, $created_at=null){
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->phone = $phone;
        $this->userRole = $userRole;
        $this->isForbiddenToUpdate = $isForbiddenToUpdate;
        $this->created_at = $created_at;
    }

    public function getId(){
        return $this->id;
    }
    public function setId($id){
        $this->id = $id;
    }

    public function getUsername(){
        return $this->username;
    }
    public function setUsername($username){
        $this->username = $username;
    }

    public function getEmail(){
        return $this->email;
    }
    public function setEmail($email){
        $this->email = $email;
    }

    public function getPhone(){
        return $this->phone;
    }
    public function setPhone($phone){
        $this->phone = $phone;
    }

    public function getRole(){
        return $this->userRole;
    }
    public function setRole($userRole){
        $this->userRole = $userRole;
    }
    public function getIsForbiddenToUpdate(){
        return $this->isForbiddenToUpdate;
    }
    public function setIsForbiddenToUpdate($isForbiddenToUpdate){
        $this->isForbiddenToUpdate = $isForbiddenToUpdate;
    }
    public function getCreatedAt(){
        return $this->created_at;
    }
    public function setCreatedAt($created_at){
        $this->created_at = $created_at;
    }
}