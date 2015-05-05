/**
 * Swing.svg : Label
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th July 2005
 * @package   websemantics/oea/swing.svg
 */

Label.prototype= new Canvas(); 

function Label( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* String */ name, /* String */ caption, /* Icon */ icon, color) {
        var argv = Label.arguments;
        var argc = Label.length;

        /* String */
        this.className = "Label";
        /* String */
        this.name = "Label";
        /* String */
        this.caption = null;
        /* Color */
        this.textColor = color || "black";
        /* int */
        this.align = CENTER;
        /* int */
        this.valign = CENTER;
        /* Boolean */
        this.resizeToText = true; // if true, the size of the Label is set to the size of its text content
        /* Graphics */
        this.lg = null;
        /* Icon */
        this.icon = null;
        /* Shape */
        this.textShape = null;
        /* int */
        this.textShapeWidth = 0; // The width of the text node,...to be calculated in recalc method
        /* int */
        this.textShapeHeight = 0; // The height of the text node,...to be calculated in recalc method
        
        /* int, x margin */
        this.margin = 5;

        if (argv.length > 0) 
          this.initLabel(x, y, w, h, name, caption, icon);
    }

Label.prototype.initLabel = function(x, y, w, h, name, caption, icon) {
        this.initCanvas(x, y, w, h);
        
        // left,right,top,bottom 
        this.setInsets(4, 4, 4, 4);

        if (name != undefined) this.name = name;
        else name = this.getComponentId();
        if (caption != undefined) this.caption = caption;

        if (icon != undefined) this.icon = icon;
    }

Label.prototype.createSVGContent = function() {
        this.createSVGContentLabel();
    }

Label.prototype.createSVGContentLabel = function() {
        this.createSVGContentCanvas();

        this.lg = this.getGraphics();
        this.lg.setFont(this.font);
        this.lg.setColor(this.foreground);

        var x = this.left;
        var y = this.top;

        if (this.icon != null) {
            this.icon.createSVGContent(this.lg);
            x += this.icon.w + this.margin;
        }

        if (this.caption != null) {
            this.lg.setColor(this.textColor);
            this.textShape = this.lg.drawText(x, y, this.caption);
            y += this.textShape.getStringHeight();
            this.textShape.setToBaseLine();
        }
    }

Label.prototype.onResize = function() {
        this.onResizeLabel();
    }

Label.prototype.onResizeLabel = function() {
        this.onResizeCanvas();
        this.positionText();
    }

Label.prototype.onMove = function() {
        this.onMoveLabel();
    }

Label.prototype.onMoveLabel = function() {
        this.onMoveCanvas();
    }

Label.prototype.recalc = function() {
        this.recalcLabel();
    }

Label.prototype.recalcLabel = function() {
        this.recalcCanvas();

        var w = this.w;
        var h = this.h;
        var margin = (this.icon) ? this.margin : 0;

        this.textShapeWidth = w - this.left - this.right - margin;
        this.textShapeHeight = h - this.top - this.bottom;

        // Resize the Label to the size of the text
        if (this.resizeToText) {
            if (this.textShape != null) {
                this.textShape.setFont(this.font);
                this.textShapeWidth = this.textShape.getStringWidth();
                this.textShapeHeight = this.textShape.getStringHeight();
                w = this.textShapeWidth + this.left + this.right;
                h = this.textShapeHeight + this.top + this.bottom;
                if (this.icon != null) {
                    w += this.icon.getWidth()+ this.left + this.right;
                    h = Math.max(this.icon.getHeight() + this.top + this.bottom, h);
                }
            } else
            if (this.icon != null) {
                w = this.icon.getWidth() + this.left + this.right;
                h = this.icon.getHeight() + this.top + this.bottom;
            }
            this.setSize(w  + margin, h);
        } else 
        this.onResizeLabel();

    }

Label.prototype.setTextAlign = function( /* int */ align, /* int */ valign) {
        if (align != undefined) this.align = align;
        if (valign != undefined) this.valign = valign;
        // Apply the effect;
        this.positionText();
    }

Label.prototype.positionText = function() {

        if (this.textShape == null && this.icon == null) return;

        var tw = 0; // Text Width
        var th = 0; // Text Height
        var iw = 0; // Icon Width
        var ih = 0; // Icon Height

        if (this.textShape != null) {
            tw = this.textShapeWidth;
            th = this.textShapeHeight;
        }

        if (this.icon != null) {
            iw = this.icon.getWidth();
            ih = this.icon.getHeight();
        }

        var x = 0; // for both, icon and text
        var y = 0; // for text only
        var iy = 0; // for icon only

        switch (this.align) {
            case LEFT:
                x = this.left + iw;
                break;
            case RIGHT:
                x = this.w - tw - this.right;
                break;
            case CENTER:
                x = (this.w - (tw + iw)) / 2 + iw;
                break;
        }

        switch (this.valign) {
            case TOP:
                y = this.top;
                iy = this.top;
                break;
            case BOTTOM:
                y = this.h - th - this.bottom;
                iy = this.h - ih - this.bottom;
                break;
            case CENTER:
                y = (this.h - th) / 2;
                iy = (this.h - ih) / 2;
                break;
        }

        if (this.textShape != null)
            this.textShape.translate(x + ((this.icon)?this.margin:0), y);


        if (this.icon != null)
            this.icon.translate(x - iw, iy);

    }

Label.prototype.setText = function(txt) {
        if (this.textShape == null) return;
        this.textShape.setText(txt);
        this.recalc();
    }

Label.prototype.getText = function() {
        return this.textShape.getText();
    }

Label.prototype.setTextColor = function(color) {
        if (this.textShape != null)
            this.textShape.setTextColor(color)
        else
            this.textColor = color;
    }

Label.prototype.highlightOn = function() {
        if (this.textShape != null)
            this.textShape.getNode().setAttribute("font-weight", "bold");
        if (this.icon != null)
            this.icon.iconShape.scale(1.1);
    }

Label.prototype.highlightOff = function() {
        if (this.textShape != null)
            this.textShape.getNode().setAttribute("font-weight", "normal");
        if (this.icon != null)
            this.icon.iconShape.scale(1);
    }

Label.prototype.setResizeToText = function( /* Boolean */ flag) {
        this.resizeToText = flag;
    }

Label.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}