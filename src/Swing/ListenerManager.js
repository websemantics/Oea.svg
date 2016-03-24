/**
 * Swing.svg : ListenerManager
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Febuary 2005
 * @package   websemantics/oea/swing.svg
 */

var mouseStartDragged="mouseStartDragged";
var mouseEndDragged="mouseEndDragged";
var mouseDragged="mouseDragged";
var mouseMoved="mouseMoved";
var mouseClicked="mouseClicked";
var mousePressed="mousePressed";
var mouseReleased="mouseReleased";
var mouseEntered="mouseEntered";
var mouseExited="mouseExited";
var keyTyped="keyTyped";
var keyPressed="keyPressed";
var keyReleased="keyReleased"; 

ListenerManager.prototype= new Node(); 

function ListenerManager() {
        /* String */
        this.className = "ListenerManager";
        /* String */
        this.name = "ListenerManager";

        // ListenerManagers can add internal 'methods' to listen on mouse motion events or basic mouse events,..
        /* array */
        this.intEventListeners = null; //								
        // External listeners on mouse motion events or basic mouse events,..
        /* Vector */
        this.extMouseMotionListeners = null;
        /* Vector */
        this.extMouseListeners = null;
        /* Vector */
        this.extKeyListeners = null;
    }

ListenerManager.prototype.initEventListenersBuffer = function() {
        if (this.intlEventListeners != null) return;
        /* array */
        this.intlEventListeners = new Array();
        /* Vector */
        this.intlEventListeners[mouseStartDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseEndDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseMoved] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseClicked] = new Vector();
        /* Vector */
        this.intlEventListeners[mousePressed] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseReleased] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseEntered] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseExited] = new Vector();
        /* Vector */
        this.intlEventListeners[keyTyped] = new Vector();
        /* Vector */
        this.intlEventListeners[keyPressed] = new Vector();
        /* Vector */
        this.intlEventListeners[keyReleased] = new Vector();
    }
    //**********************************************************
    // keyEventHandler : keyPressed. keyReleased and keyTyped
    //**********************************************************

ListenerManager.prototype.keyEventHandler = function( /* String */ awtEventType, /* KeyEvent */ event) {
        if (this.extKeyListeners == null) return false;

        // External listeners for key events
        var k = new Enumerator(this.extKeyListeners);
        while (k.hasMoreElements()) {
            /* Object */
            var f = k.nextElement();
            f[awtEventType](event);
        }
    }

ListenerManager.prototype.mouseMotionEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        this.listenerManagerMouseMotionEventHandler(awtEventType, event);
    }

ListenerManager.prototype.mouseEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        this.listenerManagerMouseEventHandler(awtEventType, event);
    }

ListenerManager.prototype.listenerManagerMouseMotionEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        if (this.extMouseMotionListeners != null) {
            // External Mouse Motion Events
            var k = new Enumerator(this.extMouseMotionListeners);
            while (k.hasMoreElements()) k.nextElement()[awtEventType](event);
        }
        this.internalEventHandler(awtEventType, event);
    }

ListenerManager.prototype.listenerManagerMouseEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        if (this.extMouseListeners != null) {
            // External Mouse Events
            var k = new Enumerator(this.extMouseListeners);
            while (k.hasMoreElements()) k.nextElement()[awtEventType](event);
        }
        this.internalEventHandler(awtEventType, event);
    }

ListenerManager.prototype.internalEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        // Internal listeners [call internal methods] 
        if (this.intlEventListeners != null) {
            var k = new Enumerator(this.intlEventListeners[awtEventType]);
            while (k.hasMoreElements()) this[k.nextElement()](event);
        }
    }
    //*****************************************************************
    //
    // Add internal event listener: 
    //
    // Since no real inheritance is support in Javascript, 
    //                   those method will allow to have multiple events handlers
    //                   for any subclass of type ListenerManager 
    //                   (this) [each subclass will have its own events handling 
    //                   methods for any event type],..
    //
    // type: mouseMoved, mouseDragged, mousePresses, mouseReleased, 
    //       mouseClicked, mouseEntered, mouseExited
    //       keyTyped, keyPressed and keyReleased 
    //*****************************************************************

    /* 1 : addInternalMouseMotionListener */
ListenerManager.prototype.addInternalMouseMotionListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    /* 2 : addInternalMouseListener */
ListenerManager.prototype.addInternalMouseListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    /* 3 : addInternalKeyListener */
ListenerManager.prototype.addInternalKeyListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    //***************************************
    // Remove internal event listener: 
    //***************************************
   
    /* 1 : removeInternalMouseMotionListener */
ListenerManager.prototype.removeInternalMouseMotionListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    /* 2 : removeInternalMouseListener */
ListenerManager.prototype.removeInternalMouseListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    /* 2 : removeInternalKeyListener */
ListenerManager.prototype.removeInternalKeyListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    //************************************************************************
    // Objects that want to register has to implement either 'motionListener' 
    // interface, 'mouseListerner' or 'keyListener' interface,.. 
    // Listen to all the events of a particular interface
    //************************************************************************
    
    /* 1: addMouseMotionListener */
ListenerManager.prototype.addMouseMotionListener = function( /* MouseMotionListener */ object) {
        if (this.extMouseMotionListeners == null) this.extMouseMotionListeners = new Vector();
        this.extMouseMotionListeners.addElement(object);
    }

    /* 2: addMouseListener */
ListenerManager.prototype.addMouseListener = function( /* MouseListener */ object) {
        if (this.extMouseListeners == null) this.extMouseListeners = new Vector();
        this.extMouseListeners.addElement(object);
    }

    /* 3: addKeyListener */
ListenerManager.prototype.addKeyListener = function( /* KeyListener */ object) {
        if (this.extKeyListeners == null) this.extKeyListeners = new Vector();
        this.extKeyListeners.addElement(object);
    }

    //*************************************
    // remove EventListener 
    //*************************************

    /* 1: removeMouseMotionListener */
ListenerManager.prototype.removeMouseMotionListener = function(object) {
        this.extMouseMotionListeners.removeElement(object);
    }

    /* 2: removeMouseListener */
ListenerManager.prototype.removeMouseListener = function(object) {
        this.extMouseListeners.removeElement(object);
    }

    /* 3: removeKeyListener */
ListenerManager.prototype.removeKeyListener = function(object) {
        this.extKeyListeners.removeElement(object);
    }

ListenerManager.prototype.mouseStartDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseEndDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseMoved = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseClicked = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mousePressed = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseReleased = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseEntered = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseExited = function( /* MouseEvent */ event) {}

ListenerManager.prototype.keyTyped = function( /* KeyEvent */ event) {}

ListenerManager.prototype.keyPressed = function( /* KeyEvent */ event) {}

ListenerManager.prototype.keyReleased = function( /* KeyEvent */ event) {}
