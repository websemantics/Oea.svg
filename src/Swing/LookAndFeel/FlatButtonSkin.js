/**
 * Swing.svg : FlatButtonSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class FlatButtonSkin
 *
 * And implementation of ButtonSkin interface for a flat button
 * 
 */

FlatButtonSkin.prototype = new ButtonSkin();

function FlatButtonSkin() {
        /* String */
        this.name = "FlatButtonSkin";
        /* String */
        this.className = "FlatButtonSkin";
    }

FlatButtonSkin.prototype.createSVGContent = function( /* Button */ but) {
        this.button = but;
        var bg = but.sking;
        bg.setBackground(this.button.getBackground());
    }

FlatButtonSkin.prototype.mousePressed = function() {}

FlatButtonSkin.prototype.mouseReleased = function() {}

FlatButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        this.button.sking.setSize(w, h);
    }

FlatButtonSkin.prototype.clone = function() {
    return new FlatButtonSkin();
}
