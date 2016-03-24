/**
 * Java.js : Rectangle2D
 *
 * NOT FULLY IMPLEMENTED
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

function Rectangle2D() { /* extends RectangularShape */

        this.className = "Rectangle2D";

        this.MIN_VALUE = -2147483648;
        this.MAX_VALUE = 2147483647;
        this.OUT_LEFT = 1; // The bitmask that indicates that a point lies to the left of this Rectangle2D<
        this.OUT_TOP = 2; // The bitmask that indicates that a point lies above this Rectangle2D<
        this.OUT_RIGHT = 4; // The bitmask that indicates that a point lies to the right of this Rectangle2D<
        this.OUT_BOTTOM = 8; // The bitmask that indicates that a point lies below this Rectangle2D<

        /* float */
        this.x = 0;
        /* float */
        this.y = 0;
        /* float */
        this.width = 0;
        /* float */
        this.height = 0;
    }

Rectangle2D.prototype.toString = function() {
		// Summary:
		// Checks whether two rectangles are equal
    return this.className + " [x=" + this.x + ",y=" + this.y + ",width=" + this.width + ",height=" + this.height + "]";
}
	

