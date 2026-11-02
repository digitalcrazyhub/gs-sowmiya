<?php
/**
 * GS SOWMIYA BUILDERS — DATABASE CONNECTION SERVICE
 * File: /backend/services/Database.php
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Services;

class Database {
    private static ?\PDO $pdo = null;

    /**
     * Get or initialize PDO connection instance
     */
    public static function getConnection(): \PDO {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        if (!defined('GS_BACKEND_INIT')) {
            define('GS_BACKEND_INIT', true);
        }

        $config = require dirname(__DIR__) . '/config/database.php';

        if (empty($config['dbname'])) {
            throw new \RuntimeException('Database configuration error: DB_NAME is not set.');
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $config['host'],
            $config['port'],
            $config['dbname'],
            $config['charset']
        );

        try {
            self::$pdo = new \PDO(
                $dsn,
                $config['username'],
                $config['password'],
                $config['options']
            );
        } catch (\PDOException $e) {
            // Do not leak raw database credentials or stack in production
            error_log('Database Connection Failure: ' . $e->getMessage());
            throw new \RuntimeException('Unable to connect to lead database.');
        }

        return self::$pdo;
    }

    /**
     * Close connection explicitly
     */
    public static function close(): void {
        self::$pdo = null;
    }
}
