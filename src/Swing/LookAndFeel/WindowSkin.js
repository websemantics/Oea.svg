/**
 * Swing.svg : WindowSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Interface WindowSkin
 * 
 * An interface of a window skin
 * 
 */

function WindowSkin() {
        /* String */
        this.name = "WindowSkin";
        /* String */
        this.className = "WindowSkin";
        /* Window */
        this.window = null;
        /* Window */
        this.g = null;
        /* Shape  */
        this.border = null;
        /* int    */
        this.borderWidth = 2;
        /* Shape  */
        this.titleRect = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = null;
        /* Color */
        this.inactiveColor = null;
    }

WindowSkin.prototype.createSVGContent = function( /* Window */ win) {}

WindowSkin.prototype.drawBorder = function() {}

WindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {}

WindowSkin.prototype.recalc = function() {}

WindowSkin.prototype.getTitleColor = function() {}

WindowSkin.prototype.getFont = function() {}

WindowSkin.prototype.active = function() {}

WindowSkin.prototype.inactive = function() {}

WindowSkin.prototype.clone = function() {}
