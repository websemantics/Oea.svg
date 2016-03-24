/**
 * Draw2D.svg : Line
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */
Line.prototype = new Shape();

function Line(x1, y1, x2, y2, graphics) {
        var argv = Line.arguments;
        var argc = Line.length;
        this.className = "Line";

        if (argv.length > 0)
        	this.initLine(x1, y1, x2, y2, graphics);
    }

Line.prototype.initLine = function(x1, y1, x2, y2, graphics) {
        this.setPoint1(x1, y1);
        this.setPoint2(x2, y2);
        this.copyProperties(graphics);
        this.create(graphics);
    }

Line.prototype.create = function(graphics) {
        this.Node = createSVGNode("line", {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.update();
    }

Line.prototype.update = function() {
    this.setAttribute("x2", this.x2 - this.x);
    this.setAttribute("y2", this.y2 - this.y);
    this.transform();
}

Line.prototype.setPoint1 = function(/* Point or int */ x1, y1) {
        
        if (x1 instanceof Point) {
            var p = x1;
            this.setPoint1(p.x, p.y);
            return;
        }

        this.setCoord(x1, y1);
        this.update();
    }

Line.prototype.setPoint2 = function(/* Point or int */ x2, y2) {
        if (x2 instanceof Point) {
            var p = x2;
            this.setPoint2(p.x, p.y);
            return;
        }
        this.x2 = x2;
        this.y2 = y2;
        this.update();
    }

Line.prototype.onResize = function() {

}
