/*
 * @Author: https://github.com/Ihellmasker/BDO-Planner
 * @http: https://bdoplanner.com/
 */

var CalcConfig = {
    newVersion: false,
    configDefault: {
        latestVersion: {
            major: 1,
            minor: 1,
            revision: 2
        },
        compact_item_modals: false
    },
    config: {},
    
    readConfig: function (callback) {
        var configCookies = Cookies.getJSON('UserConfig') || {};
        if (Object.keys(configCookies).length === 0) { // No cookie loaded
            this.newVersion = true;
        }
        $.extend(this.config, this.configDefault, configCookies);
        this.saveConfig();

        if ((this.config.latestVersion.major < this.configDefault.latestVersion.major) || (this.config.latestVersion.minor < this.configDefault.latestVersion.minor)) {
            this.newVersion = true;
            
            this.config.latestVersion = JSON.parse(JSON.stringify(this.configDefault.latestVersion));
            
            this.saveConfig();
        }
        
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