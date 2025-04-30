<?php
session_start();
include 'includes/validation.php';

// ─────────────────────────────────────────────────
// 1) Define a simple Inquiry class
class Inquiry {
    private string $name;
    private string $age;
    private string $gender;

    public function __construct(string $name, string $age, string $gender) {
        $this->name   = trim($name);
        $this->age    = trim($age);
        $this->gender = trim($gender);
    }

    public function getName(): string   { return $this->name; }
    public function getAge(): string    { return $this->age; }
    public function getGender(): string { return $this->gender; }
}

// 2) Instantiate two sample inquiries
$sample1 = new Inquiry('Alice Smith', '21', 'Female');
$sample2 = new Inquiry('Bob Jones',  '22', 'Male');

// ─────────────────────────────────────────────────
// 3) Form processing
$message    = "";
$formData   = ['name'=>'', 'age'=>'', 'gender'=>''];
$formErrors = ['name'=>'', 'age'=>'', 'gender'=>''];
$success    = false;

// Populate on POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData['name']   = trim($_POST['name']   ?? '');
    $formData['age']    = trim($_POST['age']    ?? '');
    $formData['gender'] = trim($_POST['gender'] ?? '');

    // Validate each field
    if (!checkTextLength($formData['name'], 2, 50)) {
        $formErrors['name'] = "Name must be between 2 and 50 characters.";
    }
    if (!checkNumberRange($formData['age'], 1, 120)) {
        $formErrors['age'] = "Age must be a number between 1 and 120.";
    }
    if (!validateOption($formData['gender'], ['Male','Female'])) {
        $formErrors['gender'] = "Please select a valid gender.";
    }

    // If no errors, set session + cookie and mark success
    if (empty($formErrors['name'] . $formErrors['age'] . $formErrors['gender'])) {
        $_SESSION['visitor'] = $formData['name'];
        setcookie('visitor_name', $formData['name'], time()+86400*30, '/');
        $message = "Thank you, {$formData['name']}! Your inquiry has been received.";
        $success = true;
    } else {
        $message = "Please fix the following errors and resubmit.";
    }
}

// Handle logout
if (isset($_GET['logout']) && $_GET['logout']==='true') {
    session_unset();
    session_destroy();
    setcookie('visitor_name', '', time()-3600, '/');
    $message = "Session ended.";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact | URI Sailing Team</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Header -->
  <header>
    <div class="container">
      <img src="images/logo.png" alt="URI Sailing Team Logo" class="logo">
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
    <h2>Contact the URI Sailing Team</h2>

    <!-- Static Contact Info -->
    <p>If you have any questions, please reach out:</p>
    <p><strong>Email:</strong> <a href="mailto:sailing@uri.edu">sailing@uri.edu</a></p>
    <p><strong>Phone:</strong> (401) 874-1000</p>

    <!-- Display welcome message if cookie exists -->
    <?php if (!empty($_COOKIE['visitor_name'])): ?>
      <p>Welcome back, <?= htmlspecialchars($_COOKIE['visitor_name']) ?>!</p>
    <?php endif; ?>

    <!-- Display sample Inquiry objects -->
    <section>
      <h3>Sample Visitors</h3>
      <p>
        <strong><?= htmlspecialchars($sample1->getName()) ?></strong>,
        Age <?= htmlspecialchars($sample1->getAge()) ?>,
        Gender: <?= htmlspecialchars($sample1->getGender()) ?>
      </p>
      <p>
        <strong><?= htmlspecialchars($sample2->getName()) ?></strong>,
        Age <?= htmlspecialchars($sample2->getAge()) ?>,
        Gender: <?= htmlspecialchars($sample2->getGender()) ?>
      </p>
    </section>

    <!-- Feedback Message -->
    <?php if ($message): ?>
      <div class="<?= $success ? 'success-message' : 'error-messages' ?>">
        <p><?= htmlspecialchars($message) ?></p>
        <?php if (!$success): ?>
          <ul>
            <?php foreach ($formErrors as $field => $err): ?>
              <?php if ($err): ?>
                <li><?= htmlspecialchars($err) ?></li>
              <?php endif; ?>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <!-- Contact Form -->
    <form action="contact.php" method="post" novalidate>
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"
             value="<?= htmlspecialchars($formData['name']) ?>"><br><br>

      <label for="age">Age:</label><br>
      <input type="number" id="age" name="age"
             value="<?= htmlspecialchars($formData['age']) ?>"><br><br>

      <label>Gender:</label><br>
      <input type="radio" id="male" name="gender" value="Male"
        <?= $formData['gender']==='Male' ? 'checked' : '' ?>>
      <label for="male">Male</label>
      <input type="radio" id="female" name="gender" value="Female"
        <?= $formData['gender']==='Female' ? 'checked' : '' ?>>
      <label for="female">Female</label><br><br>

      <button type="submit">Submit</button>
    </form>

    <!-- End Session Link -->
    <p><a href="contact.php?logout=true">End Session</a></p>

    <!-- Display session data -->
    <?php if (!empty($_SESSION['visitor'])): ?>
      <p>Session visitor: <?= htmlspecialchars($_SESSION['visitor']) ?></p>
    <?php endif; ?>
  </main>

  <footer>
  <h2>Contact Us</h2>
  <p>Email: sailing@uri.edu</p>
  <p>Phone: (401) 874-1000</p>
  <p>Author: Kerem Erkmen</p>
  <p>Email: <a href="mailto:kerem@uri.edu">kerem@uri.edu</a></p>
  <p>&copy; 2025 URI Sailing Team. All rights reserved.</p>
</footer>
</body>
</html>
