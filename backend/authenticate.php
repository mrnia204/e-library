<?php
// authenticate.php - Proper authentication endpoint
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

if (!$username || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Username and password are required"
    ]);
    exit;
}

// Validate credentials against your users table
$stmt = $conn->prepare("SELECT id, username, role FROM users WHERE username = ? AND password = ? AND role = ?");
$stmt->bind_param("sss", $username, $password, $role);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($user = $result->fetch_assoc()) {
        echo json_encode([
            "success" => true,
            "user_id" => $user['id'],
            "username" => $user['username'],
            "role" => $user['role'],
            "message" => "Login successful"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid username, password, or role"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Database error"
    ]);
}

$stmt->close();
$conn->close();
?>