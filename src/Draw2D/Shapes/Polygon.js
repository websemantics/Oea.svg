/**
 * Draw2D.svg : Polygon
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Polygon.prototype = new Shape();

function Polygon(x, y, xx, yy, graphics) {
        var argv = Polygon.arguments;
        var argc = Polygon.length;
        this.className = "Polygon";

        if (argv.length > 0)
            this.initPolygon(x, y, xx, yy, graphics);
    }

Polygon.prototype.initPolygon = function(x, y, xx, yy, graphics) {
        this.initNode(x, y, 0, 0, 0, 1);
        this.copyProperties(graphics);
        this.create(xx, yy, graphics);
    }

Polygon.prototype.create = function(xx, yy, graphics) {
        this.Node = createSVGNode("polygon", {
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        if (xx != undefined && yy != undefined && xx != null && yy != null)
            this.setXYPoints(xx, yy);
        this.transform();
    }

Polygon.prototype.setXYPoints = function(xx, yy) {
        var points = xx[0] + "," + yy[0] + " ";
        for (var i = 1; i < xx.length; i++)
            points += xx[i] + "," + yy[i] + " ";
        this.setAttribute("points", points);
    }

Polygon.prototype.clone = function( /* */ parent) {
    var polygon = new Polygon(this.x, this.y, null, null, parent);
    polygon.copyProperties(this);
    polygon.setAttribute("points", this.getAttribute("points"));
    return polygon;
}