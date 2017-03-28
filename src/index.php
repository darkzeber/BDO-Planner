<?php require 'version.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>BDO Planner</title>
        <meta name="description" content="A gear/equipment calculator for Black Desert Online.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <meta property="og:title" content="BDO Planner" />
        <meta property="og:image" content="http://bdoplanner.com/assets/favicon.png" />
        <meta property="og:image:width" content="75" />
        <meta property="og:image:height" content="75" />
        <meta property="og:description" content="BDO Planner build config" />
        
        <link rel="icon" type="image/png" href="/assets/favicon.png" />

        <link rel="stylesheet" href="/libs/bootstrap/4.0.0-alpha.6/bootstrap.min.css">
        <link rel="stylesheet" href="/libs/fontawesome/4.7.0/font-awesome.min.css">
        <link rel="stylesheet" href="/libs/chosen/1.6.2/chosen.min.css">
        <link rel="stylesheet" href="/libs/chosen/1.6.2/bootstrap-chosen.css">
        <link rel="stylesheet/less" type="text/css" href="/css/main.less">
    </head>
    <body>
        <div id="progress-spinner" class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
        </div>
        <div id="main-container" class="container">
            <div id="navigation-bar" class="row">
                <div class="col-12">
                    <div class="logo-bar">
                        <h1>BDO<span class="second">Planner</span></h1>
                        <span class="text">
                            <a href="https://github.com/Ihellmasker/BDO-Planner/issues">Bugs &amp; Suggestions</a>&nbsp;&middot;&nbsp;<a href="#" id="show-more-info">More info</a>&nbsp;&middot;&nbsp;<a href="#" id="show-update-notes">Show update notes</a>&nbsp;&middot;&nbsp;<a href="#" id="show-settings">Settings</a>
                        </span>
                    </div>
                </div>
            </div>
            <div id="class-section" class="row hide">
                <div class="col-12" align="center">
                    <ul class="classes">
                    </ul>
                </div>
            </div>
            <div id="calculator-section" class="row hide">
                <div class="col-12">
                    <div class="change-class-toggle">
                        Current Class: <span class="current-class"></span> &middot; <a href="#" class="change-class">Change Class</a>
                    </div>
                </div>
                <div class="col-lg-6 offset-lg-0 col-md-10 offset-md-1 col-sm-12 offset-sm-0">
                    <div id="equipment">
                        <div class="background-ring">
                            <div class="background-ring-inner"></div>
                        </div>
                        
                        <div class="gear-slot helmet" data-type="helmet"></div>
                        <div class="crystal-slot helmet slot1" data-type="helmet"></div>
                        <div class="crystal-slot helmet slot2" data-type="helmet"></div>

                        <div class="gear-slot armor" data-type="armor"></div>
                        <div class="crystal-slot armor slot1" data-type="armor"></div>
                        <div class="crystal-slot armor slot2" data-type="armor"></div>

                        <div class="gear-slot shoes" data-type="shoes"></div>
                        <div class="crystal-slot shoes slot1" data-type="shoes"></div>
                        <div class="crystal-slot shoes slot2" data-type="shoes"></div>

                        <div class="gear-slot gloves" data-type="gloves"></div>
                        <div class="crystal-slot gloves slot1" data-type="gloves"></div>
                        <div class="crystal-slot gloves slot2" data-type="gloves"></div>

                        <div class="gear-slot ring1" data-type="ring" data-slot="1"></div>
                        <div class="gear-slot ring2" data-type="ring" data-slot="2"></div>
                        <div class="gear-slot earring1" data-type="earring" data-slot="1"></div>
                        <div class="gear-slot earring2" data-type="earring" data-slot="2"></div>
                        <div class="gear-slot belt" data-type="belt"></div>
                        <div class="gear-slot necklace" data-type="necklace"></div>

                        <div class="gear-slot primary-weapon" data-type="primary-weapon"></div>
                        <div class="crystal-slot primary-weapon slot1" data-type="primary-weapon"></div>
                        <div class="crystal-slot primary-weapon slot2" data-type="primary-weapon"></div>

                        <div class="gear-slot awakening-weapon" data-type="awakening-weapon"></div>

                        <div class="gear-slot secondary-weapon" data-type="secondary-weapon"></div>
                        <div class="crystal-slot secondary-weapon slot1" data-type="secondary-weapon"></div>
                        <div class="crystal-slot secondary-weapon slot2" data-type="secondary-weapon"></div>
                        
                        <div class="gear-slot outfit-armor" data-type="outfit-armor"></div>
                        <div class="crystal-slot outfit-armor slot1 disabled" data-type="outfit-armor"></div>
                        <div class="gear-slot outfit-helmet" data-type="outfit-helmet"></div>
                        <div class="gear-slot outfit-gloves" data-type="outfit-gloves"></div>
                        <div class="gear-slot outfit-shoes" data-type="outfit-shoes"></div>
                        
                        <div class="gear-slot primary-weapon-outfit" data-type="primary-weapon-outfit"></div>
                        
                        <div class="gear-slot awakening-weapon-outfit" data-type="awakening-weapon-outfit"></div>
                        
                        <div class="gear-slot secondary-weapon-outfit" data-type="secondary-weapon-outfit"></div>
                        
                        <div class="gear-slot underwear" data-type="underwear"></div>
                        
                        <div class="gear-slot alchemy-stone" data-type="alchemy-stone"></div>
                    </div>
                    <div id="primary-stats">
                        <table class="stats-table">
                            <tbody>
                                <tr>
                                    <td class="stat-ap" data-breakdown="ap">
                                        <div class="header">AP</div>
                                        <div class="value">200</div>
                                    </td>
                                    <td class="stat-awk-ap" data-breakdown="awkap">
                                        <div class="header">Awakening AP</div>
                                        <div class="value">200</div>
                                    </td>
                                    <td class="stat-dp" data-breakdown="dp">
                                        <div class="header">DP</div>
                                        <div class="value">200</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="secondary-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="active-alch-stone-label">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="active-alch-stone">
                                                <span class="custom-control-indicator"></span>
                                                <span class="custom-control-description">Activate Alc. Stone</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="gear-score">
                                            Current Gear Score: <span class="value"></span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <ul class="nav nav-pills" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="pill" href="#item-tab" role="tab">Item</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#stats-tab" role="tab">Stats</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#gear-list-tab" role="tab">Gear List</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="item-tab" role="tabpanel">
                            <div id="equipment-item-selectors" class="row my-2 hide">
                                <div class="col-9">
                                    <select id="equipment-item-select" data-placeholder="Slot Empty" class="chosen-select">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div class="col-3">
                                    <select id="equipment-enhancement-select" class="chosen-select">
                                    </select>
                                </div>
                            </div>
                            <div id="equipment-item-selected-stats" class="hide">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="gear-name">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2 px-2">
                                        <div class="gear-thumbnail">
                                        </div>
                                    </div>
                                    <div class="col-10">
                                        <div class="gear-stats gear-ap hide">
                                            AP: <span></span>
                                        </div>
                                        <div class="gear-stats gear-dp hide">
                                            DP: <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row gear-crystals">
                                    <div class="col-12">
                                        <div class="gear-heading">
                                            Crystals
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="stats-tab" role="tabpanel">
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <legend class="stats-title">Enhancement</legend>
                                    <ul class="stats ench-stats"></ul>

                                    <legend class="stats-title">Extra Damage</legend>
                                    <ul class="stats extra-stats"></ul>

                                    <legend class="stats-title">Offensive</legend>
                                    <ul class="stats offence-stats"></ul>

                                    <legend class="stats-title">Defensive</legend>
                                    <ul class="stats defense-stats"></ul>
                                </div>
                                <div class="col-md-6">
                                    <legend class="stats-title">Resistance</legend>
                                    <ul class="stats resist-stats"></ul>

                                    <legend class="stats-title">Survivability</legend>
                                    <ul class="stats survive-stats"></ul>

                                    <legend class="stats-title">General</legend>
                                    <ul class="stats general-stats"></ul>

                                    <legend class="stats-title">Gear Specials</legend>
                                    <ul class="stats special-stats"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="gear-list-tab" role="tabpanel">
                            <div class="col-md-12 mt-2">
                                <legend class="stats-title">Gear List</legend>
                                <ul id="gear-list"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="footer-bar">
            <div class="container">
                <div class="row">
                    <div class="offset-lg-10 col-lg-2">
                        <a href="#" id="open-save-menu" class="btn btn-success btn-block btn-sm"><i class="fa fa-floppy-o"></i> Save</a>
                    </div>
                </div>
            </div>
        </div>

        <script src="/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="/libs/tether/1.4.0/tether.min.js"></script>
        <script src="/libs/bootstrap/4.0.0-alpha.6/bootstrap.min.js"></script>
        <script src="/libs/less/2.7.2/less.min.js"></script> <!-- maybe remove later? -->
        <script src="/libs/underscore/1.8.3/underscore.min.js"></script>
        <script src="/libs/chosen/1.6.2/chosen.jquery.min.js"></script>
        
        <script src="/js/main.js"></script>
    </body>
</html>