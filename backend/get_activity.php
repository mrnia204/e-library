<?php
  //require_once 'cors.php';
  include 'config.php';


  $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

  if ($user_id) {
      $stmt = $conn->prepare("SELECT * FROM activity_logs WHERE userid = ? ORDER BY logintime DESC");
      $stmt->bind_param("i", $user_id);
  } else {
      $stmt = $conn->prepare("SELECT * FROM activity_logs ORDER BY logintime DESC");
  }

  $stmt->execute();
  $result = $stmt->get_result();
  $activities = $result->fetch_all(MYSQLI_ASSOC);

  echo json_encode(["status" => "success", "data" => $activities]);

  $stmt->close();
  $conn->close();
?>
