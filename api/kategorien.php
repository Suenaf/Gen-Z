<?php
session_start();
header('Content-Type: application/json charset=UTF-8');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Nicht eingeloggt']);
    exit;
}

require_once('../system/config.php'); // hier wird die $pdo-Verbindung geladen

try {
    $userId = $_SESSION['user_id'];

    // 1. Alle Begriffe zählen
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM jugendwoerter");
    $stmt->execute();
    $gesamtBegriffe = (int)$stmt->fetchColumn();

    // 2. Alle user_begriffe dieses Users holen
    $stmt = $pdo->prepare("
        SELECT correct_count
        FROM user_begriffe
        WHERE user_id = ?
    ");
    $stmt->execute([$userId]);
    $userBegriffe = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // 3. Klassifizieren
    $gelernt = 0;
    $ueben = 0;

    foreach ($userBegriffe as $count) {
        if ($count >= 3) {
            $gelernt++;
        } else {
            $ueben++;
        }
    }

    // 4. Neu = Gesamtanzahl - (gelernt + üben)
    $neu = $gesamtBegriffe - ($gelernt + $ueben);

    // 5. Debug-Log speichern (optional)
    file_put_contents("debug_log.txt", print_r([
        'user_id' => $userId,
        'user_begriffe' => $userBegriffe,
        'gesamt' => $gesamtBegriffe,
        'gelernt' => $gelernt,
        'ueben' => $ueben,
        'neu' => $neu
    ], true));

    // 6. Antwort senden
    echo json_encode([
        'neu' => $neu,
        'ueben' => $ueben,
        'gelernt' => $gelernt
    ]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
