/**
 * Draw2D.svg : SVG Utility Functions
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

/**
 * This variable is used to specify whether this script code is 
 * working under SVG or HTML environment ( Values: svg / html )
 * Used by createSVGNode, deleteSVGNode and deleteSVGNodeById 
 * functions. 
 */

var gMode="svg"; 
var svgDocument = document;

/**
 * SVG utility functions:
 *
 * Low-level SVG utility functions used to manipulate SVG nodes
 *  
 */

/**
 * External APIs:
 */

function createSVGNode(nodeType, nodeAttributes, parentNode, namespace) {
				// Summary:
				// Create and return an SVG node.
				// Attach to parent node if given!
        return createDOMNode(nodeType, nodeAttributes, parentNode, namespace);
    }

function createDOMNode(nodeType, nodeAttributes, parentNode, namespace) {
				// Summary:
				// Create and return a DOM node. Attach to parent node if given!
				// Check if parentNode is an object of type NODE [use getNode()]

        if (namespace == undefined || namespace == null) 
        	namespace = "http://www.w3.org/2000/svg";

        // Delete the node if it already exists
        if (nodeAttributes['id']) deleteSVGNodeById(nodeAttributes['id']);

        // If the script code works inside an HTML document then declare svgDocument
        if (gMode == "html") svgDocument = document.graphic.getSVGDocument();

        // Selete ROOT element if parentNode is not given ,.. check if parent node of type Node,..
        if (parentNode == undefined || parentNode == null)
            parentNode = svgDocument.documentElement;
        else
        if (parentNode.getNode) parentNode = parentNode.getNode();

        // Create the SVG node of type nodeType
        //var node = svgDocument.createElement(nodeType);
        var node = svgDocument.createElementNS(namespace, nodeType);

        // Create attributes of the new node
        for (var attribute in nodeAttributes)
            node.setAttribute(attribute, nodeAttributes[attribute]);
        // Attach the node to its parent 
        // (nodeType!="flowRoot") is added to fix a problem with Batik,...flowRoot can not be attached to a parent unless it has all required children,..
        if (nodeType != "flowRoot" && parentNode != undefined && parentNode != null) parentNode.appendChild(node);

        return node;
    }

function createSVGTextNode(text, nodeAttributes, parentNode, nodeType, namespace) {
				// Summary:
				// Create and return an SVG text node. Attach to parent node if given!
        return createDOMTextNode(text, nodeAttributes, parentNode, nodeType, namespace);
    }

function createDOMTextNode(text, nodeAttributes, parentNode, nodeType, namespace) {
				// Summary:
				// Create and return a DOM text node. Attach to parent node if given!
        if (text == undefined || text == null) return false;

        if (nodeType == undefined || nodeType == null) nodeType = "text"; // else, it could be 'tspan'!

        var node = createSVGNode(nodeType, nodeAttributes, parentNode, namespace);

        // If the script code works inside an HTML document then declare svgDocument
        if (gMode == "html") 
        	svgDocument = document.graphic.getSVGDocument();

        // Create the text node and attach it,..
        node.appendChild(svgDocument.createTextNode(text));

        return node;
    }

function deleteSVGNode(node) {
				// Summary:
				// Delete an SVG node
        if (!node || node == null) return false;
        if (gMode != undefined && gMode != null && gMode == 'svg')
            node.parentNode.removeChild(node);
        else
            node.getParentNode.removeChild(node);
        return true;
    }

function deleteSVGNodeById(id) {
				// Summary:
				// Delete an SVG node. Get node by its SVG id attribute 

        if (!id || id == null) return false;

        return deleteSVGNode(svgDocument.getElementById(id));
    }

function printXMLNode(element, text, spaces) {

    if (element == undefined || element.tagName == undefined) {
        return null;
    }
    if (spaces == undefined) spaces = 0;
    if (text == undefined || text == null) text = "";

    var sInc = "  ";
    var spacesString = "";

    for (var j = 0; j < spaces; j++) spacesString += sInc;

    text += spacesString + "<" + element.tagName;
    if (element.hasAttributes())
        for (var k = 0; k < element.attributes.length; k++) {
            var attr = element.attributes.item(k);
            text += " " + attr.name + "=\"" + attr.value + "\"";
        }
    text += ">\n";

    spaces++;

    var children = element.childNodes;
    for (var i = 0; i < children.length; i++) {
        var child = children.item(i);
        if (child.firstChild && child.firstChild.nodeType == 3)
            text += spacesString + sInc + "<" + child.tagName + ">" + child.firstChild.data + "</" + child.tagName + ">\n";
        else {
            var temp = printXMLNode(child, null, spaces);
            if (temp != null) text += temp;
        }
    }

    spaces--;
    spacesString = "";
    for (var j = 0; j < spaces; j++) spacesString += sInc;
    text += spacesString + "</" + element.tagName + ">\n";

    return text;
}