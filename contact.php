<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Replace these with your email configuration
    $to = "your-email@example.com";
    $subject = "New Contact Message from robertschmidt.dev";

    // Collect and sanitize form input
    $name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // reCAPTCHA validation
    $recaptcha_secret = "YOUR_SECRET_KEY"; // Replace with your secret key
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = [
        'secret'   => $recaptcha_secret,
        'response' => $recaptcha_response
    ];

    // Use file_get_contents for simplicity; curl is also a common alternative
    $options = [
      'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($recaptcha_data)
      ]
    ];
    $context  = stream_context_create($options);
    $verify = file_get_contents($recaptcha_url, false, $context);
    $captcha_success = json_decode($verify);

    if ($captcha_success->success == false) {
        echo "CAPTCHA validation failed. Please go back and try again.";
        exit;
    }

    // Compose email content
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n";

    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Thanks for contacting me! I will get back to you soon.";
    } else {
        echo "Oops! Something went wrong sending your message. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
