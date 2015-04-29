/**
 * Java.js : MouseEvent
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseEvent [comments are taken from java]
 *
 * An event which indicates that a mouse action occurred in a component.
 * A mouse action is considered to occur in a particular component if and only
 * if the mouse cursor is over the unobscured part of the component's bounds
 * when the action happens.
 * Component bounds can be obscurred by the visible component's children or by a
 * menu or by a top-level window.
 * This event is used both for mouse events (click, enter, exit) and mouse 
 * motion events (moves and drags). 
 *
 */

var NOBUTTON = 0;
var BUTTON1 = 1;
var BUTTON2 = 2;
var BUTTON3 = 3;
		
/* extends InputEvent 
 * MouseEvent.prototype= new InputEvent(); 
 */

function MouseEvent( /* Component */ source, /* svgMouseEvent */ evt, /* int */ x, /* int */ y) {
        var argv = MouseEvent.arguments;
        var argc = MouseEvent.length;
        this.className = "MouseEvent";

        this.source = null;
        /* float */
        this.x = 0;
        /* float */
        this.y = 0;
        /* float */
        this.screenX = 0;
        /* float */
        this.screenY = 0;
        /* int */
        this.clickCount = 0; // Indicates which, if any, of the mouse buttons has changed state.
        /* int */
        this.button = 0; //The only legal values are the following constants: NOBUTTON, BUTTON1, BUTTON2, BUTTON3
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;

        if (argv.length > 0) 
        	this.initMouseEvent(source, x, y, evt);
    }

MouseEvent.prototype.initMouseEvent = function(source, x, y, evt) {
        this.source = source;
        this.x = x;
        this.y = y;
        this.clickCount = evt.detail;
        var button = evt.button;
        if (button < NOBUTTON || button > BUTTON3) {
            alert("Invalid button value");
        }
        this.button = button;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
        // New 13-11-2005
        this.screenX = evt.clientX;
        this.screenY = evt.clientY;
    }

MouseEvent.prototype.getX = function() {
        return this.x;
    }

MouseEvent.prototype.getY = function() {
        return this.y;
    }

MouseEvent.prototype.getScreenX = function() {
        return this.screenX;
    }

MouseEvent.prototype.getScreenY = function() {
        return this.screenY;
    }

MouseEvent.prototype.getPoint = function() {
		// Summary:
		// Returns the x,y position of the event relative to the source component.
        return new Point(this.x, this.y);
    }

MouseEvent.prototype.translatePoint = function(x, y) {
		// Summary:
    // Translates the event's coordinates to a new position by adding specified x> (horizontal) and y (vertical) offsets.
        this.x += x;
        this.y += y;
    }

MouseEvent.prototype.getButton = function() {
		// Summary:
    // Returns which, if any, of the mouse buttons has changed state
        return this.button;
    }

MouseEvent.prototype.isShiftDown = function() {
		// Summary:
    // Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

MouseEvent.prototype.isControlDown = function() {
		// Summary:
    // Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

MouseEvent.prototype.isMetaDown = function() {
		// Summary:
    // Returns  whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

MouseEvent.prototype.isAltDown = function() {
		// Summary:
    // Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

MouseEvent.prototype.getClickCount = function() {

        return this.clickCount;
    }

MouseEvent.prototype.toString = function() {
    return this.className + "[x=" + this.x + ", y=" + this.y + ", button=" + this.button + ", clickCount=" + this.clickCount + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}
