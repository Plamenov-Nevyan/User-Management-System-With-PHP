<?php

class Database {
 private  $connectionSpecs = "mysql:host=localhost;dbname=USM"; //specifying the database driver, host and table 
 private $dbusername = "root"; 
 private $dbpassword = "";

 protected function connect(){
    try {
        // creating a new PHP Document Object so we can reference it and have connection to the database anywhere in the code
        $pdo = new PDO($this->connectionSpecs, $this->dbusername, $this->dbpassword);  
        // set an attribute on the db connection that allows it to throw exception if there's any error that would be caught by the catch block
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $error) {
        echo "Database connection failed:" . $error->getMessage();
    }
 }
}