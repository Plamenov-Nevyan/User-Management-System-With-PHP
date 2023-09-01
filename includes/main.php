<?php
require_once "../includes/config.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $action = $_POST["action"];
 

    if($action === 'register'){
        $username = $_POST["username"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $password = $_POST["password"];

        require_once "../Classes/Database.php";
        require_once "../Classes/Register.php";

        $registerInfo = new Register($username,$email,$phone,$password);
        try {
            $registerInfo->registerUser();
            if(isset($_SESSION["userId"]) && isset($_SESSION["userRole"])){
                header("Content-Type: application/json");
                echo json_encode(array($_SESSION["userId"], $_SESSION["userRole"]));
                exit;
            };
        }catch(Exception $error){
            echo 'Error: ' . $error->getMessage();
        }
    }else if($action === 'login'){
        $email = $_POST["email"];
        $password = $_POST["password"];
        require_once "../Classes/Database.php";
        require_once "../Classes/Login.php";
        $loginInfo = new Login($email, $password);
        try{
            $loginInfo->loginUser();
            if(isset($_SESSION["userId"]) && isset($_SESSION["userRole"])){
                header("Content-Type: application/json");
                echo json_encode(array($_SESSION["userId"], $_SESSION["userRole"]));
                exit;
            };
        }catch(Exception $error){
            echo 'Error: ' . $error->getMessage();
        };
    }else if($action === 'changeUsername'){
        $currentUsername = $_POST["currentUsername"];
        $newUsername = $_POST["newUsername"];
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();

        try {
            if(empty($currentUsername) || empty($newUsername)){
                throw new Exception('Please fill all the required fields!');
            }
            $successMessage = $userOps->updateUser($action, $currentUsername, $newUsername, $userId);
            print_r($successMessage);
            exit;
        }catch(Exception $error){
            print_r('Error: ' . $error->getMessage());
            exit;
        }
    }else if($action === 'changeEmail'){
        $currentEmail = $_POST["currentEmail"];
        $newEmail = $_POST["newEmail"];
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try {
            if(empty($currentEmail) || empty($newEmail)){
                throw new Exception('Please fill all the required fields!');
            }
            $successMessage = $userOps->updateUser($action, $currentEmail, $newEmail, $userId);
            print_r($successMessage);
            exit;
        }catch(Exception $error){
            print_r('Error: ' . $error->getMessage());
            exit;
        }
    }else if($action === 'changePhone'){
        $currentPhone = $_POST["currentPhone"];
        $newPhone = $_POST["newPhone"];
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try {
            if(empty($currentPhone) || empty($newPhone)){
                throw new Exception('Please fill all the required fields!');
            }
            $successMessage = $userOps->updateUser($action, $currentPhone, $newPhone, $userId);
            print_r($successMessage);
            exit;
        }catch(Exception $error){
            print_r('Error: ' . $error->getMessage());
            exit;
        }
    }else if($action === 'changePassword'){
        $currentPassword = $_POST["currentPassword"];
        $newPassword = $_POST["newPassword"];
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try {
            if(empty($currentPassword) || empty($newPassword)){
                throw new Exception('Please fill all the required fields!');
            }
            $successMessage = $userOps->updateUser($action, $currentPassword, $newPassword, $userId);
            print_r($successMessage);
            exit;
        }catch(Exception $error){
            print_r('Error: ' . $error->getMessage());
            exit;
        }
    };
}else if($_SERVER["REQUEST_METHOD"] === "GET"){
    if($_GET["get"] === "getUsers"){
        require_once "../Classes/User.php";
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $usersToSend = array();

        $userOps = new UserManagement();
        $users = $userOps->getAllUsers();
        foreach($users as $user){
            $currentUser = new User(
                $user["id"],
                $user["username"], 
                $user["email"],
                $user["phone"], 
                $user["userRole"],
                $user["isForbiddenToUpdate"]
            );
            $usersToSend[] = array(
                'id'=> $currentUser->getId(), 
                'username'=> $currentUser->getUsername(),
                'email'=> $currentUser->getEmail(),
                'phone'=> $currentUser->getPhone(),
                'userRole'=> $currentUser->getRole(),
                'isForbiddenToUpdate'=> $currentUser->getIsForbiddenToUpdate()
            );
        };
        header("Content-Type: application/json");
        echo json_encode($usersToSend);
        exit;
    }
}