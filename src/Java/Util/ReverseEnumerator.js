/**
 * Java.js : ReverseEnumerator
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/** 
 * Class ReverseEnumerator [implementation of Enumeration interface]
 *
 * An Enumeration that enumerates a vector of elemenets back (size-1) to front (0).
 */

ReverseEnumerator.prototype = new Enumeration();

function ReverseEnumerator( /* Vector */ v) { /* implements Enumeration */
        var argv = ReverseEnumerator.arguments;
        var argc = ReverseEnumerator.length;
        this.className = "ReverseEnumerator";

        /* ReverseVectorEnumerator */
        this.fEnumeration = null;;

        if (argv.length > 0) 
        	this.initReverseEnumerator(v);
    }

ReverseEnumerator.prototype.initReverseEnumerator = function(v) {
        this.fEnumeration = new ReverseVectorEnumerator(v);
    }

ReverseEnumerator.prototype.hasMoreElements = function() {
    // Summary
    // Returns true if the enumeration contains more elements; false if its empty.
        return this.fEnumeration.hasMoreElements();
    }

ReverseEnumerator.prototype.nextElement = function() {
    // Summary
    // Returns the next element of the enumeration. Calls to this method will enumerate successive elements.
    return this.fEnumeration.nextElement();
}
