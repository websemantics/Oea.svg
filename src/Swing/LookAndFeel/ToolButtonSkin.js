/**
 * Swing.svg : ToolButtonSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class ToolButtonSkin
 *
 * And implementation of ButtonSkin interface for tool button
 * 
 */

ToolButtonSkin.prototype = new SimpleButtonSkin();

function ToolButtonSkin() {
        /* String */
        this.name = "ToolButtonSkin";
        /* String */
        this.className = "ToolButtonSkin";
        /* Boolean */
        this.mIn = false;

    }

ToolButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var border = g.drawStepBorder(x, y, w, h);
        border.setVisibility(this.mIn);
        return border
    } 

ToolButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.mIn = true;
        this.border.setVisibility(this.mIn);
        this.border.setFaceDown();
        this.button.contentg.moveBy(0, 1);
    }

ToolButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setVisibility(this.mIn);
        this.border.setFaceUp();
        this.button.contentg.moveBy(0, -1);
    }

ToolButtonSkin.prototype.mouseOut = function() {
        this.mIn = false;
        this.border.setVisibility(this.mIn);
        this.mouseReleased();
    }

ToolButtonSkin.prototype.mouseIn = function() {
        this.mIn = true;
        this.border.setVisibility(this.mIn);
    }

ToolButtonSkin.prototype.clone = function() {
    return new ToolButtonSkin();
}
