<?php
// debug_users.php
header("Content-Type: text/plain");
$conn = new mysqli('localhost', 'root', '', 'elibrary_user_db');

echo "=== DATABASE USER CHECK ===\n\n";

// Check all users
$result = $conn->query("SELECT username, password, LENGTH(password) as pwd_len, role FROM users");
echo "All users in database:\n";
while ($row = $result->fetch_assoc()) {
    echo "Username: '{$row['username']}' | Password: '{$row['password']}' | Length: {$row['pwd_len']} | Role: {$row['role']}\n";
}

// Specifically check the admin user
echo "\n=== CHECKING ADMIN USER ===\n";
$admin_user = 'admin';
$stmt = $conn->prepare("SELECT password, LENGTH(password) as pwd_len FROM users WHERE username = ?");
$stmt->bind_param("s", $admin_user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo "Admin user FOUND:\n";
    echo "Stored password: '{$user['password']}'\n";
    echo "Password length: {$user['pwd_len']}\n";
    echo "What you're sending: 'admin@1234'\n";
    echo "Length of what you're sending: " . strlen('admin@1234') . "\n";
    echo "Exact match: " . ($user['password'] === 'admin@1234' ? 'YES' : 'NO') . "\n";
    
    // Check character by character
    echo "\nCharacter analysis:\n";
    $stored = $user['password'];
    $sent = 'admin@1234';
    for ($i = 0; $i < max(strlen($stored), strlen($sent)); $i++) {
        $s_char = $i < strlen($stored) ? $stored[$i] : 'END';
        $t_char = $i < strlen($sent) ? $sent[$i] : 'END';
        $match = $s_char === $t_char ? '✓' : '✗';
        echo "Position $i: Stored='$s_char' Sent='$t_char' $match\n";
    }
} else {
    echo "Admin user '$admin_user' NOT FOUND in database!\n";
}

$conn->close();
?>