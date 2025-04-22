<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connect to database
include 'dbconnect.php';

// Updated SQL to include event names
$sql = "SELECT r.*, e.event_name 
        FROM roster r
        LEFT JOIN events e ON r.event_id = e.event_id
        ORDER BY r.grade DESC, r.last_name ASC";
$stmt = $pdo->query($sql);
$sailors = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Roster | URI Sailing Team</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Header -->
  <header>
    <div class="container">
      <img src="images/logo.png" alt="URI Sailing Team Logo" class="logo" />
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="roster.php">Roster</a></li>
          <li><a href="recruitment.html">Recruitment</a></li>
          <li><a href="contact.php">Contact</a></li>
          <li><a href="schedule.html">Schedule</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container">
    <h2>Meet Our Team</h2>
    <p>Our roster is composed of talented sailors from various backgrounds. Each member brings unique strengths and experiences to the URI Sailing Team.</p>

    <table class="roster-table">
      <thead>
        <tr>
          <th>Headshot</th>
          <th>Name</th>
          <th>Class</th>
          <th>Hometown</th>
          <th>Position</th>
          <th>Event</th>
          <th>Height</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($sailors): ?>
          <?php foreach ($sailors as $sailor): ?>
            <tr>
              <td>
                <img src="images/roster/default.jpg" alt="Headshot of <?= htmlspecialchars($sailor['first_name'] . ' ' . $sailor['last_name']) ?>" class="headshot">
              </td>
              <td><?= htmlspecialchars($sailor['first_name'] . ' ' . $sailor['last_name']) ?></td>
              <td><?= htmlspecialchars($sailor['grade']) ?></td>
              <td><?= htmlspecialchars($sailor['hometown']) ?></td>
              <td><?= htmlspecialchars($sailor['position']) ?></td>
              <td><em><?= htmlspecialchars($sailor['event_name'] ?? 'No Event Assigned') ?></em></td>
              <td><?= htmlspecialchars($sailor['height']) ?></td>
              <td><?= htmlspecialchars($sailor['weight']) ?> lbs</td>
            </tr>
          <?php endforeach; ?>
        <?php else: ?>
          <tr><td colspan="8">No sailors found.</td></tr>
        <?php endif; ?>
      </tbody>
    </table>
  </main>

  <!-- Footer -->
  <footer class="container">
    <h2>Contact Us</h2>
    <p>Email: sailing@uri.edu</p>
    <p>Phone: (401) 874-1000</p>
    <p>Author: Kerem Erkmen</p>
    <p>Email: <a href="mailto:kerem@uri.edu">kerem@uri.edu</a></p>
    <p>&copy; 2025 URI Sailing Team. All rights reserved.</p>
  </footer>

</body>
</html>
