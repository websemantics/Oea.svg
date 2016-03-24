/**
 * Swing.svg : BoxButtonSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class BoxButtonSkin
 *
 * And implementation of ButtonSkin interface for box-like button
 * 
 */

BoxButtonSkin.prototype= new SimpleButtonSkin(); 

function BoxButtonSkin() {
        /* String */
        this.name = "BoxButtonSkin";
        /* String */
        this.className = "BoxButtonSkin";
        /* int    */
        this.depth = 2;
    }

BoxButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
	// Summary:
	// This can be overridden to use different Border Shapes 
        var border = g.drawBoxBorder(x, y, w, h, this.depth);
        this.button.sking.setSize(w - this.depth, h - this.depth);
        this.button.setBackground("#cbc8c1");
        return border;
    }

BoxButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        this.button.sking.setSize(w - this.depth, h - this.depth);
        this.border.setSize(w, h);
    }

BoxButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.border.setFaceDown();
        this.button.sking.setSize(this.button.w, this.button.h);
        this.button.contentg.moveBy(0, 1);
    }

BoxButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setFaceUp();
        this.button.sking.setSize(this.button.w - this.depth, this.button.h - this.depth);
        this.button.contentg.moveBy(0, -1);
    }

BoxButtonSkin.prototype.clone = function() {
    return new BoxButtonSkin();
}
