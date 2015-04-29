/**
 * Java.js : ReverseVectorEnumerator
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class ReverseVectorEnumerator [implementation of Enumeration interface]
 * 
 * {Comments are copied from the Java Implementation of HotDraw,..}
 *
 * An Enumeration that enumerates a vector back (size-1) to front (0).
 * 
 */

ReverseVectorEnumerator.prototype = new Enumeration();

function ReverseVectorEnumerator( /* Vector */ v) { /* implements Enumeration */
        var argv = ReverseVectorEnumerator.arguments;
        var argc = ReverseVectorEnumerator.length;
        this.className = "ReverseVectorEnumerator";

        this.vector = new Vector();
        this.count = 0;

        if (argv.length > 0) 
        	this.initReverseVectorEnumerator(v);
    }

ReverseVectorEnumerator.prototype.initReverseVectorEnumerator = function(v) {
        this.vector = v;
        this.count = this.vector.size() - 1;
    }

ReverseVectorEnumerator.prototype.hasMoreElements = function() {
    // Summary
    // Returns true if the Renumeration contains more elements; false if its empty.
        return this.count >= 0;
    }

ReverseVectorEnumerator.prototype.nextElement = function() {
    // Summary
    // Returns the next element of the Renumeration.
    if (this.count >= 0) {
        return this.vector.elementAt(this.count--);
    }
}
