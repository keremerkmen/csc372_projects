<?php
include 'dbconnect.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "<p>Invalid sailor ID.</p>";
    exit;
}

$id = (int) $_GET['id'];

$sql = "SELECT r.*, e.event_name
        FROM roster r
        LEFT JOIN events e ON r.event_id = e.event_id
        WHERE r.sailor_id = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);
$sailor = $stmt->fetch();

if (!$sailor) {
    echo "<p>Sailor not found.</p>";
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($sailor['first_name'] . ' ' . $sailor['last_name']) ?> | URI Sailing</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1><?= htmlspecialchars($sailor['first_name'] . ' ' . $sailor['last_name']) ?></h1>
    <p><strong>Hometown:</strong> <?= htmlspecialchars($sailor['hometown']) ?></p>
    <p><strong>Position:</strong> <?= htmlspecialchars($sailor['position']) ?></p>
    <p><strong>Height:</strong> <?= htmlspecialchars($sailor['height']) ?></p>
    <p><strong>Weight:</strong> <?= htmlspecialchars($sailor['weight']) ?> lbs</p>
    <p><strong>Grade:</strong> <?= htmlspecialchars($sailor['grade']) ?></p>
    <p><strong>Event:</strong> <?= htmlspecialchars($sailor['event_name'] ?? 'No Event Assigned') ?></p>
</body>
</html>
