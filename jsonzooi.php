<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $result = file_put_contents('highscores.json', $json);
    
    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save highscores']);
    } else {
        echo json_encode(['success' => true]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists('highscores.json')) {
        echo file_get_contents('highscores.json');
    } else {
        echo json_encode(['HighScores' => []]);
    }
}
?>