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
function isOutfit(item_type) {
    return $.inArray(item_type, ["outfit-armor", "outfit-helmet", "outfit-gloves", "outfit-shoes", "primary-weapon-outfit", "awakening-weapon-outfit", "secondary-weapon-outfit"]) !== -1;
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function rarityClasses() {
    return "common uncommon rare epic legendary";
}