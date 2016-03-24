/**
 * Draw2D.svg : BoxBorder
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

/**
 * Class BoxBorder
 *
 * This is a complex class uses internal graphics Context to draw 
 * other shapes (i.e. polygon)
 * 
 */

BoxBorder.prototype = new Shape();

function BoxBorder(x, y, w, h, depth, graphics) {
        var argv = BoxBorder.arguments;
        var argc = BoxBorder.length;
        this.className = "BoxBorder";

        if (argv.length > 0)
            this.initBoxBorder(x, y, w, h, depth, graphics);
    }

BoxBorder.prototype.initBoxBorder = function(x, y, w, h, depth, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.depth = depth;
        this.create(graphics);
    }

BoxBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        this.edge1 = g.drawPolygon(0, 0);
        this.edge2 = g.drawPolygon(0, 0);
        this.edge3 = g.drawPolygon(0, 0);
        this.edge4 = g.drawPolygon(0, 0);
        this.update();
        graphics.addGraphics(g);
        this.setFaceUp();
        this.Node = g.getNode();
        this.transform();
        delete g;
    }

BoxBorder.prototype.update = function() {
        var w = this.w;
        var h = this.h;
        var t = this.depth;
        var xx = new Array();
        var yy = new Array();

        c1 = pal[3];
        c2 = pal[0];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c1);
        this.edge4.setColor(c2);
        
        // Edge 1 
        xx[0] = 0;
        xx[1] = t;
        xx[2] = t;
        xx[3] = 0;
        yy[0] = 0;
        yy[1] = t;
        yy[2] = h;
        yy[3] = h;
        this.edge1.setXYPoints(xx, yy);
        
        // Edge 2
        xx[0] = 0;
        xx[1] = w;
        xx[2] = w;
        xx[3] = t;
        yy[0] = 0;
        yy[1] = 0;
        yy[2] = t;
        yy[3] = t;
        this.edge2.setXYPoints(xx, yy);
        
        // Edge 3 
        xx[0] = w - t;
        xx[1] = w - t;
        xx[2] = w;
        xx[3] = w;
        yy[0] = 0;
        yy[1] = h - t;
        yy[2] = h;
        yy[3] = t;
        this.edge3.setXYPoints(xx, yy);
        
        // Edge 4
        xx[0] = 0;
        xx[1] = w - t;
        xx[2] = w;
        xx[3] = t;
        yy[0] = h - t;
        yy[1] = h - t;
        yy[2] = h;
        yy[3] = h;
        this.edge4.setXYPoints(xx, yy);
    }

BoxBorder.prototype.setFaceUp = function() {
        this.edge1.setVisibility(false);
        this.edge2.setVisibility(false);
        this.edge3.setVisibility(true);
        this.edge4.setVisibility(true);
    }

BoxBorder.prototype.setFaceDown = function() {
        this.edge1.setVisibility(true);
        this.edge2.setVisibility(true);
        this.edge3.setVisibility(false);
        this.edge4.setVisibility(false);
    }

BoxBorder.prototype.onResize = function() {
    this.update();
}