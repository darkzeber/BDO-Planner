"use strict";

var BDOdatabase = null;
var __scripts = [
    "common",
    "class_selector",
    "character_store",
    "equipment_handler"
]

$(document).ajaxStart(function() {
    console.log("AjaxStart");
});
$(document).ajaxStop(function () {
    $("#progress-spinner").addClass("hide");
    console.log("AjaxStop");
    buildClassList();
    $("#class-section").removeClass("hide").css({'opacity': 0}).animate({'opacity': 1}, 'fast');
});

$(document).ready(function () {
    $.ajax({
        url: "/js/data.json",
        dataType: "json",
        success: function(data) {
            BDOdatabase = data;
            for (var i in __scripts) {
                $.ajax({
                    url: "/js/" + __scripts[i] + ".js",
                    dataType: "script"
                });
            }
        }
    });
    $("#equipment-item-select.chosen-select").chosen({
        allow_single_deselect: true,
        inherit_select_classes: true,
        search_contains: true,
        width: "100%"
    });
    $("#equipment-enhancement-select").chosen({
        inherit_select_classes: true,
        search_contains: true,
        width: "100%"
    });
});
