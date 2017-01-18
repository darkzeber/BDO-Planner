# Change Log

## 1.0.0 (2017-XX-XX) Coming soon

### Notes

We've officially moved renamed to BDO Planner now with the intent to add more features outside of just planning your gear choices!

### Features

_There were lots of changes done since the last update, so it's possible we'll Kakao this update note and miss a lot of stuff._

  - **Short links**, this is the big thing, short links have now been added. As theres no account system, they will be delete after 30 days of not being accessed just to stop our databases overflowing. As long as the links used though it won't be deleted.
  - **Long links**, we have had to redo the long link structure and some of the database, so unfortunately all old links will be broken completely. Long links still exist, and unlike the short links, they're not temporary. Hopefully we shouldn't have to change anything again that will break links...
  - **Item tooltips**. Finally! When you hover an item it will show a proper tooltip of the items stats!
  - Fixed some bug with Alchemy Stone stats showing sometimes when they're not activated.
  - **All resist** has changed slightly. If an item gave "all resist" before, it will now give the 4 resist categories separately to allow the calculation of your total resists to show properly.
  
### Visual changes
  - **New class select screen**. We wanted something a bit more interesting to look at when you first open the page, so we made something a bit nicer here. Functionally it's still the same though.
  - **Settings moved to new modal**. Just a small change we made as more tabs will be appearing for other things.
  - **Saving moved to new modal**. Similar to above, we moved saving into it's own modal to remove the large text box from the footer, and because you can now generate short links on demand!
  - Various other minor font and colour tweaks around the place.
  
### Back-end changes

_Just in case you follow the git more than just using it, here's some of the back-end things that were changed_

  - Rewrote a lot of the database, now items are idenfitied by their ingame ID number rather than name, this allows for duplicate entries for things such as Alchemy Stones, it also allows for a more robust saving system rather than saving based on it's position in the database.
  - Removed redundant data, we found a lot of redundant data in our databases, such as sets on items without sets, so we removed a lot! Probably still more to go though.

---

## 0.5.1 (2017-01-07)

Features

  - Simplified costume pieces have been added, more will be coming soon. As all Pearl costumes give the same stats, we've simplified it into a single item regardless of class for now, we will be fully adding them at a later time though.
  - More minor UI changes

## 0.5.0 (2017-01-03)

Features

  - Added class base resistances to calculations
  - Removed tooltips from Enhancement Sliders and added dividers to help, also added enhancement level into item names
  - Rewrote the search/filter system completely, should notice massive performance increases now
  - Added gear score, which is your AP + DP, for reference purposes
  - Split stat displays into tabs
  - Added remove button to unequip item
  - Added Alchemy stones that can be toggled
  - Added Compact mode for popups, enable this under settings!
  
Other things

  - Updated to Bootstrap v4 Alpha5, this means the style has changed slightly but allows us to do some more stuff that we couldn't before.
  - Rewrote the search/filter system completely, should notice massive performance increases now

## 0.4.0 (2016-12-21)

Features:

  - Images for all items have been added! Everything looks nicer now!
  - New Layout, the layout resembles the in-game display a bit more, and now uses a dark theme.
  - Stat breakdown tooltips, when hovering on a stat you will see which of your items are providing that stat.
  - Rarity filter will now let you search for items by their rarity.

## 0.3.4 (2016-12-15)

Features:

  - Added displaying Enhancement levels ontop of equipment icons and on tooltips (IHellMasker)
  - Added gear listing to show your current gear and gems (IHellMasker)

## 0.3.3.5 (2016-12-14)

Features:

  - Added Search to gear and gem windows. (IHellmasker)
  - Added simple tooltips to gear slots showing the item name. (IHellmasker)

Bug Fixes:

  - Fixed Jarrette's accessory set bonus. (IHellmasker)

Changes:

  - Hidden AP is now separate from "sheet" AP and shown in the Offensive stats section. (Shadowtrance)

## 0.3.3.4 (2016-12-06)

Features:

  - Added Awakening weapons. (Shadowtrance)
  - Fully implemented awakening ap calculation. (Shadowtrance)

Changes:

  - Changed class selection on main page to image button style layout. (Shadowtrance)
  - Share link now spans the full width due to removal of the class select dropdown list. (Shadowtrance)
  - Changed equipment slots layout slightly to better accommodate the added awakening weapon slot. (Shadowtrance)

## 0.3.3.3 (2016-11-17)

Features:

  - Added Ninja and Kunoichi classes. (Shadowtrance)
  - Enhancement level up to +20 now for applicable items. (Shadowtrance)
  - Small additions to main page, copy link button mainly. (Shadowtrance)
  - Copy to clipboard and tooltip added to app.js. (Shadowtrance)
  - Kunai (kunoichi) and Shuriken (Ninja) images added. (Shadowtrance)
  - Huge item database update (basically every item available currently). Hopefully no issues here, there A LOT to add. :) (Shadowtrance)
  - Crystal clean up in item database, corrected some, removed some that don't exist in game in any region that i know of yet. (Shadowtrance)
  - Fixed saving and loading of "all" crystals for items. (SirMrE)

## 0.3.3.2 (2016-11-07)

Bug Fixes:

  - Fixed the issue where gems which fits all slots would not work and throw an uncaught type error. (Shadowtrance)


## 0.3.3.1 (2016-10-08)

Bug Fixes:

  - Fixed the issue where gems which fits all slots would not should on the list.


## 0.3.3 (2016-05-08)

Bug Fixes:

  - Fixed the issue with sharelinks not saving primary and secondary weapons.


## 0.3.2 (2016-18-07)

Features:

  - Added shareable links. You can now share you setup/build with others.
  - Add hover tooltips on gear slots.

Changes:

  - Refactored a large part of the app.js code.

Bug Fixes:

  - removed console.log from debugging.


## 0.3.1.2 (2016-14-04)

Bug Fixes:

  - Fixed wrong base stats for Witch's Earring (Thanks StoneSlayer!)


## 0.3.1.1 (2016-14-04)

Bug Fixes:

  - Fixed wrong rarity on a couple of crystals (Thanks /user/l7arkSpirit!).
  - Fixed Critical Hit Rate being displayed as % (Thanks /user/l7arkSpirit!).
  - Fixed issue with armor crystals now being selectable (Thanks /user/l7arkSpirit!).


## 0.3.1 (2016-14-04)

Features:

  - Added Musa/Maehwa items and classes.

Changes:

  - Enhancement slider now updates as you slide instead on on release.


## 0.3.0.1 (2016-14-04)

Changes:

  - Made the border around gear thicker.

Bug Fixes:

  - Fixed a bug where gem slots would show when changing class.


## 0.3.0 (2016-14-04)

Features:

  - Added gem system (Thanks to /user/l7arkSpirit on reddit for the gems design idea).

Bug Fixes:

  - Fixed some minor display errors.


## 0.2.2 (2016-12-04)

Features:

  - Added missing boss armor.


## 0.2.1 (2016-12-04)

Features:

  - Added missing earrings.


## 0.2.0 (2016-12-04)

Features:

  - Complete UI overhaul. This is an ongoing process.


## 0.1.1 (2016-09-04)

Features:

  - Enhancement level dropdown will update based on the max enhancement level available for selected item.

Bug Fixes:

  - Fixed error when enhancement level was higher than what was available for selected item.


## 0.1.0 (2016-09-04)

Features:

  - Initial release.