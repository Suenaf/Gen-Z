<?php
// Fehler anzeigen (nur für Entwicklung)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Datenbankverbindung einbinden
require_once('../system/config.php');

// Prüfen, ob $pdo gesetzt ist
if (!isset($pdo)) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "PDO nicht initialisiert – config.php fehlt oder fehlerhaft."]);
    exit;
}

// SQL: Zufälligen Begriff laden
$sql = "SELECT * FROM jugendwoerter ORDER BY RAND() LIMIT 1";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $begriff = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($begriff) {
        // JSON zurückgeben
        header('Content-Type: application/json');
        echo json_encode([
            "wort" => $begriff['wort'],
        ]);
    } else {
        echo json_encode(["error" => "Kein Begriff gefunden."]);
    }

} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Fehler bei der Abfrage: " . $e->getMessage()]);
}
?>
