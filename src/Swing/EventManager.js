/**
 * Swing.svg : EventManager
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Febuary 2005
 * @package   websemantics/oea/swing.svg
 */

EventManager.prototype= new ListenerManager(); 

function EventManager() {
        var argv = EventManager.arguments;
        var argc = EventManager.length;
        /* String */
        this.className = "EventManager";
        /* String */
        this.name = "EventManager";
        /* int */
        this.mouseState = null; // "mouseup", "mousedown", "mousemove", "keyup",...etc 
        /* function */
        this.processMouseMotionEvent = null;
        /* function */
        this.processMouseEvent = null;

        if (argv.length > 0) 
        	this.initEventManager();
    }

EventManager.prototype.initEventManager = function() {
        this.processMouseMotionEvent = this.emptyProcessEvent;
        this.processMouseEvent = this.emptyProcessEvent;
    }

EventManager.prototype.handleEvent = function(evt) {
    // Summary: [ overridden from Node class ]
    // Here: svg low-level events are converted to mouse motion and mouse events,...
        if (this[evt.type] != undefined) this[evt.type](evt);
        this.mouseState = evt.type;
    }

//*************
//  key and mouse individual handleEvent methods for all events
//*************

EventManager.prototype.mousedown = function(evt) {
    this.processMouseEvent("mousePressed", evt);
}
EventManager.prototype.click = function(evt) {
    this.processMouseEvent("mouseClicked", evt);
}
EventManager.prototype.mouseup = function(evt) {
    this.processMouseEvent("mouseReleased", evt);
}
EventManager.prototype.mouseover = function(evt) {
    this.processMouseEvent("mouseEntered", evt);
}
EventManager.prototype.mouseout = function(evt) {
    this.processMouseEvent("mouseExited", evt);
}
EventManager.prototype.keyup = function(evt) {
    this.processKeyEvent("keyReleased", evt);
}
EventManager.prototype.keydown = function(evt) {
    this.processKeyEvent("keyPressed", evt);
}
EventManager.prototype.keypress = function(evt) {
    this.processKeyEvent("keyTyped", evt);
}
EventManager.prototype.mousemove = function(evt) {
        if (this.mouseState == "mousedown") {
            this.processMouseMotionEvent("mouseStartDragged", evt);
            ds_getDesktop().startDragMode(this);
        } else
            this.processMouseMotionEvent("mouseMoved", evt);
    }

EventManager.prototype.dragModeEventHandler = function(evt) {
    // Summary: 
    // 
    // [This is used to handle the drag mode of the component, 
    // this method is called by desktop]
    // 
    // In dragg mode,...the desktop only captures mousemove and mouseup,..
    // The desktop calls this method and this method routes the call to either 
    // draggmodemousemove or draggmodemouseup

        if (this["draggmode" + evt.type]) this["draggmode" + evt.type](evt);
    }

EventManager.prototype.draggmodemousemove = function(evt) {
    this.processMouseMotionEvent("mouseDragged", evt);
    this.mouseState = evt.type;
}

EventManager.prototype.draggmodemouseup = function(evt) {
        ds_getDesktop().endDragMode();
        this.processMouseMotionEvent("mouseEndDragged", evt);
        this.mouseState = evt.type;
    }

EventManager.prototype.processKeyEvent = function(awtEventType, evt) {
    // Summary : 
    // Multicast events to listeners after processing,...
    // convert from svg event to awt event,..

        this.keyEventHandler(awtEventType, new KeyEvent(this, evt));
    }

EventManager.prototype.emptyProcessEvent = function(awtEventType, evt) {
        // DO NOTHING 
    }

EventManager.prototype.defaultProcessMouseMotionEvent = function(awtEventType, evt) {
    // Summary : 
    // For mouse motion events,
    // Pass control to ListenerManager after processing,..
		// http://pilat.free.fr/asv6/
	
        if (this.getNode() == null) return;

        var matrix;

        if (this.isHidden != undefined && this.isHidden()) {
            this.show();
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));
            this.hide();
        } else
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));

        x = matrix.inverse().a * evt.clientX + matrix.inverse().c * evt.clientY + matrix.inverse().e;
        y = matrix.inverse().b * evt.clientX + matrix.inverse().d * evt.clientY + matrix.inverse().f;

        this.mouseMotionEventHandler(awtEventType, new MouseEvent(this, evt, x, y));
    }

EventManager.prototype.defaultProcessMouseEvent = function(awtEventType, evt) {
    // Summary :  
    // For mouse events ,
    // Pass control to ListenerManager after processing,..
		// http://pilat.free.fr/asv6/
		
        if (this.getNode() == null) return;

        var matrix;

        if (this.isHidden != undefined && this.isHidden()) {
            this.show();
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));
            this.hide();
        } else
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));

        x = matrix.inverse().a * evt.clientX + matrix.inverse().c * evt.clientY + matrix.inverse().e;
        y = matrix.inverse().b * evt.clientX + matrix.inverse().d * evt.clientY + matrix.inverse().f;

        this.mouseEventHandler(awtEventType, new MouseEvent(this, evt, x, y));
    }

EventManager.prototype.enableMouseListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve mouse events,....
    // use addMouseListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseEvent = this.defaultProcessMouseEvent;
        // Enable low-level svg events,.. those are: up, down, over and out
        this.enableSVGMouseEvents(true, true, false, true, true, true); // (up,down,move,over,out,click)
    }

EventManager.prototype.enableMouseMotionListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve motion events,....
    // use addMouseMotionListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseMotionEvent = this.defaultProcessMouseMotionEvent;
        // Enable low-level svg events,..those are: down and move,....(bug fix: and up, because your need that to change value of mouseState)
        if (this.processMouseEvent == this.emptyProcessEvent)
            this.enableSVGMouseEvents(true, true, true, false, false, false); // (up,down,move,over,out,click)
        else
            this.enableSVGMouseEvents(false, false, true, false, false, false); // (up,down,move,over,out,click)
    }

EventManager.prototype.enableKeyListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve key events,....
    // use addKeyListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        // Enable low-level svg key events,..those are: keyup, keydown and keypress
        this.enableSVGKeyEvents(true, true, true); // (up,down,press)
    }

EventManager.prototype.disableMouseListener = function(useCapture) {
        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseEvent = this.emptyProcessEvent;
        // Disable low-level svg events,.. those are: over and out and (up and down if motion listener is disabled)
        if (this.processMouseMotionEvent == this.emptyProcessEvent)
            this.disableSVGMouseEvents(true, true, false, true, true, true); // (up,down,move,over,out,click)
        else
            this.disableSVGMouseEvents(true, false, false, true, true, true); // (up,down,move,over,out,click)
    }

EventManager.prototype.disableMouseMotionListener = function(useCapture) {
        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseMotionEvent = this.emptyProcessEvent;
        // Disable low-level svg events,..those are: move and (up and down if mouse listener is disabled)
        if (this.processMouseEvent == this.emptyProcessEvent)
            this.disableSVGMouseEvents(true, true, true, false, false, true); // (up,down,move,over,out,click)
        else
            this.disableSVGMouseEvents(false, false, true, false, false, false); // (up,down,move,over,out,click)
    }

EventManager.prototype.disableKeyListener = function(useCapture) {
    if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
    // Disable low-level svg key events,..those are: keyup, keydown and keypress
    this.disableSVGKeyEvents(true, true, true); // (up,down,press)
}