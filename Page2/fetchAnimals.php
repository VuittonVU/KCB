<?php
header('Content-Type: application/json');
require_once 'connect.php';

try {
    // Execute query to fetch all animals
    $stmt = $pdo->query("SELECT * FROM animals");
    $animals = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the result as JSON
    echo json_encode($animals);
} catch (PDOException $e) {
    // Return error message in JSON format if there's a database error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
