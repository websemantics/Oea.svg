/**
 * Draw2D.svg : Node
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/node
 */

/**
 * Class Node
 *
 */

Node.prototype = new RectNode();

function Node(x, y, w, h, r, s) {
        var argv = Node.arguments;
        var argc = Node.length;
    		this.className = "Node";
				
				// Some would need to set this to false before enable/disable SVG events!
        this.useCapture = true; 

        if (argv.length == 0) 
        	this.initNode(0, 0, 0, 0, 0, 1);
        else 
        	this.initNode(x, y, w, h, r, s);
    }

Node.prototype.initNode = function(x, y, w, h, r, s) {
        this.initRectNode(x, y, w, h, r, s);
        
        // Objects can add internal observers/methods to listen on an event,..
        this.internalEventsListeners = new Array();
        this.internalEventsListeners["mousedown"] = new Array();
        this.internalEventsListeners["mouseup"] = new Array();
        this.internalEventsListeners["mouseout"] = new Array();
        this.internalEventsListeners["mouseover"] = new Array();
        this.internalEventsListeners["mousemove"] = new Array();
        this.internalEventsListeners["clcik"] = new Array();
        this.internalEventsListeners["keydown"] = new Array();
        this.internalEventsListeners["keyup"] = new Array();
        this.internalEventsListeners["keypress"] = new Array();
    }

Node.prototype.addInternalEventListener = function(eventType, method) {
				// Summary:
				// 
				// Since no real inheritance is supported in Javascript, 
				// those method will allow to have multiple events handlers
				// for any subclass of type Node (this) [each subclass will have
				// its own events handling methods for any eventType],..
				// 
				// All events are local to the object ['real' svg event listeners 
				// attached to this.Node attribute]  
				
        var iel = this.internalEventsListeners[eventType];
        var last = iel.length;
        // Check if this is the first listener to the event then add 'real' svg event listener to DOM 
        if (last == 0) this.addEventListener(eventType, this, this.useCapture);
        iel[last] = method;
    }

Node.prototype.removeInternalEventListener = function(eventType, method) {
        
        var iel = this.internalEventsListeners[eventType];
        
        // remove the 'real' svg event listener if there is no more internal listeners!
        var noMorelisteners = true;
        for (i in iel) {
            if (iel[i] == method) iel[i] = null;
            if (iel[i] != null) noMorelisteners = false;
        }
        if (noMorelisteners) this.removeEventListener(eventType, this, this.useCapture);
    }

Node.prototype.addGlobalEventListener = function(eventType, callbackMethod) {
				// Summary:
				// 
				// The object can listen to all global events through the Desktop
				// For instance if we add a listener to the 'global' mousemove event
				// we will be acknowledged whenever the mouse moves, supplied with the 
				// mouse location and other information as long as the mouse pointer
				// is on top of the svg document.mouseout event will be triggered every
				// time the mouse is out of an svg node [filled area].
				// 
				// * Subclasses of this (Node) could only have one Global Event Listener
				// unlike Internal Listener mechanism!! [that may change in future]
				// 
				// * Attribute id has to be set before using this method,..
        ds_addEventListener(this, eventType, callbackMethod);
    }

Node.prototype.removeGlobalEventListener = function(eventType) {
        ds_removeEventListener(this, eventType);
    }
    
Node.prototype.handleEvent = function(evt) {
        // evt.stopPropagation(); // <--- Stop bubbling!!
        // example: iel = internalEventsListeners["mousedown"]
        var iel = this.internalEventsListeners[evt.type];
        // iel[counter] is the cell that saves the method name => this[""method"](evt)
        for (i in iel)
            if (iel[i] && iel[i] != null) this[iel[i]](evt);
    }

Node.prototype.enableSVGMouseEvents = function(up, down, move, over, out, click) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 
        if (up) this.addEventListener("mouseup", this, this.useCapture);
        if (down) this.addEventListener("mousedown", this, this.useCapture);
        if (move) this.addEventListener("mousemove", this, this.useCapture);
        if (over) this.addEventListener("mouseover", this, this.useCapture);
        if (out) this.addEventListener("mouseout", this, this.useCapture);
        if (click) this.addEventListener("click", this, this.useCapture);
    }

Node.prototype.disableSVGMouseEvents = function(up, down, move, over, out, click) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 
        if (up) this.removeEventListener("mouseup", this, this.useCapture);
        if (down) this.removeEventListener("mousedown", this, this.useCapture);
        if (move) this.removeEventListener("mousemove", this, this.useCapture);
        if (over) this.removeEventListener("mouseover", this, this.useCapture);
        if (out) this.removeEventListener("mouseout", this, this.useCapture);
        if (click) this.removeEventListener("click", this, this.useCapture);
    }

Node.prototype.enableSVGKeyEvents = function(up, down, press) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 

        // Key Events are not supported by Adobe Plugin
        if (up) this.addEventListener("keyup", this, this.useCapture);
        if (down) this.addEventListener("keydown", this, this.useCapture);
        if (press) this.addEventListener("keypress", this, this.useCapture);
    }

Node.prototype.disableSVGKeyEvents = function(up, down, press) {
				// Warning:
				// [DON'T USE] use removeInternalEventListener instead

        // Key Events are not supported by Adobe Plugin
        if (up) this.removeEventListener("keyup", this, this.useCapture);
        if (down) this.removeEventListener("keydown", this, this.useCapture);
        if (press) this.removeEventListener("keypress", this, this.useCapture);
    }

Node.prototype.enableAllMouseEvents = function() {
				// Warning:
				// [DON'T USE]
        this.enableSVGMouseEvents(true, true, true, true, true, true);
    }
    
Node.prototype.disableAllMouseEvents = function() {
				// Warning:
				// [DON'T USE]
		    this.disableSVGMouseEvents(true, true, true, true, true, true);
		}