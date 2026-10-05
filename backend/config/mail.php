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

return [
    'smtp_host' => (string)env('SMTP_HOST', 'smtp.hostinger.com'),
    'smtp_port' => (int)env('SMTP_PORT', 465),
    'smtp_username' => (string)env('SMTP_USERNAME', ''),
    'smtp_password' => (string)env('SMTP_PASSWORD', ''),
    'smtp_encryption' => (string)env('SMTP_ENCRYPTION', 'ssl'), // 'ssl' or 'tls'

    // Authorized Company From Address
    'from_email' => (string)env('MAIL_FROM', 'no-reply@gssowmiyabuilders.com'),
    'from_name' => (string)env('MAIL_FROM_NAME', 'GS Sowmiya Builders'),

    // Company Recipient for Notifications
    'company_email' => (string)env('COMPANY_EMAIL', 'md@sowmiyabuilders.com'),
    'company_name' => (string)env('COMPANY_NAME', 'GS Sowmiya Builders Management'),

    // Timeout
    'timeout' => 10,
];
