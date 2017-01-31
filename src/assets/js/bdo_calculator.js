/*
 * @Author: https://github.com/Ihellmasker/BDO-Planner
 * @http: https://bdoplanner.com/
 */

var BDOcalculator = {
    "player": {}, // holds the selected gear and player stats
    "sets": {}, // used for calculating the set effects and number of set items.
    "stats": null, // a copy of the stats from the BDOdatabase file

    init: function () {
        // Reset the gear
        this.player = {
            "class": {
                "class_id": "",
                "level": 1,
                "training": {
                    "strength": 1,
                    "breath": 1,
                    "health": 1
                },
                "obj": {}
            },
            "gear": {
                "main-weapon": {
                    "enhancement": 0,
                    "item_id": "",
                    "item": {},
                    "gems": {
                        "1": {
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
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
                            "gem_id": "",
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
            }
        };

        this.reset();
    },

    setGear: function (itemObj, type, item_no, item_id, item_itemset, callback) {
        callback = (typeof callback === "function" ? callback : function () {});

        if (typeof itemObj === "undefined") {
            itemObj = {};
        }
        
        var sameItem = false;

        if (this.isItemPair(type)) {
            if (parseInt(item_id) == parseInt(this.player.gear[type + "s"][item_no].item_id)) {
                sameItem = true;
            }
            this.player.gear[type + "s"][item_no].item = itemObj;
            this.player.gear[type + "s"][item_no].item_id = item_id;
        } else if (item_itemset === "gems") {
            if (parseInt(item_id) == parseInt(this.player.gear[type].gems[item_no].gem_id)) {
                sameItem = true;
            }
            this.player.gear[type].gems[item_no].gem = itemObj;
            this.player.gear[type].gems[item_no].gem_id = item_id;
        } else {
            if (typeof this.player.gear[type].item !== "undefined") {
                if (parseInt(item_id) == parseInt(this.player.gear[type].item_id)) {
                    sameItem = true;
                }
                this.player.gear[type].item = itemObj;
                this.player.gear[type].item_id = item_id;
                if (!sameItem) {
                    this.player.gear[type].gems = {
                        "1": {
                            "gem_id": "",
                            "gem": {}
                        },
                        "2": {
                            "gem_id": "",
                            "gem": {}
                        }
                    };
                }
            }
        }

        callback();
    },

    setEnchantmentLevel: function (type, item_no, level, callback) {
        callback = (typeof callback === "function" ? callback : function () {});

        if (this.isItemPair(type)) {
            this.player.gear[type + "s"][item_no].enhancement = String(level);
        } else {
            this.player.gear[type].enhancement = String(level);
        }

        callback();
    },

    reset: function () {
        // Reset the stats
        this.stats = $.extend(true, {}, BDOdatabase.stats);

        // Reset the set counter
        this.sets = {};
    },

    addStat: function (stat_key, value) {
        if (stat_key in this.stats) {
            if (stat_key === "special") {
                this.stats.special.specials.push(value);
                return;
            }

            if (typeof this.stats[stat_key].total === 'undefined' && typeof this.stats[stat_key].min === 'undefined') {
                this.stats[stat_key].active = true;
                return;
            }

            if (stat_key === "ap" || stat_key === "awkap") {
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
                this.stats[stat_key].total += (parseInt(value[0]) + parseInt(value[1])) / 2;
            } else {
                this.stats[stat_key].total += value;
            }
        }
    },

    calculateSetEffects: function () {
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

    addToSets: function (setName, itemType) {
        if (typeof this.sets[setName] === 'undefined') {
            this.sets[setName] = [];
        }

        this.sets[setName].push(itemType);
    },

    getItemStat: function (itemObj, stat_key, getEffect, enhancement_level) {
        var getEffect = (typeof getEffect === "undefined" ? false : getEffect),
        stat = (getEffect ? itemObj.item_effects[stat_key] : itemObj[stat_key]);

        if (String(itemObj.enhancement) !== "undefined" && String(enhancement_level) !== "0") {
            if (typeof itemObj.enhancement[String(enhancement_level)][stat_key] !== 'undefined') {
                stat = itemObj.enhancement[String(enhancement_level)][stat_key];
            }
        }

        return stat;
    },

    getGearStat: function (itemObj, stat_key, getEffect) {
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

        for (var resistance in this.player.class.obj.resistances) {
            this.addStat(resistance, this.player.class.obj.resistances[resistance]);
        }

        for (var gear_key in this.player.gear) {
            if (!this.player.gear.hasOwnProperty(gear_key)) {
                continue;
            }

            // Loop "static" stats like AP and DP
            // since you can have 2 rings and earrings, we will have to run a loop on each of the
            if (this.isItemPair(gear_key)) {
                for (var acc_key in this.player.gear[gear_key]) {
                    if (!this.player.gear[gear_key].hasOwnProperty(acc_key)) {
                        continue;
                    }

                    var accessory = this.player.gear[gear_key][acc_key];

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

                    this.addToSets(this.player.gear[gear_key][acc_key].item.set, gear_key + acc_key);

                    $("<li>")
                    .html(BDOdatabase.enhancements[parseInt(this.player.gear[gear_key][acc_key].enhancement) == 0 ? 0 : parseInt(this.player.gear[gear_key][acc_key].enhancement) + 15].prefix + this.player.gear[gear_key][acc_key].item.name)
                    .addClass(this.player.gear[gear_key][acc_key].item.rarity)
                    .appendTo("#gear-list");
                }
            } else {
                if (Object.keys(this.player.gear[gear_key].item).length > 0) {
                    if (gear_key == "alchemy-stone" && !$("#active-alch-stone").prop("checked")) {
                        continue;
                    }

                    for (var stat_key in this.player.gear[gear_key].item) {
                        if (!this.player.gear[gear_key].item.hasOwnProperty(stat_key)) {
                            continue;
                        }

                        var gear_obj = this.player.gear[gear_key].item;
                        this.addStat(stat_key, this.getGearStat(this.player.gear[gear_key], stat_key));
                    }

                    for (var effect_key in this.player.gear[gear_key].item.item_effects) {
                        if (!this.player.gear[gear_key].item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        this.addStat(effect_key, this.getGearStat(this.player.gear[gear_key], effect_key, true));
                    }

                    var new_li = $("<li>")
                        .html(BDOdatabase.enhancements[this.isAccessory(gear_key) ? parseInt(this.player.gear[gear_key].enhancement) == 0 ? 0 : parseInt(this.player.gear[gear_key].enhancement) + 15 : this.player.gear[gear_key].enhancement].prefix + this.player.gear[gear_key].item.name)
                        .addClass(this.player.gear[gear_key].item.rarity)
                        .appendTo("#gear-list");

                    var gem_ul = null;

                    for (var gem_key in this.player.gear[gear_key].gems) {
                        if (!this.player.gear[gear_key].gems.hasOwnProperty(gem_key)) {
                            continue;
                        }

                        var gem = this.player.gear[gear_key].gems[gem_key].gem;

                        for (var eff_key in gem.item_effects) {
                            if (!gem.item_effects.hasOwnProperty(eff_key)) {
                                continue;
                            }

                            if (gem.incompatible.length) {
                                if ($.inArray(this.player.gear[gear_key].gems[(gem_key === "1" ? "2" : "1")].gem_id, gem.incompatible) !== -1) {
                                    continue;
                                }
                            }

                            this.addStat(eff_key, gem.item_effects[eff_key]);
                        }

                        if (this.player.gear[gear_key].gems[gem_key].gem_id !== "") {
                            if (gem_ul === null) {
                                gem_ul = $("<ul>")
                                    .appendTo(new_li);
                            }
                            $("<li>")
                            .html(this.player.gear[gear_key].gems[gem_key].gem.name)
                            .addClass(this.player.gear[gear_key].gems[gem_key].gem.rarity)
                            .appendTo(gem_ul);
                        }
                    }

                    this.addToSets(this.player.gear[gear_key].item.set, gear_key);

                    // Item-slot specific calculations
                    switch (gear_key) {
                    case "main-weapon":
                        this.addStat("ap", this.getGearStat(this.player.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.player.gear[gear_key], "ap_max"));
                        break;
                    case "secondary-weapon":
                        this.addStat("ap", this.getGearStat(this.player.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.player.gear[gear_key], "ap_max"));
                        this.addStat("awkap", this.getGearStat(this.player.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.player.gear[gear_key], "ap_max"));
                        break;
                    case "awakening-weapon":
                        this.addStat("awkap", this.getGearStat(this.player.gear[gear_key], "ap_min") + '-' + this.getGearStat(this.player.gear[gear_key], "ap_max"));
                        break;
                    case "belt":
                        this.addStat("awkap", this.getGearStat(this.player.gear[gear_key], "ap"));
                        break;
                    case "necklace":
                        this.addStat("awkap", this.getGearStat(this.player.gear[gear_key], "ap"));
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
                $('.stat-ap .value').text(Math.floor(obj.total));
                break;

            case "awkap":
                $('.stat-awk-ap .value').text(Math.floor(obj.total));
                break;

            case "dp":
                $('.stat-dp .value').text(Math.floor(obj.total));
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

        for (var resistance in this.player.class.obj.resistances) {
            if (resistance == stat_to_get && this.player.class.obj.resistances[resistance] != 0) {
                stat_return.item_list.push({
                    "value": this.player.class.obj.resistances[resistance],
                    "slot": "class",
                    "item": "Class base"
                });
                stat_return.total += this.player.class.obj.resistances[resistance];
            }
        }

        for (var gear_key in this.player.gear) {
            if (!this.player.gear.hasOwnProperty(gear_key)) {
                continue;
            }

            // Loop "static" stats like AP and DP
            // since you can have 2 rings and earrings, we will have to run a loop on each of the
            if (this.isItemPair(gear_key)) {
                for (var acc_key in this.player.gear[gear_key]) {
                    if (!this.player.gear[gear_key].hasOwnProperty(acc_key)) {
                        continue;
                    }

                    var accessory = this.player.gear[gear_key][acc_key];

                    if (Object.keys(accessory.item).length === 0) {
                        continue;
                    }

                    var enh_prefix = BDOdatabase.enhancements[(this.player.gear[gear_key][acc_key].enhancement == 0 ? 0 : parseInt(this.player.gear[gear_key][acc_key].enhancement) + 15)].prefix;

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

                    this.addToSets(this.player.gear[gear_key][acc_key].item.set, gear_key + acc_key);

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
                if (Object.keys(this.player.gear[gear_key].item).length > 0) {
                    if (gear_key == "alchemy-stone" && !$("#active-alch-stone").prop("checked")) {
                        continue;
                    }
                    var enh_prefix = BDOdatabase.enhancements[(this.isAccessory(gear_key) ? (this.player.gear[gear_key].enhancement == 0 ? 0 : parseInt(this.player.gear[gear_key].enhancement) + 15) : this.player.gear[gear_key].enhancement)].prefix;

                    for (var stat_key in this.player.gear[gear_key].item) {
                        if (!this.player.gear[gear_key].item.hasOwnProperty(stat_key)) {
                            continue;
                        }

                        if (stat_key == stat_to_get && this.getGearStat(this.player.gear[gear_key], stat_key) != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.player.gear[gear_key], stat_key),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.player.gear[gear_key], stat_key);
                        }
                    }

                    for (var effect_key in this.player.gear[gear_key].item.item_effects) {
                        if (!this.player.gear[gear_key].item.item_effects.hasOwnProperty(effect_key)) {
                            continue;
                        }

                        if (effect_key == stat_to_get && this.getGearStat(this.player.gear[gear_key], effect_key, true) != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.player.gear[gear_key], effect_key, true),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.player.gear[gear_key], effect_key, true);
                        }
                    }

                    for (var gem_key in this.player.gear[gear_key].gems) {
                        if (!this.player.gear[gear_key].gems.hasOwnProperty(gem_key)) {
                            continue;
                        }

                        var gem = this.player.gear[gear_key].gems[gem_key].gem;

                        for (var eff_key in gem.item_effects) {
                            if (!gem.item_effects.hasOwnProperty(eff_key)) {
                                continue;
                            }

                            if (gem.incompatible.length) {
                                if ($.inArray(this.player.gear[gear_key].gems[(gem_key === "1" ? "2" : "1")].gem_id, gem.incompatible) !== -1) {
                                    continue;
                                }
                            }

                            if (eff_key == stat_to_get && gem.item_effects[eff_key] != 0) {
                                stat_return.item_list.push({
                                    "value": gem.item_effects[eff_key],
                                    "slot": ".gem-slot." + gear_key + gem_key,
                                    "item": enh_prefix + this.player.gear[gear_key].gems[gem_key].gem.name
                                });
                                stat_return.total += gem.item_effects[eff_key];
                            }
                        }
                    }

                    this.addToSets(this.player.gear[gear_key].item.set, gear_key);

                    // Item-slot specific calculations
                    switch (gear_key) {
                    case "main-weapon":
                        var ap = (this.getGearStat(this.player.gear[gear_key], "ap_min") + this.getGearStat(this.player.gear[gear_key], "ap_max")) / 2;
                        if ("ap" == stat_to_get && ap != 0) {
                            stat_return.item_list.push({
                                "value": ap,
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += ap;
                        }
                        break;
                    case "secondary-weapon":
                        var ap = (this.getGearStat(this.player.gear[gear_key], "ap_min") + this.getGearStat(this.player.gear[gear_key], "ap_max")) / 2;
                        if (("ap" == stat_to_get || "awkap" == stat_to_get) && ap != 0) {
                            stat_return.item_list.push({
                                "value": ap,
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += ap;
                        }
                        break;
                    case "awakening-weapon":
                        var ap = (this.getGearStat(this.player.gear[gear_key], "ap_min") + this.getGearStat(this.player.gear[gear_key], "ap_max")) / 2;
                        if ("awkap" == stat_to_get && ap != 0) {
                            stat_return.item_list.push({
                                "value": ap,
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += ap;
                        }
                        break;
                    case "belt":
                        if ("awkap" == stat_to_get && this.getGearStat(this.player.gear[gear_key], "ap") != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.player.gear[gear_key], "ap"),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.player.gear[gear_key], "ap");
                        }
                        break;
                    case "necklace":
                        if ("awkap" == stat_to_get && this.getGearStat(this.player.gear[gear_key], "ap") != 0) {
                            stat_return.item_list.push({
                                "value": this.getGearStat(this.player.gear[gear_key], "ap"),
                                "slot": ".gear-slot." + gear_key,
                                "item": enh_prefix + this.player.gear[gear_key].item.name
                            });
                            stat_return.total += this.getGearStat(this.player.gear[gear_key], "ap");
                        }
                        break;
                    }
                }
            }
        }

        this.calculateSetEffectsSingleStat(stat_to_get, stat_return);

        return stat_return;
    },

    calculateSetEffectsSingleStat: function (stat_to_get, stat_return) {
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
    isWeapon: function (item_type) {
        return $.inArray(item_type, ["main-weapon", "secondary-weapon", "awakening-weapon"]) !== -1;
    },
    isAccessory: function (item_type) {
        return $.inArray(item_type, ["ring", "rings", "belt", "earring", "earrings", "necklace"]) !== -1;
    },
    isGemable: function (item_type) {
        return $.inArray(item_type, ["main-weapon", "secondary-weapon", "armor", "shoes", "gloves", "helmet", "outfit"]) !== -1;
    },
    isItemPair: function (item_type) {
        return $.inArray(item_type, ["ring", "earring", "rings", "earrings"]) !== -1;
    }
};
