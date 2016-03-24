/**
 * Swing.svg
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2004
 * @package   websemantics/oea/swing.svg
 */

/**
 * Initlialise the Swing.svg Package
 *
 * @return void
 */

function initSwing(){

	// Microsoft Windows Look & Feel
	var node1=createSVGNode("linearGradient",{id:"WinG1"});
	node1.appendChild(createSVGNode("stop",{offset:"0%",'stop-color':'rgb(10,36,106)'}));
	node1.appendChild(createSVGNode("stop",{offset:"100%",'stop-color':'rgb(166,202,240)'}));

	var node2=createSVGNode("linearGradient",{id:"WinG2"});
	node2.appendChild(createSVGNode("stop",{offset:"0%",'stop-color':'rgb(127,127,127)'}));
	node2.appendChild(createSVGNode("stop",{offset:"100%",'stop-color':'rgb(192,192,192)'}));

	df_addToDefs(node1);
	df_addToDefs(node2);

	windowLayer=ly_createLayer(pg_getDefualtPage(),0);
	menuLayer=ly_createLayer(pg_getDefualtPage(),1);
	toolTipLayer=ly_createLayer(pg_getDefualtPage(),2);

} 

/**
 * Minimal implementation for a Clipboard class.
 * 
 */

function Clipboard() {
        var argv = Clipboard.arguments;
        var argc = Clipboard.length;
        this.className = "Clipboard";

        /* String */
        this.data = "";

        if (argv.length > 0) 
            this.initClipboard();
    }

Clipboard.prototype.initClipboard = function() {}

Clipboard.prototype.clearData = function() {

        this.data = "";

        if (viewerMode == ASV)
            return window.clipboardData.setData("text", this.data);
    }

Clipboard.prototype.setData = function( /* String */ data) {

        this.data = data;

        if (viewerMode == ASV)
            window.clipboardData.setData("text", data);
    }

Clipboard.prototype.getData = function() {

    if (viewerMode == ASV)
        return window.clipboardData.getData("text");
    else
        return this.data;
}

/**
 * Global Variables
 *
 */

var menuLayer;
var toolTipLayer;
var clipboard = new Clipboard();
