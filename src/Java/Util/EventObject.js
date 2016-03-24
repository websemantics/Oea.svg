/**
 * Java.js : EventObject
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class EventObject
 * 
 * The root class from which all event state objects shall be derived.
 * All Events are constructed with a reference to the object, the "source",
 * that is logically deemed to be the object upon which the Event in question
 * initially occurred upon.
 * 
 */

// A tagging interface that all event listener interfaces must extend.
// 
function EventObject( /* Object */ source) { /* implements Serializable */
        var argv = EventObject.arguments;
        var argc = EventObject.length;
        this.className = "EventObject";

        /* Object */
        this.source = null;

        if (argv.length > 0) 
        	this.initEventObject(source);
    }

EventObject.prototype.initEventObject = function(source) {
        if (!source || source == null) return; // throw new IllegalArgumentException("null source");
        this.source = source;
    }

EventObject.prototype.getSource = function() {
		// Summary:
		// The object on which the Event initially occurred
        return this.source;
    }

EventObject.prototype.toString = function() {
		// Summary:
    // Returns a String representation of this EventObject.
    return this.className + " [source=" + this.source + "]";
}