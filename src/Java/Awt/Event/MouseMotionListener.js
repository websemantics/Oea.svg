/**
 * Java.js : MouseMotionListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseMotionListener {Interface}
 * 
 * Invoked when a mouse button is pressed on a component and then dragged.
 * MOUSE_DRAGGED events will continue to be delivered to the component where 
 * the drag originated until the mouse button is released (regardless of 
 * whether the mouse position is within the bounds of the component).
 * 
 */

MouseMotionListener.prototype= new EventListener(); 

function MouseMotionListener( ){;}

MouseMotionListener.prototype.mouseDragged = function(/* MouseEvent */ e){;}

// Invoked when the mouse cursor has been moved onto a component but no buttons have been pushed.
MouseMotionListener.prototype.mouseMoved = function(/* MouseEvent */ e){;}
