<?php
include 'dbconnect.php';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "INSERT INTO roster (first_name, last_name, hometown, position, height, weight, grade, event_id)
            VALUES (:first_name, :last_name, :hometown, :position, :height, :weight, :grade, :event_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'hometown' => $_POST['hometown'],
        'position' => $_POST['position'],
        'height' => $_POST['height'],
        'weight' => $_POST['weight'],
        'grade' => $_POST['grade'],
        'event_id' => $_POST['event_id'] !== "" ? $_POST['event_id'] : null
    ]);
    echo "<p>New sailor added!</p>";
}

// Fetch events for dropdown
$events = $pdo->query("SELECT event_id, event_name FROM events")->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add Sailor</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h2>Add New Sailor</h2>
    <form method="POST">
        <label>First Name: <input name="first_name" required></label><br>
        <label>Last Name: <input name="last_name" required></label><br>
        <label>Hometown: <input name="hometown" required></label><br>
        <label>Position: <input name="position" required></label><br>
        <label>Height: <input name="height" required></label><br>
        <label>Weight: <input name="weight" type="number" required></label><br>
        <label>Grade: <input name="grade" required></label><br>

        <label>Event:
            <select name="event_id">
                <option value="">None</option>
                <?php foreach ($events as $event): ?>
                    <option value="<?= $event['event_id'] ?>">
                        <?= htmlspecialchars($event['event_name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label><br>

        <button type="submit">Add Sailor</button>
    </form>
</body>
</html>
