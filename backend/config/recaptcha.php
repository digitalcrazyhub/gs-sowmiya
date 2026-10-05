<?php
/**
 * GS SOWMIYA BUILDERS — GOOGLE reCAPTCHA v3 CONFIGURATION
 * File: /backend/config/recaptcha.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend;

if (!defined('GS_BACKEND_INIT') && php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Access Denied');
}

return [
    'enabled' => (bool)env('RECAPTCHA_ENABLED', false),
    'site_key' => (string)env('RECAPTCHA_SITE_KEY', ''),
    'secret_key' => (string)env('RECAPTCHA_SECRET_KEY', ''),
    'min_score' => (float)env('RECAPTCHA_MIN_SCORE', 0.5),
    'expected_action' => (string)env('RECAPTCHA_EXPECTED_ACTION', 'submit_enquiry'),
    'verify_url' => 'https://www.google.com/recaptcha/api/siteverify',
    'timeout' => 5,
];
