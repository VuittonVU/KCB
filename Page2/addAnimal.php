<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

header('Content-Type: application/json');
require_once 'connect.php';

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the name is provided
if (!isset($data['name']) || empty($data['name'])) {
    echo json_encode(['error' => 'Animal name is required.']);
    exit;
}

try {
    // Prepare the SQL query to insert the new animal
    $sql = "INSERT INTO animals (name) VALUES (:name)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $data['name'], PDO::PARAM_STR);
    
    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => 'Animal added successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to add the animal.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
