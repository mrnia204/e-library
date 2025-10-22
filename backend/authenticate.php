<?php
// // Enable CORS
// header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Credentials: true");
// header("Content-Type: application/json");

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     exit(0);
// }

// Enable error reporting for debugging
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// require_once 'cors.php';
// setCorsHeaders();
// include 'config.php';

// include 'config.php';

// // Decode JSON input
// $input = file_get_contents("php://input");
// $data = json_decode($input, true);

// if (json_last_error() !== JSON_ERROR_NONE) {
//     echo json_encode([
//         "status" => "error",
//         "message" => "Invalid JSON input"
//     ]);
//     exit;
// }

// // Validate required fields
// $user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
// $action = isset($data['action']) ? strtolower(trim($data['action'])) : null;

// if (!$user_id || !$action) {
//     echo json_encode([
//         "status" => "error",
//         "message" => "User ID and action are required"
//     ]);
//     exit;
// }

// // Function to return mysqli errors and stop
// function sqlError($stmt, $conn) {
//     $err = $stmt ? $stmt->error : $conn->error;
//     echo json_encode(["status" => "error", "message" => "SQL error: $err"]);
//     exit;
// }

// try {
//     if ($action === 'login') {
//         $stmt = $conn->prepare("INSERT INTO activity_logs (user_id, login_time, time_spent) VALUES (?, NOW(), 0)");
//         if (!$stmt) sqlError($stmt, $conn);
//         $stmt->bind_param("i", $user_id);

//         if ($stmt->execute()) {
//             echo json_encode([
//                 "status" => "success",
//                 "message" => "Login recorded",
//                 "activity_id" => $stmt->insert_id
//             ]);
//         } else {
//             sqlError($stmt, $conn);
//         }
//         $stmt->close();

//     } elseif ($action === 'logout') {
//         $activity_id = isset($data['activity_id']) ? intval($data['activity_id']) : null;
//         if (!$activity_id) {
//             echo json_encode([
//                 "status" => "error",
//                 "message" => "Activity ID is required for logout"
//             ]);
//             exit;
//         }

//         // FIXED: Changed $userid to $user_id
//         $stmt = $conn->prepare("
//             UPDATE activity_logs
//             SET logout_time = NOW(), time_spent = TIMESTAMPDIFF(SECOND, login_time, NOW())
//             WHERE id = ? AND user_id = ?
//         ");
//         if (!$stmt) sqlError($stmt, $conn);
//         $stmt->bind_param("ii", $activity_id, $user_id); // Fixed variable name

//         if ($stmt->execute()) {
//             echo json_encode([
//                 "status" => "success", 
//                 "message" => "Logout recorded"
//             ]);
//         } else {
//             sqlError($stmt, $conn);
//         }
//         $stmt->close();

//     } elseif ($action === 'update') {
//         $activity_id = isset($data['activity_id']) ? intval($data['activity_id']) : null;
//         if (!$activity_id) {
//             echo json_encode([
//                 "status" => "error",
//                 "message" => "Activity ID is required for update"
//             ]);
//             exit;
//         }

//         $stmt = $conn->prepare("
//             UPDATE activity_logs
//             SET time_spent = TIMESTAMPDIFF(SECOND, login_time, NOW())
//             WHERE id = ? AND user_id = ? AND logout_time IS NULL
//         ");
//         if (!$stmt) sqlError($stmt, $conn);
//         $stmt->bind_param("ii", $activity_id, $user_id);

//         if ($stmt->execute()) {
//             echo json_encode([
//                 "status" => "success", 
//                 "message" => "Activity updated"
//             ]);
//         } else {
//             sqlError($stmt, $conn);
//         }
//         $stmt->close();

//     } else {
//         echo json_encode([
//             "status" => "error", 
//             "message" => "Invalid action. Use 'login', 'logout', or 'update'"
//         ]);
//     }

// } catch (Exception $e) {
//     echo json_encode([
//         "status" => "error", 
//         "message" => "Server error: " . $e->getMessage()
//     ]);
// } finally {
//     $conn->close();
// }

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