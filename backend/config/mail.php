<?php
/**
 * GS SOWMIYA BUILDERS — MAIL & SMTP CONFIGURATION
 * File: /backend/config/mail.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend;

if (!defined('GS_BACKEND_INIT') && php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Access Denied');
}

require_once __DIR__ . '/app.php';

return [
    'smtp_host' => (string)env('SMTP_HOST', 'smtp.hostinger.com'),
    'smtp_port' => (int)env('SMTP_PORT', 587),
    'smtp_username' => (string)env('SMTP_USERNAME', 'info@gssowmiyabuilders.com'),
    'smtp_password' => (string)env('SMTP_PASSWORD', ''),
    'smtp_encryption' => (string)env('SMTP_ENCRYPTION', 'tls'), // 'tls' or 'ssl'

    // Outgoing From Address (Automated No-Reply)
    'from_email' => (string)env('MAIL_FROM', 'no-reply@gssowmiyabuilders.com'),
    'from_name' => (string)env('MAIL_FROM_NAME', 'GS Sowmiya Builders'),

    // Dedicated No-Reply Address
    'no_reply_email' => (string)env('NO_REPLY_EMAIL', 'no-reply@gssowmiyabuilders.com'),

    // Company Recipient for Management Notifications
    'company_email' => (string)env('COMPANY_EMAIL', 'info@gssowmiyabuilders.com'),
    'company_name' => (string)env('COMPANY_NAME', 'GS Sowmiya Builders Management'),

    // Timeout
    'timeout' => 10,
];
