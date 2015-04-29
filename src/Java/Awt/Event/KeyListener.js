/**
 * Java.js : KeyListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class KeyListener [comments are taken from java]
 *
 * The listener interface for receiving keyboard events (keystrokes).
 * 
 */

/* extends EventListener 
 * KeyListener.prototype= new EventListener(); 
 */

function KeyListener(/* Component */ source,/* int */ x,/* int */ y,/* int */ clickCount, /*int */ button){  
		var argv = KeyListener.arguments;
		var argc = KeyListener.length;
		this.className="KeyListener";
}

KeyListener.prototype.keyTyped = function(/* KeyEvent */ e){
	//* Invoked when a key has been typed. See the class description 
	// for {@link KeyEvent} for a definition of a key typed event.
}

KeyListener.prototype.keyPressed = function(/* KeyEvent */ e){
	// Invoked when a key has been pressed. See the class description 
	// for {@link KeyEvent} for a definition of a key pressed event.
}

KeyListener.prototype.keyReleased = function(/* KeyEvent */ e){
	// Invoked when a key has been released. See the class description 
	// for {@link KeyEvent} for a definition of a key released event.
}
