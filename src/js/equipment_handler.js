var cur_item = null;

$("#equipment").on("click", ".gear-slot", function () {
    if ($(this).hasClass("disabled")) { // Slot is disabled for use
        return;
    }
    
    $("#equipment-item-selectors").removeClass("hide").css({'opacity': 0}).animate({'opacity': 1}, 'fast');

    if ($(this).hasClass("multi-slot")) { // Slot is locked from a multi-slot item
        // Handle differently
    } else {
        cur_item = {
            "type": $(this).attr('data-type'),
            "slot": $(this).attr('data-slot'),
            "typeslot": $(this).attr('data-type') + (typeof $(this).attr('data-slot') === "undefined" ? "" : $(this).attr('data-slot')),
            "id": $(this).attr('data-itemid')
        }
    }
    
    $(".gear-slot, .crystal-slot").removeClass("selected");
    $("." + cur_item.typeslot).addClass("selected");
    
    var itemList = (isWeapon(cur_item.type) ? BDOdatabase.items[cur_item.type][BDOcharacter.build.class.obj.weapons[cur_item.type]] : BDOdatabase.items[cur_item.type]);
    
    itemList = _.sortBy(itemList, "rarity").reverse();
    itemList = _.sortBy(itemList, "set");
    
    $("#equipment-item-select").empty();
    $("<option>")
        .attr({"value": ""})
        .appendTo("#equipment-item-select");
    var lastSet = "",
        lastSetObj = null;
    $.each(itemList, function () {
        if (lastSet != this.set) {
            lastSet = this.set || "";
            if (lastSet !== "") {
                lastSetObj = $("<optgroup>")
                    .attr({"label": this.set})
                    .appendTo("#equipment-item-select");
            } else {
                lastSetObj = $("#equipment-item-select");
            }
        }
        $("<option>")
            .attr({
                "value": this.id,
                "data-icon": "/bdo/items/" + cur_item.type + (isWeapon(cur_item.type) ?  "/" + BDOcharacter.build.class.obj.weapons[cur_item.type] : "") + "/" + pad(this.id, 8) + ".png"
            })
            .text(this.name)
            .addClass("rarity-" + BDOdatabase.rarity[this.rarity].name)
            .appendTo(lastSetObj);
    });
    $("#equipment-item-select").trigger("chosen:updated");
    
    var enhanceList = BDOdatabase.enhancement[(isAccessory(cur_item.type) ? "accessories" : "gear")];
    
    $("#equipment-enhancement-select").empty();
    for(var key in enhanceList) {
        if (key == 0) {
            $("<option>")
                .attr({
                    "value": key,
                    "selected": "selected"
                })
                .text("None")
                .appendTo("#equipment-enhancement-select");
        } else {
            $("<option>")
                .attr({"value": key})
                .text(enhanceList[key].display)
                .appendTo("#equipment-enhancement-select");
        }
    }
    $("#equipment-enhancement-select").trigger("chosen:updated");
    
    $("#equipment-item-selected-stats").removeClass(rarityClasses).addClass("hide");
});
        
$("#equipment-item-select").on('change', function (evt, params) {
    if (typeof params !== "undefined") { // An item
        setGearSlot(params.selected);
        createEquipmentSidePanel();
    } else { // Remove item
        $("#equipment-item-selected-stats").removeClass(rarityClasses).addClass("hide");
    }
});

function createEquipmentSidePanel() {
    $("#equipment-item-selected-stats").removeClass(rarityClasses + " hide");
    $("#equipment-item-selected-stats .gear-stats").removeClass("hide");
    
    var row, subRow, col, player_item;
    
    if (isItemPair(cur_item.type)) {
        player_item = BDOcharacter.build.gear[cur_item.type][cur_item.slot];
    } else {
        player_item = BDOcharacter.build.gear[cur_item.type];
    }
    
    $("#equipment-item-selected-stats").addClass(BDOdatabase.rarity[player_item.obj.rarity].name);
    
    $("#equipment-item-selected-stats .gear-name").text(/*BDOdatabase.enhancement[]*/player_item.obj.name);
        
    $(".gear-thumbnail").css({
        "background-image": "url('/bdo/items/" + cur_item.type + (isWeapon(cur_item.type) ? "/" + BDOcharacter.build.class.obj.weapons[cur_item.type] : "") + "/" + pad(player_item.id, 8) + ".png')"
    });
        
    $(".gear-stats.gear-ap").addClass((typeof player_item.obj.ap !== "undefined" && player_item.obj.ap > 0 ? "" : (typeof player_item.obj.ap_min !== "undefined" && player_item.obj.ap_min > 0 ? "" : "hide")));
        
    $(".gear-stats.gear-ap span").text((typeof player_item.obj.ap !== "undefined" && player_item.obj.ap > 0 ? player_item.obj.ap : (typeof player_item.obj.ap_min !== "undefined" && player_item.obj.ap_min > 0 ? player_item.obj.ap_min + " ~ " + player_item.obj.ap_max : "")));
        
    $(".gear-stats.gear-dp").addClass((typeof player_item.obj.dp === "undefined" || player_item.obj.dp == 0 ? " hide" : ""));
        
    $(".gear-stats.gear-dp span").text((typeof player_item.obj.dp !== "undefined" && player_item.obj.dp > 0 ? player_item.obj.dp : ""));
}
function clearGearSlot() {}
function clearCrystalSlot() {}
function setGearSlot(itemid) {
/*
    cur_item = {
        "type": $(this).attr('data-type'),
        "slot": $(this).attr('data-slot'),
        "typeslot": $(this).attr('data-type') + (typeof $(this).attr('data-slot') === "undefined" ? "" : $(this).attr('data-slot')),
        "id": $(this).attr('data-itemid')
    }
*/
    cur_item["id"] = parseInt(itemid);
    
    BDOcharacter.setGear(cur_item);
}
function setCrystalSlot() {}