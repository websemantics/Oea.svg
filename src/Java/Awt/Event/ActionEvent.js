/**
 * Java.js : ActionEvent
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th Feb 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class ActionEvent [comments are taken from java]
 * 
 *  A semantic event which indicates that a component-defined action occured.
 *  This high-level event is generated by a component (such as a Button) when
 *  the component-specific action occurs (such as being pressed).
 *  The event is passed to every every ActionListener object
 *  that registered to receive such events using the component's
 *  addActionListener method.
 *  The object that implements the ActionListener interface gets this ActionEvent
 *  when the event occurs. The listener is therefore spared the details of 
 *  processing individual mouse movements and mouse clicks, and can instead 
 *  process a "meaningful" (semantic) event like "button pressed".
 */
	
/* extends AWTEvent
 * ActionEvent.prototype= new AWTEvent(); 
 */

function ActionEvent( /* Component */ source, /* String */ command, /* svgActionEvent */ evt) {
        var argv = ActionEvent.arguments;
        var argc = ActionEvent.length;
        this.className = "ActionEvent";
        this.source = null;
        
        // The nonlocalized string that gives more details of what actually 
        // caused the event. This information is very specific to the component 
        // that fired it.
        
        /* String */
        this.actionCommand = null;
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;
        /* MouseEvent */
        this.evt = null;
        
        if (argv.length > 0) 
        	this.initActionEvent(source, command, evt);
    }

ActionEvent.prototype.initActionEvent = function(source, command, evt) {
        this.source = source;
        this.actionCommand = command;
        if (evt == null) return;
        this.evt = evt;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
    }

ActionEvent.prototype.getActionCommand = function() {
		// Summary:
		// 
    // Returns the command string associated with this action.
    // This string allows a "modal" component to specify one of several 
    // commands, depending on its state. For example, a single button might
    // toggle between "show details" and "hide details". The source object
    // and the event would be the same in each case, but the command string
    // would identify the intended action.
        return this.actionCommand;
    }

ActionEvent.prototype.isShiftDown = function() {
		// Summary:
		// Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

ActionEvent.prototype.isControlDown = function() {
		// Summary:
		// Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

ActionEvent.prototype.isMetaDown = function() {
		// Summary:
		// Returns whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

ActionEvent.prototype.isAltDown = function() {
		// Summary:
		// Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

ActionEvent.prototype.getMouseEvent = function() {
        return this.evt;
    }

ActionEvent.prototype.toString = function() {
    return this.className + "[actionCommand=" + this.actionCommand + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}