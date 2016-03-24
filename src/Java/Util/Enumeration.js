/**
 * Java.js : Enumeration
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/** 
 * Class Enumeration {interface}
 * 
 * An object that implements the Enumeration interface generates a
 * series of elements, one at a time. Successive calls to the
 * nextElement method return successive elements of the series.
 *
 */

// A tagging interface that all event listener interfaces must extend.

function Enumeration(obj){
	var argv = Enumeration.arguments;
	var argc = Enumeration.length;
	this.className="Enumeration";

	if(argv.length>0)
		this.initEnumeration(obj);
}

/* void */ Enumeration.prototype.initEnumeration = function(obj){;}

/* boolean */ Enumeration.prototype.hasMoreElements = function(){}

/* Object */ Enumeration.prototype.nextElement = function(){}
 
/* String */ Enumeration.prototype.toString = function(){return this.className;}
