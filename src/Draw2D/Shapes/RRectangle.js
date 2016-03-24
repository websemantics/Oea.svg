/**
 * Draw2D.svg : RRectangle
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

RRectangle.prototype = new Shape();

function RRectangle(x, y, w, h, rx, ry, graphics) {
        var argv = RRectangle.arguments;
        var argc = RRectangle.length;
        this.className = "RRectangle";
        
        if (argv.length > 0)
            this.initRRectangle(x, y, w, h, rx, ry, graphics);
    }

RRectangle.prototype.initRRectangle = function(x, y, w, h, rx, ry, graphics) {
        if (w == undefined) w = 0;
        if (h == undefined) h = 0;
        this.initNode(x, y, w, h, 0, 1);
        this.setRadius(rx, ry);
        this.copyProperties(graphics);
        this.create(graphics);
    }

RRectangle.prototype.create = function(graphics) {
        this.Node = createSVGNode("rect", {
            x: 0,
            y: 0,
            rx: this.rx,
            ry: this.ry,
            width: this.w,
            height: this.h,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.strokeWidth
        }, graphics);
        this.transform();
    }

RRectangle.prototype.setRadius = function(rx, ry) {
        this.rx = rx;
        this.ry = ry;
        this.setAttribute("rx", this.rx);
        this.setAttribute("ry", this.ry);
    }

RRectangle.prototype.onResize = function() {
        this.setAttribute("width", this.w);
        this.setAttribute("height", this.h);
    }

RRectangle.prototype.clone = function( /* */ parent) {
    var rrect = new RRectangle(this.x, this.y, this.w, this.h, this.rx, this.ry, parent);
    rrect.copyProperties(this);
    return rrect;
}