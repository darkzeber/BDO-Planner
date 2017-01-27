function isWeapon(item_type) {
    return $.inArray(item_type, ["primary-weapon", "secondary-weapon", "awakening-weapon"]) !== -1;
}
function isAccessory(item_type) {
    return $.inArray(item_type, ["ring", "belt", "earring", "necklace"]) !== -1;
}
function isSocketable(item_type) {
    return $.inArray(item_type, ["primary-weapon", "secondary-weapon", "armor", "shoes", "gloves", "helmet", "outfit-armor"]) !== -1;
}
function isItemPair(item_type) {
    return $.inArray(item_type, ["ring", "earring"]) !== -1;
}