/**
 * Swing.svg : Container
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     13th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class Container
 *
 *  Comments: 
 *  --------
 *  To control the Context Menu of ASV,.. The algorithm used
 *  is that when the mouse is pressed the context menu gets deleted and and 
 *  but then restored when it is released. existed or end dragged. 
 *  Known bug,.. when zoom/pan using keyboard the context menu might come back.
 *
 */

Container.prototype = new Canvas();

function Container( /* String */ name) {
        var argv = Container.arguments;
        var argc = Container.length;

        /* String */
        this.name = "Container";
        /* String */
        this.className = "Container";
        /* Vector */
        this.children = null;
        /* Layout */
        this.layout = null;
        /* int */
        this.pressX = 0;
        /* int */
        this.pressY = 0;
        /* menu */
        this.oldContextMenu = null;
        /* Component */
        this.draggOwner == null;
        /* Component */
        this.moveOwner == null;
        /* String */
        this.containerCursor = null;

        if (argv.length > 0) 
          this.initContainer(name);
    }

Container.prototype.initContainer = function(x, y, w, h, name) {
        this.initCanvas(x, y, w, h, name);
        // The container handles its own events
        this.addInternalMouseMotionListener(mouseStartDragged, "econtMouseStartDragged");
        this.addInternalMouseMotionListener(mouseEndDragged, "econtMouseEndDragged");
        this.addInternalMouseMotionListener(mouseDragged, "econtMouseDragged");
        this.addInternalMouseMotionListener(mouseMoved, "econtMouseMoved");
        this.addInternalMouseMotionListener(mousePressed, "econtMousePressed");
        this.addInternalMouseMotionListener(mouseReleased, "econtMouseReleased");
        this.addInternalMouseMotionListener(mouseClicked, "econtMouseClicked");
        this.addInternalMouseMotionListener(mouseEntered, "econtMouseEntered");
        this.addInternalMouseMotionListener(mouseExited, "econtMouseExited");
    }

Container.prototype.createSVGContent = function() {
        this.createSVGContentContainer();
    }

Container.prototype.createSVGContentContainer = function() {
        this.createSVGContentCanvas();
    }

Container.prototype.paintChildren = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().paint(g);
        }
        this.layoutChildren();
    }

Container.prototype.paint = function( /* Graphics */ g) {
        this.paintContainer(g);
    }

Container.prototype.paintContainer = function( /* Graphics */ g) {
        this.paintCanvas(g);
    }

Container.prototype.layoutChildren = function() {
        if (this.children != null && this.getLayout() != null)
            this.getLayout().layoutContainer(this);
    }

Container.prototype.recalc = function() {
        this.recalcContainer();
    }

Container.prototype.recalcContainer = function() {
    // Summary:
    //  recalc all the contained components

        this.recalcCanvas();
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().recalc();
        }
        this.layoutChildren();
    }

Container.prototype.onResize = function() {
        this.onResizeContainer();
    }

Container.prototype.onResizeContainer = function() {
        this.onResizeCanvas();

        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().onResize();
        }
        this.layoutChildren();
    }

Container.prototype.onMove = function() {
        this.onMoveContainer();
    }

Container.prototype.onMoveContainer = function() {
        this.onMoveCanvas();
    }

Container.prototype.setLayout = function( /* Layout */ manager) {
        this.layout = manager;
    }

Container.prototype.getLayout = function() {
        return this.layout;
    }

Container.prototype.add = function( /* Component */ d) {
    // Summary:
    // Adds a component to the list of cmponents. 

        return this.addContainer(d);
    }

Container.prototype.addContainer = function( /* Component */ d) {

        if (this.children == null)
            this.children = new Vector();
        if (!this.children.contains(d)) {
            this.children.addElement(d);
            d.setParent(this);
        }
        return d;
    }

Container.prototype.remove = function( /* Component */ d) {
    // Summary:
    // Removes a component from the container.
        return this.removeContainer(d);
    }

Container.prototype.removeContainer = function( /* Component */ d) {
        if (this.children != null && this.children.contains(d)) {
            d.setParent(null);
            this.children.removeElement(d);
        }
        return d;
    }

Container.prototype.sendToBack = function( /* Component */ d) {
    // Summary:
    // Sends a component to the back.

        if (this.children != null && this.children.contains(d)) {
            this.children.removeElement(d);
            this.children.insertElementAt(d, 0);
        }
    }

Container.prototype.bringToFront = function( /* Component */ d) {
    // Summary:
    // Brings a component to the front.

        if (this.children != null && this.children.contains(d)) {
            this.children.removeElement(d);
            this.children.addElement(d);
        }
    }

Container.prototype.componentAt = function(i) {
    // Summary:
    // Gets a component at the given index.

        if (this.children != null) return this.children.elementAt(i);
        else return null;
    }

Container.prototype.components = function() {
    // Summary:
    // Returns an Enumeration for accessing the contained components.
    // The components are returned in the drawing order.

        if (this.children != null) return new Enumerator(this.children);
        else return null;
    }

Container.prototype.componentCount = function() {
    // Summary:
    // Gets number of child figures.

        if (this.children != null) return this.children.size();
        else return null;
    }

Container.prototype.componentsReverse = function() {
    // Summary:
    // Returns an Enumeration for accessing the contained components in the reverse drawing order.

        if (this.children != null) return new ReverseEnumerator(this.children);
        else return null;
    }

Container.prototype.findComponent = function(x, y) {
    // Summary:
    // Finds a top level component. Use this call for hit detection that should not 
    // descend into the figure's children.

        /* Enumeration */
        var k = this.componentsReverse();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var d = k.nextElement();
            /* gRectangle */
            var r = new gRectangle(d.x, d.y, d.getWidth(), d.getHeight());
            if (r.contains(x, y)) return d;
        }
        return null;
    }

Container.prototype.getComponentAt = function(x, y) {
    // Summary :
    //  Return only components that have active=true

        return this.findComponent(x, y);
    }

Container.prototype.findComponentInside = function(x, y) {
    // Summary :
    // Finds a component but descends into a component's children. Use this method to implement 
    // click-through hit detection, that is, you want to detect the inner most component 
    // containing the given point.

        /* Enumeration */
        var k = this.componentsReverse();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var d = k.nextElement().findComponentInside(x, y);
            if (d != null) return d;
        }
        return null;
    }

Container.prototype.includes = function( /* Component */ d) {
    // Summary :
    // Checks if the container has the argument as one of its children.

        /* Enumeration */
        var k = this.components();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var f = k.nextElement();
            if (f.includes(d)) return true;
        }
        return false;
    }

Container.prototype.isEventable = function( /* Component */ d) {
        return d != null && d.isEnabled();
    }

Container.prototype.econtMouseStartDragged = function( /* MouseEvent */ e) {

        tp_turnToolTipOff(); // <===[ Turn the Tooltip off ]

        this.pressX = e.getX();
        this.pressY = e.getY();
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) {
            this.draggOwner = d;
            this.moveOwner = null;
            this.fireMouseMotionEventToComponent(d, "mouseStartDragged", e);
        }
    }

Container.prototype.econtMouseEndDragged = function( /* MouseEvent */ e) {

        tp_turnToolTipOn(); // <======[ Turn the Tooltip on]

        if (this.draggOwner != null) {
            this.fireMouseMotionEventToComponent(this.draggOwner, "mouseEndDragged", e);
            this.draggOwner = null;
        } else this.mouseEventHandler("mouseReleased", e);
    }

Container.prototype.econtMouseDragged = function( /* MouseEvent */ e) {

        if (this.draggOwner != null) {
            this.fireMouseMotionEventToComponent(this.draggOwner, "mouseDragged", e);
        }
        // else this.mouseMotionEventHandler("mouseMoved",e);
    }

Container.prototype.econtMouseMoved = function( /* MouseEvent */ e) {
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.moveOwner != null) {
            if (d != this.moveOwner) {
                var old = this.moveOwner;
                this.moveOwner = null;
                this.fireMouseEventToComponent(old, "mouseExited", e);

                if (this.isEventable(d)) {
                    this.moveOwner = d;
                    this.fireMouseEventToComponent(d, "mouseEntered", e);
                }
            } else if (this.isEventable(d)) this.fireMouseMotionEventToComponent(d, "mouseMoved", e);
        } else
        if (this.isEventable(d)) {
            this.moveOwner = d;
            this.fireMouseEventToComponent(d, "mouseEntered", e);
        }
    }

Container.prototype.econtMouseEntered = function( /* MouseEvent */ e) {
        if (this.draggOwner == null) {
            d = this.getComponentAt(e.getX(), e.getY());
            if (this.isEventable(d)) {
                this.moveOwner = d;
                this.fireMouseEventToComponent(d, "mouseEntered", e);
            }
        }
    }

Container.prototype.econtMouseExited = function( /* MouseEvent */ e) {
        
        if (this.moveOwner != null && this.draggOwner == null) {
            d = this.moveOwner;
            this.moveOwner = null;
            this.fireMouseEventToComponent(d, "mouseExited", e);
        }
    }

Container.prototype.econtMouseClicked = function( /* MouseEvent */ e) {
        this.pressX = e.getX();
        this.pressY = e.getY();
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mouseClicked", e);
    }

Container.prototype.econtMousePressed = function( /* MouseEvent */ e) {

        var d = this.getComponentAt(e.getX(), e.getY());

        /* Point */
        var p = this.getAbsoluteLocation();

        // PopUpMenu
        if (e.getButton() == BUTTON2) {
            var popUpMenu = null;
            var x = p.x + e.getX() + 5;
            var y = p.y + e.getY() + 5;
            // Display the PopUp Menu of the component d (d is not a container)
            if (d != null && d.popUpMenu != null && !d.initContainer)
                popUpMenu = d.popUpMenu;
            else if (this.popUpMenu != null) // Else, display the PopUp Menu of the container
                popUpMenu = this.popUpMenu;

            if (popUpMenu != null) {
                var w = popUpMenu.getWidth();
                var h = popUpMenu.getHeight();
                if (x + w > innerWidth) x = innerWidth - w;
                if (y + h > innerHeight) y = innerHeight - h;
                popUpMenu.translate(x, y);
                popUpMenu.show();
            }

        }

        this.pressX = e.getX();
        this.pressY = e.getY();
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mousePressed", e);
    }

Container.prototype.econtMouseReleased = function( /* MouseEvent */ e) {
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mouseReleased", e);
    }

Container.prototype.fireMouseEventToComponent = function( /* component */ comp, eventType, /* MouseEvent */ event) {
        // The x and y of the event starts from 0 and 0
        event.translatePoint(-comp.x, -comp.y);
        // Display the Tooltip of the component and change the mouse shape to the component mouse cursor 
        if (eventType == "mouseEntered") {
            var ttext = comp.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            this.containerCursor = this.getCursor();
            var cursor = comp.getCursor();
            if (cursor != null)
                this.setCursor(cursor);
        }
        // Display the Tooltip of the container and change the mouse shape to the container mouse cursor 
        if (eventType == "mouseExited") {
            var ttext = this.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            else this.removeToolTipText();
            if (this.containerCursor != null)
                this.setCursor(this.containerCursor);
            else
                this.setCursor("default");
        }

        comp.mouseEventHandler(eventType, event);
    }

Container.prototype.fireMouseMotionEventToComponent = function( /* component */ comp, eventType, /* MouseEvent */ event) {
        // The x and y of the event starts from 0 and 0
        event.translatePoint(-comp.x, -comp.y);
        // Display the Tooltip of the container and change the mouse shape to the container mouse cursor 
        if (eventType == "mouseEndDragged") {
            var ttext = this.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            else this.removeToolTipText();
            if (this.containerCursor != null)
                this.setCursor(this.containerCursor);
            else
                this.setCursor("default");
        }

        comp.mouseMotionEventHandler(eventType, event);
    }