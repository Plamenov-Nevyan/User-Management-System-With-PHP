<?php 
require_once "../includes/config.php";

class Register extends Database {
    private $username;
    private $email;
    private $phone;
    private $password;
    private $userRole = 'user';
    private $isForbiddenToUpdate = false;
    private $hash_options = [
        'cost' => 12
    ]; 

    public function __construct($username, $email, $phone, $password){
        $this->username = $username;
        $this->email = $email;
        $this->phone = $phone;
        $this->password = $password;
    }

    private function insertUser(){
        $pdo = $this->connect();
        // SQL query for inserting a newly registered user in the database, values will be passed during it's execution
        $query = "INSERT INTO users (username, email, phone, userRole, isForbiddenToUpdate, pwd) VALUES (?, ?, ?, ?, ?, ?);";  

        //Creating SQL unnamed prepared statement using the query for registration
        $statement = $pdo->prepare($query);

        // hash the submitted user password using BCRYPT algorithm and setting cost to 12 for better defence against brute force attacks
        $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT, $this->hash_options);

        // executing the prepared statement and passing the received form data as values 
        $statement->execute([$this->username, $this->email, $this->phone, $this->userRole, $this->isForbiddenToUpdate, $hashedPassword]);

        // Getting the newly registered user id, to be sent to the profile page through session
        $userId=$pdo->lastInsertId();
        $_SESSION['userId'] = $userId;

        // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
        $pdo = null;    
        $statement=null;
    }
    private function checkForErrors(){
        if(!isset($this->username) || !isset($this->email) || !isset($this->phone) || !isset($this->password)){
            throw new Exception('Please fill all the required fields');
        };
    }
    public function registerUser(){
        $this->checkForErrors();
        $this->insertUser();
    }
}