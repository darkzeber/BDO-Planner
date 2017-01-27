var cur_item = null;

$("#equipment").on("click", ".gear-slot", function () {
    if ($(this).hasClass("disabled")) { // Slot is disabled for use
        return;
    }

    if ($(this).hasClass("multi-slot")) { // Slot is locked from a multi-slot item
        // Handle differently
    } else {
        cur_item = {
            "type": $(this).attr('data-type'),
            "slot": $(this).attr('data-slot'),
            "typeslot": $(this).attr('data-type') + (typeof $(this).attr('data-slot') === "undefined" ? "" : $(this).attr('data-slot'))
        }
    }
    
    $(".gear-slot, .crystal-slot").removeClass("selected");
    $("." + cur_item.typeslot).addClass("selected");
    
    var itemList = (isWeapon(cur_item.type) ? BDOdatabase.items[cur_item.type][BDOcharacter.build.class.obj.weapons] : BDOdatabase.items[cur_item.type]);
    
    itemList = _.sortBy(itemList, "set");
    
    $("#equipment-item-select").empty();
    $("<option>")
        .attr({"value": ""})
        .appendTo("#equipment-item-select");
    var lastSet = "",
        lastSetObj = null;
    $.each(itemList, function () {
        $("<option>")
            .attr({"value": this.id})
            .text(this.name)
            .appendTo("#equipment-item-select");
    });
    $("#equipment-item-select").trigger("chosen:updated");
    
    var enhanceList = BDOdatabase.enhancement_levels[(isAccessory(cur_item.type) ? "accessories" : "gear")];
    
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
});

$("#equipment-item-select").on('change', function (evt, params) {
    
})