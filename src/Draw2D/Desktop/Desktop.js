/**
 * Draw2D.svg : Desktop
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     23rd Sept 2004
 * @package   websemantics/oea/draw2d.svg
 */

var desktop;

/*
 * Internal Desktop APIs:
 *
 */

function ds_initDesktop() {
        desktop = new Desktop();
    }

function ds_getDesktop() {
        return desktop;
    }

function ds_addEventListener(node, eventType, callback) { 
        if (desktop != null)
            desktop.registerNode(node, eventType, callback);
    }

function ds_removeEventListener(node, eventType) {
        if (desktop != null)
            desktop.unregisterNode(node, eventType);
    }

function cv_removeAllEventListeners(node) {
        if (desktop != null)
            desktop.unregisterNodeFromAll(node);
    }

function ds_handleKey(evt) {
    // Summary:
    // Because key listeners do not work with AVS then we used the attributes approach
    // then this function routes it back to the desktop object for processing.
    desktop.processEvents(evt);
}

/**
 * Class Desktop
 * 
 * @param int x Coordinate X
 * @param int y Coordinate Y
 * @param Shape shape 
 */

function Desktop() {
        var argv = Desktop.arguments;
        var argc = Desktop.length;
        this.className = "Desktop";

        /* object */
        this.draggedObject = null;
        this.init();
    }

Desktop.prototype.init = function() {
        // For registered objects to route out global events,.. [it only makes sence to route out mousemove event to other objects since it's useful to tract the mouse while it is moving over the svg document]
        /* array */
        this.eventListeners = new Array();
        /* Vector */
        this.eventListeners["mousedown"] = new Vector();
        /* Vector */
        this.eventListeners["mouseup"] = new Vector();
        /* Vector */
        this.eventListeners["click"] = new Vector();
        /* Vector */
        this.eventListeners["mouseout"] = new Vector();
        /* Vector */
        this.eventListeners["mouseover"] = new Vector();
        /* Vector */
        this.eventListeners["mousemove"] = new Vector();
        /* Vector */
        this.eventListeners["keydown"] = new Vector();
        /* Vector */
        this.eventListeners["keyup"] = new Vector();
        /* Vector */
        this.eventListeners["keypress"] = new Vector();
        // The Graphics Object of the Desktop
        this.g = new Graphics(-32767, -32767, 65535, 65535, "desktop");
        //this.g=new Graphics(0,0,innerWidth,innerHeight,"desktop");
        this.g.setBackground("white");
        var svg = svgDocument.documentElement;
        //
        // Enable svg events to the graphics object of the desktop
        //
        // Phases of SVG mouse events:
        // ===========================
        // Phase 1:  If the last argument of addEventListener is TRUE the event handler 
        //           is set for the capturing phase [ from the root of the document down to the target]
        // Phase 3:  if it is set to FALSE, the event handler is set for the bubbling 
        //           phase [ form the target up to the document root]
        // 
        // More info : http://www.quirksmode.org/js/events_order.html
        svg.addEventListener("mousedown", this, true);
        svg.addEventListener("mouseover", this, true);
        svg.addEventListener("mouseup", this, true);
        svg.addEventListener("click", this, true);
        svg.addEventListener("mouseout", this, true);
        svg.addEventListener("mousemove", this, true);
        if (viewerMode == ASV) { // Adobe mode
            svg.setAttribute("onkeydown", "ds_handleKey(evt);");
            svg.setAttribute("onkeyup", "ds_handleKey(evt);");
            svg.setAttribute("onkeypress", "ds_handleKey(evt);");
        } else { // Batik mode
            svg.addEventListener("keydown", this, true);
            svg.addEventListener("keyup", this, true);
            svg.addEventListener("keypress", this, true);
        }
        this.processEvents = this.defaultProcessEvents;
    }

Desktop.prototype.getGraphics = function() {
        if (this.g && this.g != null) return this.g;
        return null;
    }

Desktop.prototype.setColor = function(color) {
        this.g.setBackground(color);
    }

Desktop.prototype.setVisibility = function(flag) {
        this.g.setVisibility(flag);
    }

Desktop.prototype.registerNode = function(node, eventType, callback) {
  // Summary:
  // Register Node: Allows Javascript object to recieve Desktop events,..

        if (eventType != "click" && eventType != "mousedown" && eventType != "mouseover" && eventType != "mouseup" && eventType != "mouseout" && eventType != "mousemove" && eventType != "keydown" && eventType != "keyup" && eventType != "keypress") return false;
        this.eventListeners[eventType].addElement(new Node_Callback(node, callback));
        return true;
    }

Desktop.prototype.unregisterNodeFromAll = function(node) {
  // Summary:
  // Unregister Node from all events
        this.unregisterNode(node, "click");
        this.unregisterNode(node, "mousedown");
        this.unregisterNode(node, "mouseover");
        this.unregisterNode(node, "mouseup");
        this.unregisterNode(node, "mouseout");
        this.unregisterNode(node, "mousemove");
        this.unregisterNode(node, "keydown");
        this.unregisterNode(node, "keyup");
        this.unregisterNode(node, "keypress");
    }

Desktop.prototype.unregisterNode = function(node, eventType) {
  // Summary:
  // Unregister Node : Stop Javascript object receiving events from the Desktop

        if (eventType != "click" && eventType != "mousedown" && eventType != "mouseover" && eventType != "mouseup" && eventType != "mouseout" && eventType != "mousemove" && eventType != "keydown" && eventType != "keyup" && eventType != "keypress") return false;

        if (this.eventListeners != null) {
            var k = new Enumerator(this.eventListeners[eventType]);
            while (k.hasMoreElements()) {
                var nc = k.nextElement();
                if (nc.node == node) this.eventListeners[eventType].removeElement(nc);
            }
        }
        return true;
    }

Desktop.prototype.handleEvent = function(evt) {
        this.processEvents(evt);
    }

Desktop.prototype.processEvents = function(evt) {}

Desktop.prototype.defaultProcessEvents = function(evt) {

        var v = this.eventListeners[evt.type];
        var s = v.size();

        for (var i = 0; i < s; i++) {
            var nc = v.elementAt(i);
            nc.invokeCallback(evt);
        }

    }

Desktop.prototype.draggModeProcessEvents = function(evt) {
        evt.stopPropagation();
        this.draggedObject.dragModeEventHandler(evt);
    }

Desktop.prototype.startDragMode = function( /* object */ obj) {
        var svg = svgDocument.documentElement;
        // Listen only to mousemove and mouseup
        svg.removeEventListener("mousedown", this, true);
        svg.removeEventListener("mouseover", this, true);
        svg.removeEventListener("mouseout", this, true);
        svg.removeEventListener("click", this, true);
        //
        this.processEvents = this.draggModeProcessEvents;
        this.draggedObject = obj;
    }

Desktop.prototype.endDragMode = function() {
        var svg = svgDocument.documentElement;
        // Listen to all 
        svg.addEventListener("mousedown", this, true);
        svg.addEventListener("mouseover", this, true);
        svg.addEventListener("mouseout", this, true);
        svg.addEventListener("click", this, true);
        //
        this.processEvents = this.defaultProcessEvents;
        this.draggedObject = null;
    }

Desktop.prototype.toString = function() {
        return "svgDraw2D:Desktop";
    }

/**
 * Class Node_Callback
 *
 * Used to save pair of node / callback function 
 *
 * @param Dom node
 * @param Function callback
 */

function Node_Callback(node, callback) {
        this.node = node;
        this.callback = callback;
    }

Node_Callback.prototype.invokeCallback = function(evt) {
        this.node[this.callback](evt);
    }

Node_Callback.prototype.toString = function() {
        return "(Node:" + this.node + ", Callback:" + this.callback + ")";
    }
