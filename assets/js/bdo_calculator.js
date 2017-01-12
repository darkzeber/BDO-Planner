/*
* @Author: https://github.com/Shadowtrance/BDO-Gear-Calculator
* @http: https://bdoplanner.com/
*/

var BDOcalculator = {
    "gear": {}, // holds the selected gear
    "sets": {}, // used for calculating the set effects and number of set items.
    "stats": null, // a copy of the stats from the BDOdatabase file
    "player_class": "",

    init: function() {
        // Reset the gear
        this.gear = {
            "main-weapon": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "awakening-weapon": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
            },
            "secondary-weapon": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "helmet": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "armor": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "gloves": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "shoes": {
                "enhancement": 0,
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "rings": {
                "1": {
                    "enhancement": 0,
                    "item_id": "",
                    "item": {}
                },
                "2": {
                    "enhancement": 0,
                    "item_id": "",
                    "item": {}
                }
            },
            "earrings": {
                "1": {
                    "enhancement": 0,
                    "item_id": "",
                    "item": {}
                },
                "2": {
                    "enhancement": 0,
                    "item_id": "",
                    "item": {}
                }
            },
            "necklace": {
                "enhancement": 0,
                "item_id": "",
                "item": {}
            },
            "belt": {
                "enhancement": 0,
                "item_id": "",
                "item": {}
            },
            "outfit": {
                "item_id": "",
                "item": {},
                "gems": {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    }
                }
            },
            "main-weapon-outfit": {
                "item_id": "",
                "item": {}
            },
            "awakening-weapon-outfit": {
                "item_id": "",
                "item": {}
            },
            "secondary-weapon-outfit": {
                "item_id": "",
                "item": {}
            },
            "underwear": {
                "item_id": "",
                "item": {}
            },
            "alchemy-stone": {
                "item_id": "",
                "item": {}
            }
        };

        this.reset(); 
    },

    setGear: function (itemObj, type, item_no, item_id, item_itemset, callback) {
        callback = (typeof callback === "function" ? callback : function() {});

        if (typeof itemObj === "undefined") {
            itemObj = {};
        }

        if (this.isItemPair(type)) {
            this.gear[type + "s"][item_no].item = itemObj;
            this.gear[type + "s"][item_no].item_id = item_id;
        } else if (item_itemset === "gems") {
            this.gear[type].gems[item_no].gem = itemObj;
            this.gear[type].gems[item_no].gem_name = item_id;
        } else {
            if (typeof this.gear[type].item !== "undefined") {
                this.gear[type].item = itemObj;
                this.gear[type].item_id = item_id;
                this.gear[type].gems = {
                    "1": {
                        "gem_name": "",
                        "gem": {}
                    },
                    "2": {
                        "gem_name": "",
                        "gem": {}
                    }
                };
            }
        }

        callback();
    },

    setEnchantmentLevel: function(type, item_no, level, callback) {
        callback = (typeof callback === "function" ? callback : function() {});

        if (this.isItemPair(type)) {
            this.gear[type + "s"][item_no].enhancement = String(level);
        } else {
            this.gear[type].enhancement = String(level);
        }

        callback();
    },

    reset: function() {
        // Reset the stats
        this.stats = $.extend(true,{},BDOdatabase.stats);

        // Reset the set counter
        this.sets = {};
    },

    addStat: function(stat_key, value) {
        if (stat_key in this.stats) {
            if (stat_key === "special") {
                this.stats.special.specials.push(value);
                return;
            }

            if (typeof this.stats[stat_key].total === 'undefined' && typeof this.stats[stat_key].min === 'undefined') {
                this.stats[stat_key].active = true;
                return;
            }

            if (stat_key === "ap") {
                if (parseInt(value) === value) {
                    value = [
                        value,
                        value
                    ];
                } else {
                    value = value.split('-');
                }

                this.stats[stat_key].min += parseInt(value[0]);
                this.stats[stat_key].max += parseInt(value[1]);

            }
            if (stat_key === "awkap") {
                if (parseInt(value) === value) {
                    value = [
                        value,
                        value
                    ];
                } else {
                    value = value.split('-');
                }

                this.stats[stat_key].min += parseInt(value[0]);
                this.stats[stat_key].max += parseInt(value[1]);

            } else {
                this.stats[stat_key].total += value;
            }
        }
    },

    calculateSetEffects: function() {
        if (Object.keys(this.sets).length === 0) {
            return;
        }

        for (var set_name in this.sets) {
            if (!this.sets.hasOwnProperty(set_name)) {
                continue;
            }

            if (typeof BDOdatabase.set_effects[set_name] === 'undefined') {
                continue;
            }

            var set_effects = BDOdatabase.set_effects[set_name],
                set_pieces_count = this.sets[set_name].length;

            // check for set pieces bonus
            for (var item_count in set_effects.pieces) {
                if (!set_effects.pieces.hasOwnProperty(item_count)) {
                    continue;
                }

                var effects = set_effects.pieces[item_count];
                    item_count = parseInt(item_count);

                if (item_count <= set_pieces_count) {
                    for (var effect_key in effects) {
                        if (!effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        this.addStat(effect_key, effects[effect_key]);
                    }
                }
            }

            // check for set item combo bonus
            for (var combo_key in set_effects.combos) {
                if (!set_effects.combos.hasOwnProperty(combo_key)) {
                    continue;
                }

                var effects = set_effects.combos[combo_key].effects,
                    combo_complete = true,
                    combo_items = set_effects.combos[combo_key].pieces;

                for (var i = combo_items.length - 1; i >= 0; i--) {
                    if ($.inArray(combo_items[i], this.sets[set_name]) === -1) {
                        combo_complete = false;
                        break;
                    }
                }

                if (combo_complete) {
                    for (var effect_key in effects) {
                        if (!effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        this.addStat(effect_key, effects[effect_key]);
                    }
                }
            }
        }
    },

    addToSets: function(setName, itemType) {
        if (typeof this.sets[setName] === 'undefined') {
            this.sets[setName] = [];
        }

        this.sets[setName].push(itemType);
    },

    getItemStat: function(itemObj, stat_key, getEffect, enhancement_level) {
        var getEffect = (typeof getEffect === "undefined" ? false : getEffect),
            stat = (getEffect ? itemObj.item_effects[stat_key] : itemObj[stat_key]);

        if (String(itemObj.enhancement) !== "undefined" && String(enhancement_level) !== "0") {
            if (typeof itemObj.enhancement[String(enhancement_level)][stat_key] !== 'undefined') {
                stat = itemObj.enhancement[String(enhancement_level)][stat_key];
            }
        }

        return stat;
    },

    getGearStat: function(itemObj, stat_key, getEffect) {
        var getEffect = (typeof getEffect === "undefined" ? false : true),
            stat = (getEffect ? itemObj.item.item_effects[stat_key] : itemObj.item[stat_key]);

        if (String(itemObj.enhancement) !== "undefined" && itemObj.enhancement !== "0") {
            if (typeof itemObj.item.enhancement[String(itemObj.enhancement)][stat_key] !== 'undefined') {
                stat = itemObj.item.enhancement[String(itemObj.enhancement)][stat_key];
            }
        }

        return stat;
    },

    calculate: function () {
        $('.stats').html('');
        $('#gear-list').html('');
        this.reset();
        
        for (var resistance in BDOdatabase.resistances[this.player_class]) {
            this.addStat(resistance, BDOdatabase.resistances[this.player_class][resistance]);
        }

        for (var gear_key in this.gear) {
            if (!this.gear.hasOwnProperty(gear_key)) {
                continue;
            }

            // Loop "static" stats like AP and DP
            // since you can have 2 rings and earrings, we will have to run a loop on each of the
            if (this.isItemPair(gear_key)) {
                for (var acc_key in this.gear[gear_key]) {
                    if (!this.gear[gear_key].hasOwnProperty(acc_key)) {
                        continue;
                    }

                    var accessory = this.gear[gear_key][acc_key];

                    if (Object.keys(accessory.item).length === 0) {
                        continue;
                    }

                    // loop the static stats of each accessory.
                    for (var assec_stat in accessory.item) {
                        if (!accessory.item.hasOwnProperty(assec_stat)) {
                            continue;
                        }

                        this.addStat(assec_stat, this.getGearStat(accessory, assec_stat));
                    }

                    // Loop item effects
                    for (var effect_key in accessory.item.item_effects) {
                        if (!accessory.item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        this.addStat(effect_key, this.getGearStat(accessory, effect_key, true));
                    }

                    //adds ring / earring ap to awakening ap.
                    this.addStat("awkap", this.getGearStat(accessory, "ap"));
                    
                    this.addToSets(this.gear[gear_key][acc_key].item.set, gear_key + acc_key);
                    
                    $("<li>")
                        .html(BDOdatabase.enhancements[parseInt(this.gear[gear_key][acc_key].enhancement) == 0 ? 0 : parseInt(this.gear[gear_key][acc_key].enhancement) + 15].prefix + this.gear[gear_key][acc_key].item.name)
                        .appendTo("#gear-list");
                }
            } else {
                if (Object.keys(this.gear[gear_key].item).length > 0) {
                    if (gear_key == "alchemy-stone" && !$("#active-alch-stone").prop("checked")) {
                        continue;
                    }
                    
                    for (var stat_key in this.gear[gear_key].item) {
                        if (!this.gear[gear_key].item.hasOwnProperty(stat_key)) {
                            continue;
                        }

                        var gear_obj = this.gear[gear_key].item;
                        this.addStat(stat_key, this.getGearStat(this.gear[gear_key], stat_key));
                    }

                    for (var effect_key in this.gear[gear_key].item.item_effects) {
                        if (!this.gear[gear_key].item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        this.addStat(effect_key, this.getGearStat(this.gear[gear_key], effect_key, true));
                    }
                    
                    var new_li = $("<li>")
                        .html(BDOdatabase.enhancements[this.isAccessory(gear_key) ?parseInt(this.gear[gear_key].enhancement) == 0 ? 0 : parseInt(this.gear[gear_key].enhancement) + 15 : this.gear[gear_key].enhancement].prefix + this.gear[gear_key].item.name)
                        .appendTo("#gear-list");
                        
                    var gem_ul = null;

                    for (var gem_key in this.gear[gear_key].gems) {
                        if (!this.gear[gear_key].gems.hasOwnProperty(gem_key)) {
                            continue;
                        }

                        var gem = this.gear[gear_key].gems[gem_key].gem;

                        for (var eff_key in gem.item_effects) {
                            if (!gem.item_effects.hasOwnProperty(eff_key)) {
                                continue;
                            }

                            if (gem.incompatible.length) {
                                if ($.inArray(this.gear[gear_key].gems[(gem_key === "1" ? "2" : "1")].gem_name, gem.incompatible) !== -1) {
                                    continue;
                                }
                            }

                            this.addStat(eff_key, gem.item_effects[eff_key]);
                        }
                        
                        if (this.gear[gear_key].gems[gem_key].gem_name !== "") {
                            if (gem_ul === null) {
                                gem_ul = $("<ul>")
                                    .appendTo(new_li);
                            }
                            $("<li>")
                                .html(this.gear[gear_key].gems[gem_key].gem.name)
                                .appendTo(gem_ul);
                        }
                    }

                    this.addToSets(this.gear[gear_key].item.set, gear_key);

                    // Item-slot specific calculations
                    switch (gear_key) {
                        case "main-weapon":
                            this.addStat("ap", this.getGearStat(this.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.gear[gear_key], "ap_max"));
                            break;
                        case "secondary-weapon":
                            this.addStat("ap", this.getGearStat(this.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.gear[gear_key], "ap_max"));
                            this.addStat("awkap", this.getGearStat(this.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.gear[gear_key], "ap_max"));
                            break;
                        case "awakening-weapon":
                            this.addStat("awkap", this.getGearStat(this.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.gear[gear_key], "ap_max"));
                            break;
                        case "belt":
                            this.addStat("awkap", this.getGearStat(this.gear[gear_key], "ap"));
                            break;
                        case "necklace":
                            this.addStat("awkap", this.getGearStat(this.gear[gear_key], "ap"));
                            break;
                    }
                }
            }
        }

        this.calculateSetEffects();

        for (var key in this.stats) {
            if (!this.stats.hasOwnProperty(key)) {
                continue;
            }

            var obj = this.stats[key];

            switch (key) {
                case "special":
                    for (var i = obj.specials.length - 1; i >= 0; i--) {
                        $(obj.target).append('<li>' + obj.specials[i] + '</li>');
                    }
                    break;

                case "ap":
                    //$('.stat-ap span').text(obj.min + ' ~ ' + obj.max);
                    $('.stat-ap span').text(Math.floor((obj.min + obj.max) / 2));
                    break;

                case "awkap":
                    //$('.stat-awk-ap span').text(obj.min + ' ~ ' + obj.max);
                    $('.stat-awk-ap span').text(Math.floor((obj.min + obj.max) / 2));
                    break;

                case "dp":
                    $('.stat-dp span').text(obj.total);
                    break;

                default:
                    if (typeof obj.total === 'undefined') {
                        if (obj.active) {
                            this.stats.special.specials.push(obj.title);
                        }

                        continue;
                    }

                    if (obj.total === 0) {
                        continue;
                    }

                    $(obj.target).append('<li data-breakdown="' + key + '"><span>' + obj.title + ':</span> ' + obj.total + obj.symbol + '</li>');
                    break;
            }
        }
        
        $("#gear-score .value").text(Math.floor((this.stats["ap"].min + this.stats["ap"].max) / 2) + this.stats["dp"].total)
    },
    
    calculateSingleStat: function (stat_to_get) {
        this.reset();

        var stat_return = {
            total: 0,
            item_list: []
        };
        
        for (var resistance in BDOdatabase.resistances[this.player_class]) {
            if (resistance == stat_to_get && BDOdatabase.resistances[this.player_class][resistance] != 0) {
                stat_return.item_list.push({
                    "value": BDOdatabase.resistances[this.player_class][resistance],
                    "slot": "class",
                    "item": "Class base"
                });
                stat_return.total += BDOdatabase.resistances[this.player_class][resistance];
            }
        }

        for (var gear_key in this.gear) {
            if (!this.gear.hasOwnProperty(gear_key)) {
                continue;
            }

            // Loop "static" stats like AP and DP
            // since you can have 2 rings and earrings, we will have to run a loop on each of the
            if (this.isItemPair(gear_key)) {
                for (var acc_key in this.gear[gear_key]) {
                    if (!this.gear[gear_key].hasOwnProperty(acc_key)) {
                        continue;
                    }

                    var accessory = this.gear[gear_key][acc_key];
                    
                    if (Object.keys(accessory.item).length === 0) {
                        continue;
                    }
                    
                    var enh_prefix = BDOdatabase.enhancements[(this.gear[gear_key][acc_key].enhancement == 0 ? 0 : parseInt(this.gear[gear_key][acc_key].enhancement) + 15)].prefix;
                    
                    // loop the static stats of each accessory.
                    for (var assec_stat in accessory.item) {
                        if (!accessory.item.hasOwnProperty(assec_stat)) {
                            continue;
                        }

                        if (assec_stat == stat_to_get && this.getGearStat(accessory, assec_stat) != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(accessory, assec_stat),
                                "slot": ".gear-slot." + gear_key.slice(0, -1) + acc_key,
                                "item": enh_prefix + accessory.item.name
                            });
                            stat_return.total += this.getGearStat(accessory, assec_stat);
                        }
                    }

                    // Loop item effects
                    for (var effect_key in accessory.item.item_effects) {
                        if (!accessory.item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        if (effect_key == stat_to_get && this.getGearStat(accessory, effect_key, true) != 0) {                            
                            stat_return.item_list.push({
                                "value": this.getGearStat(accessory, effect_key, true),
                                "slot": ".gear-slot." + gear_key.slice(0, -1) + acc_key,
                                "item": enh_prefix + accessory.item.name
                            });
                            stat_return.total += this.getGearStat(accessory, effect_key, true);
                        }
                    }
                    
                    this.addToSets(this.gear[gear_key][acc_key].item.set, gear_key + acc_key);

                    if ("awkap" == stat_to_get && this.getGearStat(accessory, "ap") != 0) {
                        stat_return.item_list.push({
                            "value": this.getGearStat(accessory, "ap"),
                            "slot": ".gear-slot." + gear_key.slice(0, -1) + acc_key,
                            "item": enh_prefix + accessory.item.name
                        });
                        stat_return.total += this.getGearStat(accessory, "ap");
                    }
                }
            } else {
                if (Object.keys(this.gear[gear_key].item).length > 0) {   
                   var enh_prefix = BDOdatabase.enhancements[(this.isAccessory(gear_key) ? (this.gear[gear_key].enhancement == 0 ? 0 : parseInt(this.gear[gear_key].enhancement) + 15) : this.gear[gear_key].enhancement)].prefix;
               
                    for (var stat_key in this.gear[gear_key].item) {
                        if (!this.gear[gear_key].item.hasOwnProperty(stat_key)) {
                            continue;
                        }

                        if (stat_key == stat_to_get && this.getGearStat(this.gear[gear_key], stat_key) != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.gear[gear_key], stat_key),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.gear[gear_key], stat_key);
                        }
                    }

                    for (var effect_key in this.gear[gear_key].item.item_effects) {
                        if (!this.gear[gear_key].item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }
                        
                        if (effect_key == stat_to_get && this.getGearStat(this.gear[gear_key], effect_key, true) != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.gear[gear_key], effect_key, true),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.gear[gear_key], effect_key, true);
                        }
                    }

                    for (var gem_key in this.gear[gear_key].gems) {
                        if (!this.gear[gear_key].gems.hasOwnProperty(gem_key)) {
                            continue;
                        }

                        var gem = this.gear[gear_key].gems[gem_key].gem;

                        for (var eff_key in gem.item_effects) {
                            if (!gem.item_effects.hasOwnProperty(eff_key)) {
                                continue;
                            }

                            if (gem.incompatible.length) {
                                if ($.inArray(this.gear[gear_key].gems[(gem_key === "1" ? "2" : "1")].gem_name, gem.incompatible) !== -1) {
                                    continue;
                                }
                            }

                            if (eff_key == stat_to_get && gem.item_effects[eff_key] != 0) {
                                stat_return.item_list.push({
                                    "value": gem.item_effects[eff_key],
                                    "slot": ".gem-slot." + gear_key + gem_key,
                                    "item": enh_prefix + this.gear[gear_key].gems[gem_key].gem.name
                                });
                                stat_return.total += gem.item_effects[eff_key];
                            }
                        }
                    }

                    this.addToSets(this.gear[gear_key].item.set, gear_key);

                    // Item-slot specific calculations
                    switch (gear_key) {
                        case "main-weapon":
                            var ap = Math.floor((this.getGearStat(this.gear[gear_key], "ap_min") + this.getGearStat(this.gear[gear_key], "ap_max")) / 2);
                            if ("ap" == stat_to_get && ap != 0) {
                                stat_return.item_list.push({
                                    "value": ap,
                                    "slot": ".gear-slot." + gear_key,
                                    "item": enh_prefix + this.gear[gear_key].item.name
                                });
                                stat_return.total += ap;
                            }
                            break;
                        case "secondary-weapon":
                            var ap = Math.floor((this.getGearStat(this.gear[gear_key], "ap_min") + this.getGearStat(this.gear[gear_key], "ap_max")) / 2);
                            if (("ap" == stat_to_get || "awkap" == stat_to_get) && ap != 0) {
                                stat_return.item_list.push({
                                    "value": ap,
                                    "slot": ".gear-slot." + gear_key,
                                    "item": enh_prefix + this.gear[gear_key].item.name
                                });
                                stat_return.total += ap;
                            }
                            break;
                        case "awakening-weapon":
                            var ap = Math.floor((this.getGearStat(this.gear[gear_key], "ap_min") + this.getGearStat(this.gear[gear_key], "ap_max")) / 2);
                            if ("awkap" == stat_to_get && ap != 0) {
                                stat_return.item_list.push({
                                    "value": ap,
                                    "slot": ".gear-slot." + gear_key,
                                    "item": enh_prefix + this.gear[gear_key].item.name
                                });
                                stat_return.total += ap;
                            }
                            break;
                        case "belt":
                            if ("awkap" == stat_to_get && this.getGearStat(this.gear[gear_key], "ap") != 0) {
                                stat_return.item_list.push({
                                    "value": this.getGearStat(this.gear[gear_key], "ap"),
                                    "slot": ".gear-slot." + gear_key,
                                    "item": enh_prefix + this.gear[gear_key].item.name
                                });
                                stat_return.total += this.getGearStat(this.gear[gear_key], "ap");
                            }
                            break;
                        case "necklace":
                            if ("awkap" == stat_to_get && this.getGearStat(this.gear[gear_key], "ap") != 0) {
                                stat_return.item_list.push({
                                    "value": this.getGearStat(this.gear[gear_key], "ap"),
                                    "slot": ".gear-slot." + gear_key,
                                    "item": enh_prefix + this.gear[gear_key].item.name
                                });
                                stat_return.total += this.getGearStat(this.gear[gear_key], "ap");
                            }
                            break;
                    }
                }
            }
        }

        this.calculateSetEffectsSingleStat(stat_to_get, stat_return);

        return stat_return;
    },
    
    calculateSetEffectsSingleStat: function(stat_to_get, stat_return) {
        if (Object.keys(this.sets).length === 0) {
            return;
        }

        for (var set_name in this.sets) {
            if (!this.sets.hasOwnProperty(set_name)) {
                continue;
            }

            if (typeof BDOdatabase.set_effects[set_name] === 'undefined') {
                continue;
            }

            var set_effects = BDOdatabase.set_effects[set_name],
                set_pieces_count = this.sets[set_name].length;

            // check for set pieces bonus
            for (var item_count in set_effects.pieces) {
                if (!set_effects.pieces.hasOwnProperty(item_count)) {
                    continue;
                }

                var effects = set_effects.pieces[item_count];
                    item_count = parseInt(item_count);

                if (item_count <= set_pieces_count) {
                    for (var effect_key in effects) {
                        if (!effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        if (effect_key == stat_to_get && effects[effect_key] != 0) {
                            stat_return.item_list.push({
                                "value": effects[effect_key],
                                "item": set_name + " set bonus"
                            });
                            stat_return.total += effects[effect_key];
                        }
                    }
                }
            }

            // check for set item combo bonus
            for (var combo_key in set_effects.combos) {
                if (!set_effects.combos.hasOwnProperty(combo_key)) {
                    continue;
                }

                var effects = set_effects.combos[combo_key].effects,
                    combo_complete = true,
                    combo_items = set_effects.combos[combo_key].pieces;

                for (var i = combo_items.length - 1; i >= 0; i--) {
                    if ($.inArray(combo_items[i], this.sets[set_name]) === -1) {
                        combo_complete = false;
                        break;
                    }
                }

                if (combo_complete) {
                    for (var effect_key in effects) {
                        if (!effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        if (effect_key == stat_to_get && effects[effect_key] != 0) {
                            stat_return.item_list.push({
                                "value": effects[effect_key],
                                "item": set_name + " set bonus"
                            });
                            stat_return.total += effects[effect_key];
                        }
                    }
                }
            }
        }
    },
    isWeapon: function(item_type) {
        return $.inArray(item_type, ["main-weapon", "secondary-weapon", "awakening-weapon"]) !== -1;
    },
    isAccessory: function(item_type) {
        return $.inArray(item_type, ["ring", "rings", "belt", "earring", "earrings", "necklace"]) !== -1;
    },
    isGemable: function(item_type) {
        return $.inArray(item_type, ["main-weapon", "secondary-weapon", "armor", "shoes", "gloves", "helmet", "outfit"]) !== -1;
    },
    isItemPair: function(item_type) {
        return $.inArray(item_type, ["ring", "earring", "rings", "earrings"]) !== -1;
    }
};