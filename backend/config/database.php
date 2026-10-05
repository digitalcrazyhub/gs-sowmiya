<?php
/**
 * GS SOWMIYA BUILDERS — DATABASE CONFIGURATION
 * File: /backend/config/database.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend;

if (!defined('GS_BACKEND_INIT') && php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit('Access Denied');
}

return [
    'host' => (string)env('DB_HOST', 'localhost'),
    'port' => (int)env('DB_PORT', 3306),
    'dbname' => (string)env('DB_NAME', ''),
    'username' => (string)env('DB_USER', ''),
    'password' => (string)env('DB_PASSWORD', ''),
    'charset' => (string)env('DB_CHARSET', 'utf8mb4'),
    'options' => [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES => false,
        \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'",
        \PDO::ATTR_TIMEOUT => 5,
    ],
];
