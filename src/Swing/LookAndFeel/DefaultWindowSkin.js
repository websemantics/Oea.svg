/**
 * Swing.svg : DefaultWindowSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class DefaultWindowSkin
 *
 * The default Window skin
 * 
 */

DefaultWindowSkin.prototype = new WindowSkin();

function DefaultWindowSkin() {

        /* String */
        this.name = "DefaultWindowSkin";
        /* String */
        this.className = "DefaultWindowSkin";
        /* Window */
        this.window = null;
        /* int    */
        this.borderWidth = 2; // Works as margin,..to shift the label and title rect to the right/bottom
        /* Shape  */
        this.titleRect = null;
        /* Shape  */
        this.border = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = "url(#WinG1)";
        /* Color */
        this.inactiveColor = "url(#WinG2)";
    }

DefaultWindowSkin.prototype.createSVGContent = function( /* Window */ win) {
        this.window = win;
        this.g = win.sking;
        this.g.setBackground("#D4D0C8");
        this.titleRect = this.drawTitleRect(this.g, this.borderWidth, this.borderWidth, win.w - this.borderWidth - this.borderWidth, 10);
        this.border = this.drawBorder(this.g, 0, 0, win.w, win.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        this.titleLabel = new Label(this.borderWidth, this.borderWidth, 10, 10, "title", win.getTitle(), win.getIcon());
        this.titleLabel.setFont(this.getFont());
        this.titleLabel.paint(this.g);
        this.titleLabel.setTextColor(this.getTitleColor());
        this.titleLabel.setAttribute("pointer-events", "none");
    }

DefaultWindowSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        return g.drawWinBorder(x, y, w, h);
    }

DefaultWindowSkin.prototype.getTitleColor = function() {
        return "white";
    }

DefaultWindowSkin.prototype.getFont = function() {
        return this.window.getFont();
    }

DefaultWindowSkin.prototype.getActiveColor = function() {
        return this.activeColor;
    }

DefaultWindowSkin.prototype.getInActiveColor = function() {
        return this.inactiveColor;
    }

DefaultWindowSkin.prototype.drawTitleRect = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor(this.getActiveColor());
        var rect = g.drawRect(x, y, w, 20);
        return rect;
    }

DefaultWindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        if (this.g != null) this.g.setSize(w, h);
        if (this.border != null) this.border.setSize(w, h);
        if (this.titleRect != null) this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleRect.h);
    }

DefaultWindowSkin.prototype.recalc = function() {
        this.titleLabel.recalc();
        // Resize the title rectangle to fit the window width and the window title's height.
        this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleLabel.getHeight());
    }

WindowSkin.prototype.active = function() {
        this.titleRect.setAttribute('fill', this.getActiveColor());
    }

WindowSkin.prototype.inactive = function() {
        this.titleRect.setAttribute('fill', this.getInActiveColor());
    }

DefaultWindowSkin.prototype.clone = function() {
    return new DefaultWindowSkin();
}
