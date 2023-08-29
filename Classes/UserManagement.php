<?php
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

} 