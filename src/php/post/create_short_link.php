<?php
/*
 * @Author: https://github.com/Ihellmasker/BDO-Planner
 * @http: https://bdoplanner.com/
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

header('Content-Type: application/json');

require $_SERVER['DOCUMENT_ROOT'].'/php/secure/sql.php';
include $_SERVER['DOCUMENT_ROOT'].'/php/includes/misc_functions.php';

if (!isset($_POST['data'])) {
    echo json_encode((object) array (
        'data' => (object) array (),
        'error' => 'No Data'
    ));
    flush();
    exit();
}

$data = preg_replace('/[^0-9\[\]\-\,]/', '', $_POST['data']);
$decoded_data = json_decode($data, true);

if ($decoded_data == null) {
    echo json_encode((object) array (
        'data' => (object) array (),
        'error' => 'Invalid JSON'
    ));
    flush();
    exit();
}

$db = new mysqli('localhost', $_SQL->user, $_SQL->password, $_SQL->database);
if($db->connect_errno > 0) {
    echo json_encode((object) array (
        'data' => (object) array (),
        'error' => $db->connect_error
    ));
    flush();
    exit();
}

$id = guid();
$timestamp = time();
$short_link = random_str(8);

$valid = false;
while(!$valid) {
    $sql = <<<SQL
        SELECT *
        FROM `short_links`
        WHERE `id` = "{$id}" OR `short_link` = "{$short_link}"
SQL;
        
    if(!$result = $db->query($sql)) {
        die('There was an error running the query [' . $db->error . ']');
    }
    
    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if($row['id'] == $id) {
            $id = guid();
        } elseif($row['long_link'] == $short_link) {
            $short_link = random_str(8);
        }
    } else {
        $valid = true;
    }
}

$result->free();

$sql = <<<SQL
    INSERT INTO `short_links`
    (`id`, `last_timestamp`, `short_link`, `long_link`)
    VALUES
    ("{$id}", {$timestamp}, "{$short_link}", "{$data}")
SQL;
    
if(!$result = $db->query($sql)) {
    die('There was an error running the query [' . $db->error . ']');
}

$db->close();

echo json_encode((object) array (
    'data' => $decoded_data,
    'short_link' => $short_link
));
flush();
?>