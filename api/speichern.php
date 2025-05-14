<?php
session_start();
header('Content-Type: application/json');

require_once('../system/config.php');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Nicht eingeloggt"]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$userId = $_SESSION['user_id'];
$fragen = $data['fragen'] ?? [];

foreach ($fragen as $frage) {
    $begriffId = $frage['begriff_id'];
    $korrekt = $frage['korrekt'];
    $versuche = $frage['versuche'];

    // Existiert bereits ein Eintrag?
    $stmt = $pdo->prepare("SELECT * FROM user_begriffe WHERE user_id = ? AND begriff_id = ?");
    $stmt->execute([$userId, $begriffId]);

    if ($stmt->rowCount() > 0) {
        // Update
        $stmt = $pdo->prepare("UPDATE user_begriffe 
            SET correct_count = correct_count + ?, 
                total_attempts = total_attempts + ?, 
                last_quiz_date = NOW() 
            WHERE user_id = ? AND begriff_id = ?");
        $stmt->execute([$korrekt ? 1 : 0, $versuche, $userId, $begriffId]);
    } else {
        // Insert
        $stmt = $pdo->prepare("INSERT INTO user_begriffe 
            (user_id, begriff_id, correct_count, total_attempts, last_quiz_date)
            VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$userId, $begriffId, $korrekt ? 1 : 0, $versuche]);
    }
}

echo json_encode(["success" => true]);
