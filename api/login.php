<?php

require_once ('../system/config.php');
header('Content-Type: text/plain; charset=UTF-8');

$loginInfo = $_POST['loginInfo'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :loginInfo OR username = :loginInfo");
$stmt->execute([
    ':loginInfo' => $loginInfo,
]);
// Fetch the user
$user = $stmt->fetch();


if ($user) {


//passwort prüfen
    if (password_verify($password, $user['password'])) {
        echo "Login erfolgreich";

//session starten
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

    } else {
        echo "Passwort ist nicht korrekt";
    }


} else {

    echo "Benutzername oder E-Mail nicht korrekt";

}


