/**
 * Java.js : Dimension2D
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class Dimension2D
 *
 * The Dimension class encapsulates the width and height of a component 
 * (in integer precision) in a single object.
 *  
 */

Dimension.prototype = new Dimension2D();

function Dimension(width, height) { /* implements Serializable */
	// Forms:
	// (1) Dimension();
	// (2) Dimension(width,height);
	// (3) Dimension(Dimension d);

        this.className = "Dimension";

        if (!width && !height) {
            width = 0;
            height = 0;
        }

        if (width instanceof Dimension) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
        }

        /* int */
        this.width = width;
        /* int */
        this.height = height;
    }

Dimension.prototype.getWidth = function() {
        return this.width;
    }

Dimension.prototype.getHeight = function() {
        return this.height;
    }

Dimension.prototype.setSize = function(width, height) {
        if (width instanceof Dimension) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
        }
        this.width = Math.ceil(width);
        this.height = Math.ceil(height);
    }

Dimension.prototype.getSize = function() {
        return new Dimension(this);
    }

Dimension.prototype.equals = function(obj) {
		// Summary:
		// Checks whether two dimension objects have equal values. 
        if (obj instanceof Dimension)
            if (obj.getWidth() == this.getWidth() && obj.getHeight() == this.getHeight()) return true;
        return false;
    }

Dimension.prototype.hashCode = function() {
		// Summary:
		// Returns the hash code for this <code>Dimension</code>. 
        var sum = this.width + this.height;
        return sum * (sum + 1) / 2 + this.width;
    }

Dimension.prototype.toString = function() {
    return this.className + " [width=" + this.width + ",height=" + this.height + "]";
}