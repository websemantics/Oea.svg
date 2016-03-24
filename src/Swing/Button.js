/**
 * Swing.svg : Button
 *
 * SUPPORTS LOOK AND FEEL
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

Button.prototype = new Label();

function Button( /* int */ x, y, w, h, /* String */ name, caption, /* Icon */ icon) {
        var argv = Button.arguments;
        var argc = Button.length;
        /* String */
        this.name = "Button";
        /* String */
        this.className = "Button";
        /* Graphics */
        this.sking = null; // Used by the ButtonSkin
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* ButtonSkin */
        this.buttonSkin = null;

        if (argv.length > 0) 
        	this.initButton(x, y, w, h, name, caption, icon);
    }

Button.prototype.initButton = function( /* int */ x, y, w, h, /* String */ name, caption, /* Icon */ icon) {
    // Summary: 
    //
    // Forms:
    // (1) initButton(caption)
    // (2) initButton(caption,icon)
    // (3) initButton(name,caption,icon)
    // (4) initButton(x,y,w,h,name,caption,icon)
    //
    // Note: if the orther of args is different than above, no error message is given

        if (x.length != undefined) {
            if (y != undefined) {
                if (y instanceof Icon) {
                    // initButton(caption,icon)
                    caption = x;
                    icon = y;
                    x = 0;
                    y = 0;
                    w = 0;
                    h = 0;
                    name = caption;
                } else {
                    // initButton(name,caption,icon),... I expect that, since x is String and y is not,...then y should be a String!!! (not the best logic ;-)
                    name = x;
                    caption = y;
                    icon = w;
                    x = 0;
                    y = 0;
                    w = 0;
                    h = 0;
                }
            } else {
                // initButton(caption)
                caption = x;
                name = caption;
                x = 0;
                y = 0;
                w = 0;
                h = 0;
            }
        }

        this.initLabel(x, y, w, h, name, caption, icon);
        this.buttonSkin = new SimpleButtonSkin();
        this.addMouseListener(this);
        this.addMouseMotionListener(this);
    }

Button.prototype.changeSkin = function( /* ButtonSkin */ skin) {
        if (!this.created)
            this.buttonSkin = skin;
        else {
            this.sking.oldClear();
            this.contentg.oldClear();
            this.buttonSkin = skin;
            this.createSVGContentButton(this);
        }
    }

Button.prototype.createSVGContent = function() {
        this.createSVGContentButton();
    }

Button.prototype.createSVGContentButton = function() {

        this.createSVGContentCanvas();

        this.sking = this.getGraphics();
        this.contentg = this.getGraphics();

        this.buttonSkin.createSVGContent(this);

        this.contentg.setFont(this.font);
        this.contentg.setColor(this.foreground);

        var x = this.left;
        var y = this.top;

        if (this.icon != null) {
            this.icon.createSVGContent(this.contentg);
            x += this.icon.w ;
        }

        if (this.caption != null) {
            this.textShape = this.contentg.drawText(x, y, this.caption);
            this.textShape.setToBaseLine();
        }
    }

Button.prototype.setBackground = function( /* Color */ background) {
        if (background != undefined)
            this.background = background;
        if (this.sking)
            this.sking.setBackground(background);
    }

Button.prototype.onResize = function() {
        this.onResizeButton();
    }

Button.prototype.onResizeButton = function() {
        this.onResizeLabel();
        if (this.buttonSkin != null)
            this.buttonSkin.setSize(this.w, this.h);
    }

Button.prototype.onMove = function() {
        this.onMoveButton();
    }

Button.prototype.onMoveButton = function() {
        this.onMoveLabel();
    }

Button.prototype.recalc = function() {
        this.recalcButton();
    }

Button.prototype.recalcButton = function() {
        this.recalcLabel();
    }

Button.prototype.mousePressed = function( /* MouseEvent */ e) {
        if (e.getButton() == BUTTON2) return;
        this.buttonSkin.mousePressed();
    }

Button.prototype.mouseReleased = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseReleased();
    }

Button.prototype.mouseEntered = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseIn();
    }

Button.prototype.mouseExited = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseOut();
    }

Button.prototype.mouseClicked = function( /* MouseEvent */ e) {
        /* ActionEvent */
        var aevt = new ActionEvent(this, "buttonClicked", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

Button.prototype.mouseDragged = function( /* MouseEvent */ e) {
        if (!(e.x >= 0 && e.x <= this.w && e.y >= 0 && e.y <= this.h))
            this.mouseExited(e);
    }

Button.prototype.mouseEndDragged = function( /* MouseEvent */ e) {
        if (e.x >= 0 && e.x <= this.w && e.y >= 0 && e.y <= this.h)
            this.mouseReleased(e);
    }

Button.prototype.reset = function() {
        this.mouseReleased();
    }

Button.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}