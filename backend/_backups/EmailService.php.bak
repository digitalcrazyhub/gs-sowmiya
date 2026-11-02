<?php
/**
 * GS SOWMIYA BUILDERS — EMAIL NOTIFICATION SERVICE
 * File: /backend/services/EmailService.php
 * Uses PHPMailer via authenticated SMTP to dispatch company notifications and customer acknowledgements.
 */

declare(strict_types=1);

namespace GSSowmiya\Backend\Services;

class EmailService {
    /**
     * Prevent SMTP header injection by stripping CRLF characters
     */
    private static function sanitizeHeader(string $val): string {
        return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $val));
    }

    /**
     * Send new lead alert to company management
     * @return array{success: bool, error: ?string}
     */
    public static function sendCompanyNotification(array $lead): array {
        if (!defined('GS_BACKEND_INIT')) {
            define('GS_BACKEND_INIT', true);
        }

        $config = require dirname(__DIR__) . '/config/mail.php';

        if (empty($config['smtp_host']) || empty($config['smtp_username'])) {
            return [
                'success' => false,
                'error' => 'SMTP credentials not configured.',
            ];
        }

        $name = htmlspecialchars($lead['name'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
        $email = htmlspecialchars($lead['email'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
        $phone = htmlspecialchars($lead['phone'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
        $service = htmlspecialchars($lead['service'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
        $location = htmlspecialchars($lead['location'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
        $message = nl2br(htmlspecialchars($lead['message'] ?? 'N/A', ENT_QUOTES, 'UTF-8'));
        $sourceRaw = $lead['source'] ?? '';
        $sourceDisplay = ($sourceRaw === 'homepage_contact' || str_contains($sourceRaw, 'home'))
            ? 'Home Page Form'
            : 'Contact Us Page Form';
        $submissionTime = date('Y-m-d H:i:s');

        $subject = "New Website Enquiry ({$sourceDisplay}) — {$service}";

        $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Website Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f7f7f5; margin: 0; padding: 24px; color: #222; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dedcd7; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #741719; color: #ffffff; padding: 28px 32px; border-bottom: 3px solid #d9a24a; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d9a24a; text-transform: uppercase; font-weight: 600; }
    .content { padding: 32px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table th { text-align: left; padding: 10px 12px; font-size: 13px; color: #666; border-bottom: 1px solid #eee; width: 35%; vertical-align: top; }
    .info-table td { padding: 10px 12px; font-size: 14px; color: #111; font-weight: 500; border-bottom: 1px solid #eee; }
    .message-box { background: #faf9f7; border-left: 4px solid #d9a24a; padding: 16px 20px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #333; margin-top: 16px; }
    .footer { padding: 20px 32px; background: #faf9f7; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>GS SOWMIYA BUILDERS</h1>
      <p>NEW WEBSITE PROJECT ENQUIRY</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr><th>Enquiry Source:</th><td><strong>{$sourceDisplay}</strong></td></tr>
        <tr><th>Client Name:</th><td>{$name}</td></tr>
        <tr><th>Phone Number:</th><td><a href="tel:{$phone}" style="color: #741719; font-weight: bold; text-decoration: none;">{$phone}</a></td></tr>
        <tr><th>Email Address:</th><td><a href="mailto:{$email}">{$email}</a></td></tr>
        <tr><th>Service Required:</th><td>{$service}</td></tr>
        <tr><th>Site Location:</th><td>{$location}</td></tr>
        <tr><th>Submission Time:</th><td>{$submissionTime}</td></tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; color: #666; margin: 24px 0 8px;">Project Scope &amp; Requirements</h3>
      <div class="message-box">
        {$message}
      </div>
    </div>
    <div class="footer">
      GS Sowmiya Builders Private Limited • Pallikaranai, Chennai • digitalcrazyhub.com
    </div>
  </div>
</body>
</html>
HTML;

        return self::dispatchMail(
            toEmail: $config['company_email'],
            toName: $config['company_name'],
            subject: $subject,
            htmlBody: $htmlBody,
            replyToEmail: $lead['email'],
            replyToName: $lead['name']
        );
    }

    /**
     * Send branded acknowledgement email to the customer
     * @return array{success: bool, error: ?string}
     */
    public static function sendCustomerConfirmation(array $lead): array {
        if (!defined('GS_BACKEND_INIT')) {
            define('GS_BACKEND_INIT', true);
        }

        $config = require dirname(__DIR__) . '/config/mail.php';

        if (empty($config['smtp_host']) || empty($config['smtp_username'])) {
            return [
                'success' => false,
                'error' => 'SMTP credentials not configured.',
            ];
        }

        $name = htmlspecialchars($lead['name'] ?? 'Client', ENT_QUOTES, 'UTF-8');
        $service = htmlspecialchars($lead['service'] ?? 'Construction', ENT_QUOTES, 'UTF-8');
        $location = htmlspecialchars($lead['location'] ?? 'Chennai', ENT_QUOTES, 'UTF-8');

        $subject = "Thank You for Contacting GS Sowmiya Builders Pvt Ltd";

        $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Enquiry Received - GS Sowmiya Builders</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f7f7f5; margin: 0; padding: 24px; color: #222; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dedcd7; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #741719; color: #ffffff; padding: 32px; text-align: center; border-bottom: 3px solid #d9a24a; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.05em; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d9a24a; text-transform: uppercase; font-weight: 600; }
    .content { padding: 32px; line-height: 1.65; color: #333; font-size: 15px; }
    .footer { padding: 24px 32px; background: #faf9f7; border-top: 1px solid #eee; font-size: 13px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>GS SOWMIYA BUILDERS</h1>
      <p>Built on Trust • Driven by Quality</p>
    </div>
    <div class="content">
      <p>Dear <strong>{$name}</strong>,</p>
      <p>Thank you for reaching out to <strong>GS Sowmiya Builders Private Limited</strong>. We have successfully received your enquiry regarding <strong>{$service}</strong> in <strong>{$location}</strong>.</p>
      <!-- <p>Our senior civil engineering team will review your site parameters and contact you within <strong>24 business hours</strong> to discuss the feasibility, floor plans, and estimate specifications.</p>
      
      <p>If you require immediate assistance or wish to share architectural drawings directly, please feel free to contact us via WhatsApp or call:</p>
      <ul style="padding-left: 20px;">
        <li><strong>Direct Calling:</strong> +91 90431 56670</li>
        <li><strong>WhatsApp Support:</strong> +91 70105 17729</li>
        <li><strong>Registered Office:</strong> No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.</li>
      </ul> -->
      <p style="margin-top: 28px;">Warm regards,<br>
      <strong>Customer Relations Team</strong><br>
      GS Sowmiya Builders Private Limited</p>
    </div>
    <div class="footer">
      No 106, Nallasamy Tower, Velachery Main Road, Pallikaranai, Chennai - 600 100.
    </div>
  </div>
</body>
</html>
HTML;

        return self::dispatchMail(
            toEmail: $lead['email'],
            toName: $lead['name'],
            subject: $subject,
            htmlBody: $htmlBody,
            replyToEmail: $config['company_email'],
            replyToName: $config['company_name']
        );
    }

    /**
     * Dispatch mail via PHPMailer or authenticated SMTP socket
     */
    private static function dispatchMail(
        string $toEmail,
        string $toName,
        string $subject,
        string $htmlBody,
        ?string $replyToEmail = null,
        ?string $replyToName = null
    ): array {
        $toName = self::sanitizeHeader($toName);
        $subject = self::sanitizeHeader($subject);
        $replyToName = $replyToName !== null ? self::sanitizeHeader($replyToName) : null;
        $replyToEmail = $replyToEmail !== null ? self::sanitizeHeader($replyToEmail) : null;
        return self::dispatchMailInternal($toEmail, $toName, $subject, $htmlBody, $replyToEmail, $replyToName);
    }

    private static function dispatchMailInternal(
        string $toEmail,
        string $toName,
        string $subject,
        string $htmlBody,
        ?string $replyToEmail = null,
        ?string $replyToName = null
    ): array {
        $config = require dirname(__DIR__) . '/config/mail.php';

        $autoloadPath = dirname(__DIR__) . '/vendor/autoload.php';
        if (file_exists($autoloadPath)) {
            require_once $autoloadPath;
        }

        // Use PHPMailer if installed via Composer
        if (class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
            try {
                $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = $config['smtp_host'];
                $mail->SMTPAuth = true;
                $mail->Username = $config['smtp_username'];
                $mail->Password = $config['smtp_password'];
                $mail->SMTPSecure = $config['smtp_encryption'] === 'ssl'
                    ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
                    : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = $config['smtp_port'];
                $mail->Timeout = $config['timeout'] ?? 10;
                $mail->CharSet = 'UTF-8';

                // Strictly use configured company email as SMTP From
                $mail->setFrom($config['from_email'], $config['from_name']);
                $mail->addAddress($toEmail, $toName);

                if ($replyToEmail) {
                    $mail->addReplyTo($replyToEmail, $replyToName ?? $replyToEmail);
                }

                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body = $htmlBody;
                $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '</p>'], "\n", $htmlBody));

                $mail->send();
                return ['success' => true, 'error' => null];
            } catch (\Throwable $e) {
                error_log('PHPMailer send failed: ' . $e->getMessage());
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        // Pure PHP Native Socket SMTP Fallback (Runs if composer dependencies are pending installation)
        return self::sendViaNativeSmtp($config, $toEmail, $toName, $subject, $htmlBody, $replyToEmail, $replyToName);
    }

    /**
     * Resilient native socket SMTP client fallback for shared hosting
     */
    private static function sendViaNativeSmtp(
        array $config,
        string $toEmail,
        string $toName,
        string $subject,
        string $htmlBody,
        ?string $replyToEmail,
        ?string $replyToName
    ): array {
        $isSsl = ($config['smtp_encryption'] ?? '') === 'ssl';
        $host = ($isSsl ? 'ssl://' : '') . $config['smtp_host'];
        $port = (int)$config['smtp_port'];

        $socket = @fsockopen($host, $port, $errno, $errstr, $config['timeout'] ?? 10);
        if (!$socket) {
            return ['success' => false, 'error' => "Socket connection failed: {$errstr} ({$errno})"];
        }

        stream_set_timeout($socket, $config['timeout'] ?? 10);

        // RFC 5321 multi-line SMTP response reader
        $readResponse = function() use ($socket): string {
            $lastLine = '';
            while ($line = fgets($socket, 515)) {
                $lastLine = $line;
                // If 4th char is a space, this is the terminal line of the response
                if (strlen($line) >= 4 && $line[3] === ' ') {
                    break;
                }
                if (strlen($line) <= 3) {
                    break;
                }
            }
            return $lastLine;
        };

        $write = function(string $cmd) use ($socket, $readResponse): string {
            fputs($socket, $cmd . "\r\n");
            return $readResponse();
        };

        $banner = $readResponse(); // Initial 220 banner
        if (!str_starts_with((string)$banner, '220')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP server greeting error: ' . trim((string)$banner)];
        }

        $serverName = preg_replace('/[^a-zA-Z0-9.-]/', '', (string)($_SERVER['SERVER_NAME'] ?? 'localhost')) ?: 'localhost';
        $ehloRes = $write("EHLO " . $serverName);

        // STARTTLS negotiation if encryption is 'tls' and not already wrapped in SSL
        if (($config['smtp_encryption'] ?? '') === 'tls' && !$isSsl) {
            $tlsRes = $write("STARTTLS");
            if (!str_starts_with((string)$tlsRes, '220')) {
                fclose($socket);
                return ['success' => false, 'error' => 'STARTTLS failed: ' . trim((string)$tlsRes)];
            }
            $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            if (!@stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
                fclose($socket);
                return ['success' => false, 'error' => 'TLS crypto handshake failed.'];
            }
            // Must re-issue EHLO after successful TLS upgrade
            $ehloRes = $write("EHLO " . $serverName);
        }

        if (!str_starts_with((string)$ehloRes, '250')) {
            $heloRes = $write("HELO " . $serverName);
            if (!str_starts_with((string)$heloRes, '250')) {
                fclose($socket);
                return ['success' => false, 'error' => 'SMTP HELO failed: ' . trim((string)$heloRes)];
            }
        }

        $authInit = $write("AUTH LOGIN");
        if (!str_starts_with((string)$authInit, '334')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP AUTH LOGIN rejected: ' . trim((string)$authInit)];
        }

        $write(base64_encode($config['smtp_username']));
        $authRes = $write(base64_encode($config['smtp_password']));

        if (!str_starts_with((string)$authRes, '235')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP Authentication failed: ' . trim((string)$authRes)];
        }

        $mailFromRes = $write("MAIL FROM: <{$config['from_email']}>");
        if (!str_starts_with((string)$mailFromRes, '250')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP MAIL FROM rejected: ' . trim((string)$mailFromRes)];
        }

        $rcptRes = $write("RCPT TO: <{$toEmail}>");
        if (!str_starts_with((string)$rcptRes, '250')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP RCPT TO rejected: ' . trim((string)$rcptRes)];
        }

        $dataInit = $write("DATA");
        if (!str_starts_with((string)$dataInit, '354')) {
            fclose($socket);
            return ['success' => false, 'error' => 'SMTP DATA rejected: ' . trim((string)$dataInit)];
        }

        $boundary = "==_Multipart_Boundary_x" . md5(uniqid((string)time()));
        $headers = [
            "From: {$config['from_name']} <{$config['from_email']}>",
            "To: {$toName} <{$toEmail}>",
            "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
            "MIME-Version: 1.0",
            "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
        ];
        if ($replyToEmail) {
            $headers[] = "Reply-To: {$replyToName} <{$replyToEmail}>";
        }

        $plainText = strip_tags(str_replace(['<br>', '<br/>', '</p>'], "\n", $htmlBody));

        $rawContent = implode("\r\n", $headers) . "\r\n\r\n"
                    . "--{$boundary}\r\n"
                    . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
                    . $plainText . "\r\n\r\n"
                    . "--{$boundary}\r\n"
                    . "Content-Type: text/html; charset=UTF-8\r\n\r\n"
                    . $htmlBody . "\r\n\r\n"
                    . "--{$boundary}--";

        // RFC 5321 Section 4.5.2: Leading period dot-stuffing and CRLF normalization
        $stuffedContent = preg_replace('/^\./m', '..', str_replace("\r\n", "\n", $rawContent));
        $normalizedContent = str_replace("\n", "\r\n", (string)$stuffedContent);
        $emailBody = $normalizedContent . "\r\n.";

        $dataRes = $write($emailBody);
        $write("QUIT");
        fclose($socket);

        if (str_starts_with((string)$dataRes, '250')) {
            return ['success' => true, 'error' => null];
        }

        return ['success' => false, 'error' => 'SMTP rejected message delivery: ' . trim((string)$dataRes)];
    }
}
