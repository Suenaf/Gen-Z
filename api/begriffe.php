<?php
require_once ('../system/config.php');

// SQL-Abfrage
$sql = "SELECT * FROM jugendwoerter";
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $begriffe = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Rückgabe als JSON
    header('Content-Type: application/json');  // WICHTIG: Browser soll wissen, dass JSON kommt
    echo json_encode($begriffe);
} catch (Exception $e) {
    echo json_encode(["error" => "Fehler bei der Abfrage: " . $e->getMessage()]);
}
?>
