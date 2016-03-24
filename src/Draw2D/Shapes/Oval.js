/**
 * Draw2D.svg : Oval
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Oval.prototype = new Shape();

function Oval(x, y, rx, ry, graphics) {
        var argv = Oval.arguments;
        var argc = Oval.length;
        this.className = "Oval";

        this.radiusX = 0;
        this.radiusY = 0;
        
        if (argv.length > 0)
        	this.initOval(x, y, rx, ry, graphics);
    }

Oval.prototype.initOval = function(x, y, rx, ry, graphics) {
        this.initNode(x, y, rx * 2, ry * 2, 0, 1);
        this.setRadius(rx, ry);
        this.copyProperties(graphics);
        this.create(graphics);
    }

Oval.prototype.create = function(graphics) {
        // cx and cy attributes of 'circle' are ignored and 'transform' is used insteade 
        this.Node = createSVGNode("ellipse", {
            cx: 0,
            cy: 0,
            rx: this.radiusX,
            ry: this.radiusY,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.strokeWidth
        }, graphics.getNode());
        this.transform();
    }

Oval.prototype.setRadius = function(rx, ry) {
        this.radiusX = rx;
        this.radiusY = ry;
        this.setAttribute("rx", this.radiusX);
        this.setAttribute("ry", this.radiusY);
        this.transform();
    }

Oval.prototype.getRadius = function() {
        return (new Point(this.getAttribute("rx"), this.getAttribute("ry")));
    }

Oval.prototype.onResize = function() {
        this.setRadius(this.w / 2, this.h / 2);
    }

Oval.prototype.onMove = function() {
        return this.transform();
    }

Oval.prototype.transformRectNode = function() {
        if (this.Node == null) return false;
        this.Node.setAttribute('transform', " translate(" + (this.x + this.radiusX) + " , " + (this.y + this.radiusY) + ")" +
            " translate(" + this.xo + " , " + this.yo + ")" +
            " rotate(" + this.r + ")" +
            " scale(" + this.s + ")" +
            " translate(-" + this.xo + " , -" + this.yo + ")");
        return true;
    }

Oval.prototype.clone = function( /* */ parent) {
    var oval = new Oval(this.x, this.y, this.radiusX, this.radiusY, parent);
    oval.copyProperties(this);
    return oval;
}
