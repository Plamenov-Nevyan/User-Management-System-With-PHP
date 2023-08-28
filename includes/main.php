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
            if(isset($_SESSION["userId"])){
                header("Content-Type: application/json");
                echo json_encode(array($_SESSION["userId"]));
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
            if(isset($_SESSION["userId"])){
                header("Content-Type: application/json");
                echo json_encode(array($_SESSION["userId"]));
                exit;
            };
        }catch(Exception $error){
            echo 'Error: ' . $error->getMessage();
        };
    }
};