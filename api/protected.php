<?php

session_start();

if (isset($_SESSION['user_id'])) {
    
    echo json_encode([
        "status" => "success",
        "user_id" => $_SESSION['user_id'],
        "email" => $_SESSION['email'],
        "username" => $_SESSION['username'],
        ]);

} else {

    echo json_encode([
        "status" => "error",
    ]);
    
    session_destroy();
}
