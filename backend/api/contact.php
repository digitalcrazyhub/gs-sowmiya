<?php
/**
 * GS SOWMIYA BUILDERS — PRIMARY LEAD INTAKE API ENDPOINT
 * File: /backend/api/contact.php
 * Handles POST submissions for both Homepage & Contact Page enquiry forms.
 * Enforces rate limiting, reCAPTCHA v3 verification, server-side data validation,
 * and immediate transactional MySQL persistence before secondary integrations.
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Api;

define('GS_BACKEND_INIT', true);

// Autoload services and configurations
require_once dirname(__DIR__) . '/config/app.php';
require_once dirname(__DIR__) . '/services/Database.php';
require_once dirname(__DIR__) . '/services/LeadService.php';
require_once dirname(__DIR__) . '/services/RecaptchaService.php';
require_once dirname(__DIR__) . '/services/EmailService.php';
require_once dirname(__DIR__) . '/services/GoogleSheetsService.php';

use GSSowmiya\Backend\Services\Database;
use GSSowmiya\Backend\Services\LeadService;
use GSSowmiya\Backend\Services\RecaptchaService;
use GSSowmiya\Backend\Services\EmailService;
use GSSowmiya\Backend\Services\GoogleSheetsService;

// Load application configuration
$appConfig = require dirname(__DIR__) . '/config/app.php';

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Content-Type: application/json; charset=UTF-8');

// CORS Policy: Allow same-origin, or configured site URL
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = $appConfig['url'] ?? '';

if ($origin !== '') {
    $parsedOrigin = parse_url($origin, PHP_URL_HOST);
    $parsedAllowed = parse_url($allowedOrigin, PHP_URL_HOST);

    if (
        $origin === $allowedOrigin ||
        ($parsedOrigin && $parsedAllowed && str_ends_with($parsedOrigin, $parsedAllowed)) ||
        $origin === 'http://localhost:3000' ||
        $origin === 'http://127.0.0.1:3000'
    ) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
    }
}

// Handle CORS Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Enforce POST method only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST is accepted.',
    ]);
    exit;
}

// Extract Client IP address safely
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) { // Cloudflare Support
    $clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'];
} elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
    $clientIp = $_SERVER['HTTP_X_REAL_IP'];
}

$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Check Request Size Limit (Max 50 KB)
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 51200) {
    http_response_code(413);
    echo json_encode([
        'success' => false,
        'message' => 'Payload size exceeds the allowable limit.',
    ]);
    exit;
}

// Parse Raw Input Body
$rawInput = file_get_contents('php://input');
$data = [];

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (str_contains($contentType, 'application/json')) {
    $decoded = json_decode($rawInput, true);
    if (!is_array($decoded)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON payload received.',
        ]);
        exit;
    }
    $data = $decoded;
} else {
    // Form-encoded or multipart fallback
    $data = $_POST;
}

// 1. Rate Limiting Protection (5 submissions per 10 mins per IP)
$rateLimitMax = $appConfig['rate_limit']['max_hits'] ?? 5;
$rateLimitWindow = $appConfig['rate_limit']['window_seconds'] ?? 600;

if (!LeadService::checkRateLimit($clientIp, $rateLimitMax, $rateLimitWindow)) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many enquiries submitted from this network. Please wait a few minutes or call us directly at +91 90431 56670.',
    ]);
    exit;
}

// 2. Google reCAPTCHA v3 Server-Side Verification
$recaptchaToken = (string)($data['recaptcha_token'] ?? $data['g-recaptcha-response'] ?? '');
$recaptchaResult = RecaptchaService::verify($recaptchaToken, $clientIp);

if (!$recaptchaResult['success']) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $recaptchaResult['error'] ?? 'Security verification failed. Please refresh and try again.',
    ]);
    exit;
}

// 3. Strict Server-Side Input Validation
$validation = LeadService::validateInput($data);
if (!$validation['isValid']) {
    http_response_code(422);
    $firstError = reset($validation['errors']) ?: 'Please fill in all required fields accurately.';
    echo json_encode([
        'success' => false,
        'message' => $firstError,
        'errors' => $validation['errors'],
    ]);
    exit;
}

$validData = $validation['data'];

// 4. PERSIST TO MYSQL FIRST (MySQL is the authoritative source of truth)
try {
    $leadRecord = LeadService::createLead(
        validData: $validData,
        ip: $clientIp,
        userAgent: $userAgent,
        recaptchaScore: $recaptchaResult['score'],
        recaptchaAction: $recaptchaResult['action']
    );
} catch (\Throwable $dbErr) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'We encountered a database error while recording your enquiry. Please call us directly at +91 90431 56670.',
    ]);
    exit;
}

// 5. Send Immediate Success Response to Customer
// The customer should not wait for external SMTP or Sheets calls
$responsePayload = [
    'success' => true,
    'message' => 'Your enquiry has been received. Our team will review your requirements and get in touch with you soon.',
    'lead_id' => $leadRecord['lead_id'],
];

http_response_code(200);

// If running in FastCGI, finish the HTTP response immediately so the user sees instant success!
if (function_exists('fastcgi_finish_request')) {
    echo json_encode($responsePayload);
    fastcgi_finish_request();
    // Continue background dispatch
    processSecondaryServices($leadRecord);
    exit;
}

// In standard CGI / CLI / Apache without fastcgi_finish_request:
// Perform secondary dispatches safely, guaranteeing MySQL record remains safe regardless of outcome
echo json_encode($responsePayload);

// Flush buffer to browser
if (ob_get_level() > 0) {
    ob_end_flush();
}
flush();

// Secondary Dispatch Routine
processSecondaryServices($leadRecord);
exit;

/**
 * Secondary integration processing (isolated, non-blocking for lead integrity)
 */
function processSecondaryServices(array $leadRecord): void {
    $leadId = (int)$leadRecord['id'];
    $updates = [];

    // A. Company Notification Email
    try {
        $mailRes = EmailService::sendCompanyNotification($leadRecord);
        $updates['company_email_status'] = $mailRes['success'] ? 'success' : 'failed';
        if (!$mailRes['success'] && !empty($mailRes['error'])) {
            $updates['last_error'] = 'Company Mail: ' . $mailRes['error'];
        }
    } catch (\Throwable $e) {
        $updates['company_email_status'] = 'failed';
        $updates['last_error'] = 'Company Mail Exception: ' . $e->getMessage();
    }

    // B. Customer Confirmation Email
    try {
        $custMailRes = EmailService::sendCustomerConfirmation($leadRecord);
        $updates['customer_email_status'] = $custMailRes['success'] ? 'success' : 'failed';
    } catch (\Throwable $e) {
        $updates['customer_email_status'] = 'failed';
    }

    // C. Google Sheets Synchronization
    try {
        $sheetRes = GoogleSheetsService::appendLead($leadRecord);
        $updates['google_sheet_status'] = $sheetRes['success'] ? 'success' : 'failed';
        if (!$sheetRes['success'] && !empty($sheetRes['error'])) {
            $updates['last_error'] = ($updates['last_error'] ?? '') . ' | Sheets: ' . $sheetRes['error'];
        }
    } catch (\Throwable $e) {
        $updates['google_sheet_status'] = 'failed';
    }

    // Determine overall processing status
    $isComplete = ($updates['company_email_status'] ?? '') === 'success' &&
                 ($updates['customer_email_status'] ?? '') === 'success' &&
                 ($updates['google_sheet_status'] ?? '') === 'success';

    $updates['processing_status'] = $isComplete ? 'completed' : 'processing';
    $updates['last_attempt_at'] = date('Y-m-d H:i:s');
    $updates['processing_attempts'] = 1;

    try {
        LeadService::updateLeadStatuses($leadId, $updates);
    } catch (\Throwable $e) {
        error_log('Failed to update lead status tracking: ' . $e->getMessage());
    }
}
