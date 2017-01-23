<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$scripts = [];
$scripts["classes"] = "classes.json";
$scripts["crystal_compatibilities"] = "crystal_compatibilities.json";
$scripts["enhancement_levels"] = "enhancement_levels.json";
$scripts["item_sets"] = "item_sets.json";
$scripts["rarity_types"] = "rarity_types.json";
$scripts["stat_types"] = "stat_types.json";
$scripts["training_levels"] = "training_levels.json";
$scripts["items"] = [];
$scripts["items"]["crystal"] = "items_crystal.json";
$scripts["items"]["helmet"] = "items_helmet.json";
$scripts["items"]["armor"] = "items_armor.json";
$scripts["items"]["shoes"] = "items_shoes.json";
$scripts["items"]["gloves"] = "items_gloves.json";
$scripts["items"]["primary_weapon"] = "items_primary_weapon.json";
$scripts["items"]["secondary_weapon"] = "items_secondary_weapon.json";
$scripts["items"]["awakening_weapon"] = "items_awakening_weapon.json";
$scripts["items"]["ring"] = "items_ring.json";
$scripts["items"]["earring"] = "items_earring.json";
$scripts["items"]["belt"] = "items_belt.json";
$scripts["items"]["necklace"] = "items_necklace.json";
$scripts["items"]["alchemy_stone"] = "items_alchemy_stone.json";
$scripts["items"]["outfit_armor"] = "items_outfit_armor.json";
$scripts["items"]["outfit_gloves"] = "items_outfit_gloves.json";
$scripts["items"]["outfit_helmet"] = "items_outfit_helmet.json";
$scripts["items"]["outfit_shoes"] = "items_outfit_shoes.json";
$scripts["items"]["underwear"] = "items_underwear.json";
$scripts["items"]["primary_weapon_outfit"] = "items_primary_weapon_outfit.json";
$scripts["items"]["secondary_weapon_outfit"] = "items_secondary_weapon_outfit.json";
$scripts["items"]["awakening_weapon_outfit"] = "items_awakening_weapon_outfit.json";

/* Modified from D3Planner https://github.com/d07RiV/d3planner/blob/master/php/getter.php */

header('Content-Type: application/javascript; charset=utf-8');

$timestamp = 0;

function buildScripts($scripts, &$timestamp) {
    $path = "../js/data/";
    
    $compiledScripts = "";
    
    $first = true;
    
    foreach ($scripts as $key => $script) {
        if (!is_array($script)) {
            if (file_exists($path . $script)) {
                $timestamp = max($timestamp, filemtime($path . $script));
                $compiledScripts .= ($first ? '' : ',') . '"' . $key . '":' . file_get_contents($path . $script);
                $first = false;
            }
        } else {
            $compiledScripts .= ($first ? '' : ',') . '"' . $key . '": {' . buildScripts($script, $timestamp) . '}';
        }
    }
    
    return $compiledScripts;
}

$compiledScripts = "{" . buildScripts($scripts, $timestamp) . "}";

$timestampstring = gmdate('D, d M Y H:i:s ', $timestamp) . 'GMT';
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && $_SERVER['HTTP_IF_MODIFIED_SINCE'] == $timestampstring) {
    header('HTTP/1.1 304 Not Modified');
    exit();
}

$compiledScripts = gzencode($compiledScripts);
header('Content-Encoding: gzip');
header('Last-Modified: ' . $timestampstring);
header('Content-Length: ' . strlen($compiledScripts));

echo $compiledScripts;
?>