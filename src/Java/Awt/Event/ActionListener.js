/**
 * Java.js : ActionListener
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     23rd Feb 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class ActionListener [comments are taken from java]
 *
 * The listener interface for receiving action events. The class that is 
 * interested in processing an action event implements this interface, and the 
 * object created with that class is registered with a component, using the 
 * component's addActionListener method. When the action event occurs, 
 * that object's actionPerformed method is invoked.
 *
 */

/* extends EventListener 
 * ActionListener.prototype= new EventListener(); 
 */

function ActionListener(){  
        var argv = ActionEvent.arguments;
        var argc = ActionEvent.length;
        this.className = "ActionEvent";
				this.className="ActionListener";
}

ActionListener.prototype.actionPerformed = function(/* ActionEvent */ e){
}

