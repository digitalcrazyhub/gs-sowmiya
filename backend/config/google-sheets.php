<?php
/**
 * GS SOWMIYA BUILDERS — GOOGLE SHEETS SYNCHRONIZATION CONFIGURATION
 * File: /backend/config/google-sheets.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend;

if (!defined('GS_BACKEND_INIT') && php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Access Denied');
}

$credentialsPath = (string)env(
    'GOOGLE_SERVICE_ACCOUNT_PATH',
    dirname(__DIR__) . '/config/private/google-service-account.json'
);

return [
    'enabled' => (bool)env('GOOGLE_SHEETS_ENABLED', false),
    'spreadsheet_id' => (string)env('GOOGLE_SHEET_ID', ''),
    'range' => (string)env('GOOGLE_SHEET_RANGE', 'Leads!A:M'),
    'credentials_path' => $credentialsPath,
    'credentials_exist' => file_exists($credentialsPath) && is_readable($credentialsPath),
    'timeout' => 10,
];
