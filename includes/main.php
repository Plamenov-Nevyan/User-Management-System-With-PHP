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
    }
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