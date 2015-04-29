/**
 * Java.js : Insets
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/awt
 */

/**
 * Class Insets [comments are taken from java]
 * 
 * An Insets object is a representation of the borders of a container.
 * It specifies the space that a container must leave at each of its edges.
 * The space can be a border, a blank space, or a title. 
 * 
 */

function Insets(top, left, bottom, right) { /* implements Cloneable, Serializable */
        var argv = Insets.arguments;
        var argc = Insets.length;
        this.className = "Insets";

        if (argv.length > 0) 
        	this.initInsets(top, left, bottom, right);
    }

Insets.prototype.initInsets = function(top, left, bottom, right) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }

Insets.prototype.equals = function( /* Object */ obj) {
		// Summary:
		// Checks whether two insets objects are equal.
        if (obj instanceof Insets) {
            var insets = obj;
            return ((this.top == insets.top) && (this.left == insets.left) &&
                (this.bottom == insets.bottom) && (this.right == insets.right));
        }
        return false;
    }

Insets.prototype.hashCode = function() {
		// Summary:
		// Returns the hash code for this Insets.
        var sum1 = this.left + this.bottom;
        var sum2 = this.right + this.top;
        var val1 = sum1 * (sum1 + 1) / 2 + this.left;
        var val2 = sum2 * (sum2 + 1) / 2 + this.top;
        var sum3 = val1 + val2;
        return sum3 * (sum3 + 1) / 2 + val2;
    }

Insets.prototype.toString = function() {
        return this.className + " [top=" + this.top + ",left=" + this.left + ",bottom=" + this.bottom + ",right=" + this.right + "]";
    }

Insets.prototype.clone = function() {
    // Create a copy of this object
    // Not Implemented 
}