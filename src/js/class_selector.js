"use strict";

function buildClassList() {
    $.each(BDOdatabase.classes, function () {
        var li = $("<li>")
            .addClass("class " + this.name + (this.disabled ? " disabled" : ""))
            .attr({"data-value": this.id})
            .appendTo("#class-section .classes");
        
        $("<div>")
            .addClass("main-background")
            .appendTo(li);
            
        $("<div>")
            .addClass("icon")
            .appendTo(li);
            
        $("<div>")
            .addClass("name")
            .text(this.display_name)
            .appendTo(li);
    })
}

// Class hover
$("body").on("mouseenter", "#class-section .classes .class", function (e) {
        $("#class-section .classes .class").addClass("bg");
        $(this).removeClass("bg");
    }).on("mouseleave", ".class", function (e) {
        $("#class-section .classes .class").removeClass("bg");
    });

// Handle class selection
$("body").on("click", "#class-section .classes .class", function () {
    if ($(this).hasClass("disabled"))
        return;
    
    //$("#primary-stats .stats-table .stat-awk-ap").hide();

    BDOcharacter.init();
    
    BDOcharacter.setClass($(this).attr("data-value"));
    
    //BDOcalculator.calculate();

    /*$('.gear-slot').each(function (k, v) {
        resetGearslotItem($(v).attr('data-type'), $(v).attr('data-item'));
    });*/

    $("#equipment .background-ring-inner").css({
        'background-image': $(this).find(".icon").css("background-image")
    });

    $("#class-section").animate({'opacity': 0}, "fast", function () {
        $(this).addClass("hide");
        $("#calculator-section").removeClass("hide").css({'opacity': 0}).animate({'opacity': 1}, 'fast');
    });
    $(".change-class-toggle .current-class").text(BDOcharacter.build.class.obj.display_name);
    $("#calculator-section #equipment").addClass(BDOcharacter.build.class.obj.name);
    
    // Temp
    $("#equipment .gear-slot, #equipment .gem-slot").addClass("empty");

    /*$("#create-short-link").addClass("disabled");
    $('#share-link-short').val("");*/
});