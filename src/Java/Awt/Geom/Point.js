/**
 * Java.js : Point
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

Point.prototype = new Point2D();

function Point(x, y) { /* implements Serializable */
	// Forms:
	// (1) Point();
	// (2) Point(x,y);
	// (3) Point(Point pt);

        this.className = "Point";

        if (!x && !y) {
            x = 0;
            y = 0;
        }

        if (x instanceof Point) {
            var pt = x;
            x = pt.getX();
            y = pt.getY();
        }

        /* int */
        this.x = x;
        /* int */
        this.y = y;
    }

Point.prototype.getLocation = function() {
        return new Point(this.x, this.y);
    }

Point.prototype.setLocation = function(/* Point or int */ x, y) {
        if (x instanceof Point) {
            var pt = x;
            x = pt.getX();
            y = pt.getY();
        }
        this.move(x, y);
    }

Point.prototype.move = function(x, y) {
        this.x = Math.floor(x + 0.5);
        this.y = Math.floor(y + 0.5);
    }

Point.prototype.translate = function(dx, dy) {
		// Summary:
		// Translates this point, at location x,y, by dx and dy
        this.x += dx;
        this.y += dy;
    }

Point.prototype.equals = function(obj) {
		// Summary:
    // Determines whether or not two points are equal.  
    //
    // Two instances of Point are equal if the values of their x and y member fields,
    // representing their position in the coordinate space, are the same.

    if (obj instanceof Point)
        if (obj.getX() == this.getX() && obj.getY() == this.getY()) return true;
    return false;
}
