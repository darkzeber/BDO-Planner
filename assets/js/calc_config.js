/*
* @Author: https://github.com/Shadowtrance/BDO-Gear-Calculator
* @http: https://shadowtrance.github.io/
*/

var CalcConfig = {
    configDefault: {
        compact_item_modals: false
    },
    
    config: {},
    
    readConfig: function (callback) {
        var configCookies = Cookies.getJSON('UserConfig') || {};
        $.extend(this.config, this.configDefault, configCookies);
        
        callback();
    },
    
    saveConfig: function () {
        Cookies.set(
            "UserConfig",
            this.config,
            { expires: 365 }
        );
    },
    
    change: function (option, state) {
        this.config[option] = state;
        this.saveConfig();
    }
};