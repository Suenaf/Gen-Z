<?php

session_start();
header('Content-Type: application/json; charset=UTF-8');


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