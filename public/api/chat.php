<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Log errors to file
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit();
}

try {
    $rawData = file_get_contents('php://input');
    if ($rawData === false) {
        throw new Exception('Failed to read request body');
    }

    $data = json_decode($rawData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }

    if (!isset($data['model']) || !isset($data['messages'])) {
        throw new Exception('Missing required fields: model or messages');
    }

    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    if ($ch === false) {
        throw new Exception('Failed to initialize CURL');
    }

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer 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',
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($response === false) {
        throw new Exception('CURL Error: ' . curl_error($ch));
    }

    curl_close($ch);

    http_response_code($httpCode);
    echo $response;

} catch (Exception $e) {
    error_log('Chat API Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'details' => 'Error processing request'
    ]);
}
