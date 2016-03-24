/**
 * Draw2D.svg : Shape
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Shape.prototype = new Node();

function Shape() {
        var argv = Shape.arguments;
        var argc = Shape.length;
        this.className = "Shape";

        this.initShape();
    }

Shape.prototype.initShape = function() {
        this.color = null;
        this.strokeColor = null;
        this.strokeWidth = null;
    }

Shape.prototype.copyProperties = function(graphics) {
				// Summary:
				// Copy graphics context color, strokeColor and strokeWidth 
				// properties to this object 
        this.setColor(graphics.getColor());
        this.setStrokeColor(graphics.getStrokeColor());
        this.setStrokeWidth(graphics.getStrokeWidth());
    }

Shape.prototype.setColor = function(color) {
        this.color = color;
        this.setAttribute('fill', this.getColor());
    }

Shape.prototype.getColor = function() {
        if (this.color == null) return "none";
        return this.color;
    }

Shape.prototype.setStrokeColor = function(color) {
        this.strokeColor = color;
        this.setAttribute('stroke', this.getStrokeColor());
    }

Shape.prototype.getStrokeColor = function() {
        if (this.strokeColor == null) return "none";
        return this.strokeColor;
    }

Shape.prototype.setStrokeWidth = function(strokeWidth) {
        this.strokeWidth = strokeWidth;
        this.setAttribute('stroke-width', this.getStrokeWidth());
    }

Shape.prototype.getStrokeWidth = function() {
    return this.strokeWidth;
}
