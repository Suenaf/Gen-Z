<?php
// config.php
$host = 'g02qom.myd.infomaniak.com';
$db   = 'g02qom_im4';  // Change to your DB name
$user = 'g02qom_im4';   // Change to your DB user
$pass = 'W6@@Bc5_x3MydU';       // Change to your DB pass if needed

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass);
    // Optional: Set error mode
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Database connection error: " . $e->getMessage();
    exit;
}
?>