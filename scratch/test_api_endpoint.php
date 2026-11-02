<?php
/**
 * Test Contact Form API Endpoints for Homepage and Contact Us page
 */

declare(strict_types=1);

function testApiSubmission(array $payload, string $formName): void {
    echo "\n--- Testing API submission for: {$formName} ---\n";
    $json = json_encode($payload);

    // Mock $_SERVER for CLI API simulation
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
    $_SERVER['HTTP_USER_AGENT'] = 'PHPUnit-CLI-Test/1.0';
    $_SERVER['CONTENT_TYPE'] = 'application/json';
    $_SERVER['CONTENT_LENGTH'] = (string)strlen($json);

    // Capture output
    ob_start();
    // We execute contact.php in a separate process to capture HTTP status and headers accurately
    $cmd = 'php -r "';
    $cmd .= '$_SERVER[\'REQUEST_METHOD\'] = \'POST\'; ';
    $cmd .= '$_SERVER[\'REMOTE_ADDR\'] = \'127.0.0.1\'; ';
    $cmd .= '$_SERVER[\'CONTENT_TYPE\'] = \'application/json\'; ';
    $cmd .= '$_SERVER[\'HTTP_ORIGIN\'] = \'http://localhost\'; ';
    $cmd .= 'define(\'TEST_INPUT\', ' . var_export($json, true) . '); ';
    // In contact.php, file_get_contents(\'php://input\') is used; we can test LeadService & validation directly
    $cmd .= '"';
}

echo "Testing Homepage Form Data Validation...\n";
require_once 'c:/xampp/htdocs/gs-sowmiya/backend/services/LeadService.php';
use GSSowmiya\Backend\Services\LeadService;

$homeData = [
    'name' => 'Balaguru V',
    'phone' => '+91 90431 56670',
    'email' => 'balaguru@example.com',
    'service' => 'Residential Construction',
    'location' => 'Vengaivasal, Chennai',
    'message' => 'Need 2BHK individual house construction plan and estimate.',
    'source' => 'homepage_contact',
];

$homeVal = LeadService::validateInput($homeData);
echo "Homepage Form Valid: " . ($homeVal['isValid'] ? "YES" : "NO") . "\n";
echo "Homepage Form Source: " . $homeVal['data']['source'] . "\n";

$contactData = [
    'name' => 'Mohamed Ismath',
    'phone' => '+91 70105 17729',
    'email' => 'ismath@example.com',
    'service' => 'Joint Venture Development',
    'location' => 'Pallavaram, Chennai',
    'message' => 'Joint venture proposal for 2 grounds land in prime area.',
    'source' => 'contact_page',
];

$contactVal = LeadService::validateInput($contactData);
echo "Contact Page Form Valid: " . ($contactVal['isValid'] ? "YES" : "NO") . "\n";
echo "Contact Page Form Source: " . $contactVal['data']['source'] . "\n";

