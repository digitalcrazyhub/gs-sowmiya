<?php
/**
 * GS SOWMIYA BUILDERS — LEAD MANAGEMENT SERVICE
 * File: /backend/services/LeadService.php
 * Handles Lead validation, unique ID generation, MySQL persistence, and rate limiting.
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Services;

class LeadService {
    /**
     * Allowed construction service categories
     */
    public const VALID_SERVICES = [
        'Residential Construction',
        'Joint Venture Development',
        'Living Spaces & Homes',
        'Construction Consultancy & Design',
        'Interior Design & Execution',
        'Architecture & Design',
    ];

    /**
     * Allowed form sources
     */
    public const VALID_SOURCES = [
        'homepage_contact',
        'contact_page',
    ];

    /**
     * Generate unique, human-readable reference Lead ID (e.g. GS-20261005-AB12CD)
     */
    public static function generateLeadId(): string {
        $datePart = date('Ymd');
        $bytes = random_bytes(3);
        $randomPart = strtoupper(bin2hex($bytes));
        return sprintf('GS-%s-%s', $datePart, $randomPart);
    }

    /**
     * Validate and sanitize client submission payload
     * @return array{isValid: bool, errors: array<string, string>, data: array<string, string>}
     */
    public static function validateInput(array $raw): array {
        $errors = [];
        $data = [];

        // 1. Full Name
        $name = trim((string)($raw['name'] ?? ''));
        if ($name === '') {
            $errors['name'] = 'Please enter your full name.';
        } elseif (mb_strlen($name) < 2) {
            $errors['name'] = 'Name must be at least 2 characters.';
        } elseif (mb_strlen($name) > 150) {
            $errors['name'] = 'Name must not exceed 150 characters.';
        } else {
            $data['name'] = strip_tags($name);
        }

        // 2. Phone Number
        $phoneRaw = trim((string)($raw['phone'] ?? ''));
        $phoneDigits = preg_replace('/[^\d]/', '', $phoneRaw);
        if ($phoneDigits === '' || $phoneDigits === null) {
            $errors['phone'] = 'Please provide a valid contact number.';
        } elseif (strlen($phoneDigits) < 8 || strlen($phoneDigits) > 15) {
            $errors['phone'] = 'Please enter a valid phone number (8-15 digits).';
        } else {
            $data['phone'] = strip_tags($phoneRaw);
        }

        // 3. Email Address
        $email = trim((string)($raw['email'] ?? ''));
        if ($email === '') {
            $errors['email'] = 'Please provide your email address.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address.';
        } elseif (strlen($email) > 150) {
            $errors['email'] = 'Email must not exceed 150 characters.';
        } else {
            $data['email'] = strtolower($email);
        }

        // 4. Project Location
        $location = trim((string)($raw['location'] ?? ''));
        if ($location === '') {
            $errors['location'] = 'Please enter project location / city.';
        } elseif (mb_strlen($location) < 2) {
            $errors['location'] = 'Location must be at least 2 characters.';
        } elseif (mb_strlen($location) > 150) {
            $errors['location'] = 'Location must not exceed 150 characters.';
        } else {
            $data['location'] = strip_tags($location);
        }

        // 5. Service Category
        $service = trim((string)($raw['service'] ?? ''));
        if ($service === '' || $service === 'Select a Service' || $service === 'Select Category') {
            $errors['service'] = 'Please select a construction service.';
        } elseif (!in_array($service, self::VALID_SERVICES, true)) {
            // Check if it matches loosely or sanitize
            $matched = false;
            foreach (self::VALID_SERVICES as $valid) {
                if (strcasecmp($valid, $service) === 0) {
                    $service = $valid;
                    $matched = true;
                    break;
                }
            }
            if (!$matched && mb_strlen($service) <= 100) {
                $data['service'] = strip_tags($service);
            } elseif (!$matched) {
                $errors['service'] = 'Please select a valid construction service.';
            } else {
                $data['service'] = $service;
            }
        } else {
            $data['service'] = $service;
        }

        // 6. Project Message / Details
        $message = trim((string)($raw['message'] ?? ''));
        if ($message === '') {
            $errors['message'] = 'Please describe your project requirements.';
        } elseif (mb_strlen($message) < 10) {
            $errors['message'] = 'Please provide at least 10 characters detailing your scope.';
        } elseif (mb_strlen($message) > 5000) {
            $errors['message'] = 'Message is too long (maximum 5000 characters).';
        } else {
            $data['message'] = strip_tags($message);
        }

        // 7. Form Origin Source
        $sourceRaw = trim((string)($raw['source'] ?? ''));
        if (in_array($sourceRaw, self::VALID_SOURCES, true)) {
            $data['source'] = $sourceRaw;
        } elseif ($sourceRaw === 'home' || str_contains($sourceRaw, 'home')) {
            $data['source'] = 'homepage_contact';
        } else {
            $data['source'] = 'contact_page';
        }

        return [
            'isValid' => count($errors) === 0,
            'errors' => $errors,
            'data' => $data,
        ];
    }

    /**
     * Check and record IP rate limit (returns false if limit exceeded)
     */
    public static function checkRateLimit(string $ip, int $maxHits = 5, int $windowSeconds = 600): bool {
        if ($ip === '' || $ip === '127.0.0.1' || $ip === '::1') {
            return true;
        }

        try {
            $pdo = Database::getConnection();
            $now = time();
            $windowStart = $now - ($now % $windowSeconds);

            // Cleanup old records older than 24 hours periodically
            if (mt_rand(1, 20) === 1) {
                $cleanupStmt = $pdo->prepare('DELETE FROM `rate_limits` WHERE `window_start` < :expiry');
                $cleanupStmt->execute([':expiry' => $now - 86400]);
            }

            // Insert or increment hits for current window
            $sql = 'INSERT INTO `rate_limits` (`ip_address`, `endpoint`, `hits`, `window_start`)
                    VALUES (:ip, "contact", 1, :window_start)
                    ON DUPLICATE KEY UPDATE `hits` = `hits` + 1';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':ip' => $ip,
                ':window_start' => $windowStart,
            ]);

            // Query current count
            $queryStmt = $pdo->prepare('SELECT `hits` FROM `rate_limits` WHERE `ip_address` = :ip AND `endpoint` = "contact" AND `window_start` = :window_start');
            $queryStmt->execute([
                ':ip' => $ip,
                ':window_start' => $windowStart,
            ]);
            $hits = (int)$queryStmt->fetchColumn();

            return $hits <= $maxHits;
        } catch (\Throwable $e) {
            // Fallback gracefully on rate limit DB issue to avoid blocking legitimate enquiries
            error_log('Rate limit check warning: ' . $e->getMessage());
            return true;
        }
    }

    /**
     * Save verified lead to MySQL as authoritative source of truth.
     * Committed to database BEFORE any external service calls occur.
     */
    public static function createLead(
        array $validData,
        ?string $ip,
        ?string $userAgent,
        ?float $recaptchaScore = null,
        ?string $recaptchaAction = null
    ): array {
        $pdo = Database::getConnection();

        $leadId = self::generateLeadId();

        // Begin transaction to ensure atomic insertion
        $pdo->beginTransaction();

        try {
            $sql = 'INSERT INTO `leads` (
                        `lead_id`, `source`, `name`, `email`, `phone`, `service`,
                        `location`, `message`, `ip_address`, `user_agent`,
                        `recaptcha_score`, `recaptcha_action`,
                        `processing_status`, `google_sheet_status`, `company_email_status`, `customer_email_status`,
                        `created_at`, `updated_at`
                    ) VALUES (
                        :lead_id, :source, :name, :email, :phone, :service,
                        :location, :message, :ip_address, :user_agent,
                        :recaptcha_score, :recaptcha_action,
                        "pending", "pending", "pending", "pending",
                        NOW(), NOW()
                    )';

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':lead_id' => $leadId,
                ':source' => $validData['source'],
                ':name' => $validData['name'],
                ':email' => $validData['email'],
                ':phone' => $validData['phone'],
                ':service' => $validData['service'],
                ':location' => $validData['location'],
                ':message' => $validData['message'],
                ':ip_address' => $ip ? substr($ip, 0, 45) : null,
                ':user_agent' => $userAgent ? substr($userAgent, 0, 500) : null,
                ':recaptcha_score' => $recaptchaScore,
                ':recaptcha_action' => $recaptchaAction,
            ]);

            $id = (int)$pdo->lastInsertId();

            // COMMIT IMMEDIATELY to guarantee MySQL persistence
            $pdo->commit();

            return [
                'id' => $id,
                'lead_id' => $leadId,
                'source' => $validData['source'],
                'name' => $validData['name'],
                'email' => $validData['email'],
                'phone' => $validData['phone'],
                'service' => $validData['service'],
                'location' => $validData['location'],
                'message' => $validData['message'],
                'created_at' => date('Y-m-d H:i:s'),
            ];
        } catch (\Throwable $e) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            error_log('Failed to persist lead into MySQL: ' . $e->getMessage());
            throw new \RuntimeException('Unable to record enquiry at this time.');
        }
    }

    /**
     * Retrieve leads pending synchronization or retry
     * @return array<array<string, mixed>>
     */
    public static function getPendingLeads(int $limit = 20): array {
        $pdo = Database::getConnection();

        $sql = 'SELECT * FROM `leads`
                WHERE `processing_status` IN ("pending", "processing")
                   OR (
                       `processing_status` = "failed"
                       AND `processing_attempts` < 5
                       AND (`next_attempt_at` IS NULL OR `next_attempt_at` <= NOW())
                   )
                ORDER BY `id` ASC
                LIMIT :limit';

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    /**
     * Update individual service statuses and queue tracking metadata
     */
    public static function updateLeadStatuses(int $id, array $updates): void {
        $pdo = Database::getConnection();

        $allowedFields = [
            'processing_status',
            'google_sheet_status',
            'company_email_status',
            'customer_email_status',
            'processing_attempts',
            'last_attempt_at',
            'next_attempt_at',
            'last_error',
        ];

        $setParts = [];
        $params = [':id' => $id];

        foreach ($updates as $key => $val) {
            if (in_array($key, $allowedFields, true)) {
                $paramKey = ':' . $key;
                $setParts[] = "`{$key}` = {$paramKey}";
                $params[$paramKey] = $val;
            }
        }

        if (empty($setParts)) {
            return;
        }

        $setParts[] = '`updated_at` = NOW()';
        $sql = 'UPDATE `leads` SET ' . implode(', ', $setParts) . ' WHERE `id` = :id';

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
    }
}
