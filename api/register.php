<?php
// Very simple debugging output.
// In Produktion → Passwort nicht im Klartext zurücksenden,
// sondern z.B. mit password_hash() abspeichern und gar nicht echo‑n!

require_once ('../system/config.php');

header('Content-Type: text/plain; charset=UTF-8');
 
// ► Daten aus $_POST abgreifen (kommen dort an, weil wir FormData benutzen)
$username = $_POST['username'] ?? '';
$email    = $_POST['email']    ?? '';
$password = $_POST['password'] ?? '';
 
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);



$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email OR username = :username");
$stmt->execute([
    ':email' => $email,
    ':username' => $username
]);
// Fetch the user
$user = $stmt->fetch();

if (empty($username) || empty($email) || empty($password)) {
    echo "Bitte fülle alle Felder aus";
    exit;
  }
if ($user) {
    // Email already exists
    echo "Username oder E-Mail bereits vergeben";
    exit;

}   else {
    $insert = $pdo->prepare("INSERT INTO users (email, username, password)
    VALUES (:email, :user, :pass)");
    $insert->execute([
        ':email' => $email,
        ':user'  => $username,
        ':pass'  => $hashedPassword
    ]);

}
if ($insert->rowCount() > 0) {
    echo "Registrierung erfolgreich";
} else {
    echo "Registrierung fehlgeschlagen";
}
