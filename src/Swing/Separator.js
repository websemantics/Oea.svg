/**
 * Swing.svg : Separator
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

Separator.prototype= new Canvas(); 

function Separator( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = Separator.arguments;
        var argc = Separator.length;

        /* String */
        this.className = "Separator";
        /* String */
        this.name = "Separator";
        /* Graphics */
        this.sg = null;
        /* Shape */
        this.separatorShape = null;

        if (argv.length > 0) 
        	this.initSeparator(x, y, w, h);
    }

Separator.prototype.initSeparator = function(x, y, w, h) {
        this.initCanvas(x, y, w, h);
    }

Separator.prototype.createSVGContent = function() {
        this.createSVGContentSeparator();
    }

Separator.prototype.createSVGContentSeparator = function() {
        this.createSVGContentCanvas();
        this.sg = this.getGraphics();
        this.separatorShape = this.sg.drawStepBorder(0, this.h / 2, this.w, 2);
    }

Separator.prototype.onResize = function() {
        this.onResizeSeparator();
    }
    //*************
    // onResizeSeparator
    //*************
Separator.prototype.onResizeSeparator = function() {
        this.onResizeCanvas();
        if (this.separatorShape != null)
            this.separatorShape.setSize(this.w, this.separatorShape.h);

    }

Separator.prototype.recalc = function() {
        this.recalcSeparator();
    }

Separator.prototype.recalcSeparator = function() {
    this.recalcCanvas();
    if (this.separatorShape != null)
        this.separatorShape.setSize(this.w, this.separatorShape.h);

}