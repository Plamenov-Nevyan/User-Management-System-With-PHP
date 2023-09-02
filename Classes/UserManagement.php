<?php
require_once "../includes/config.php";

class UserManagement extends Database {
    private $userId;
    private $initiatorId;

    public function __construct($userId = null, $initiatorId = null){
        $this->userId = $userId;
        $this->initiatorId = $initiatorId;
    }
    public function getUserId(){
        return $this->userId;
    }
    public function setUserId($id){
       $this->userId = $id ;
    }

    public function getInitiatorId(){
        return $this->initiatorId;
    }
    public function setInitiatorId($id){
       $this->initiatorId = $id ;
    }

    public function getAllUsers(){
        try{
            $pdo = $this->connect();
            $query = "SELECT id, username, email, phone, userRole, isForbiddenToUpdate FROM users";
            $statement = $pdo->prepare($query);
            $statement->execute();
            $users = $statement->fetchAll(PDO::FETCH_ASSOC);
            $pdo = null;
            $statement = null;
            return $users;
        }catch(Exception $error){
            throw $error;
        }
    }

    public function getUser($userId){
        try{
            $pdo = $this->connect();
            $query = "SELECT id, username, email, phone, userRole, isForbiddenToUpdate, created_at FROM users WHERE id = :userId";
            $statement = $pdo->prepare($query);
            $statement->bindParam('userId', $userId);
            $statement->execute();
            $user = $statement->fetch(PDO::FETCH_ASSOC);
            $pdo = null;
            $statement = null;
            return $user;
        }catch(Exception $error){
            throw $error;
        }
    }

    public function updateUser($action, $currentData, $newData, $userId){
       try {
        $user = $this->selectUserForUpdate($action, $currentData, $userId);
        if(empty($user)){
            switch($action){
                case 'changeUsername': throw new Exception("Your current username is incorrect!");break;
                case 'changeEmail': throw new Exception("Your current email is incorrect!");break;
                case 'changePhone': throw new Exception("Your current phone number is incorrect!");break;
                case 'changePassword': throw new Exception("Your current password is incorrect!");break;
            };
        }else {
            $this->buildAndExecUpdateQuery($action, $newData, $user["id"]);
            // Redirecting to profile page and terminating the script
            switch($action){
                case 'changeUsername': return 'Your username was updated successfully!';break;
                case 'changeEmail':  return 'Your email was updated successfully!';break;
                case 'changePhone':  return 'Your phone number was updated successfully!';break;
                case 'changePassword': return 'Your password was updated successfully!';break;
            };
        };  
       }catch(Exception $error){
        print_r($error->getMessage());
        exit;
         throw $error;
       }
    }
    private function selectUserForUpdate($action, $currentData, $userId){
        try{
            if($action === 'changeUsername'){
                $pdo = $this->connect();
                $query = "SELECT * FROM users WHERE username = :currentUsername";
                $statement = $pdo->prepare($query);
                $statement->bindParam("currentUsername", $currentData);
                $statement->execute();
                $user = $statement->fetch(PDO::FETCH_ASSOC);
                $pdo = null;    
                $statement=null;
                return $user;
            }else if($action === 'changeEmail'){
                $pdo = $this->connect();
                $query = "SELECT * FROM users WHERE email = :currentEmail";
                $statement = $pdo->prepare($query);
                $statement->bindParam("currentEmail", $currentData);
                $statement->execute();
                $user = $statement->fetch(PDO::FETCH_ASSOC);
                $pdo = null;    
                $statement=null;
                return $user;
            }else if($action === 'changePhone'){
                $pdo = $this->connect();
                $query = "SELECT * FROM users WHERE phone = :currentPhone";
                $statement = $pdo->prepare($query);
                $statement->bindParam("currentPhone", $currentData);
                $statement->execute();
                $user = $statement->fetch(PDO::FETCH_ASSOC);
                $pdo = null;    
                $statement=null;
                return $user;
            }else if($action === 'changePassword'){
                $pdo = $this->connect();
                $query = "SELECT * FROM users WHERE id = :userId";
                $statement = $pdo->prepare($query);
                $statement->bindParam("userId", $userId);
                $statement->execute();
                $user = $statement->fetch(PDO::FETCH_ASSOC);
                if(!empty($user)){
                    if(!password_verify($currentData, $user["pwd"])){
                        throw new Exception("Your current password is incorrect");
                    }
                }
                $pdo = null;    
                $statement=null;
                return $user;
            }
        }catch(Exception $error){
            throw $error;
        }
    }

    private function buildAndExecUpdateQuery($action, $newData, $userId){
        try{
            if($action === 'changeUsername'){
                $pdo = $this->connect();
                $updateQuery = "UPDATE users SET username = :newUsername WHERE id = :userId";
                $updateStatement = $pdo->prepare($updateQuery);
                $updateStatement->bindParam("newUsername", $newData);
                $updateStatement->bindParam("userId", $userId);
                $updateStatement->execute(); 
                // setting user's id in the session so it can be used when redirected to his/her profile
                // $_SESSION['userId'] = $user["id"];
                // $_SESSION['userRole'] = $user["userRole"];
                // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
                $pdo = null;    
                $statement=null;
            }else if($action === 'changeEmail'){
                $pdo = $this->connect();
                $updateQuery = "UPDATE users SET email = :newEmail WHERE id = :userId";
                $updateStatement = $pdo->prepare($updateQuery);
                $updateStatement->bindParam("newEmail", $newData);
                $updateStatement->bindParam("userId", $userId);
                $updateStatement->execute(); 
                // setting user's id in the session so it can be used when redirected to his/her profile
                // $_SESSION['userId'] = $user["id"];
                // $_SESSION['userRole'] = $user["userRole"];
                // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
                $pdo = null;    
                $statement=null;
            }else if($action === 'changePhone'){
                $pdo = $this->connect();
                $updateQuery = "UPDATE users SET phone = :newPhone WHERE id = :userId";
                $updateStatement = $pdo->prepare($updateQuery);
                $updateStatement->bindParam("newPhone", $newData);
                $updateStatement->bindParam("userId", $userId);
                $updateStatement->execute(); 
                // setting user's id in the session so it can be used when redirected to his/her profile
                // $_SESSION['userId'] = $user["id"];
                // $_SESSION['userRole'] = $user["userRole"];
                // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
                $pdo = null;    
                $statement=null;
            }else if($action === 'changePassword'){
                $hashedPassword = password_hash($newData, PASSWORD_BCRYPT, $this->hash_options);
                $pdo = $this->connect();
                $updateQuery = "UPDATE users SET pwd = :newPassword WHERE id = :userId";
                $updateStatement = $pdo->prepare($updateQuery);
                $updateStatement->bindParam("newPassword", $hashedPassword);
                $updateStatement->bindParam("userId", $userId);
                $updateStatement->execute(); 
                // setting user's id in the session so it can be used when redirected to his/her profile
                // $_SESSION['userId'] = $user["id"];
                // $_SESSION['userRole'] = $user["userRole"];
                // Manually closing the database connection, to free up resources as early as possible (since it closes automatically anyway)
                $pdo = null;    
                $statement=null;
            }
        }catch(Exception $error){
            throw $error;
        }
    }
    public function banUserFromUpdating($userId){
        try{
           $this->buildAndExecBanQuery($userId);
        }catch(Exception $error){
            throw $error;
        }
    }
    private function buildAndExecBanQuery($userId){
        $pdo = $this->connect();
        $banQuery = "UPDATE users SET isForbiddenToUpdate = 1 WHERE id = :userId";
        $banStatement = $pdo->prepare($banQuery);
        $banStatement->bindParam('userId', $userId);
        $banStatement->execute();
        $pdo = null;    
        $statement=null;
    }
    public function removeBanFromUpdating($userId){
        try{
           $this->buildAndExecRemoveBanQuery($userId);
        }catch(Exception $error){
            throw $error;
        }
    }
    private function buildAndExecRemoveBanQuery($userId){
        $pdo = $this->connect();
        $removeBanQuery = "UPDATE users SET isForbiddenToUpdate = 0 WHERE id = :userId";
        $removeBanStatement = $pdo->prepare($removeBanQuery);
        $removeBanStatement->bindParam('userId', $userId);
        $removeBanStatement->execute();
        $pdo = null;    
        $statement=null;
    }

    public function checkIfUserIsBanned($userId){
        try{
            $isBanned = $this->buildAndExecIsUserBannedCheckQuery($userId);
            return $isBanned;
            exit;
        }catch(Exception $error){
            throw $error;
        }
    }

    private function buildAndExecIsUserBannedCheckQuery($userId){
        $pdo = $this->connect();
        $selectUserQuery = "SELECT isForbiddenToUpdate FROM users WHERE id = :userId";
        $selectStatement = $pdo->prepare($selectUserQuery);
        $selectStatement->bindParam('userId', $userId);
        $selectStatement->execute();
        $user = $selectStatement->fetch(PDO::FETCH_ASSOC);
        return $user["isForbiddenToUpdate"];
        $pdo = null;    
        $statement=null;
    }
} 