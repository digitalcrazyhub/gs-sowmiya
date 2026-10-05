<?php
/**
 * GS SOWMIYA BUILDERS — GOOGLE SHEETS SYNCHRONIZATION SERVICE
 * File: /backend/services/GoogleSheetsService.php
 * Synchronizes enquiries to Google Sheets using Google Service Account API.
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Services;

class GoogleSheetsService {
    /**
     * Append a lead record to the configured Google Sheet
     * @return array{success: bool, error: ?string}
     */
    public static function appendLead(array $lead): array {
        if (!defined('GS_BACKEND_INIT')) {
            define('GS_BACKEND_INIT', true);
        }

        $config = require dirname(__DIR__) . '/config/google-sheets.php';

        if (!$config['enabled']) {
            return ['success' => true, 'error' => null]; // Skipped intentionally
        }

        if (empty($config['spreadsheet_id']) || !$config['credentials_exist']) {
            return [
                'success' => false,
                'error' => 'Google Sheets configuration or credentials file missing.',
            ];
        }

        $createdAt = $lead['created_at'] ?? date('Y-m-d H:i:s');
        $datePart = date('Y-m-d', strtotime($createdAt));
        $timePart = date('H:i:s', strtotime($createdAt));

        $rowValues = [
            $lead['lead_id'] ?? 'N/A',
            $datePart,
            $timePart,
            $lead['source'] ?? 'contact_page',
            $lead['name'] ?? '',
            $lead['email'] ?? '',
            $lead['phone'] ?? '',
            $lead['service'] ?? '',
            $lead['location'] ?? '',
            $lead['message'] ?? '',
            $lead['company_email_status'] ?? 'pending',
            $lead['customer_email_status'] ?? 'pending',
            $createdAt,
        ];

        // 1. Try via official Google API Client if composer dependencies installed
        $autoloadPath = dirname(__DIR__) . '/vendor/autoload.php';
        if (file_exists($autoloadPath)) {
            require_once $autoloadPath;
        }

        if (class_exists(\Google_Client::class) || class_exists(\Google\Client::class)) {
            try {
                $clientClass = class_exists(\Google\Client::class) ? \Google\Client::class : \Google_Client::class;
                $client = new $clientClass();
                $client->setAuthConfig($config['credentials_path']);
                $client->addScope('https://www.googleapis.com/auth/spreadsheets');

                $service = new \Google\Service\Sheets($client);
                $body = new \Google\Service\Sheets\ValueRange([
                    'values' => [$rowValues],
                ]);
                $params = ['valueInputOption' => 'USER_ENTERED'];

                $service->spreadsheets_values->append(
                    $config['spreadsheet_id'],
                    $config['range'] ?? 'Leads!A:M',
                    $body,
                    $params
                );

                return ['success' => true, 'error' => null];
            } catch (\Throwable $e) {
                error_log('Google Sheets Client error: ' . $e->getMessage());
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        // 2. Direct REST API via Service Account JWT (Lightweight, No Composer required)
        return self::appendViaRestApi($config, $rowValues);
    }

    /**
     * Direct REST append using OpenSSL JWT token generation
     */
    private static function appendViaRestApi(array $config, array $rowValues): array {
        $credsJson = @file_get_contents($config['credentials_path']);
        if (!$credsJson) {
            return ['success' => false, 'error' => 'Unable to read credentials file.'];
        }

        $creds = json_decode($credsJson, true);
        if (!is_array($creds) || empty($creds['client_email']) || empty($creds['private_key'])) {
            return ['success' => false, 'error' => 'Invalid service account JSON structure.'];
        }

        // Generate JWT Token
        $now = time();
        $header = ['alg' => 'RS256', 'typ' => 'JWT'];
        $claim = [
            'iss' => $creds['client_email'],
            'scope' => 'https://www.googleapis.com/auth/spreadsheets',
            'aud' => 'https://oauth2.googleapis.com/token',
            'exp' => $now + 3600,
            'iat' => $now,
        ];

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
        $base64UrlClaim = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($claim)));
        $signatureInput = "{$base64UrlHeader}.{$base64UrlClaim}";

        $signature = '';
        $binarySignature = '';
        $pkey = openssl_pkey_get_private($creds['private_key']);
        if (!$pkey || !openssl_sign($signatureInput, $binarySignature, $pkey, OPENSSL_ALGO_SHA256)) {
            return ['success' => false, 'error' => 'Failed to sign JWT with service account private key.'];
        }

        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($binarySignature));
        $jwt = "{$signatureInput}.{$base64UrlSignature}";

        // Exchange JWT for Access Token
        $ch = curl_init('https://oauth2.googleapis.com/token');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion' => $jwt,
            ]),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
        ]);
        $tokenRes = curl_exec($ch);
        curl_close($ch);

        $tokenData = json_decode((string)$tokenRes, true);
        $accessToken = $tokenData['access_token'] ?? null;
        if (!$accessToken) {
            return ['success' => false, 'error' => 'Google OAuth2 token exchange failed.'];
        }

        // Call Sheets Append API
        $spreadsheetId = urlencode($config['spreadsheet_id']);
        $range = urlencode($config['range'] ?? 'Leads!A:M');
        $url = "https://sheets.googleapis.com/v4/spreadsheets/{$spreadsheetId}/values/{$range}:append?valueInputOption=USER_ENTERED";

        $postPayload = json_encode([
            'range' => $config['range'] ?? 'Leads!A:M',
            'majorDimension' => 'ROWS',
            'values' => [$rowValues],
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postPayload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $accessToken,
                'Content-Type: application/json',
                'Accept: application/json',
            ],
        ]);
        $appendRes = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            return ['success' => true, 'error' => null];
        }

        return ['success' => false, 'error' => "Google Sheets API returned HTTP {$httpCode}: {$appendRes}"];
    }
}
