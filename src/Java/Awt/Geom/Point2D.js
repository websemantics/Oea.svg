/**
 * Java.js : Point2D
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/** 
 * Class Point2D
 *
 * The Point2D class defines a point representing a location in (x, y) coordinate space.
 * 
 */

function Point2D(x, y) { /* implements Cloneable */

        this.className = "Point2D";

        /* double, float or integer */
        this.x = x;

        /* double, float or integer */
        this.y = y;
    }

Point2D.prototype.getX = function() {
        return this.x;
    }

Point2D.prototype.getY = function() {
        return this.y;
    }

Point2D.prototype.setLocation = function(x, y) {
        this.x = x;
        this.y = y;
    }

Point2D.prototype.toString = function() {
        return this.className + " [" + this.x + ", " + this.y + "]";
    }

Point2D.prototype.distanceSq = function(x1, y1, x2, y2) {
    // Summary
    // 
    // Returns the square of the distance between two points.  
    // OR 
    // Returns the square of the distance between this point and another point.
    //
    // Forms:
    // ======
    // (1) distanceSq(Point2D pt)
    // (2) distanceSq(x1,y1)
    // (3) distanceSq(x1,y1,x2,y2)

        /* (1) */
        if (x1 instanceof Point2D) {
            var pt = x1;
            x1 = pt.getX();
            y1 = pt.getY();
        }
        /* (2) */
        if (!x2 && !y2) {
            x2 = this.getX();
            y2 = this.getY();
        }
        x1 -= x2;
        y1 -= y2;
        return (x1 * x1 + y1 * y1);
    }

Point2D.prototype.distance = function(x1, y1, x2, y2) {
    // Summary
    // 
    // Returns the distance between two points.  
    // OR 
    // Returns the distance between this point and another point.
    // 
    // Forms:
    // ======
    // (1) distance(Point2D pt)
    // (2) distance(x1,y1)
    // (3) distance(x1,y1,x2,y2)

        /* (1) */
        if (x1 instanceof Point2D) {
            var pt = x1;
            x1 = pt.getX();
            y1 = pt.getY();
        }
        /* (2) */
        if (!x2 && !y2) {
            x2 = this.getX();
            y2 = this.getY();
        }
        x1 -= x2;
        y1 -= y2;
        return Math.sqrt(x1 * x1 + y1 * y1);
    }

Point2D.prototype.clone = function() {
    // Summary
    // Creates a new object of the same class and with the same contents as this object.  
        return this;
    }

Point2D.prototype.equals = function(obj) {
    // Summary
    // Determines whether or not two points are equal.  
    //
    // Two instances of Point2D are equal if the values of their x and y member fields,
    // representing their position in the coordinate space, are the same.

    if (obj instanceof Point2D)
        if (obj.getX() == this.getX() && obj.getY() == this.getY()) return true;
    return false;
}