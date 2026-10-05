<?php
/**
 * GS SOWMIYA BUILDERS — APPLICATION CONFIGURATION
 * File: /backend/config/app.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend;

// Prevent direct script execution from web
if (!defined('GS_BACKEND_INIT') && php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Access Denied');
}

/**
 * Lightweight .env file loader for Hostinger / Apache / CLI environments
 */
function loadEnv(string $envPath): void {
    if (!file_exists($envPath) || !is_readable($envPath)) {
        return;
    }

    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $pos = strpos($line, '=');
        if ($pos === false) {
            continue;
        }

        $key = trim(substr($line, 0, $pos));
        $val = trim(substr($line, $pos + 1));

        // Strip surrounding quotes
        if (
            (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
            (str_starts_with($val, "'") && str_ends_with($val, "'"))
        ) {
            $val = substr($val, 1, -1);
        }

        if (!array_key_exists($key, $_SERVER) && !array_key_exists($key, $_ENV)) {
            putenv("{$key}={$val}");
            $_ENV[$key] = $val;
            $_SERVER[$key] = $val;
        }
    }
}

// Auto-load .env from /backend/.env if exists
loadEnv(dirname(__DIR__) . '/.env');

/**
 * Safe environment getter with fallback default
 */
function env(string $key, mixed $default = null): mixed {
    $val = getenv($key);
    if ($val === false) {
        $val = $_ENV[$key] ?? $_SERVER[$key] ?? $default;
    }

    if ($val === null) {
        return $default;
    }

    return match (strtolower((string)$val)) {
        'true', '(true)' => true,
        'false', '(false)' => false,
        'null', '(null)' => null,
        'empty', '(empty)' => '',
        default => $val,
    };
}

// Timezone setup
$timezone = (string)env('TIMEZONE', 'Asia/Kolkata');
date_default_timezone_set($timezone);

return [
    'env' => (string)env('APP_ENV', 'production'),
    'debug' => (bool)env('APP_DEBUG', false),
    'url' => rtrim((string)env('APP_URL', 'https://gssowmiyabuilders.com'), '/'),
    'timezone' => $timezone,

    // Rate Limiting Policy
    'rate_limit' => [
        'max_hits' => (int)env('RATE_LIMIT_MAX_HITS', 5),
        'window_seconds' => (int)env('RATE_LIMIT_WINDOW_SECONDS', 600), // 10 minutes
    ],

    // Logging Path
    'log_path' => dirname(__DIR__) . '/logs/app.log',
];
