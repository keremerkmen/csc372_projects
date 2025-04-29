<?php
// includes/validation.php
function checkTextLength(string $input, int $min, int $max): bool {
    $len = strlen(trim($input));
    return $len >= $min && $len <= $max;
}
function checkNumberRange($input, int $min, int $max): bool {
    return is_numeric($input) && $input >= $min && $input <= $max;
}
function validateOption(string $input, array $validOptions): bool {
    return in_array($input, $validOptions, true);
}