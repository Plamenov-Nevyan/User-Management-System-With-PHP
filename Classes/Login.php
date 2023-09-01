<?php 
require_once "../includes/config.php";

class Login extends Database {
    private $email;
    private $password;

    public function __construct($email,$password){
        $this->email = $email;
        $this->password = $password;
    }

    private function selectUser(){
        try {
        $pdo = $this->connect();
        // SQL query for inserting a newly registered user in the database, values will be passed during it's execution
        $query = "SELECT * FROM users WHERE email = :email";

        //Creating SQL named prepared statement using the query for finding user trying to login 
        $statement = $pdo->prepare($query);
        $statement->bindParam("email", $this->email);
        // executing the prepared statement
        $statement->execute();
        // Fetching the data of the user trying to login as associative array from the database
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        if(!empty($user)){
            if(!password_verify($this->password, $user["pwd"])){
                throw new Exception("Your password and/or email is incorrect!");
            }
            $roleQuery ="SELECT userRole FROM users WHERE id = :userId";
            $roleStatement = $pdo->prepare($roleQuery);
            $roleStatement->bindParam("userId", $user["id"]);
            $roleStatement->execute();
            $result = $roleStatement->fetch(PDO::FETCH_ASSOC);
            $userRole = $result["userRole"];
    
            // setting user's id in the session so it can be used when redirected to his/her profile
            $_SESSION['userId'] = $user["id"];
            $_SESSION['userRole'] = $userRole;
            // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
            $pdo = null;    
            $statement=null;
        }else {
            throw new Exception("Your password and/or email is incorrect!");
        }
      }catch(Exception $error){
        $pdo = null;    
        $statement=null;
        throw $error;
      };
    }
    private function checkForErrors(){
        if(!isset($this->email) || !isset($this->password)){
            throw new Exception('Please fill all the required fields');
        };
    }
    public function loginUser(){
      try {
        $this->checkForErrors();
        $this->selectUser();
      }catch(Exception $error){
        throw $error;
      };
    }
}