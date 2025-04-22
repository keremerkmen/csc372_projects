<?php
$type = "mysql";
$server = "192.185.2.183"; // or your actual IP if using Remote MySQL
$DB = "keremerk_roster";
$port = 3306;
$charset = "utf8mb4";

$username = "keremerk_rosterAdmin"; // replace with your DB username
$password = "urisailing"; // replace with your DB password

$dsn = "$type:host=$server;dbname=$DB;port=$port;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>