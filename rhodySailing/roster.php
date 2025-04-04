<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define the Sailor class
class Sailor {
  protected $name;
  protected $year;
  protected $hometown;
  protected $position;
  protected $imagePath;

  public function __construct($name, $year, $hometown, $position, $imagePath) {
    $this->name = $name;
    $this->year = $year;
    $this->hometown = $hometown;
    $this->position = $position;
    $this->imagePath = $imagePath;
  }

  public function getName() {
    return $this->name;
  }

  public function getYear() {
    return $this->year;
  }

  public function getHometown() {
    return $this->hometown;
  }

  public function getPosition() {
    return $this->position;
  }

  public function getImagePath() {
    return $this->imagePath;
  }
}

// Create team member objects
$sailor1 = new Sailor("Jane Doe", "Senior", "Newport, RI", "Captain", "images/roster/images.jpg");
$sailor2 = new Sailor("John Smith", "Junior", "Providence, RI", "Co-Captain", "images/roster/john.jpg");
$sailor3 = new Sailor("Alex Johnson", "Sophomore", "Warwick, RI", "Team Member", "images/roster/alex.jpg");
$sailor4 = new Sailor("Maria Rodriguez", "Freshman", "Cranston, RI", "Team Member", "images/roster/maria.jpg");

$team = [$sailor1, $sailor2, $sailor3, $sailor4];
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
          <li><a href="contact.html">Contact</a></li>
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
        </tr>
      </thead>
      <tbody>
        <?php foreach ($team as $sailor): ?>
          <tr>
            <td><img src="<?php echo $sailor->getImagePath(); ?>" alt="Headshot of <?php echo $sailor->getName(); ?>" class="headshot"></td>
            <td><?php echo $sailor->getName(); ?></td>
            <td><?php echo $sailor->getYear(); ?></td>
            <td><?php echo $sailor->getHometown(); ?></td>
            <td><?php echo $sailor->getPosition(); ?></td>
          </tr>
        <?php endforeach; ?>
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
