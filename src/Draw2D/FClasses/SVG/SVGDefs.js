/**
 * Draw2D.svg : SvgDefs
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22nd November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

var defsNode=null;

/**
 * APIs Summary
 *
 * Low-level SVG utility functions used to manipulate Defs node
 * 
 */

function df_createDefs(){
	// Summary:
	// Create a defs node
	defsNode=createSVGNode("defs",{});
}

function df_addToDefs(node){
	// Summary:
	// Add a node to the defs node
	
	// Support of [Node] type (i.e. shapes, graphics, etc)
	if(node.getNode)
		node=node.getNode(); 

	if(defsNode != null && !defsNode.addChild) 
		defsNode.appendChild(node);
	 else 
	 	defsNode.addChild(node); // <= does not work with older plug-in (ver 3)
}
