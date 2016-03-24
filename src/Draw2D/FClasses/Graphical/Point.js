/**
 * Draw2D.svg : Point
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

function Point(x,y){
    var argv = Point.arguments;
    var argc = Point.length;
    this.className = "Point";
    
		this.x=0;
		this.y=0;
}

/**
 * setX, setY, getX and getY functions are avoided for performance.
 * direct access to x and y is allowed 
 */

Point.prototype.setX = function(x) {
    this.x = x;
}

Point.prototype.setY = function(y) {
    this.y = y;
}

Point.prototype.getX = function() {
    return this.x;
}

Point.prototype.getY = function(y) {
    return this.y;
}
