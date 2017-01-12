/*
* @Author: https://github.com/Shadowtrance/BDO-Gear-Calculator
* @http: https://bdoplanner.com/
*/
(function ($) {
    "use strict";

    var player_class = "",
        current_item_type = null,
        current_item_itemset = null,
        current_item_no = null,
        current_modal = null,
        active_filters = {
            search: '',
            rarity: ["common", "uncommon", "rare", "epic", "legendary"]
        };
        
    $(':not(.disabled)[data-toggle="tooltip"]').tooltip(); // Enable tooltips

    // Original from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(window.location.href);

        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    // little hacky, I know.
    function getGemType (item, slot) {
        var gemName = BDOcalculator.gear[item].gems[slot].gem_name,
            itemGems = Object.keys(BDOdatabase.gems[item]),
            allGems  = Object.keys(BDOdatabase.gems.all);

        if (gemName && allGems.indexOf(gemName) !== -1) {
            return "a" + allGems.indexOf(gemName);
        }

        return itemGems.indexOf(gemName);
    }

    // Object.keys(BDOdatabase.items.helmets).indexOf(5) == "Grunil Helmet"
    function saveShareLink () {
        var save = [
            BDOdatabase.classes.indexOf(ucWords(player_class)),
            [
                Object.keys(BDOdatabase.items.helmets).indexOf(BDOcalculator.gear.helmet.item_id),
                parseInt(BDOcalculator.gear.helmet.enhancement),
                [
                    getGemType("helmet","1"),
                    getGemType("helmet","2")
                ]
            ],
            [
                Object.keys(BDOdatabase.items.armor).indexOf(BDOcalculator.gear.armor.item_id),
                parseInt(BDOcalculator.gear.armor.enhancement),
                [
                    getGemType("armor","1"),
                    getGemType("armor","2")
                ]
            ],
            [
                Object.keys(BDOdatabase.items.shoes).indexOf(BDOcalculator.gear.shoes.item_id),
                parseInt(BDOcalculator.gear.shoes.enhancement),
                [
                    getGemType("shoes","1"),
                    getGemType("shoes","2")
                ]
            ],
            [
                Object.keys(BDOdatabase.items.gloves).indexOf(BDOcalculator.gear.gloves.item_id),
                parseInt(BDOcalculator.gear.gloves.enhancement),
                [
                    getGemType("gloves","1"),
                    getGemType("gloves","2")
                ]
            ],
            [
                [
                    Object.keys(BDOdatabase.items.rings).indexOf(BDOcalculator.gear.rings["1"].item_id),
                    parseInt(BDOcalculator.gear.rings["1"].enhancement)
                ],
                [
                    Object.keys(BDOdatabase.items.rings).indexOf(BDOcalculator.gear.rings["2"].item_id),
                    parseInt(BDOcalculator.gear.rings["2"].enhancement)
                ]
            ],
            [
                [
                    Object.keys(BDOdatabase.items.earrings).indexOf(BDOcalculator.gear.earrings["1"].item_id),
                    parseInt(BDOcalculator.gear.earrings["1"].enhancement)
                ],
                [
                    Object.keys(BDOdatabase.items.earrings).indexOf(BDOcalculator.gear.earrings["2"].item_id),
                    parseInt(BDOcalculator.gear.earrings["2"].enhancement)
                ]
            ],
            [
                Object.keys(BDOdatabase.items.belts).indexOf(BDOcalculator.gear.belt.item_id),
                parseInt(BDOcalculator.gear.belt.enhancement)
            ],
            [
                Object.keys(BDOdatabase.items.necklaces).indexOf(BDOcalculator.gear.necklace.item_id),
                parseInt(BDOcalculator.gear.necklace.enhancement)
            ],
            [
                Object.keys(BDOdatabase.items["main-weapons"][player_class]).indexOf(BDOcalculator.gear["main-weapon"].item_id),
                parseInt(BDOcalculator.gear["main-weapon"].enhancement),
                [
                    getGemType("main-weapon","1"),
                    getGemType("main-weapon","2")
                ]
            ],
            [
                Object.keys(BDOdatabase.items["awakening-weapons"][player_class]).indexOf(BDOcalculator.gear["awakening-weapon"].item_id),
                parseInt(BDOcalculator.gear["awakening-weapon"].enhancement)
            ],
            [
                Object.keys(BDOdatabase.items["secondary-weapons"][player_class]).indexOf(BDOcalculator.gear["secondary-weapon"].item_id),
                parseInt(BDOcalculator.gear["secondary-weapon"].enhancement),
                [
                    getGemType("secondary-weapon","1"),
                    getGemType("secondary-weapon","2")
                ]
            ],
            [
                Object.keys(BDOdatabase.items["alchemy-stones"]).indexOf(BDOcalculator.gear["alchemy-stone"].item_id)
            ],
            [
                Object.keys(BDOdatabase.items["outfits"]).indexOf(BDOcalculator.gear["outfit"].item_id),
                [
                    getGemType("outfit","1")
                ]
            ],
            [
                Object.keys(BDOdatabase.items["main-weapon-outfits"]).indexOf(BDOcalculator.gear["main-weapon-outfit"].item_id)
            ],
            [
                Object.keys(BDOdatabase.items["awakening-weapon-outfits"]).indexOf(BDOcalculator.gear["awakening-weapon-outfit"].item_id)
            ],
            [
                Object.keys(BDOdatabase.items["secondary-weapon-outfits"]).indexOf(BDOcalculator.gear["secondary-weapon-outfit"].item_id)
            ],
            [
                Object.keys(BDOdatabase.items["underwear"]).indexOf(BDOcalculator.gear["underwear"].item_id)
            ]
        ];

        var url = window.location.href.replace(window.location.search, "");

        $('#share-link').val(url + (url.indexOf('?') === -1 ? '?' : '&') + 'gear=' + /*encodeURIComponent(*/JSON.stringify(save)/*)*/);
    }

    function loadShareLink(callback) {
        var gear = getParameterByName('gear'),
            array_index = [
                "class",
                "helmet",
                "armor",
                "shoes",
                "gloves",
                "rings",
                "earrings",
                "belt",
                "necklace",
                "main-weapon",
                "awakening-weapon",
                "secondary-weapon",
                "alchemy-stone",
                "outfit",
                "main-weapon-outfit",
                "awakening-weapon-outfit",
                "secondary-weapon-outfit",
                "underwear"
            ];

        callback = (typeof callback !== "undefined" ? callback : function(e) {});

        if (gear === null) {
            callback(false);
            return;
        }

        gear = JSON.parse(gear);

        if ($.inArray(ucWords(BDOdatabase.classes[gear[0]]), BDOdatabase.classes) === -1) {
            callback(false);
            return;
        }

        player_class = BDOdatabase.classes[gear[0]].toLowerCase();
        BDOcalculator.init();
        BDOcalculator.player_class = player_class;

        var c = gear.length - 1;
        for (var n = 1; n <= c; n++) {
            var item_key = array_index[n],
                item_type = item_key,
                item_itemset = item_key + (item_key === "armor" || item_key === "underwear" ? "" : (item_key.slice(-1) !== "s" ? "s" : "")),
                item = BDOdatabase.items[item_itemset],
                item_list = Object.keys(item),
                item_id = "",
                item_no;

            if (gear[n][0] === -1) {
                continue;
            }
            
            if (BDOcalculator.isItemPair(item_type)) {
                for (var i = 1; i >= 0; i--) {
                    item_id = item_list[gear[n][i][0]];

                    if (item_id === "" || typeof item_id === "undefined") {
                        continue;
                    }

                    addItem(item_id, item_type.slice(0, -1), item_type, i + 1, gear[n][i][1], false);
                }
            } else {
                var arr_enh = (typeof gear[n][1] == "object" ? -1 : 1),
                    arr_gems = (typeof gear[n][1] == "object" ? 1 : 2);
                
                if (item_type === "main-weapon" || item_type === "secondary-weapon" || item_type === "awakening-weapon") {
                    item_id = Object.keys(item[player_class])[gear[n][0]];
                } else {
                    item_id = item_list[gear[n][0]];
                }

                if (item_id === "" || typeof item_id === "undefined") {
                    continue;
                }

                // set item
                addItem(item_id, item_type, item_itemset, item_no, (arr_enh === -1 ? 0 : gear[n][1]), false);

                // set gems
                if (BDOcalculator.isGemable(item_type)) {
                    if (gear[n][arr_gems].length) {
                        var gem_list = Object.keys(BDOdatabase.gems[item_type]),
                            allgem_list = Object.keys(BDOdatabase.gems.all);

                        for (var i = 1; i >= 0; i--) {
                            if (gear[n][arr_gems][i] === -1 || typeof gear[n][arr_gems][i] === "undefined") {
                                continue;
                            }

                            if (typeof gear[n][arr_gems][i] === "number") {
                                item_id = gem_list[gear[n][arr_gems][i]];
                            }

                            if (item_type !== "outfit" && typeof gear[n][arr_gems][i] === "string") {
                                item_id = allgem_list[parseInt(gear[n][arr_gems][i].replace('a',""))];
                            }

                            if (item_id === "" || typeof item_id === "undefined") {
                                continue;
                            }

                            addItem(item_id, item_type, "gems", i + 1, null, false);
                        }
                    }
                }
            }
        }

        callback(true);
    }

    function getEnhancementMax(itemObj) {
        var enhancement_levels = Object.keys(itemObj.enhancement).length;

        if (enhancement_levels > 0) {
            if (enhancement_levels > BDOdatabase.max_gear_enhancement) {
                enhancement_levels = BDOdatabase.max_gear_enhancement;
            }
        }

        return enhancement_levels;
    }

    function ucWords(str) {
        return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    }

    function resetGearslotItem(item_type, item_no) {
        $("#equipment .gear-slot[data-type='" + item_type + "']" + (typeof item_no === 'undefined' ? '' : "[data-item='" + item_no + "']")).attr({
            'style': '',
            'data-original-title': "Empty"
        }).empty();
        $('#equipment .gem-slot.' + item_type + '1, #equipment .gem-slot.' + item_type + '2').attr({
            'style': '',
            'data-original-title': "Empty"
        }).hide();
    }

    function setGearslotItem(item, item_type, item_no, item_id, item_itemset, level) {
        item_no = (typeof item_no === "undefined" ? "undefined" : item_no);

        if (item_itemset !== "gems") { // If item IS NOT a gem
            $("#equipment .gear-slot[data-type='" + item_type + "']" + (item_no === 'undefined' ? '' : "[data-item='" + item_no + "']"))
                .css({
                    'background': 'url(assets/images/items/' + item_itemset + '/' + (!BDOcalculator.isWeapon(item_type) ? pad(item_id, 8) : player_class + "/" + pad(item_id, 8)) + '.png) no-repeat center center',
                    'border-color': BDOdatabase.rarities[item.rarity]
                }).attr({
                    "data-original-title": BDOdatabase.enhancements[BDOcalculator.isAccessory(item_type) ? (parseInt(level) == 0 ? 0 : parseInt(level) + 15) : level].prefix + item.name
                }).empty();
                
            $("<div>")
                .addClass("enhancement-level")
                .html(BDOdatabase.enhancements[BDOcalculator.isAccessory(item_type) ? (parseInt(level) == 0 ? 0 : parseInt(level) + 15) : level].display)
                .appendTo("#equipment .gear-slot[data-type='" + item_type + "']" + (item_no === 'undefined' ? '' : "[data-item='" + item_no + "']"));
        } else { // Otherwise, it's a gem!
            $("#equipment .gem-slot[data-type='" + item_type + "']" + "[data-item='" + item_no + "']")
                .css({
                    'background-image': 'url(assets/images/gems/' + pad(item_id, 8) + '.png)',
                    'border-color': BDOdatabase.rarities[item.rarity]
                }).attr({
                    "data-original-title": item.name
                });
        }

        if (BDOcalculator.isGemable(item_type) && item_itemset !== "gems") {
            $('#equipment .gem-slot.' + item_type + '1, #equipment .gem-slot.' + item_type + '2').attr({
                "data-original-title": "Empty"
            }).hide();

            if (item.gems > 0) {
                var gem;

                for (var i = item.gems; i > 0; i--) {
                    if (BDOcalculator.gear[item_type].gems[i].gem_name === "") {
                        $('#equipment .gem-slot.' + item_type + i).attr('style', '').show();
                        continue;
                    }

                    gem = BDOcalculator.gear[item_type].gems[i].gem;

                    $('#equipment .gem-slot.' + item_type + i).css({
                        'border-color': BDOdatabase.rarities[gem.rarity]
                    }).show();
                }
            }
        }
    }

    function addItem(item_id, item_type, item_itemset, item_no, level, calculate) {
        var item = (item_itemset === "gems" ? BDOdatabase.gems :  BDOdatabase.items[item_itemset]);
        calculate = (typeof calculate === "undefined" ? true : calculate);
        level = level || 0;

        if (item_itemset !== "gems") {
            if (BDOcalculator.isWeapon(item_type)) {
                item = item[player_class.toLowerCase()];
            }
        } else {
            if (typeof item[item_type][item_id] === 'undefined') {
                item = item.all;
            }
            else {
                item = item[item_type];
            }
        }
        
        if (item_type === "awakening-weapon") {
            $("#primary-stats .stats-table .stat-awk-ap").show();
        }

        item = item[item_id];

        BDOcalculator.setGear(item, item_type, item_no, item_id, item_itemset, function() {
            setGearslotItem(item, item_type, item_no, item_id, item_itemset, level);

            if (item_itemset !== "gems") {
                BDOcalculator.setEnchantmentLevel(item_type, item_no, level, function() {
                    if (calculate) {
                        BDOcalculator.calculate();
                    }
                });
            } else if (calculate) {
                BDOcalculator.calculate();
            }

            if (calculate) {
                saveShareLink();
            }
        });
    }

    function generateGemItemPlate(item, item_type, item_no, key, c, selected) {
        c = (typeof c === 'undefined' ? 1 : c);

        var item_element = $('<div class="item-details ' + (selected ? ' selected ' : '') + 'card"/>'),
            stat_element;

        // item name
        item_element.append('<div class="item-name">'+
                                '<strong style="color: ' + BDOdatabase.rarities[item.rarity] + '">' + item.name + '</strong>'+
                            '</div>');

        // item icon
        var w_item_icon = $("<div>")
            .addClass("item-icon")
            .appendTo(item_element);
            
        var item_icon = $("<img>")
            .attr({
                "alt": "BDO Gear Calculator",
                "src": 'assets/images/gems/' + pad(key, 8) + '.png'
            })
            .appendTo(w_item_icon);

        // item choose button
        var item_button = $("<button>")
            .addClass("btn btn-sm btn-primary item-choose")
            .attr({
                "data-item": key,
                "data-itemset": "gems",
                "data-type": item_type,
                "data-itemno": item_no,
                "data-rarity": item.rarity,
                "data-itemname": item.name
            })
            .html("Choose")
            .appendTo(item_element);

        // item effects
        stat_element = $('<div class="item-effects"/>');
        stat_element.append('<strong>Item Effects</strong>');

        if (Object.keys(item.item_effects).length > 0) {
            for (var stat_key in item.item_effects) {
                if (!item.item_effects.hasOwnProperty(stat_key)) {
                     continue;
                }

                if (stat_key === "special") {
                    stat_element.append('<strong>' + BDOdatabase.stats[stat_key].title + ':</strong><div>' + item.item_effects.special + '</div>');
                } else {
                    stat_element.append('<div>' + BDOdatabase.stats[stat_key].title + ' ' + item.item_effects[stat_key] + BDOdatabase.stats[stat_key].symbol + '</div>');
                }
            }
        } else {
            stat_element.append('<div>None.</div>');
        }

        stat_element.appendTo(item_element);

        // incompatible
        if (item.incompatible.length > 0) {
            stat_element = $('<div class="item-effects"/>');
            stat_element.append('<strong>It doesn\'t stack with:</strong>');

            for (var i = item.incompatible.length - 1; i >= 0; i--) {
                stat_element.append('<div>' + item.incompatible[i] + '</div>');
            }

            stat_element.appendTo(item_element);
        }

        return item_element;
    }

    function generateItemPlate(item, item_type, item_itemset, item_no, key, c, selected) {
        c = (typeof c === 'undefined' ? 1 : c);

        var item_element = $('<div class="item-details ' + (selected ? ' selected ' : '') + 'card"/>'),
            stat_element,
            enhancement_level = 0;

        if (BDOcalculator.isItemPair(item_type)) {
            if (BDOcalculator.gear[item_type + "s"][item_no].item_id === key) {
                enhancement_level = BDOcalculator.gear[item_type + "s"][item_no].enhancement;
            }
        } else {
            if (BDOcalculator.gear[item_type].item_id === key) {
                enhancement_level = BDOcalculator.gear[item_type].enhancement;
            }
        }

        // item name
        item_element.append('<div class="item-name">'+
                                '<strong style="color: ' + BDOdatabase.rarities[item.rarity] + '"><span class="item-name-enhancement-prefix">' + BDOdatabase.enhancements[BDOcalculator.isAccessory(item_type) ? (enhancement_level == 0 ? enhancement_level : parseInt(enhancement_level) + 15) : enhancement_level].prefix + '</span>' + item.name + '</strong>'+
                            '</div>');

        // item icon
        var w_item_icon = $("<div>")
            .addClass("item-icon")
            .appendTo(item_element);
            
        var item_icon = $("<img>")
            .attr({
                "alt": "BDO Gear Calculator",
                "src": 'assets/images/items/' + item_itemset + '/' + (!BDOcalculator.isWeapon(item_type) ? pad(key, 8) : player_class + "/" + pad(key, 8)) + '.png'
            })
            .appendTo(w_item_icon);

        // item stats
        stat_element = $('<div class="item-stats"/>');

        if (typeof item.ap !== 'undefined') {
            stat_element.append('<div>AP: ' + BDOcalculator.getItemStat(item, "ap", false, enhancement_level) + '</div>');
        }
        if (typeof item.ap_min !== 'undefined') {
            stat_element.append('<div>AP: ' + BDOcalculator.getItemStat(item, "ap_min", false, enhancement_level) + '~' + BDOcalculator.getItemStat(item, "ap_max", false, enhancement_level) + '</div>');
        }
        if (typeof item.dp !== 'undefined') {
            stat_element.append('<div>DP: ' + BDOcalculator.getItemStat(item, "dp", false, enhancement_level) + '</div>');
        }
        stat_element.appendTo(item_element);

        // item choose button
        var item_button = $("<button>")
            .addClass("btn btn-sm btn-primary item-choose")
            .attr({
                "data-enh": enhancement_level,
                "data-item": key,
                "data-itemset": item_itemset,
                "data-type": item_type,
                "data-itemno": item_no,
                "data-rarity": item.rarity,
                "data-itemname": item.name
            })
            .html("Choose")
            .appendTo(item_element);

        // item gems
        item_element.append('<div class="item-gems">'+
                                '<strong>Gem Slots:</strong>'+
                                '<div>' + item.gems + '</div>'+
                            '</div>');

        // item effects
        stat_element = $('<div class="item-effects"/>');
        stat_element.append('<strong>Item Effects</strong>');

        if (Object.keys(item.item_effects).length > 0) {
            for (var stat_key in item.item_effects) {
                if (!item.item_effects.hasOwnProperty(stat_key)) {
                     continue;
                }

                if (stat_key === "special") {
                    stat_element.append('<strong>' + BDOdatabase.stats[stat_key].title + ':</strong><div>' + item.item_effects.special + '</div>');
                } else {
                    stat_element.append('<div>' + BDOdatabase.stats[stat_key].title + ' ' + BDOcalculator.getItemStat(item, stat_key, true, enhancement_level) + BDOdatabase.stats[stat_key].symbol + '</div>');
                }
            }
        } else {
            stat_element.append('<div>None.</div>');
        }

        stat_element.appendTo(item_element);

        // item set effects
        stat_element = $('<div class="item-set-effects"/>');
        stat_element.append('<strong>Set Effects</strong>');

        if (typeof BDOdatabase.set_effects[item.set] !== 'undefined') {
            if (typeof BDOdatabase.set_effects[item.set].combos !== 'undefined') {

                for (var combos_key in BDOdatabase.set_effects[item.set].combos) {
                    if (!BDOdatabase.set_effects[item.set].combos.hasOwnProperty(combos_key)) {
                         continue;
                    }

                    var combos = BDOdatabase.set_effects[item.set].combos[combos_key],
                        effect_string = '';

                    for (var combo_eff_key in combos.effects) {
                        if (!combos.effects.hasOwnProperty(combo_eff_key)) {
                             continue;
                        }

                        effect_string += (effect_string === '' ? '<div><span>' + ucWords(combos.pieces.join(' + ')) + ':</span> ' : ' & ') + BDOdatabase.stats[combo_eff_key].title + ' +' + combos.effects[combo_eff_key] + BDOdatabase.stats[combo_eff_key].symbol;
                    }

                    stat_element.append(effect_string + '</div>');
                }
            }

            if (typeof BDOdatabase.set_effects[item.set].pieces !== 'undefined') {

                for (var pieces_key in BDOdatabase.set_effects[item.set].pieces) {
                    if (!BDOdatabase.set_effects[item.set].pieces.hasOwnProperty(pieces_key)) {
                         continue;
                    }

                    var pieces_effects = BDOdatabase.set_effects[item.set].pieces[pieces_key],
                        effect_string = '';

                    for (var set_eff_key in pieces_effects) {
                        if (!pieces_effects.hasOwnProperty(set_eff_key)) {
                             continue;
                        }

                        effect_string += (effect_string === '' ? '<div><span>' + pieces_key + '-Pieces:</span> ' : ' & ') + BDOdatabase.stats[set_eff_key].title + ' +' + pieces_effects[set_eff_key] + BDOdatabase.stats[set_eff_key].symbol;
                    }

                    stat_element.append(effect_string + '</div>');
                }
            }
        } else {
            stat_element.append('<div>None.</div>');
        }

        stat_element.appendTo(item_element);
        
        var enhance_max = getEnhancementMax(item);
                 
        if (enhance_max > 0) {

            // item enhancement effects
            item_element.append('<div class="item-enhancement-effects">'+
                                '<strong>Enhancement Effects:</strong>'+
                                '<div>' + (typeof item.enhancement_text === 'undefined' || item.enhancement_text === "" ? 'Info Missing..' : item.enhancement_text) + '</div>'+
                            '</div>');
                            

            var slider_steps = [];
            for (var i = 0; i <= getEnhancementMax(item); i += 5) {
                slider_steps.push(i);
            }

            // item enhance level
            item_element.append('<div class="item-enhancement-level">'+
                                '<strong>Enhancement Level:</strong>'+
                                '<input data-slider-min="" data-slider-max="' + getEnhancementMax(item) + '" data-slider-value="' + enhancement_level + '" class="item-enhancement-slider" data-slider-ticks="[' + slider_steps.join(",") + ']">'+
                            '</div>');
        }

        return item_element;
    }

    function resetSlot(item_type, item_no, item_itemset) {
        if (item_type === "awakening-weapon") {
            $("#primary-stats .stats-table .stat-awk-ap").hide();
        }
        
        if (item_itemset !== "gems") {
            $("#equipment .gear-slot[data-type='" + item_type + "']" + (typeof item_no === 'undefined' ? '' : "[data-item='" + item_no + "']"))
                .attr({
                    'data-original-title': "Empty"
                }).css({
                    'background-image': '',
                    'border-color': ''
                }).empty();
            $('#equipment .gem-slot.' + item_type + '1, #equipment .gem-slot.' + item_type + '2')
            .attr({
                'data-original-title': "Empty"
            }).css({
                'background-image': '',
                'border-color': ''
            }).hide();
        } else {
            $('#equipment .gem-slot.' + item_type + '' + item_no)
            .attr({
                'data-original-title': "Empty"
            }).css({
                'background-image': '',
                'border-color': ''
            });
        }
        
        BDOcalculator.setGear({}, item_type, item_no, "", item_itemset, function() {               
            BDOcalculator.calculate();
            saveShareLink();
        });
    }
    
    function filterModalItems() {
        $(".item-details").show();
        $(".item-choose").filter(function () {
            return $(this).attr("data-itemname").toLowerCase().indexOf($("#gearlist-search").val()) == -1 || $.inArray($(this).attr("data-rarity"), active_filters.rarity) === -1;
        }).closest(".item-details").hide();
    }
    
    function buildGearModal(item_type, item_itemset, item_no) {
        $(".card.remove-item").hide();
        
        var items_db = BDOdatabase.items[item_itemset],
            items_list = (typeof items_db[player_class] === "undefined" ? items_db : items_db[player_class]),
            c = 1;
            
        $(".remove-item .btn")
            .removeAttr("data-itemno")
            .attr({
                "data-type": item_type,
                "data-itemno": item_no,
                "data-itemset": item_itemset
            });
            
        // reset the modal body
        $('#gearlist .modal-body .items').html('');
        
        for (var key in items_list) {
            if (!items_list.hasOwnProperty(key)) {
                continue;
            }
            
            var item = items_list[key],
                selected = false;

            if (BDOcalculator.isItemPair(item_type)) {
                if (BDOcalculator.gear[item_type + "s"][item_no].item_id === key) {
                    selected = true;
                }
            } else {
                if (BDOcalculator.gear[item_type].item_id === key) {
                    selected = true;
                }
            }
            
            if (selected) {
                $(".card.remove-item").show();
            }

            generateItemPlate(item, item_type, item_itemset, item_no, key, c, selected).appendTo('#gearlist .modal-body .items');

            c++;
        }
        
        
        $(".item-enhancement-slider").each(function(k, v) {
            if ($(v).attr('data-slider-max') !== "0") {
                $(v).slider({
                    tooltip: 'hide'
                }).on("change", function(e) {
                    var itemPlate = $(e.target).closest('.item-details'),
                        button = $(e.target).closest('.item-details').find('.item-choose'),
                        item_key = button.attr('data-item'),
                        item_type = button.attr('data-type'),
                        item_itemset = button.attr('data-itemset'),
                        item_no = button.attr('data-itemno'),
                        items_db = BDOdatabase.items[item_itemset],
                        item = (typeof items_db[player_class] === "undefined" ? items_db : items_db[player_class]);
                        item = item[item_key];

                    // set the enhancement value
                    button.attr('data-enh', e.value.newValue);

                    // item effects
                    var stat_element = $('<div class="item-effects"/>');
                    stat_element.append('<strong>Item Effects</strong>');

                    if (Object.keys(item.item_effects).length > 0) {
                        for (var stat_key in item.item_effects) {
                            if (!item.item_effects.hasOwnProperty(stat_key)) {
                                 continue;
                            }

                            if (stat_key === "special") {
                                stat_element.append('<strong>' + BDOdatabase.stats[stat_key].title + ':</strong><div>' + item.item_effects.special + '</div>');
                            } else {
                                if (typeof BDOdatabase.stats[stat_key] === 'boolean') {
                                    stat_element.append('<div>' + BDOdatabase.stats[stat_key].title + BDOdatabase.stats[stat_key].symbol + '</div>');
                                } else {
                                    stat_element.append('<div>' + BDOdatabase.stats[stat_key].title + ' ' + BDOcalculator.getItemStat(item, stat_key, true, e.value.newValue) + BDOdatabase.stats[stat_key].symbol + '</div>');
                                }
                            }
                        }
                    } else {
                        stat_element.append('<div>None.</div>');
                    }

                    itemPlate.find('.item-effects').replaceWith(stat_element);

                    // item stats
                    stat_element = $('<div class="item-stats"/>');

                    if (typeof item.ap !== 'undefined') {
                        stat_element.append('<div>AP: ' + BDOcalculator.getItemStat(item, "ap", false, e.value.newValue) + '</div>');
                    }
                    if (typeof item.ap_min !== 'undefined') {
                        stat_element.append('<div>AP: ' + BDOcalculator.getItemStat(item, "ap_min", false, e.value.newValue) + '~' + BDOcalculator.getItemStat(item, "ap_max", false, e.value.newValue) + '</div>');
                    }
                    if (typeof item.dp !== 'undefined') {
                        stat_element.append('<div>DP: ' + BDOcalculator.getItemStat(item, "dp", false, e.value.newValue) + '</div>');
                    }

                    itemPlate.find('.item-stats').replaceWith(stat_element);
                    
                    itemPlate.find(".item-name .item-name-enhancement-prefix").html(BDOdatabase.enhancements[BDOcalculator.isAccessory(item_type) ? (e.value.newValue == 0 ? e.value.newValue : parseInt(e.value.newValue) + 15) : e.value.newValue].prefix);
                });
            }
        });
    }
    
    function buildGemModal(item_type, item_no) {
        $(".card.remove-item").hide();
        
        var items_list, c = 1;
        if (item_type !== "outfit") {
            items_list = $.extend({}, BDOdatabase.gems.all, BDOdatabase.gems[item_type]);
        } else {
            items_list = $.extend({}, BDOdatabase.gems[item_type]);
        }
            
            
        $(".remove-item .btn")
            .removeAttr("data-itemno")
            .attr({
                "data-type": item_type,
                "data-itemno": item_no,
                "data-itemset": "gems"
            });

        // reset the modal body
        $('#gearlist .modal-body .items').html('');

        for (var key in items_list) {
            if (!items_list.hasOwnProperty(key)) {
                 continue;
            }

            var item = items_list[key],
                selected = false;
                
                

            if (BDOcalculator.gear[item_type].gems[item_no].gem_name === key) {
                selected = true;
            }
            
            if (selected) {
                $(".card.remove-item").show();
            }

            generateGemItemPlate(item, item_type, item_no, key, c, selected).appendTo('#gearlist .modal-body .items');

            c++;
        }
    }
        
    // when a user selects a class, we initiate the equipment dropdowns based on class.
    $("#player-class-section .classes-panel").on("click", ".class",function() {
        if ($(this).hasClass("disabled")) return;
        player_class = $(this).attr("data-value").toLowerCase();
        BDOcalculator.player_class = player_class;

        BDOcalculator.init();
        BDOcalculator.calculate();

        $('.gear-slot').each(function(k, v) {
            resetGearslotItem($(v).attr('data-type'), $(v).attr('data-item'));
        });
        
        $(".background-ring-inner").css({
            'background-image': $(this).find(".icon").css("background-image")
        });

        $("#player-class-section").slideUp("fast");
        $("#calculator-section").slideDown("fast");
    });
    
    $(document).on('click', '.item-choose', function() {
        var item_type = $(this).attr('data-type'),
            item_id = $(this).attr('data-item'),
            item_itemset = $(this).attr('data-itemset'),
            item_no = $(this).attr('data-itemno'),
            level = $(this).attr('data-enh');

        $('#gearlist').modal("hide");

        addItem(item_id, item_type, item_itemset, item_no, level);
    });
    
    $(document).on('click', '.remove-item .btn', function() {
        $('#gearlist').modal("hide");
        
        resetSlot($(this).attr('data-type'), $(this).attr('data-itemno'), $(this).attr('data-itemset'));
    });
    
    $(".classes_restore").on('click', 'a.show', function(e) {
        e.preventDefault();
        $(".class_cell").slideDown("fast");
        $(".classes_restore .show").slideUp("fast");
        $(".classes_restore .hide").slideDown("fast");
    });

    $(".classes_restore").on('click', 'a.hide', function(e) {
        e.preventDefault();
        $(".class_cell").slideUp("fast");
        $(".classes_restore .show").slideDown("fast");
        $(".classes_restore .hide").slideUp("fast");
    });
    
    $('#gearlist').on('show.bs.modal', function() {
        $("#gearlist-search").val("");
        $("#gear-rarity-filter li").addClass("active");
        active_filters = {
            search: '',
            rarity: ["common", "uncommon", "rare", "epic", "legendary"]
        };
    });
    
    $('#gearlist').on('shown.bs.modal', function () {
        $('#gearlist-search').focus();
        if ($(".item-details.selected").length > 0) {
            var offset = $(".item-details.selected").offset();
            $('#gearlist').animate({
                scrollTop: offset.top
            }, 500);
        }
    });
    
    $("#gearlist-search").on('input', function (e) {
        active_filters.search = $("#gearlist-search").val();
        
        filterModalItems();
    });
    
    $("#gear-rarity-filter").on("click", "li", function (e) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            active_filters.rarity.splice($.inArray($(this).attr("data-rarity"), active_filters.rarity), 1);
        } else {
            $(this).addClass("active");
            active_filters.rarity.push($(this).attr("data-rarity"));
        }
        
        filterModalItems();
    });
    
    $("#equipment .gear-slot").click(function() {
        if ($(this).hasClass("disabled")) return;
        current_item_type = $(this).attr('data-type');
        current_item_itemset = $(this).attr('data-itemset');
        current_item_no = $(this).attr('data-item');
        current_modal = "gear";
        
        buildGearModal($(this).attr('data-type'), $(this).attr('data-itemset'), $(this).attr('data-item'));

        $('#gearlist').modal();
    });

    $("#equipment .gem-slot").click(function() {
        current_item_type = $(this).attr('data-type');
        current_item_no = $(this).attr('data-item');
        current_modal = "gem";

        buildGemModal($(this).attr('data-type'), $(this).attr('data-item'));

        $('#gearlist').modal();
    });

    $("#show-more-info").on("click", function (e) {
        e.preventDefault();
        
        $('#moreinfo').modal();
    });
    $("#show-update-notes").on("click", function (e) {
        e.preventDefault();
        
        $('#updatenotes').modal();
    });
    $("#show-settings").on("click", function (e) {
        e.preventDefault();
        
        $('#settings').modal();
    });
    
    $("#player-class-section .classes-panel").on("mouseenter", ".class", function (e) {
        $(".classes-panel .class").addClass("bg");
        $(this).removeClass("bg");
    }).on("mouseleave", ".class", function (e) {
        $(".classes-panel .class").removeClass("bg");
    });
    
    $("body").on("mouseenter", "[data-breakdown!=''][data-breakdown]", function (e) {
        var offset = $(this).offset();
        var screenWidth = $(document).width();
        var width = $(this).outerWidth();
        if (offset.left + width < screenWidth / 2) {
            $('#stat-breakdown').css({
                top: offset.top,
                left: (offset.left + width) + 10,
                right: "auto"
            }).show();
        } else {
            $('#stat-breakdown').css({
                top: offset.top,
                left: "auto",
                right: (screenWidth - offset.left) + 10
            }).show();
        }
        var stat_type = $(this).attr("data-breakdown");
        $("#stat-breakdown .opener").text("Total " + BDOdatabase.stats[stat_type].title + ": ");
        var stats = BDOcalculator.calculateSingleStat(stat_type);
        $("#stat-breakdown .list").html("");
        $("#stat-breakdown .opener")
        $("<span>")
            .addClass("info")
            .html(stats.total + BDOdatabase.stats[stat_type].symbol)
            .appendTo("#stat-breakdown .opener");
        if (BDOdatabase.stats[stat_type].desc != "") {
            $("<li>")
                .html(BDOdatabase.stats[stat_type].desc)
                .appendTo("#stat-breakdown .list");
        }
        $("<li>")
            .html("Increased by:")
            .appendTo("#stat-breakdown .list");
        for (var item in stats.item_list) {
            var li_base = $("<li>")
                .addClass("no")
                .html(stats.item_list[item].item + ": ")
                .appendTo("#stat-breakdown .list");
            $("<span>")
                .addClass("info")
                .html(stats.item_list[item].value + BDOdatabase.stats[stat_type].symbol)
                .appendTo(li_base);
            $(stats.item_list[item].slot).addClass("active-stat");
        }
    }).on("mouseleave", "[data-breakdown!=''][data-breakdown]", function (e) {
        $("#stat-breakdown").hide();
        $(".gear-slot, .gem-slot").removeClass("active-stat");
    });
    
    $("#active-alch-stone").on("click", function () {
        BDOcalculator.calculate();
    });
    
    $("#enable-compact-item-modals").on("click", function () {
        if($(this).is(":checked")) {
            CalcConfig.change('compact_item_modals', true);
            $("body").addClass("compact-item-modals");
        } else {
            CalcConfig.change('compact_item_modals', false);
            $("body").removeClass("compact-item-modals");
        }
    });
     
    $(document).ready(function() {
        loadShareLink(function(loaded) {
            if (loaded) {
                $(".class_cell .class_icon[data-value='" + ucWords(player_class) + "']").closest(".class_img").removeClass("faded").addClass("selected");
                BDOcalculator.calculate();
                saveShareLink();
                
                $(".background-ring-inner").css({
                    'background-image': 'url(' + $(".class_cell .class_icon[data-value='" + ucWords(player_class) + "']").attr("src") + ')'
                });

                $(".class_cell").slideUp("fast");
                $(".classes_restore .show").slideDown("fast");
                $(".classes_restore .hide").slideUp("fast");
                $("#calculator-section").slideDown("fast");
            } else {
                $(".classes_restore .show").slideUp("fast");
                $(".classes_restore .hide").slideDown("fast");
            }
        });

        $("#player-class-section").slideDown();
        
        CalcConfig.readConfig(function () {
            $("#enable-compact-item-modals").prop("checked", CalcConfig.config.compact_item_modals);
            if(CalcConfig.config.compact_item_modals) {
                $("body").addClass("compact-item-modals");
            } else {
                $("body").removeClass("compact-item-modals");
            }
            
            $("#updatenotes .version").html("v " + CalcConfig.configDefault.latestVersion.major + "." + CalcConfig.configDefault.latestVersion.minor + "." + CalcConfig.configDefault.latestVersion.revision);
            
            if (!CalcConfig.noCookies && CalcConfig.newVersion) {
                $("#updatenotes").modal();
            }
        });
                
        //Copy share link to clipboard / tooltip setup
        var cb = new Clipboard('#copy-button');

        // Initialize the tooltip.
        $('#copy-button').tooltip();

        $('#copy-button').bind('click', function() {
            $('#copy-button').trigger('copied', ['Copied!']);
        });

        // Handler for updating the tooltip message.
        $('#copy-button').bind('copied', function(event, message) {
            $(this).attr('data-original-title', message)
            .tooltip('show')
            .attr('data-original-title', "Copy Link");
        });
    });
})(jQuery);