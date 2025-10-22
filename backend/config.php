<?php 
  $host = 'localhost';
  $user = 'root';
  $pass = '';
  $db = 'elibrary_user_db';

  $conn = new mysqli($host, $user, $pass, $db);

  if ($conn -> connect_error) {
    die(json_encode(["success" => false, "message" => "DB connection failed".$conn->connect_error]));
  }

  
?>

