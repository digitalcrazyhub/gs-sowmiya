<?php
/**
 * GS SOWMIYA BUILDERS — BACKGROUND QUEUE WORKER
 * File: /backend/queue/process.php
 * Designed to be executed periodically via Hostinger Cron Job or CLI.
 *
 * Example Cron Schedule (Run every 5 minutes):
 * * /5 * * * * /usr/bin/php /home/u123456789/domains/gssowmiyabuilders.com/public_html/backend/queue/process.php >> /dev/null 2>&1
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Queue;

define('GS_BACKEND_INIT', true);

// Prevent execution via direct web request if possible
if (php_sapi_name() !== 'cli' && !defined('GS_ALLOW_WEB_CRON')) {
    // If triggered via HTTP secret token for external web cron (e.g. cron-job.org)
    $cronSecret = getenv('CRON_SECRET') ?: '';
    $incomingSecret = $_GET['secret'] ?? '';

    if ($cronSecret === '' || $incomingSecret !== $cronSecret) {
        http_response_code(403);
        exit('Access Denied. CLI or valid CRON_SECRET required.');
    }
}

require_once dirname(__DIR__) . '/config/app.php';
require_once dirname(__DIR__) . '/services/Database.php';
require_once dirname(__DIR__) . '/services/LeadService.php';
require_once dirname(__DIR__) . '/services/EmailService.php';
require_once dirname(__DIR__) . '/services/GoogleSheetsService.php';

use GSSowmiya\Backend\Services\LeadService;
use GSSowmiya\Backend\Services\EmailService;
use GSSowmiya\Backend\Services\GoogleSheetsService;

$batchLimit = (int)\GSSowmiya\Backend\env('QUEUE_BATCH_SIZE', 20);
$maxAttempts = (int)\GSSowmiya\Backend\env('QUEUE_MAX_ATTEMPTS', 5);

$pendingLeads = LeadService::getPendingLeads($batchLimit);
$processedCount = 0;
$successCount = 0;

foreach ($pendingLeads as $lead) {
    $leadId = (int)$lead['id'];
    $attempts = (int)($lead['processing_attempts'] ?? 0) + 1;
    $updates = [
        'processing_attempts' => $attempts,
        'last_attempt_at' => date('Y-m-d H:i:s'),
    ];

    $hasErrors = false;
    $errorMessages = [];

    // 1. Process Company Email (if not already successful)
    if (($lead['company_email_status'] ?? '') !== 'success') {
        try {
            $compRes = EmailService::sendCompanyNotification($lead);
            if ($compRes['success']) {
                $updates['company_email_status'] = 'success';
            } else {
                $hasErrors = true;
                $updates['company_email_status'] = 'failed';
                $errorMessages[] = 'Company Mail: ' . ($compRes['error'] ?? 'Unknown');
            }
        } catch (\Throwable $e) {
            $hasErrors = true;
            $updates['company_email_status'] = 'failed';
            $errorMessages[] = 'Company Mail Exception: ' . $e->getMessage();
        }
    } else {
        $updates['company_email_status'] = 'success';
    }

    // 2. Process Customer Confirmation Email (if not already successful)
    if (($lead['customer_email_status'] ?? '') !== 'success') {
        try {
            $custRes = EmailService::sendCustomerConfirmation($lead);
            if ($custRes['success']) {
                $updates['customer_email_status'] = 'success';
            } else {
                $hasErrors = true;
                $updates['customer_email_status'] = 'failed';
                $errorMessages[] = 'Customer Mail: ' . ($custRes['error'] ?? 'Unknown');
            }
        } catch (\Throwable $e) {
            $hasErrors = true;
            $updates['customer_email_status'] = 'failed';
            $errorMessages[] = 'Customer Mail Exception: ' . $e->getMessage();
        }
    } else {
        $updates['customer_email_status'] = 'success';
    }

    // 3. Process Google Sheets Append (if enabled and not already successful)
    if (($lead['google_sheet_status'] ?? '') !== 'success' && ($lead['google_sheet_status'] ?? '') !== 'skipped') {
        try {
            $sheetRes = GoogleSheetsService::appendLead($lead);
            if ($sheetRes['success']) {
                $updates['google_sheet_status'] = 'success';
            } else {
                $hasErrors = true;
                $updates['google_sheet_status'] = 'failed';
                $errorMessages[] = 'Sheets: ' . ($sheetRes['error'] ?? 'Unknown');
            }
        } catch (\Throwable $e) {
            $hasErrors = true;
            $updates['google_sheet_status'] = 'failed';
            $errorMessages[] = 'Sheets Exception: ' . $e->getMessage();
        }
    } else {
        $updates['google_sheet_status'] = $lead['google_sheet_status'] ?? 'skipped';
    }

    // Determine final status & exponential retry backoff
    if (!$hasErrors) {
        $updates['processing_status'] = 'completed';
        $updates['next_attempt_at'] = null;
        $updates['last_error'] = null;
        $successCount++;
    } else {
        if ($attempts >= $maxAttempts) {
            $updates['processing_status'] = 'failed';
            $updates['next_attempt_at'] = null; // Do not retry further
        } else {
            // Exponential backoff: 2min, 5min, 15min, 60min
            $backoffMinutes = match ($attempts) {
                1 => 2,
                2 => 5,
                3 => 15,
                default => 60,
            };
            $updates['processing_status'] = 'processing';
            $updates['next_attempt_at'] = date('Y-m-d H:i:s', strtotime("+{$backoffMinutes} minutes"));
        }
        $updates['last_error'] = implode(' | ', $errorMessages);
    }

    LeadService::updateLeadStatuses($leadId, $updates);
    $processedCount++;
}

$summary = sprintf(
    "[%s] Queue Run Completed: %d leads evaluated, %d successfully completed.\n",
    date('Y-m-d H:i:s'),
    $processedCount,
    $successCount
);

if (php_sapi_name() === 'cli') {
    echo $summary;
} else {
    header('Content-Type: text/plain');
    echo $summary;
}
