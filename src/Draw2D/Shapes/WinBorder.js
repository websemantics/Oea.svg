/**
 * Draw2D.svg : WinBorder
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

WinBorder.prototype = new Shape();

function WinBorder(x, y, w, h, graphics) {
        var argv = WinBorder.arguments;
        var argc = WinBorder.length;
        this.className = "WinBorder";

        if (argv.length > 0)
            this.initWinBorder(x, y, w, h, graphics);
    }

WinBorder.prototype.initWinBorder = function(x, y, w, h, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.edge3 = null;
        this.edge4 = null;
        //this.bgk=null;
        this.create(graphics);
    }

WinBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        //g.setColor(pal[2]);
        //this.bgk=g.drawRect(2,2,this.w-4,this.h-4);
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

WinBorder.prototype.update = function() {
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
        xx[0] = w - 1;
        xx[1] = w - 2;
        xx[2] = w - 2;
        xx[3] = 2;
        xx[4] = 1;
        xx[5] = w - 1;
        yy[0] = 1;
        yy[1] = 2;
        yy[2] = h - 2;
        yy[3] = h - 2;
        yy[4] = h - 1;
        yy[5] = h - 1;
        this.edge2.setXYPoints(xx, yy);
        
        // Edge 3
        xx[0] = w - 1;
        xx[1] = w - 2;
        xx[2] = 2;
        xx[3] = 2;
        xx[4] = 1;
        xx[5] = 1;
        yy[0] = 1;
        yy[1] = 2;
        yy[2] = 2;
        yy[3] = h - 2;
        yy[4] = h - 1;
        yy[5] = 1;
        this.edge3.setXYPoints(xx, yy);
        
        // Edge 4
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
        this.edge4.setXYPoints(xx, yy);
        
        // background 
        //this.bgk.setSize(w-2,h-2);
    }

WinBorder.prototype.setFaceUp = function() {
        c1 = pal[0];
        c2 = pal[1];
        c3 = pal[2];
        c4 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c3);
        this.edge4.setColor(c4);
    }

WinBorder.prototype.setFaceDown = function() {
        c3 = pal[0];
        c4 = pal[1];
        c1 = pal[2];
        c2 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c3);
        this.edge4.setColor(c4);
    }

WinBorder.prototype.onResize = function() {
		    this.update();
		}