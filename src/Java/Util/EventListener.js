/**
 * Java.js : EventListener
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class EventListener
 */

// A tagging interface that all event listener interfaces must extend.

function EventListener(){
	var argv = EventListener.arguments;
	var argc = EventListener.length;
	this.className="EventListener";

	if(argv.length>0)
		this.initEventListener();
}

EventListener.prototype.initEventListener = function(){}
