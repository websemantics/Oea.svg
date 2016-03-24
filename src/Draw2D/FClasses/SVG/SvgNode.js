/**
 * Draw2D.svg : SVGNode
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

SVGNode.prototype = new Rect();

function SVGNode() {
        var argv = SVGNode.arguments;
        var argc = SVGNode.length;
        this.className = "SVGNode";
        
        this.Node = null;

        this.initSVGNode();
    }

SVGNode.prototype.initSVGNode = function(Node) {
        
        if (Node != undefined) 
        	this.Node = Node;
        else 
        	this.Node = null;

        this.parentNode = null;
        this.cursorType = null;
    }

SVGNode.prototype.setId = function(val) {
        return this.setAttribute('id', val);
    }

SVGNode.prototype.getId = function() {
        return this.getAttribute('id');
    }

SVGNode.prototype.getNode = function() {
        return this.Node;
    }

SVGNode.prototype.setNode = function(Node) {
        this.Node = Node;
    }

SVGNode.prototype.hasAttribute = function(attr) {
        if (this.Node == null) return false;
        return this.Node.hasAttribute(attr);
        //return this.Node.hasAttributeNS("http://www.w3.org/2000/svg",attr);
    }

SVGNode.prototype.setAttribute = function(attr, val) {
        if (this.Node == null) return false;
        this.Node.setAttribute(attr, val);
        //this.Node.setAttributeNS("http://www.w3.org/2000/svg",attr,val);
        return true;
    }

SVGNode.prototype.getAttribute = function(attr) {
        if (this.Node == null) return null;
        return this.Node.getAttribute(attr);
        //return this.Node.getAttributeNS("http://www.w3.org/2000/svg",attr);
    }

SVGNode.prototype.removeAttribute = function(attr) {
        if (this.Node == null) return null;
        return this.Node.removeAttribute(attr);
    }

SVGNode.prototype.addEventListener = function(eventType, function_name, useCapture) {
        
        if (this.Node == null) 
        	return false;

        this.Node.addEventListener(eventType, function_name, useCapture);
        return true;
    }

SVGNode.prototype.removeEventListener = function(eventType, function_name, useCapture) {
        if (this.Node == null) 
        	return false;

        this.Node.removeEventListener(eventType, function_name, useCapture);
        return true;
    }

SVGNode.prototype.setVisibility = function(flag) {
        if (flag)
            this.setAttribute('visibility', "visible");
        else
            this.setAttribute('visibility', "hidden");
    }

SVGNode.prototype.getVisibility = function() {
        if (this.getAttribute('visibility') == "visible") return true;
        return false;
    }

SVGNode.prototype.setOpacity = function(op) {
        this.setAttribute('opacity', op);
    }

SVGNode.prototype.getOpacity = function() {
        return this.getAttribute('opacity');
    }

SVGNode.prototype.addChild = function(node) {
        if (node.getNode != undefined) 
        	node = node.getNode();
        if (this.Node != null && this.Node.addChild == undefined) 
        	this.Node.appendChild(node);
        else this.Node.addChild(node); // <= does not work with older plug-in (ver 3)
    }

SVGNode.prototype.setParent = function( /* SVGNode or SvgElement */ parentNode) {
        if (parentNode != undefined && parentNode != null)
            if (parentNode.getNode != undefined && this.getNode != undefined)
                parentNode.getNode().appendChild(this.getNode());
            else
                parentNode.appendChild(this.getNode());
    }

SVGNode.prototype.dispose = function() {
        if (this.Node == null) return null;
        cv_removeAllEventListeners(this);
        var ret = deleteSVGNode(this.Node);
        this.Node = null;
        return ret;
        //delete this;
    }

SVGNode.prototype.setCursor = function(cursor) {
				// Summary:
				// 
				// setCursor: this feature does not work on Batik,..only ASV6 

				// auto :The UA determines the cursor to display based on the current context. 
				// crosshair :A simple crosshair (e.g., short line segments resembling a "+" sign). 
				// default :The platform-dependent default cursor. Often rendered as an arrow. 
				// pointer : The cursor is a pointer that indicates a link. 
				// move : Indicates something is to be moved. 
				// e-resize, ne-resize, nw-resize, n-resize, se-resize, sw-resize, 
				// s-resize, w-resize : 
				// Indicate that some edge is to be moved. For example, the 'se-resize' 
				// cursor is used when the movement starts from the south-east corner of 
				// the box. 
				// text : Indicates text that can be selected. Often rendered as an I-bar. 
				// wait : Indicates that the program is busy. Often rendered as a watch or 
				// hourglass. 
				// help : Help is available for the object under the cursor. Often rendered 
				// as a question mark or a balloon. 
				// <uri> : The user agent retrieves the cursor from the resource designated 
				// by the URI. If the user agent cannot handle the first cursor of a list of cursors, it shall attempt to handle the second, etc. If the user agent cannot handle any user-defined cursor, it must use the generic cursor at the end of the list. 
				// P { cursor : url("mything.cur"), url("second.csr"), text; }
        this.cursorType = cursor;
        
        if (viewerMode == Batik) return;
        if (!cursor || cursor == null) return;
        
        // Check to see if this is an Cursor object!
        if (cursor instanceof Cursor)
            this.setAttribute('cursor', 'url(#' + cursor.getId() + ')');
        else
            this.setAttribute('cursor', cursor); // ex. shp.setCursor('crosshair');
    }

SVGNode.prototype.getCursor = function() {
        return this.cursorType;
    }

SVGNode.prototype.setToolTipText = function(text) {
        tp_setToolTipText(text, this);
    }

SVGNode.prototype.changeToolTipText = function(text) {
				// Summary:
				// Change the displayed text by delete the old one and creating a new one.
        tp_disposeToolTipNode();
        tp_setToolTipText(text, this);
    }

SVGNode.prototype.toString = function() {
    return (printNode(this.getNode()));
}