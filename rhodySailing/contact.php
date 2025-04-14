<?php
// Start the session and any other header-related functions
session_start();

// Function definitions (you can define your validation functions here)
function checkTextLength($input, $min, $max) {
    return (strlen($input) >= $min && strlen($input) <= $max);
}

function checkNumberRange($input, $min, $max) {
    return (is_numeric($input) && $input >= $min && $input <= $max);
}

function validateOption($input, $validOptions) {
    return in_array($input, $validOptions);
}

// Initialize variables
$message = "";
$formData = array('name' => '', 'age' => '', 'gender' => '');
$formErrors = array('name' => '', 'age' => '', 'gender' => '');

// Process form when submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formData['name'] = trim($_POST['name'] ?? '');
    $formData['age'] = trim($_POST['age'] ?? '');
    $formData['gender'] = trim($_POST['gender'] ?? '');

    if (!checkTextLength($formData['name'], 2, 50)) {
        $formErrors['name'] = "Name must be between 2 and 50 characters.";
    }
    if (!checkNumberRange($formData['age'], 1, 120)) {
        $formErrors['age'] = "Age must be a number between 1 and 120.";
    }
    if (!validateOption($formData['gender'], array("Male", "Female"))) {
        $formErrors['gender'] = "Please select a valid gender option.";
    }

    if (empty(implode("", $formErrors))) {
        $message = "Thank you! Your data is valid.";
        setcookie("visitor_name", $formData['name'], time() + 3600);
        $_SESSION['name'] = $formData['name'];
        $_SESSION['age'] = $formData['age'];
        $_SESSION['gender'] = $formData['gender'];
    } else {
        $allErrors = implode(" ", $formErrors);
        $message = "Please fix the following errors: " . $allErrors;
    }
}

// Check for session termination request
if (isset($_GET['logout']) && $_GET['logout'] == "true") {
    session_unset();
    session_destroy();
    $message = "Your session has been terminated.";
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
    <h2>Contact the URI Sailing Team</h2>
    <!-- Static Contact Info -->
    <p>If you have any questions, feel free to reach out.</p>
    <p><strong>Email:</strong> <a href="mailto:sailing@uri.edu">sailing@uri.edu</a></p>
    <p><strong>Phone:</strong> (401) 874-1000</p>

    <!-- Feedback Message -->
    <?php if (!empty($message)) : ?>
        <p><?php echo htmlspecialchars($message); ?></p>
    <?php endif; ?>

    <!-- Contact Form -->
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($formData['name']); ?>">
      <span style="color:red;"><?php echo $formErrors['name']; ?></span><br><br>

      <label for="age">Age:</label>
      <input type="number" id="age" name="age" value="<?php echo htmlspecialchars($formData['age']); ?>">
      <span style="color:red;"><?php echo $formErrors['age']; ?></span><br><br>

      <label>Gender:</label>
      <input type="radio" id="male" name="gender" value="Male" <?php if($formData['gender'] == "Male") echo "checked"; ?>>
      <label for="male">Male</label>
      <input type="radio" id="female" name="gender" value="Female" <?php if($formData['gender'] == "Female") echo "checked"; ?>>
      <label for="female">Female</label>
      <span style="color:red;"><?php echo $formErrors['gender']; ?></span><br><br>

      <button type="submit">Submit</button>
    </form>

    <!-- End Session Option -->
    <p><a href="<?php echo htmlspecialchars($_SERVER['PHP_SELF'] . '?logout=true'); ?>">End Session</a></p>
    
    <!-- Display Cookie and Session Data -->
    <?php
      if (isset($_COOKIE['visitor_name'])) {
          echo "<p>Welcome back, " . htmlspecialchars($_COOKIE['visitor_name']) . "!</p>";
      }
      if (isset($_SESSION['name'])) {
          echo "<p>Session Data: Name: " . htmlspecialchars($_SESSION['name']) .
               ", Age: " . htmlspecialchars($_SESSION['age']) .
               ", Gender: " . htmlspecialchars($_SESSION['gender']) . "</p>";
      }
    ?>
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
