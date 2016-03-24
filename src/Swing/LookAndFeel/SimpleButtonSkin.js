/**
 * Swing.svg : SimpleButtonSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class SimpleButtonSkin
 *
 * And implementation of ButtonSkin interface for a simple button
 * 
 */

SimpleButtonSkin.prototype = new ButtonSkin();

function SimpleButtonSkin() {
        /* String */
        this.name = "SimpleButtonSkin";
        /* String */
        this.className = "SimpleButtonSkin";
        /* Shape  */
        this.border = null;
    }

SimpleButtonSkin.prototype.createSVGContent = function( /* Button */ but) {
        this.button = but;
        var w = but.getWidth() - but.left - but.right;
        var h = but.getHeight() - but.top - but.bottom;
        var bg = but.sking;
        bg.setBackground("#D4D0C8");
        this.border = this.drawBorder(bg, 0, 0, w, h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
    }

SimpleButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        return g.drawStepBorder(x, y, w, h);
    }

SimpleButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.border.setFaceDown();
        this.button.contentg.moveBy(0, 1);
    }

SimpleButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setFaceUp();
        this.button.contentg.moveBy(0, -1);
    }

SimpleButtonSkin.prototype.mouseOut = function() {
        this.mouseReleased();
    }

SimpleButtonSkin.prototype.mouseIn = function() {}

SimpleButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        //w-=this.button.left+this.button.right;
        //h-=this.button.top+this.button.bottom;
        this.button.sking.setSize(w, h);
        this.border.setSize(w, h);
    }

SimpleButtonSkin.prototype.clone = function() {
    return new SimpleButtonSkin();
}
