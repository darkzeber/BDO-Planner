<?php
/*
 * @Author: https://github.com/Ihellmasker/BDO-Planner
 * @http: https://bdoplanner.com/
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

function get_full_link($short_link) {
    require $_SERVER['DOCUMENT_ROOT'].'/php/secure/sql.php';
    
    $db = new mysqli('localhost', $_SQL->user, $_SQL->password, $_SQL->database);
    if($db->connect_errno > 0) {
        die('Unable to connect to database [' . $db->connect_error . ']');
    }
    
    $sql = <<<SQL
        SELECT *
        FROM `short_links`
        WHERE `short_link` = "{$short_link}"
SQL;

    if(!$result = $db->query($sql)) {
        die('There was an error running the query [' . $db->error . ']');
    }

    $return_val = null;

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $return_val = $row['long_link'];
    } else {
        return null;
    }

    $result->free();
    
    $timestamp = time();
    
    $sql = <<<SQL
        UPDATE `short_links`
        SET `last_timestamp` = {$timestamp}
        WHERE `short_link` = "{$short_link}"
SQL;

    if(!$result = $db->query($sql)) {
        die('There was an error running the query [' . $db->error . ']');
    }
    
    $db->close();

    return $return_val;
}
?>