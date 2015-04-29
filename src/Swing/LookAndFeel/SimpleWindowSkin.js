/**
 * Swing.svg : SimpleWindowSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class SimpleWindowSkin
 * 
 * An interface of a window skin
 * 
 */

SimpleWindowSkin.prototype = new WindowSkin();

function SimpleWindowSkin() {
        
        /* String */
        this.name = "SimpleWindowSkin";
        /* String */
        this.className = "SimpleWindowSkin";
        /* Window */
        this.window = null;
        /* int    */
        this.borderWidth = 2;
        /* Shape  */
        this.titleRect = null;
        /* Shape  */
        this.border = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = "blue";
        /* Color */
        this.inactiveColor = "gray";
    }

SimpleWindowSkin.prototype.createSVGContent = function( /* Window */ win) {
        this.window = win;
        this.g = win.sking;
        this.g.setBackground("white");
        this.titleRect = this.drawTitleRect(this.g, this.borderWidth, this.borderWidth, win.w - this.borderWidth - this.borderWidth, 10);
        this.border = this.drawBorder(this.g, 0, 0, win.w, win.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        this.titleLabel = new Label(this.borderWidth, this.borderWidth, this.w, 10, "title", win.getTitle(), win.getIcon());
        this.titleLabel.setFont(this.getFont());
        this.titleLabel.paint(this.g);
        this.titleLabel.setTextColor(this.getTitleColor());
        this.titleLabel.setAttribute("pointer-events", "none");
    }

SimpleWindowSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor("none");
        g.setStrokeColor("black");
        g.setStrokeWidth(1);
        return g.drawRect(x, y, w, h);
    }

SimpleWindowSkin.prototype.getTitleColor = function() {
        return "white";
    }

SimpleWindowSkin.prototype.getFont = function() {
        return this.window.getFont();
    }

SimpleWindowSkin.prototype.getActiveColor = function() {
        return this.activeColor;
    }

SimpleWindowSkin.prototype.getInActiveColor = function() {
        return this.inactiveColor;
    }

SimpleWindowSkin.prototype.drawTitleRect = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor(this.getActiveColor());
        var rect = g.drawRect(x, y, w, 20);
        return rect;
    }

SimpleWindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        if (this.g != null) this.g.setSize(w, h);
        if (this.border != null) this.border.setSize(w, h);
        if (this.titleRect != null) this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleRect.h);
    }

SimpleWindowSkin.prototype.recalc = function() {
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

SimpleWindowSkin.prototype.clone = function() {
    return new SimpleWindowSkin();
}
