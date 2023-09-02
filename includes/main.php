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
    }else if($action === "banFromUpdating"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->banUserFromUpdating($userId);
            echo 'User was banned successfully !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }else if($action === "removeBanFromUpdating"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->removeBanFromUpdating($userId);
            echo 'User\'s ban was removed successfully !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }else if($action === "makeModerator"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->makeUserModerator($userId);
            echo 'User was successfully promoted to moderator role !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }else if($action === "makeAdmin"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->makeUserAdmin($userId);
            echo 'User was successfully promoted to admin role !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }else if($action === "demoteToRegularUser"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->demoteToRegularUser($userId);
            echo 'User was successfully demoted to regular role !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }else if($action === "deleteUserPermanently"){
        $userId = $_POST["userId"];
        require_once "../Classes/Database.php";
        require_once "../Classes/UserManagement.php";
        $userOps = new UserManagement();
        try{
            $userOps->deleteUserPermanently($userId);
            echo 'User was successfully deleted !';
            exit;
        }catch(Exception $error){
            echo $error->getMessage();
            exit;
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET"){
    if($_GET["get"] === "getUsers"){
      try {
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
      }catch (Exception $error){
        echo 'Error' . $error->getMessage();
      }
    }else if($_GET["get"] === 'getUser'){
        try {
            $userId = $_GET["userId"];
            require_once "../Classes/User.php";
            require_once "../Classes/Database.php";
            require_once "../Classes/UserManagement.php";
            $userOps = new UserManagement();
            $user = $userOps->getUser($userId);
            $userRequested = new User(
                $user["id"],
                $user["username"], 
                $user["email"],
                $user["phone"], 
                $user["userRole"],
                $user["isForbiddenToUpdate"],
                $user["created_at"],
            );
            header("Content-Type: application/json");
            echo json_encode([
                'id'=> $userRequested->getId(), 
                'username'=> $userRequested->getUsername(),
                'email'=> $userRequested->getEmail(),
                'phone'=> $userRequested->getPhone(),
                'userRole'=> $userRequested->getRole(),
                'isForbiddenToUpdate'=> $userRequested->getIsForbiddenToUpdate(),
                'created_at'=> $userRequested->getCreatedAt()
            ]);
            exit;
        }catch(Exception $error){
            echo 'Error' . $error->getMessage();
        }
    }else if($_GET["get"] === 'checkIfBanned'){
        try{
            $userId = $_GET["userId"];
            require_once "../Classes/User.php";
            require_once "../Classes/Database.php";
            require_once "../Classes/UserManagement.php";
            $userOps = new UserManagement();
            $isBanned = $userOps->checkIfUserIsBanned($userId);
            echo json_encode([
                'isBanned' => $isBanned
            ]);
            exit;
        }catch(Exception $error){
            echo 'Error: ' . $error->getMessage();
        }
    }
}