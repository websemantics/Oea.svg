/**
 * Draw2D.svg : Circle
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */
Circle.prototype = new Shape();

function Circle(x, y, r, graphics) {
        var argv = Circle.arguments;
        var argc = Circle.length;
        this.className = "Circle";

        this.radius = 0;

        if (argv.length > 0)
            this.initCircle(x, y, r, graphics);
    }

Circle.prototype.initCircle = function(x, y, r, graphics) {
    this.initNode(x, y, r * 2, r * 2, 0, 1);
    this.setRadius(r);
    this.copyProperties(graphics);
    this.create(graphics);
}

Circle.prototype.create = function(graphics) {
        // cx and cy attributes of 'circle' are ignored and 'transform' is used insteade 
        this.Node = createSVGNode("circle", {
            cx: 0,
            cy: 0,
            r: this.radius,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.transform();
    }

Circle.prototype.setRadius = function(r) {
        this.radius = r;
        this.setAttribute("r", this.radius);
        this.transform();
    }

Circle.prototype.onResize = function() {
        if (this.w > this.h) this.setRadius(this.w / 2);
        else this.setRadius(this.h / 2);
    }

Circle.prototype.transformRectNode = function() {
    if (this.Node == null) return false;
    this.Node.setAttribute('transform', " translate(" + (this.x + this.radius) + " , " + (this.y + this.radius) + ")" +
        " translate(" + this.xo + " , " + this.yo + ")" +
        " rotate(" + this.r + ")" +
        " scale(" + this.s + ")" +
        " translate(-" + this.xo + " , -" + this.yo + ")");
    return true;
}
