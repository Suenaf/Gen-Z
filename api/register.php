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
 
 // Insert the new user
 $insert = $pdo->prepare("INSERT INTO users (email, username, password) 
 VALUES (:email, :user, :pass)");
 $insert->execute([
     ':email' => $email,
     ':user' => $username,
     ':pass'  => $password
    
 ]);


// ► Ausgeben – nur zum Test!
echo "PHP meldet, Daten erfolgreich empfangen";
echo "email: $email\n";
echo "username: $username\n";
echo "password: $password\n";
?>