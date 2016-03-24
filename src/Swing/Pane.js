/**
 * Swing.svg : Pane
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     21th July 2005
 * @package   websemantics/oea/swing.svg
 */

Pane.prototype= new Panel(); 

function Pane(x, y, w, h, button) {
        var argv = Pane.arguments;
        var argc = Pane.length;

        /* String */
        this.name = "Pane";
        /* String */
        this.className = "Pane";
        /* Label */
        this.button = null;
        /* Shape */
        this.border = null;

        if (argv.length > 0) 
        	this.initPane(x, y, w, h, button);
    }

Pane.prototype.initPane = function(x, y, w, h, button) {
        this.initPanel(x, y, w, h);
        this.button = button;
    }

Pane.prototype.createSVGContent = function() {
        this.createSVGContentPane();
    }

Pane.prototype.createSVGContentPane = function() {

        this.createSVGContentPanel();

        this.drawing = this.getGraphics();
        this.contentg = this.getGraphics();

        this.paintChildren(this.contentg);

        this.drawing.setStrokeWidth(1);
        this.drawing.setStrokeColor("white");
        this.drawing.setColor("#d4d0c8");
        this.backgroundPolygon = this.drawing.drawPolygon(0, 0);
        this.backgroundPolygon.setAttribute('shape-rendering', 'optimizeSpeed');
        this.drawing.setColor("none");
        this.drawing.setStrokeColor("black");
        this.path1 = this.drawing.drawPath(0, 0, "");
        this.path2 = this.drawing.drawPath(0, 0, "");
        this.path1.setAttribute('shape-rendering', 'optimizeSpeed');
        this.path2.setAttribute('shape-rendering', 'optimizeSpeed');
        
        //this.glassPaneOn();
        //this.enableMouseListener();
        //this.enableMouseMotionListener();
    }

Pane.prototype.onResize = function() {
        this.onResizePane();
    }

Pane.prototype.onResizePane = function() {
        this.onResizePanel();
        if (this.border != null)
            this.border.setSize(this.w, this.h);
    }

Pane.prototype.recalc = function() {
        this.recalcPane();
    }

Pane.prototype.recalcPane = function() {
        this.recalcPanel();
        this.recalcPaneOnly();
    }

Pane.prototype.recalcPaneOnly = function() {
    var xx = new Array();
    var yy = new Array();
    var mode = this.cParent.tabsLocation; // TOP, BOTTOM, LEFT or RIGHT
    var bx = this.button.x;
    var by = this.button.y;
    var bw = this.button.w;
    var bh = this.button.h;
    var px = 0;
    var py = 0;
    var pw = this.w;
    var ph = this.h;
    var ew = this.cParent.tabsEffectiveWidth;
    var eh = this.cParent.tabsEffectiveHeight;

    if (mode == LEFT) {
        this.setLocation(ew, 0);
        //this.setSize(this.w-ew,this.h);
        this.button.setSize(ew, this.button.h);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw - ew, 0);
        var p3 = new Point(pw - ew, ph);
        var p4 = new Point(0, ph);
        var p5 = new Point(0, by + bh);
        var p6 = new Point(-ew, by + bh);
        var p7 = new Point(-ew, by);
        var p8 = new Point(0, by);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p5.x;
        xx[1] = p6.x;
        yy[0] = p5.y;
        yy[1] = p6.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p2.x;
        xx[1] = p3.x;
        xx[2] = p4.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        yy[2] = p4.y;
        this.path2.setXYPoints(xx, yy);

    }
    if (mode == RIGHT) {
        this.setLocation(0, 0);
        //this.setSize(this.w-ew,this.h);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw - ew, 0);
        var p3 = new Point(pw - ew, by);
        var p4 = new Point(pw, by);
        var p5 = new Point(pw, by + bh);
        var p6 = new Point(pw - ew, by + bh);
        var p7 = new Point(pw - ew, ph);
        var p8 = new Point(0, ph);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);


        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p2.x;
        xx[1] = p3.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p4.x;
        xx[1] = p5.x;
        xx[2] = p6.x;
        xx[3] = p7.x;
        xx[4] = p8.x;
        yy[0] = p4.y;
        yy[1] = p5.y;
        yy[2] = p6.y;
        yy[3] = p7.y;
        yy[4] = p8.y;
        this.path2.setXYPoints(xx, yy);
    }

    if (mode == TOP) {
        this.setLocation(0, eh);
        //this.setSize(this.w,this.h-eh);
        this.button.setSize(this.button.w, eh);
        var p1 = new Point(0, 0);
        var p2 = new Point(bx, 0);
        var p3 = new Point(bx, -eh);
        var p4 = new Point(bx + bw, -eh);
        var p5 = new Point(bx + bw, 0);
        var p6 = new Point(pw, 0);
        var p7 = new Point(pw, ph - eh);
        var p8 = new Point(0, ph - eh);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p4.x;
        xx[1] = p5.x;
        yy[0] = p4.y;
        yy[1] = p5.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p6.x;
        xx[1] = p7.x;
        xx[2] = p8.x;
        yy[0] = p6.y;
        yy[1] = p7.y;
        yy[2] = p8.y;
        this.path2.setXYPoints(xx, yy);

    }
    if (mode == BOTTOM) {
        this.setLocation(0, 0);
        //this.setSize(this.w,this.h-eh);
        this.button.setSize(this.button.w, eh);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw, 0);
        var p3 = new Point(pw, ph - eh);
        var p4 = new Point(bx + bw, ph - eh);
        var p5 = new Point(bx + bw, ph);
        var p6 = new Point(bx, ph);
        var p7 = new Point(bx, ph - eh);
        var p8 = new Point(0, ph - eh);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p7.x;
        xx[1] = p8.x;
        yy[0] = p7.y;
        yy[1] = p8.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p2.x;
        xx[1] = p3.x;
        xx[2] = p4.x;
        xx[3] = p5.x;
        xx[4] = p6.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        yy[2] = p4.y;
        yy[3] = p5.y;
        yy[4] = p6.y;
        this.path2.setXYPoints(xx, yy);
    }
}