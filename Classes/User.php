<?php

class User{
    private $id;
    private $username;
    private $email;
    private $phone;
    private $role;
    private $isForbiddenToUpdate;

    public function __construct($id, $username, $email, $phone, $role, $isForbiddenToUpdate){
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->phone = $phone;
        $this->role = $role;
        $this->isForbiddenToUpdate = $isForbiddenToUpdate;
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
        return $this->role;
    }
    public function setRole($role){
        $this->role = $role;
    }
    public function getIsForbiddenToUpdate(){
        return $this->isForbiddenToUpdate;
    }
    public function setIsForbiddenToUpdate($isForbiddenToUpdate){
        $this->isForbiddenToUpdate = $isForbiddenToUpdate;
    }
}