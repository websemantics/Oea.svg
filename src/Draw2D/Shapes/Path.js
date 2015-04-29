/**
 * Draw2D.svg : Path
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     26th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Path.prototype = new Shape();

function Path(x, y, d, graphics) {
        var argv = Path.arguments;
        var argc = Path.length;
        this.className = "Path";

        if (argv.length > 0)
        	this.initPath(x, y, d, graphics);
    }

Path.prototype.initPath = function(x, y, d, graphics) {
        this.initNode(x, y, 0, 0, 0, 1);
        this.d = d;
        this.copyProperties(graphics);
        this.create(graphics);
    }

Path.prototype.create = function(graphics) {
        this.Node = createSVGNode("path", {
            d: this.d,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.transform();
    }

Path.prototype.setPath = function(d) {
        this.setAttribute("d", d);
    }

Path.prototype.setXYPoints = function(xx, yy) {
    var d = "M " + xx[0] + "," + yy[0] + " ";
    for (var i = 1; i < xx.length; i++)
        d += "L " + xx[i] + "," + yy[i] + " ";
    this.setAttribute("d", d);
}
