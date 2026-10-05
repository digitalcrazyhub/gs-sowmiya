<?php
/**
 * GS SOWMIYA BUILDERS — GOOGLE reCAPTCHA v3 SERVICE
 * File: /backend/services/RecaptchaService.php
 * Handles server-side validation of reCAPTCHA v3 response tokens.
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Services;

class RecaptchaService {
    /**
     * Verify token against Google's siteverify API
     * @return array{success: bool, score: ?float, action: ?string, error: ?string}
     */
    public static function verify(?string $token, ?string $clientIp = null): array {
        if (!defined('GS_BACKEND_INIT')) {
            define('GS_BACKEND_INIT', true);
        }

        $config = require dirname(__DIR__) . '/config/recaptcha.php';

        // In development or when disabled, allow safe bypass
        if (!$config['enabled'] || empty($config['secret_key'])) {
            return [
                'success' => true,
                'score' => 1.0,
                'action' => $config['expected_action'] ?? 'submit_enquiry',
                'error' => null,
            ];
        }

        if (empty($token)) {
            return [
                'success' => false,
                'score' => 0.0,
                'action' => null,
                'error' => 'Security verification token is missing.',
            ];
        }

        $postData = [
            'secret' => $config['secret_key'],
            'response' => $token,
        ];
        if ($clientIp) {
            $postData['remoteip'] = $clientIp;
        }

        $responseBody = false;

        // Preferred: cURL
        if (function_exists('curl_init')) {
            $ch = curl_init($config['verify_url']);
            curl_setopt_array($ch, [
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => http_build_query($postData),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => $config['timeout'] ?? 5,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_HTTPHEADER => ['Accept: application/json'],
            ]);
            $responseBody = curl_exec($ch);
            curl_close($ch);
        } elseif (ini_get('allow_url_fopen')) {
            $context = stream_context_create([
                'http' => [
                    'method' => 'POST',
                    'header' => "Content-type: application/x-www-form-urlencoded\r\nAccept: application/json\r\n",
                    'content' => http_build_query($postData),
                    'timeout' => $config['timeout'] ?? 5,
                ],
            ]);
            $responseBody = @file_get_contents($config['verify_url'], false, $context);
        }

        if ($responseBody === false || $responseBody === '') {
            error_log('reCAPTCHA siteverify unreachable.');
            // Allow submission if Google siteverify is unreachable rather than rejecting legitimate customers
            return [
                'success' => true,
                'score' => 0.7,
                'action' => $config['expected_action'],
                'error' => null,
            ];
        }

        $data = json_decode($responseBody, true);
        if (!is_array($data) || empty($data['success'])) {
            $errorCodes = isset($data['error-codes']) ? implode(', ', (array)$data['error-codes']) : 'verification-failed';
            error_log("reCAPTCHA failed validation: {$errorCodes}");
            return [
                'success' => false,
                'score' => (float)($data['score'] ?? 0.0),
                'action' => $data['action'] ?? null,
                'error' => 'Security verification failed. Please try again.',
            ];
        }

        $score = (float)($data['score'] ?? 0.0);
        $minScore = (float)($config['min_score'] ?? 0.5);

        if ($score < $minScore) {
            error_log("reCAPTCHA score too low ({$score} < {$minScore})");
            return [
                'success' => false,
                'score' => $score,
                'action' => $data['action'] ?? null,
                'error' => 'Automated activity detected. Please try again or call us directly.',
            ];
        }

        $action = (string)($data['action'] ?? '');
        $expectedAction = (string)($config['expected_action'] ?? 'submit_enquiry');

        if ($expectedAction !== '' && $action !== '' && strcasecmp($action, $expectedAction) !== 0) {
            error_log("reCAPTCHA action mismatch: '{$action}' vs expected '{$expectedAction}'");
        }

        return [
            'success' => true,
            'score' => $score,
            'action' => $action,
            'error' => null,
        ];
    }
}
