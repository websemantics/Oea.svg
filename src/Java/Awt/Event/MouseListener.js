/**
 * Java.js : MouseListener
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseListener {Interface}
 *
 * The listener interface for receiving "interesting" mouse events 
 * (press, release, click, enter, and exit) on a component.
 * 
 */

MouseListener.prototype= new EventListener(); 
function MouseListener( ){;}

// Invoked when the mouse button has been clicked (pressed and released) on a component.
MouseListener.prototype.mouseClicked = function(/* MouseEvent */ e){;}

// Invoked when a mouse button has been pressed on a component.
MouseListener.prototype.mousePressed = function(/* MouseEvent */ e){;}

// Invoked when a mouse button has been released on a component.
MouseListener.prototype.mouseReleased = function(/* MouseEvent */ e){;}

// Invoked when the mouse enters a component.
MouseListener.prototype.mouseEntered = function(/* MouseEvent */ e){;}

// Invoked when the mouse exits a component.
MouseListener.prototype.mouseExited = function(/* MouseEvent */ e){;}
