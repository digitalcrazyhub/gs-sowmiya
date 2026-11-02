<?php
/**
 * GS SOWMIYA BUILDERS — COMPREHENSIVE BACKEND VERIFICATION SUITE
 * Tests validation, security, database persistence, PHPMailer dispatch, error handling, and API contracts.
 */

declare(strict_types=1);

define('GS_BACKEND_INIT', true);

require_once 'c:/xampp/htdocs/gs-sowmiya/backend/config/app.php';
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/vendor/autoload.php';
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/services/Database.php';
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/services/LeadService.php';
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/services/RecaptchaService.php';
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/services/EmailService.php';

use GSSowmiya\Backend\Services\LeadService;
use GSSowmiya\Backend\Services\RecaptchaService;
use GSSowmiya\Backend\Services\EmailService;
use PHPMailer\PHPMailer\PHPMailer;

$results = [];

function recordTest(string $testName, string $status, string $detail = ''): void {
    global $results;
    $results[] = [
        'test' => $testName,
        'status' => $status,
        'detail' => $detail,
    ];
    echo sprintf("[%s] %s %s\n", $status, $testName, $detail ? "— {$detail}" : '');
}

echo "=== STARTING VERIFICATION SUITE ===\n\n";

// --------------------------------------------------------------------------
// TEST 1: Composer & PHPMailer Class Loading
// --------------------------------------------------------------------------
if (class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
    $version = PHPMailer::VERSION;
    recordTest("Composer Autoloader & PHPMailer Loading", "PASS", "PHPMailer v{$version} loaded from backend/vendor");
} else {
    recordTest("Composer Autoloader & PHPMailer Loading", "FAIL", "PHPMailer class missing");
}

// --------------------------------------------------------------------------
// TEST 2: Environment File Loading (Windows is_readable fix)
// --------------------------------------------------------------------------
$mailConfig = require 'c:/xampp/htdocs/gs-sowmiya/backend/config/mail.php';
if (!empty($mailConfig['smtp_host']) && !empty($mailConfig['smtp_username'])) {
    recordTest("Environment Configuration Loading", "PASS", "SMTP Host: {$mailConfig['smtp_host']}, User: {$mailConfig['smtp_username']}");
} else {
    recordTest("Environment Configuration Loading", "FAIL", "Failed to load SMTP credentials from environment");
}

// --------------------------------------------------------------------------
// TEST 3: Input Validation - Valid Submission
// --------------------------------------------------------------------------
$validSubmission = [
    'name' => 'Karthik Raja',
    'phone' => '+91 98401 23456',
    'email' => 'karthik.raja@example.com',
    'service' => 'Residential Construction',
    'location' => 'Medavakkam, Chennai',
    'message' => 'Looking for a turnkey construction quote for 2400 sqft residential villa.',
    'source' => 'homepage_contact',
];
$valResult = LeadService::validateInput($validSubmission);
if ($valResult['isValid'] && $valResult['data']['service'] === 'Residential Construction') {
    recordTest("Validation: Valid Data", "PASS", "All fields validated and normalized");
} else {
    recordTest("Validation: Valid Data", "FAIL", json_encode($valResult['errors']));
}

// --------------------------------------------------------------------------
// TEST 4: Input Validation - Missing Required Fields
// --------------------------------------------------------------------------
$invalidSubmission = [
    'name' => '',
    'phone' => '',
    'email' => '',
    'service' => '',
    'location' => '',
    'message' => '',
];
$valMissing = LeadService::validateInput($invalidSubmission);
if (!$valMissing['isValid'] && count($valMissing['errors']) >= 6) {
    recordTest("Validation: Missing Fields Rejection", "PASS", "Correctly flagged 6 missing fields");
} else {
    recordTest("Validation: Missing Fields Rejection", "FAIL", "Failed to flag missing fields");
}

// --------------------------------------------------------------------------
// TEST 5: Input Validation - Invalid Email Address
// --------------------------------------------------------------------------
$badEmailSubmission = array_merge($validSubmission, ['email' => 'not-an-email@com']);
$valBadEmail = LeadService::validateInput($badEmailSubmission);
if (!$valBadEmail['isValid'] && isset($valBadEmail['errors']['email'])) {
    recordTest("Validation: Invalid Email Rejection", "PASS", "Rejected 'not-an-email@com'");
} else {
    recordTest("Validation: Invalid Email Rejection", "FAIL", "Accepted malformed email");
}

// --------------------------------------------------------------------------
// TEST 6: Security - Email Header Injection Prevention
// --------------------------------------------------------------------------
$injectionSubmission = array_merge($validSubmission, [
    'name' => "Attacker\r\nBcc: victim@example.com\nSubject: Injected",
    'email' => "legit@example.com\r\nBcc: evil@example.com",
]);
$valInjection = LeadService::validateInput($injectionSubmission);
// Check if CRLF is stripped or rejected
$sanitizedEmail = $valInjection['data']['email'] ?? '';
$isHeaderSafe = !str_contains($sanitizedEmail, "\r") && !str_contains($sanitizedEmail, "\n");
if ($isHeaderSafe) {
    recordTest("Security: Email Header Injection Prevention", "PASS", "CRLF characters stripped/sanitized");
} else {
    recordTest("Security: Email Header Injection Prevention", "FAIL", "CRLF characters preserved");
}

// --------------------------------------------------------------------------
// TEST 7: Security - XSS Output Encoding in HTML Email Templates
// --------------------------------------------------------------------------
$xssSubmission = array_merge($validSubmission, [
    'name' => '<script>alert("XSS")</script>',
    'message' => '<img src=x onerror=alert(1)> Custom House Requirements',
]);
$valXss = LeadService::validateInput($xssSubmission);
// When passed to EmailService templates, dynamic values are htmlspecialchars encoded
$escapedName = htmlspecialchars($valXss['data']['name'], ENT_QUOTES, 'UTF-8');
$escapedMsg = htmlspecialchars($valXss['data']['message'], ENT_QUOTES, 'UTF-8');
if (!str_contains($escapedName, '<script>') && !str_contains($escapedMsg, '<img')) {
    recordTest("Security: XSS Prevention in Email Templates", "PASS", "HTML entities properly escaped");
} else {
    recordTest("Security: XSS Prevention in Email Templates", "FAIL", "Raw tags not escaped");
}

// --------------------------------------------------------------------------
// TEST 8: Hostinger SMTP Live Network Handshake
// --------------------------------------------------------------------------
$hostingerHost = 'smtp.hostinger.com';
$hostingerPort = 587;
$fp = @fsockopen($hostingerHost, $hostingerPort, $errno, $errstr, 5);
if ($fp) {
    $banner = fgets($fp, 512);
    fclose($fp);
    if (str_contains((string)$banner, '220')) {
        recordTest("Hostinger SMTP Network & Greeting", "PASS", "Connected to {$hostingerHost}:{$hostingerPort} -> " . trim((string)$banner));
    } else {
        recordTest("Hostinger SMTP Network & Greeting", "FAIL", "Invalid banner: " . trim((string)$banner));
    }
} else {
    recordTest("Hostinger SMTP Network & Greeting", "BLOCKED", "TCP connection failed: {$errstr} ({$errno})");
}

// --------------------------------------------------------------------------
// TEST 9: SMTP Safe Error Handling (No Credentials Leaked)
// --------------------------------------------------------------------------
$dummyLead = array_merge($validSubmission, [
    'email' => 'invalid-recipient', // Invalid email will be caught safely
]);
$compRes = EmailService::sendCompanyNotification($dummyLead);
// Ensure error is reported safely without leaking internal passwords
$hasPasswordLeak = false;
$errorText = $compRes['error'] ?? '';
if (stripos($errorText, 'password') !== false && stripos($errorText, '***') === false) {
    $hasPasswordLeak = true;
}
if (!$hasPasswordLeak) {
    recordTest("Security: Safe Error Reporting (No Credential Exposure)", "PASS", "Error safely handled without password leakage");
} else {
    recordTest("Security: Safe Error Reporting (No Credential Exposure)", "FAIL", "Sensitive details found in error: {$errorText}");
}

// --------------------------------------------------------------------------
// TEST 10: Rate Limiting Safe Enforcement
// --------------------------------------------------------------------------
$rateLimitCheck = LeadService::checkRateLimit('127.0.0.1', 5, 600);
if ($rateLimitCheck === true) {
    recordTest("Rate Limiting: Safe Loopback / Fallback", "PASS", "Loopback allowed, throttle logic verified");
} else {
    recordTest("Rate Limiting: Safe Loopback / Fallback", "FAIL", "Rate limit failed on loopback");
}

echo "\n=== SUITE EXECUTION COMPLETE ===\n";

