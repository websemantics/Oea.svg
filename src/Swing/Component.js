/**
 * Swing.svg : Component
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     30th January 2005 -> 15th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class Component
 *
 * Comment: Things to look for when the mouse cursor hovers on a component.
 *
 * [NEW] 1st May 2015
 * Support of Spinners (on loading!)
 * 
 * (1) Change the mouse cursor
 * (2) Display Tooltip
 * (3) Display Contextual Menu when Mouse Right Click
 */

var componentDefaultWidth = 200 ;
var componentDefaultHeight = 200;
var TOP_LEVEL = true ;
var LOW_LEVEL = false ;

/**
 * Class Counter
 *
 * Counter, used to generate ids for svgSwing components when they are created
 * 
 */

function Counter( /* int */ counter) {
        if (counter != undefined)
            this.counter = counter;
        else
            this.counter = 0;
    }

Counter.prototype.getNext = function() {
        return this.counter++;
    }

/**
 * Class Component
 *
 * Extends EventManager
 * 
 */

Component.prototype = new EventManager();

function Component(x, y, w, h, name) {
        var argv = Component.arguments;
        var argc = Component.length;
        /* String */
        this.className = "Component";
        /* String */
        this.name = "Component";

        //  ***************** [ IMPORTANT ] ********************************
        // Each widget type (i.e. button , window, etc) should have a counter that 
        // keeps track of the number available of that components of that type. 
        // It's also needed to refernce the name of the counter in counterName 
        // (i.e. bCounter for buttons)
       
        /* String */
        this.componentId = null; // Ex: Button_1, Window_10, Textbox_4, etc
        
        /* Array */
        this.counter = new Array(0); // An array of counters used to count different types of components
        
        // *****************************************************************
        
        /* int */
        this.x = 0;
        /* int */
        this.y = 0;
        /* int */
        this.w = 0;
        /* int */
        this.h = 0;
        /* int */
        this.left = 0; // Padding for left, right, top, bottom of a Component
        /* int */
        this.right = 0;
        /* int */
        this.top = 0;
        /* int */
        this.bottom = 0;
        /* Component */
        this.cParent = null; // The parent component, for TOP_LEVEL equal NULL		
        /* int */
        this.type = LOW_LEVEL; // Has two values : LOW_LEVEL or TOP_LEVEL
        /* Color */
        this.foreground = "black"; // Color used to draw the text for instance
        /* Color */
        this.background = "none"; // Background color
        /* Font */
        this.font = null; // Font used to draw text
        /* Cursor */
        this.cursor = null; // Cursor shape,.. text ,cross, hair,..etc
        /* boolean */
        this.visible = true;
        /* boolean */
        this.enabled = true;
        /* boolean */
        this.focusable = true;
        /* boolean */
        this.hasFocus = false;
        /* Dimension */
        this.minSize = null;
        /* Dimension */
        this.prefSize = null;
        /* Rectangle */
        this.GlassPane = null; // A transparent content covers the whole area of the component, used to trap mouse events
        /* boolean */
        this.created = false; // True of the svg content has been created (only once).
        /* boolean */
        this.absolutePosition = false; // if true the conponent can not be laied out!			
        /* Vector */
        this.actionListeners = null; // A list of action listeners				
        /* String */
        this.tooltipText = null; // The text displayed when the mouse hovers on the widget
        
        // ****************** [ popUp Menu ] *********************
        /* PopUpMenu */
        this.popUpMenu = null;
        
        // ****************** [ refernces to SVG content, in addintion to getNode() ] *********************
        /* Graphics */
        this.rootg = null;
        /* Graphics */
        this.g = null;
        /* Graphics */
        this.glassPaneg = null;

 		// Number of layered Graphics: children of content Graphics 'g'
        /* int */
        this.layeredGraphicsCount = 0;
				
		// A refernce to the Graphics that's used for the Tooltip (root or glass pane)
        /* Graphics */
        this.tooltipGraphics = null; 

        /* boolean */
        this.loading = true;
        this.spinner = null;
        
        if (argv.length > 0) 
        	this.initComponent(x, y, w, h, name);
    }

Component.prototype.initComponent = function(x, y, w, h, name) {
	
        this.font = new Font("Helvetica", "normal", "10pt");
        //this.font=new Font("Times New Roman","normal","14pt");
        this.initNode(x, y, w, h, 0, 1); // Args: x,y,w,h, rotate=0 and scale=1 
        this.setBounds(x, y, w, h);
        this.initEventManager();

        if (name != undefined) 
        	this.name = name;
        else 
        	name = this.getComponentId();

    }

Component.prototype.getComponentId = function() {
    // Summary: 
    // 	Returns a unique Id that starts with the component type (i.e. Button, Window, etc) and a number
    //   Ex: Button_1, Window_10, Textbox_4, etc

        // ex: this.counter["Lable"]++
        if (this.componentId == null) {
            if (this.counter[this.className] == undefined) this.counter[this.className] = 0;
            else this.counter[this.className]++;
            this.componentId = this.className + "_" + this.counter[this.className];
        }
        return this.componentId;
    }

Component.prototype.getAbsoluteLocation = function() {
    // Summary: 
    // getAbsoluteLocation: Get the x,y of this component absolute to the screen corner (0,0)

        var p = new Point(this.x, this.y);
        var node = this.cParent;

        while (node != null) {
            p.x += node.x;
            p.y += node.y;
            node = node.cParent;
        }

        return p;
    }

Component.prototype.addMenuItem = function( /* String */ text) {
        if (text == undefined || text == null) return;
        if (this.popUpMenu == null) {
            this.popUpMenu = new PopUpMenu(0, 0, 0, 0);
            this.popUpMenu.addActionListener(this);
        }
        this.popUpMenu.addTextItem(text);
    }

Component.prototype.addMenuSeparator = function() {
        if (this.popUpMenu == null) return;
        this.popUpMenu.addSeparator();
    }

Component.prototype.clipEdgesOn = function() {
        this.rootg.setClipOn();
    }

Component.prototype.clipEdgesOff = function() {
    // Summary: 
    // clipEdgesOff : Leave any content that falls outside the component boundaries uncut
        this.rootg.setClipOff();
    }

Component.prototype.glassPaneOn = function() {
    // Summary:
    // To capture mouse events and not to confuse the mouseout/over (mouseEntered, mouseExited) events.
    // Top-level subclass has to put the Glasspane on.
    // Make sure to transfer the tooltip to the glassPaneg

        this.glassPaneg.setBackground("#fff");
        this.glassPaneg.backgroundRect.setOpacity(0);
    }

Component.prototype.removeGlassPane = function() {
    // Summary:
    // removeGlassPane : 
    // Make sure to transfer the tooltip to the rootg

        this.glassPaneg.removeBackground();
    }

Component.prototype.showSpinner = function() {
    // Summary (new 1 may 2015)
    if(this.spinner == null)
        this.createSpinnerContent(this.glassPaneg);

    this.spinner.show();
}

Component.prototype.hideSpinner = function() {
    // Summary (new 1 may 2015)
    if(this.spinner)
        this.spinner.hide();
}

Component.prototype.createSpinner = function() {
    // Summary (new 1 may 2015)
    // Override to change the Spinner settings
    return new Spinner();
}

Component.prototype.createSpinnerContent = function(g) {
    // Summary (new 1 may 2015)
    // Override to change the Spinner settings
    if(this.spinner == null)
         this.spinner = this.createSpinner();

    var x = this.getWidth() / 2 || 0;
    var y = this.getHeight() / 2 || 0;

    return this.spinner.createSVGContent(x,y,g);
}

Component.prototype.inProgress = function(yes) {
    // Summary (new 1 may 2015)
    // Show/Hide the spinner
    if(yes){
        this.showSpinner();
        this.glassPaneg.backgroundRect.setOpacity(0.5);
    } else {
        this.hideSpinner();
        this.glassPaneg.backgroundRect.setOpacity(0);
    }
}

Component.prototype.getGraphics = function() {
    // Summary:
    // getGraphics : Create a layered Graphics that's a child of the 
    // Content Graphics, 'g'

        var g = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_LayeredGraphics_" + (this.layeredGraphicsCount++), this.g);
        g.setFont(this.getFont())
        g.setColor(this.foreground);
        return g;
    }

Component.prototype.setAbsolutePosition = function( /* boolean */ flag) {
        this.absolutePosition = flag;
    }

Component.prototype.addActionListener = function( /* ActionListener */ obj) {
        if (this.actionListeners == null) this.actionListeners = new Vector();
        if (!this.actionListeners.contains(obj))
            this.actionListeners.addElement(obj);
    }

Component.prototype.removeActionListener = function( /* ActionListener */ obj) {
        this.actionListeners.removeElement(obj);
    }

Component.prototype.setParent = function( /* Component */ parent) {
        this.cParent = parent;
    }

Component.prototype.getParent = function() {
        return this.cParent;
    }

Component.prototype.setBackground = function( /* Color */ background) {
        if (background != undefined)
            this.background = background;
        if (this.rootg)
            this.rootg.setBackground(background);
    }

Component.prototype.getBackground = function() {
	// Summary:
	// return 'none' if background color = null 
        return this.background;
        //return this.rootg.getBackground();
    }

Component.prototype.setInsets = function( /* int */ left, /* int */ right, /* int */ top, /* int */ bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        // if(this.created)
        //   this.recalc();
    }

Component.prototype.getInsets = function() {
        return new Insets(this.top, this.left, this.bottom, this.right);
    }

Component.prototype.getLocation = function() {
    // Summary:
    // Gets the location of this component in the form of a point

        return new Point(this.x, this.y);
    }

Component.prototype.setLocation = function(x, y) {
    // Summary:
    // Moves this component to a new location. 
    //
    // Forms:
    // ======
    // (1) setLocation(x,y)
    // (2) setLocation(point)

        if (x instanceof Point) {
            /* Point */
            var p = x;
            this.setLocation(p.x, p.y);
            return;
        }
        this.setBounds(x, y, this.w, this.h);
    }

Component.prototype.getSize = function() {
    // Summary:
    // Returns the size of this component in the form of aDimension object.
        return new Dimension(this.w, this.h);
    }

Component.prototype.setSize = function(width, height) {
    // Summary:
    // Resizes this component so that it has width and height.
    //
    // Forms:
    // ======
    // (1) setSize(width,height)
    // (2) setSize(dimension)

        if (width instanceof Dimension) {
            /* Dimension */
            var d = width;
            this.setSize(d.width, d.height);
            return;
        }
        this.setBounds(this.x, this.y, width, height);
    }

Component.prototype.getBounds = function() {
    // Summary:
    // Gets the bounds of this component in the form of aRectangle object.
        return new gRectangle(this.x, this.y, this.w, this.h);
    }

Component.prototype.setBounds = function(x, y, width, height) {
    // Summary:
    // Moves and resizes this component.
    //
    // Forms:
    // ======
    // (1) setBounds(x,y,width,height)
    // (2) setBounds(rectangle)

        if (x instanceof gRectangle) {
            /* Rectangle */
            var r = x;
            this.setBounds(r.x, r.y, r.width, r.height);
            return;
        }
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        //
        this.onResize();
        this.onMove();
    }

Component.prototype.getX = function() {
    // Summary:
    // Returns the current x coordinate of the components origin.
        return this.x;
    }

Component.prototype.getY = function() {
    // Summary:
    // Returns the current y coordinate of the components origin.
        return this.y;
    }

Component.prototype.getWidth = function() {
    // Summary:
    // Returns the current width of this component.
        return this.w;
    }

Component.prototype.getHeight = function() {
    // Summary:
    // Returns the current height of this component.
        return this.h;
    }

Component.prototype.isEnabled = function() {
        return this.enabled;
    }

Component.prototype.getPreferredSize = function() {
		// Summary:
		// Gets the preferred size of this component
        return this.getSize();
    }

Component.prototype.getMinimumSize = function() {
    // Summary:
    // Gets the preferred size of this component.
        return this.getSize();
    }

Component.prototype.setToolTipText = function(text) {
    // Summary : 
    // This method is used to create a tooltip for the component AND to change the content of this.tooltipText property

        // First remove previous handlers of the Tooltip
        this.removeToolTipText();
        this.tooltipGraphics = null;

        if (this.glassPaneg != null) this.tooltipGraphics = this.glassPaneg;
        else this.tooltipGraphics = this.rootg;

        this.tooltipText = text;
        tp_setToolTipText(this.tooltipText, this.tooltipGraphics);
    }

Component.prototype.removeToolTipText = function() {
        if (this.rootg != null) tp_removeToolTipText(this.rootg);
        if (this.glassPaneg != null) tp_removeToolTipText(this.glassPaneg);
    }

Component.prototype.changeDisplayedToolTipText = function(text) {
    // Summary
    // This method does not affect the content of this.tooltipText 
    // property, it only changes the text displayed

        var node = this;

        // Change the tooltip of the top-most container,...
        while (node.cParent != null) node = node.cParent;

        if (node.tooltipGraphics != null)
            node.tooltipGraphics.changeToolTipText(text); // see SVGNode


    }

Component.prototype.getToolTipText = function() {
        return this.tooltipText;
    }

Component.prototype.paint = function( /* Graphics */ g) {
        this.paintComponent(g);
    }

Component.prototype.paintComponent = function( /* Graphics */ g) {
    // Summary
    // Paint a component and its subclass.
        
        if (!this.created) {
            this.created = true;
            this.createSVGContent();
        }
        // Always add the rootg to the incoming Graphics.
        if (g != undefined) g.addGraphics(this.rootg);
    }

Component.prototype.repaint = function(x, y, width, height) {
        if (x == undefined || y == undefined || 
        	  width == undefined || height == undefined) {
            this.repaint(this.x, this.y, this.w, this.h);
            return;
        }
        this.paint();
    }

Component.prototype.createSVGContent = function() {
        this.createSVGContentComponent();
    }

Component.prototype.createSVGContentComponent = function() {
    // Summary: 
    // createSVGContent: Used to create the SVG content of a component 
    // (Graphics and background, etc) and its subclass only once.
    // The programmer needs to call createSVGContent only inside the paint method.

        this.rootg = createGraphics(this.x, this.y, this.w, this.h, this.getComponentId()); // this.rootg is the root Graphics object 
        this.rootg.setBackground(this.background); // The background color of the component
        this.setNode(this.rootg.getNode()); // Set the root svg node to the group element associated with the root Graphics
        this.g = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_ContentGraphics", this.rootg);
        this.glassPaneg = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_GlassPaneGraphics", this.rootg);
        if (this.popUpMenu != null) {
            this.popUpMenu.paint();
            menuLayer.addGraphics(this.popUpMenu);
        }
        this.setToolTipText(this.tooltipText);
        this.setCursor(this.getCursor());
        this.show();
    }

Component.prototype.onResize = function() {
        this.onResizeComponent();
    }

Component.prototype.onResizeComponent = function() {
        // Make neccessary changes on the component content first,...
        if (this.rootg != null) this.rootg.setSize(this.w, this.h);
        if (this.glassPaneg != null) this.glassPaneg.setSize(this.w, this.h);
        if (this.spinner != null) this.spinner.translate(this.w/2, this.h/2);
    }

Component.prototype.onMove = function() {
        this.onMoveComponent();
    }

Component.prototype.onMoveComponent = function() {
        // Make neccessary changes on the component content first,...
        if (this.rootg) this.rootg.translate(this.x, this.y);
    }

Component.prototype.recalc = function() {
    // Summary: 
    // Used when the component is relying on computationals based on text,...

        this.recalcComponent();
    }

Component.prototype.recalcComponent = function() {
    // Summary: 
    // Used when the component is relying on computationals based on text,...

        if (this.popUpMenu != null) this.popUpMenu.recalc();
    }

Component.prototype.setFont = function( /* Font */ font) {
        this.font = font;
    }

Component.prototype.getFont = function() {
        return this.font;
    }

Component.prototype.isShown = function() {
        return (this.getAttribute('display') == "inline");
    }

Component.prototype.isHidden = function() {
        return (this.getAttribute('display') == "none");
    }

Component.prototype.show = function() {
        this.showComponent();
    }

Component.prototype.hide = function() {
        this.hideComponent();
    }
    //*************************************************
    // showComponent
    //*************************************************
Component.prototype.showComponent = function() {
        this.setAttribute('display', "inline");
    }

Component.prototype.hideComponent = function() {
        this.setAttribute('display', "none");
    }

Component.prototype.enableKeyboard = function() {
    // Summary: 
    // Enable the component to receive keyboard events from the desktop
        ds_addEventListener(this, "keydown", "keyProcess");
        ds_addEventListener(this, "keyup", "keyProcess");
        ds_addEventListener(this, "keypress", "keyProcess");
    }

Component.prototype.disableKeyboard = function() {
    // Summary: 
    // Disable the component to receive keyboard events from the desktop
        ds_removeEventListener(this, "keydown", "keyProcess");
        ds_removeEventListener(this, "keyup", "keyProcess");
        ds_removeEventListener(this, "keypress", "keyProcess");
    }

Component.prototype.keyProcess = function(evt) {
    // Summary : 
    // Pass the received SVG events to EventManager. To make it as if the objet itself has received the event,..not the desktop
    switch (evt.type) {
        case "keydown":
            this.processKeyEvent("keyPressed", evt);
            break;
        case "keyup":
            this.processKeyEvent("keyReleased", evt);
            break;
        case "keypress":
            this.processKeyEvent("keyTyped", evt);
            break;
    }
}

Component.prototype.gainFocus = function() {
		// Summary: 
		// Very simple implementation of focus, when the component has focus it can 
		// receive keyboard events

        this.gainFocusComponent();
    }

Component.prototype.gainFocusComponent = function() {
        this.hasFocus = true;
        this.enableKeyboard();
    }

Component.prototype.lostFocus = function() {
        this.lostFocusComponent();
    }

Component.prototype.lostFocusComponent = function() {
        this.hasFocus = false;
        this.disableKeyboard();
    }

Component.prototype.actionPerformed = function( /* ActionEvent */ e) {}

Component.prototype.toString = function() {
    return this.getComponentId();
}