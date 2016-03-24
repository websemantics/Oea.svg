/**
 * Draw2D.svg : StepBorder
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

StepBorder.prototype = new Shape();

function StepBorder(x, y, w, h, graphics) {
        var argv = StepBorder.arguments;
        var argc = StepBorder.length;
        this.className = "StepBorder";

        if (argv.length > 0)
            this.initStepBorder(x, y, w, h, graphics);
    }

StepBorder.prototype.initStepBorder = function(x, y, w, h, graphics) {

        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.create(graphics);
    }

StepBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        this.edge1 = g.drawPolygon(0, 0);
        this.edge2 = g.drawPolygon(0, 0);
        this.update();
        graphics.addGraphics(g);
        this.setFaceUp();
        this.Node = g.getNode();
        this.transform();
        delete g;
    }

StepBorder.prototype.update = function() {

        var w = this.w;
        var h = this.h;
        var xx = new Array();
        var yy = new Array();
        // Edge 1 
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = w - 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = w;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = h - 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = h;
        this.edge1.setXYPoints(xx, yy);
        // Edge 2
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = 0;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = 0;
        this.edge2.setXYPoints(xx, yy);
    }

StepBorder.prototype.setFaceUp = function() {
        c1 = pal[0];
        c2 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
    }

StepBorder.prototype.setFaceDown = function() {
        c1 = pal[3];
        c2 = pal[0];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
    }

StepBorder.prototype.onResize = function() {
    this.update();
}
