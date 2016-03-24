/**
 * Swing.svg : ButtonSkin
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class ButtonSkin
 *
 * An interface of a button skin
 * 
 */

/* INTERFACE */ function ButtonSkin(){
	/* String */    this.name="ButtonSkin";
	/* String */    this.className="ButtonSkin";
	/* Boolean */   this.pressed=false;
	/* Button */    this.button=null;
}


ButtonSkin.prototype.createSVGContent = function(/* Button */ but){}

ButtonSkin.prototype.drawBorder = function(){
	// This can be overridden to use different Border Shapes 
}

ButtonSkin.prototype.mousePressed = function(){}

ButtonSkin.prototype.mouseReleased = function(){}

ButtonSkin.prototype.mouseOut = function(){}

ButtonSkin.prototype.mouseIn = function(){}

ButtonSkin.prototype.update = function(/* int */ x,/* int */ y){
	// Depends on the mouse location (ON or OFF the button) 
}

ButtonSkin.prototype.setSize = function(/* int */ w,/* int */ h){}

ButtonSkin.prototype.clone = function(){}
