<?php
    include $_SERVER['DOCUMENT_ROOT'].'/php/inline/get_full_link.php';
    $__version_major = 1;
    $__version_minor = 1;
    $__version_revision = 2;
    $__vr_str = "?".$__version_major.$__version_minor.$__version_revision;
?>
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

        <!-- Include the required libraries' css where applicable -->
        <!-- slider -->
        <link rel="stylesheet" href="/libs/css/bootstrap-slider.min.css" />

        <!-- bootstrap -->
        <link rel="stylesheet" href="/libs/css/bootstrap.min.css">
        
        <!-- font awesome -->
        <link rel="stylesheet" href="/libs/css/font-awesome.min.css">
        
        <!-- The actual "app" css -->
        <link rel="stylesheet" type="text/css" href="/assets/css/app.css<?php echo $__vr_str; ?>">
    </head>
    <body>
        <?php
            $loaded_link = null;
            $short_link = null;
            if (isset($_GET["shortsave"])) {
                $loaded_link = get_full_link($_GET["shortsave"]);
                if ($loaded_link != null) {
                    $short_link = $_GET["shortsave"];
                }
            } elseif (isset($_GET["save"])) {
                $loaded_link = $_GET["save"];
            }
        ?>
        <input id="loaded_link" type="text" value="<?php echo $loaded_link != null ? $loaded_link : ''; ?>" readonly>
        <div id="main-container" class="container">
            <div id="navigation-bar" class="row">
                <div class="col-xs-12">
                    <div class="logo-bar">
                        <h1>BDO<span class="second">Planner</span></h1>
                        <span class="text">
                            <a href="https://github.com/Ihellmasker/BDO-Planner/issues">Bugs &amp; Suggestions</a>&nbsp;&middot;&nbsp;<a href="#" id="show-more-info">More info</a>&nbsp;&middot;&nbsp;<a href="#" id="show-update-notes">Show update notes</a>&nbsp;&middot;&nbsp;<a href="#" id="show-settings">Settings</a>
                        </span>
                    </div>
                </div>
            </div>
            <div id="player-class-section" class="row">
                <div class="col-xs-12" align="center">
                    <ul class="classes-panel">
                        <li class="class warrior" data-value="5">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Warrior</div>
                        </li>
                        <li class="class sorceress" data-value="2">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Sorceress</div>
                        </li>
                        <li class="class ranger" data-value="1">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Ranger</div>
                        </li>
                        <li class="class berserker" data-value="0">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Berserker</div>
                        </li>
                        <li class="class tamer" data-value="3">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Tamer</div>
                        </li>
                        <li class="class musa" data-value="8">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Musa</div>
                        </li>
                        <li class="class maehwa" data-value="9">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Maehwa</div>
                        </li>
                        <li class="class valkyrie" data-value="4">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Valkyrie</div>
                        </li>
                        <li class="class wizard" data-value="7">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Wizard</div>
                        </li>
                        <li class="class witch" data-value="6">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Witch</div>
                        </li>
                        <li class="class ninja" data-value="10">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Ninja</div>
                        </li>
                        <li class="class kunoichi" data-value="11">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Kunoichi</div>
                        </li>
                        <li class="class darkknight" data-value="12">
                            <div class="main-background"></div>
                            <div class="icon"></div>
                            <div class="name">Dark Knight</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="calculator-section" class="row">
                <div class="col-xs-12">
                    <div class="change-class-toggle">
                        Current Class: <span class="current-class"></span> &middot; <a href="#" class="change-class">Change Class</a>
                    </div>
                </div>
                <div class="col-lg-6 offset-lg-0 col-md-10 offset-md-1 col-sm-12 offset-sm-0">
                    <div id="equipment">
                        <div class="background-ring">
                            <div class="background-ring-inner"></div>
                        </div>
                        
                        <div class="gear-slot helmet" data-itemset="helmets" data-type="helmet"></div>
                        <div class="gem-slot helmet1" data-type="helmet" data-item="1"></div>
                        <div class="gem-slot helmet2" data-type="helmet" data-item="2"></div>

                        <div class="gear-slot armor" data-itemset="armor" data-type="armor"></div>
                        <div class="gem-slot armor1" data-type="armor" data-item="1"></div>
                        <div class="gem-slot armor2" data-type="armor" data-item="2"></div>

                        <div class="gear-slot shoes" data-itemset="shoes" data-type="shoes"></div>
                        <div class="gem-slot shoes1" data-type="shoes" data-item="1"></div>
                        <div class="gem-slot shoes2" data-type="shoes" data-item="2"></div>

                        <div class="gear-slot gloves" data-itemset="gloves" data-type="gloves"></div>
                        <div class="gem-slot gloves1" data-type="gloves" data-item="1"></div>
                        <div class="gem-slot gloves2" data-type="gloves" data-item="2"></div>

                        <div class="gear-slot ring1" data-itemset="rings" data-type="ring" data-item="1"></div>
                        <div class="gear-slot ring2" data-itemset="rings" data-type="ring" data-item="2"></div>
                        <div class="gear-slot earring1" data-itemset="earrings" data-type="earring" data-item="1"></div>
                        <div class="gear-slot earring2" data-itemset="earrings" data-type="earring" data-item="2"></div>
                        <div class="gear-slot belt" data-itemset="belts" data-type="belt"></div>
                        <div class="gear-slot necklace" data-itemset="necklaces" data-type="necklace"></div>

                        <div class="gear-slot main-weapon" data-itemset="main-weapons" data-type="main-weapon"></div>
                        <div class="gem-slot main-weapon1" data-type="main-weapon" data-item="1"></div>
                        <div class="gem-slot main-weapon2" data-type="main-weapon" data-item="2"></div>

                        <div class="gear-slot awakening-weapon" data-itemset="awakening-weapons" data-type="awakening-weapon"></div>

                        <div class="gear-slot secondary-weapon" data-itemset="secondary-weapons" data-type="secondary-weapon"></div>
                        <div class="gem-slot secondary-weapon1" data-type="secondary-weapon" data-item="1"></div>
                        <div class="gem-slot secondary-weapon2" data-type="secondary-weapon" data-item="2"></div>
                        
                        <div class="gear-slot outfit" data-itemset="outfits" data-type="outfit"></div>
                        <div class="gem-slot outfit1 disabled" data-type="outfit" data-item="1"></div>
                        
                        <div class="gear-slot main-weapon-outfit" data-itemset="main-weapon-outfits" data-type="main-weapon-outfit"></div>
                        
                        <div class="gear-slot awakening-weapon-outfit" data-itemset="awakening-weapon-outfits" data-type="awakening-weapon-outfit"></div>
                        
                        <div class="gear-slot secondary-weapon-outfit" data-itemset="secondary-weapon-outfits" data-type="secondary-weapon-outfit"></div>
                        
                        <div class="gear-slot underwear" data-itemset="underwear" data-type="underwear"></div>
                        
                        <div class="gear-slot alchemy-stone" data-itemset="alchemy-stones" data-type="alchemy-stone"></div>
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
                            <a class="nav-link active" data-toggle="pill" href="#stats-tab" role="tab">Stats</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="pill" href="#gear-list-tab" role="tab">Gear List</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="stats-tab" role="tabpanel">
                            <div class="row mt-1">
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
                            <div class="col-md-12 mt-1">
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
        
        <div id="gearlist" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Choose Item</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="form-group">
                                    <label for="gearlist-search">Search</label>
                                    <input type="text" class="form-control form-control-sm" id="gearlist-search" placeholder="Search">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="gearlist-search">Rarity</label>
                                <ul id="gear-rarity-filter">
                                    <li class="common active" data-toggle="tooltip" title="Common" data-rarity="common"><div></div></li>
                                    <li class="uncommon active" data-toggle="tooltip" title="Uncommon" data-rarity="uncommon"><div></div></li>
                                    <li class="rare active" data-toggle="tooltip" title="Rare" data-rarity="rare"><div></div></li>
                                    <li class="epic active" data-toggle="tooltip" title="Epic" data-rarity="epic"><div></div></li>
                                    <li class="legendary active" data-toggle="tooltip" title="Legendary" data-rarity="legendary"><div></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card remove-item">
                                    <div class="btn btn-sm btn-primary float-xs-right">Remove</div>
                                    <div class="item-name">
                                        <strong>Remove item</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="card-columns items">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close / Cancel</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <div id="moreinfo" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">BDO Planner &middot; More Info</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                    BDO Gear Calculator was originally created by <a href="https://github.com/MrEliasen" target="_blank">MrEliasen</a>, it was updated heavily and grown on to create a full character planner by <a href="https://github.com/Ihellmasker" target="_blank">Ihm</a> and <a href="https://github.com/Shadowtrance" target="_blank">Shadowtrance</a>.
                                </p>
                                <p>
                                    This is an open source project. You can get a copy of the source code here: <a href="https://github.com/Ihellmasker/BDO-Planner" target="_blank">github.com/Ihellmasker/BDO-Planner</a>.
                                </p>
                                <p>
                                    All Black Desert Online media and content is a registered trademark of Pearl Abyss & Kakao Games.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div id="updatenotes" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Update Notes <small class="version"></small></h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>New stuffs</h1>

                                <ul>
                                    <li>All of the new Coral belts have been added</li>
                                </ul>

                                <h1>Bugs D:</h1>

                                <ul>
                                    <li>Fixed the rounding issue with AP and Awakening AP... again... hopefully for the last time.</li>
                                    <li>Corrected Kutum weapons AP</li>
                                    <li>Corrected Wizard base resistances</li>
                                    <li>Corrected Rosar weapon enhancements</li>
                                </ul>

                                <p><em>
                                    Old patch notes can be found <a href="https://github.com/Ihellmasker/BDO-Planner/blob/master/CHANGELOG.md">here</a>
                                </em></p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <div id="settings" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Settings</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                    All settings are saved in cookies and will not be transfered between Computers/Browsers.
                                </p>
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="enable-compact-item-modals">
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">Use compact item modals</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <div id="savelink" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Save Link</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                    You can either copy the link from the bar below or press the copy button on the right. The long links will last forever, however they're <em>long</em>.
                                </p>
                                <div class="input-group input-group-sm">
                                    <input id="share-link-long" type="text" class="form-control" readonly>
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-secondary" id="copy-button-long-link" data-toggle="tooltip" data-placement="top" data-clipboard-target="#share-link-long" title="Copy Link"><i class="fa fa-clipboard"></i></button>
                                    </span>
                                </div>
                                <hr class="my-1" />
                                <p>
                                    Alternatively, you can create an uneditable short link. If the link is unused for <strong>1 month</strong> it will be automatically deleted.
                                </p>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-secondary <?php echo ($short_link !== null ? "disabled" : ($loaded_link !== null ? "" : "disabled")); ?>" id="create-short-link"><i class="fa fa-plus-circle fa-fw standard-icon"></i><i class="fa fa-spinner fa-pulse fa-fw loading-icon" style="display: none;"></i> Create</button>
                                    </span>
                                    <input id="share-link-short" type="text" class="form-control" readonly value="<?php echo ($short_link !== null ? $short_link : ''); ?>">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-secondary" id="copy-button-short-link" data-toggle="tooltip" data-placement="top" data-clipboard-target="#share-link-short" title="Copy Link"><i class="fa fa-clipboard"></i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
                
        <div id="stat-breakdown">
            <div class="outer">
                <div class="inner">
                    <div class="opener"></div>
                    <ul class="list"></ul>
                </div>
            </div>
        </div>
        
        <div id="item-tooltip">
            <div class="outer">
                <div class="inner">

                </div>
            </div>
        </div>

        <!-- Include the required libraries -->
        <!-- jquery -->
        <script src="/libs/js/jquery.min.js"></script>

        <!-- bootstrap -->
        <script src="/libs/js/tether.min.js"></script>
        <script src="/libs/js/bootstrap.min.js"></script>

        <!-- slider -->
        <script src="/libs/js/bootstrap-slider.min.js"></script>

        <!-- clipboard -->
        <script src="/libs/js/clipboard.min.js"></script>
        
        <!-- JS Cookig -->
        <script src="/libs/js/js.cookie.min.js"></script>

        <!-- The actual "app" js -->
        <script type="text/javascript" src="/assets/js/bdo_database.js<?php echo $__vr_str; ?>"></script>
        <script type="text/javascript" src="/assets/js/bdo_calculator.js<?php echo $__vr_str; ?>"></script>
        <script type="text/javascript" src="/assets/js/calc_config.js<?php echo $__vr_str; ?>"></script>
        <script type="text/javascript" src="/assets/js/app.js<?php echo $__vr_str; ?>"></script>
        
        <?php include $_SERVER['DOCUMENT_ROOT'].'/php/ga.php'; ?>

    </body>
</html>
