var BDOcharacter = {
    "build": {},
    "sets": {},
    "stats": {},
    
    init: function() {
        // Reset to the initial build config
        this.build = {
            "class": {
                "id": -1,
                "level": 1,
                "training": {
                    "strength": 1,
                    "breath": 1,
                    "health": 1
                },
                "obj": {}
            },
            "gear": {
                "primary-weapon": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "secondary-weapon": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "awakening-weapon": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {}
                },
                "helmet": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "armor": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "gloves": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "shoes": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        },
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "ring": {
                    "1": {
                        "id": -1,
                        "enhancement": 0,
                        "obj": {}
                    },
                    "2": {
                        "id": -1,
                        "enhancement": 0,
                        "obj": {}
                    }
                },
                "earring": {
                    "1": {
                        "id": -1,
                        "enhancement": 0,
                        "obj": {}
                    },
                    "2": {
                        "id": -1,
                        "enhancement": 0,
                        "obj": {}
                    }
                },
                "necklace": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {}
                },
                "belt": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {}
                },
                "outfit-helmet": {
                    "id": -1,
                    "obj": {}
                },
                "outfit-armor": {
                    "id": -1,
                    "enhancement": 0,
                    "obj": {},
                    "crystals": [
                        {
                            "id": -1,
                            "obj": {}
                        }
                    ]
                },
                "outfit-gloves": {
                    "id": -1,
                    "obj": {}
                },
                "outfit-shoes": {
                    "id": -1,
                    "obj": {}
                },
                "primary-weapon-outfit": {
                    "id": -1,
                    "obj": {}
                },
                "secondary-weapon-outfit": {
                    "id": -1,
                    "obj": {}
                },
                "awakening-weapon-outfit": {
                    "id": -1,
                    "obj": {}
                },
                "underwear": {
                    "id": -1,
                    "obj": {}
                },
                "alchemy-stone": {
                    "id": -1,
                    "obj": {}
                }
            }
        }
        
        this.reset();
    },
    
    reset: function() {
        this.stats = $.extend(true, {}, BDOdatabase.stats);
        this.sets = {};
    },
    
    setClass: function(id) {
        id = parseInt(id);
        this.build.class.id = id;
        this.build.class.obj = _.findWhere(BDOdatabase.classes, {"id": id});
    },
    
    setGear: function(item) {
/*
    cur_item = {
        "type": $(this).attr('data-type'),
        "slot": $(this).attr('data-slot'),
        "typeslot": $(this).attr('data-type') + (typeof $(this).attr('data-slot') === "undefined" ? "" : $(this).attr('data-slot')),
        "id": $(this).attr('data-itemid')
    }
    
                    "id": -1,
                    "enhancement": 0,
                    "obj": {}
*/
        if (isItemPair(item.type)) {
            this.build.gear[item.type][item.slot].id = item.id;
        this.build.gear[item.type][item.slot].obj = _.findWhere(BDOdatabase.items[item.type], {"id": item.id});
        }
    }
}