<?php
header('Content-Type: application/json; charset=utf-8');

$recipient = 'nandinandisha22@gmail.com'; // change this to your email

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'message' => 'Please provide name, email and message.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Basic header sanitization to avoid header injection
$safeName = str_replace(["\r", "\n"], ['',''], $name);
$safeEmail = str_replace(["\r", "\n"], ['',''], $email);

$subject = "Portfolio contact from: " . $safeName;

$body = "You have a new message from your portfolio contact form.\n\n";
$body .= "Name: " . $safeName . "\n";
$body .= "Email: " . $safeEmail . "\n";
$body .= "Message:\n" . $message . "\n\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
$body .= "Time: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: " . $safeName . " <" . $safeEmail . ">\r\n";
$headers .= "Reply-To: " . $safeEmail . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$sent = false;
try {
    // Use PHP mail; many hosts require proper SMTP config for this to work.
    $sent = mail($recipient, $subject, $body, $headers);
} catch (Exception $e) {
    $sent = false;
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Make sure your server supports mail().']);
}

?>
