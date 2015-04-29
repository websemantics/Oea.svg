/**
 * Java.js : Enumerator
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th Feb 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Enumerator [implementation of Enumeration interface]
 * 
 * An Enumeration for a Vector of Objects.
 * 
 */

Enumerator.prototype = new Enumeration();

function Enumerator( /* Vector */ v) { /* implements Enumeration */
        var argv = Enumerator.arguments;
        var argc = Enumerator.length;
        this.className = "Enumerator";

        /* Vector -Instead of -Enumeration */
        this.fEnumeration = null;;
        
        if (argv.length > 0) 
        	this.initEnumerator(v);
    }

Enumerator.prototype.initEnumerator = function(v) {
        if (v == null) return false;
        this.fEnumeration = v.elements();
    }

Enumerator.prototype.hasMoreElements = function() {
		// Summary:
		// Returns true if the enumeration contains more elements; false if its empty
        return this.fEnumeration.hasMoreElements();
    }

Enumerator.prototype.nextElement = function() {
		// Summary:
    // Returns the next element of the enumeration. Calls to this method will enumerate successive elements.
    return this.fEnumeration.nextElement();
}