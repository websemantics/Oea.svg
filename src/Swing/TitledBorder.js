/**
 * Swing.svg : TitledBorder
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th July 2005
 * @package   websemantics/oea/swing.svg
 */

TitledBorder.prototype= new Container(); 

function TitledBorder( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* Component */ comp) {
        var argv = TitledBorder.arguments;
        var argc = TitledBorder.length;

        /* String */
        this.className = "TitledBorder";
        /* String */
        this.name = "TitledBorder";
        /* int */
        this.align = LEFT;
        /* int */
        this.valign = BOTTOM;
        /* Graphics  */
        this.contentg = null;
        /* Graphics  */
        this.tg = null;
        /* Shape */
        this.rect1 = null;
        /* Shape */
        this.rect2 = null;
        /* Component */
        this.comp = null;
        /* int */
        this.strokeWidth = 1.5;
        
        if (argv.length > 0) 
        	this.initTitledBorder(x, y, w, h, comp);
    }

TitledBorder.prototype.initTitledBorder = function(x, y, w, h, comp) {
        this.initContainer(x, y, w, h);
        this.setInsets(2, 2, 2, 2); // left,right,top,bottom 
        if (comp != undefined) {
            this.comp = comp;
            this.comp.setBackground("#d4d0c8");
        }
        this.setBackground("#d4d0c8");
    }

TitledBorder.prototype.createSVGContent = function() {
        this.createSVGContentTitledBorder();
    }

TitledBorder.prototype.createSVGContentTitledBorder = function() {
        this.createSVGContentContainer();
        this.tg = this.getGraphics();
        this.contentg = this.getGraphics();
        this.tg.setColor("none");
        this.tg.setStrokeWidth(this.strokeWidth);
        this.tg.setStrokeColor(pal[1]);
        this.rect1 = this.tg.drawRect(0, 0, this.w - this.strokeWidth, this.h - this.strokeWidth);
        this.tg.setStrokeColor(pal[3]);
        this.rect2 = this.tg.drawRect(this.strokeWidth, this.strokeWidth, this.w - this.strokeWidth, this.h - this.strokeWidth);
        this.rect1.setAttribute('shape-rendering', 'optimizeSpeed');
        this.rect1.setAttribute('shape-rendering', 'optimizeSpeed');
        if (this.comp != null) {
            this.comp.setFont(this.getFont());
            this.comp.paint(this.tg);
        }
        this.paintChildren(this.contentg);
    }

TitledBorder.prototype.onResize = function() {
        this.onResizeTitledBorder();
    }

TitledBorder.prototype.onResizeTitledBorder = function() {
        this.onResizeContainer();

        if (this.comp != null)
            this.positionComponent();

    }

TitledBorder.prototype.onMove = function() {
        this.onMoveTitledBorder();
    }

TitledBorder.prototype.onMoveTitledBorder = function() {
        this.onMoveContainer();
    }

TitledBorder.prototype.recalc = function() {
        this.recalcTitledBorder();
    }

TitledBorder.prototype.recalcTitledBorder = function() {

        var cw = 0;
        var ch = 0;

        if (this.comp != null) {
            this.comp.recalc();
            this.positionComponent();
            var cw = this.comp.getWidth();
            var ch = this.comp.getHeight();
        }

        var dh = ch / 2;

        if (this.valign == TOP) {
            this.rect1.translate(0, dh);
            this.rect1.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.rect2.translate(this.strokeWidth, this.strokeWidth + dh);
            this.rect2.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.setInsets(5, 5, 5 + ch, 5); // left,right,top,bottom 

        }
        if (this.valign == BOTTOM) {
            this.rect1.translate(0, 0);
            this.rect1.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.rect2.translate(this.strokeWidth, this.strokeWidth);
            this.rect2.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.setInsets(5, 5, 5, 5 + ch); // left,right,top,bottom 
        }


        this.recalcContainer();
    }

TitledBorder.prototype.setAlign = function( /* int */ align, /* int */ valign) {
        if (align != undefined) this.align = align;
        if (valign != undefined) this.valign = valign;
        if (this.comp != null)
            this.positionComponent();
    }

TitledBorder.prototype.positionComponent = function() {
    var x = 0;
    var y = 0;
    var w = this.comp.getWidth();
    var h = this.comp.getHeight();
    var gap = 10;

    switch (this.align) {
        case LEFT:
            x = gap;
            break;
        case RIGHT:
            x = this.w - w - gap;
            break;
        case CENTER:
            x = (this.w - w) / 2;
            break;
    }

    switch (this.valign) {
        case TOP:
            y = 0;
            break;
        case BOTTOM:
            y = this.h - h;
            break;
    }

    this.comp.setLocation(x, y);
}
