<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'cors.php';
setCorsHeaders();
include 'config.php';

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
$action = isset($data['action']) ? strtolower(trim($data['action'])) : null;

if (!$user_id || !$action) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID and action are required"
    ]);
    exit;
}

// Function to return mysqli errors and stop
function sqlError($stmt, $conn) {
    $err = $stmt ? $stmt->error : $conn->error;
    echo json_encode(["status" => "error", "message" => "SQL error: $err"]);
    exit;
}

if ($action === 'login') {
    $stmt = $conn->prepare("INSERT INTO activity_logs (user_id, login_time, time_spent) VALUES (?, NOW(), 0)");
    if (!$stmt) sqlError($stmt, $conn);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Login recorded",
            "activity_id" => $stmt->insert_id
        ]);
    } else {
        sqlError($stmt, $conn);
    }
    $stmt->close();

} elseif ($action === 'logout') {
    $activity_id = isset($data['activity_id']) ? intval($data['activity_id']) : null;
    if (!$activity_id) {
        echo json_encode([
            "status" => "error",
            "message" => "Activity ID is required for logout"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        UPDATE activity_logs
        SET logout_time = NOW(), time_spent = TIMESTAMPDIFF(SECOND, login_time, NOW())
        WHERE id = ? AND user_id = ?
    ");
    if (!$stmt) sqlError($stmt, $conn);
    $stmt->bind_param("ii", $activity_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Logout recorded"]);
    } else {
        sqlError($stmt, $conn);
    }
    $stmt->close();

} elseif ($action === 'update') {
    $activity_id = isset($data['activity_id']) ? intval($data['activity_id']) : null;
    if (!$activity_id) {
        echo json_encode([
            "status" => "error",
            "message" => "Activity ID is required for update"
        ]);
        exit;
    }

    $stmt = $conn->prepare("
        UPDATE activity_logs
        SET time_spent = TIMESTAMPDIFF(SECOND, login_time, NOW())
        WHERE id = ? AND user_id = ? AND logout_time IS NULL
    ");
    if (!$stmt) sqlError($stmt, $conn);
    $stmt->bind_param("ii", $activity_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Activity updated"]);
    } else {
        sqlError($stmt, $conn);
    }
    $stmt->close();

} else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}

$conn->close();
?>
