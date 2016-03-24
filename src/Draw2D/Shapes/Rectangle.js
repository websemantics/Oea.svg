/**
 * Draw2D.svg : Rectangle
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Rectangle.prototype = new RRectangle();

function Rectangle(x, y, w, h, graphics) {
        var argv = Rectangle.arguments;
        var argc = Rectangle.length;
        this.className = "Rectangle";

        if (argv.length > 0) 
        	this.initRectangle(x, y, w, h, graphics);
    }

Rectangle.prototype.initRectangle = function(x, y, w, h, graphics) {
        this.initRRectangle(x, y, w, h, 0, 0, graphics);
    }

Rectangle.prototype.setCornersRadius = function(rx, ry) {}

Rectangle.prototype.clone = function( /* */ parent) {
    var rect = new Rectangle(this.x, this.y, this.w, this.h, parent);
    rect.copyProperties(this);
    return rect;
}
