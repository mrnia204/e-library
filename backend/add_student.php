<?php 
//require_once 'cors.php';
include 'config.php';


error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required data
$student_id = trim($data["student_id"] ?? '');
$full_name = trim($data["full_name"] ?? '');
$email = trim($data["email"] ?? '');
$phone = trim($data["phone"] ?? '');
$grade = trim($data["grade"] ?? '');
$class = trim($data["class"] ?? '');
$address = trim($data["address"] ?? '');
$username = trim($data["username"] ?? '');
$password = trim($data["password"] ?? '');

// Fixed validation condition
if (empty($student_id) || empty($full_name) || empty($email) || empty($phone) || empty($grade) || empty($class) || empty($address) || empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$conn->begin_transaction();

try {
    // Insert into users table
    $stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'student')");
    if (!$stmt) throw new Exception($conn->error);
    $stmt->bind_param("ss", $username, $hashedPassword);
    if (!$stmt->execute()) throw new Exception($stmt->error);
    $user_id = $stmt->insert_id;
    $stmt->close();

    // Fixed SQL query - removed extra parenthesis and corrected column list
    $stmt = $conn->prepare("INSERT INTO students (user_id, student_id, full_name, email, phone, grade, class, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) throw new Exception($conn->error);
    $stmt->bind_param("isssssss", $user_id, $student_id, $full_name, $email, $phone, $grade, $class, $address);
    if (!$stmt->execute()) throw new Exception($stmt->error);
    $stmt->close();

    $conn->commit();

    echo json_encode(["success" => true, "message" => "Student added successfully"]);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

$conn->close();
?>