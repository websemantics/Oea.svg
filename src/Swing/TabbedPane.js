/**
 * Swing.svg : TabbedPane
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     21th July 2005
 * @package   websemantics/oea/swing.svg
 */

TabbedPane.prototype= new Panel(); 

function TabbedPane(x, y, w, h) {
        var argv = TabbedPane.arguments;
        var argc = TabbedPane.length;

        /* Pane */
        this.panes = null;
        /* Pane */
        this.currentPane = null;
        /* String */
        this.name = "TabbedPane";
        /* String */
        this.className = "TabbedPane";

				// When the button are layied out X axis then the pane needs to know the max height
        /* int */
        this.tabsEffectiveWidth = 0; 

        // When the button are layied out Y axis then the pane needs to know the max width
        /* int */
        this.tabsEffectiveHeight = 0; 
        /* int */
        this.tabsLocation = LEFT; // (LEFT,RIGHT,TOP,BOTTOM)
        /* Graphics */
        this.paneg = null;
        /* Graphics */
        this.buttonsg = null;

        if (argv.length > 0) 
        	this.initTabbedPane(x, y, w, h);
    }

TabbedPane.prototype.initTabbedPane = function(x, y, w, h) {
        this.initPanel(x, y, w, h);
        this.setAlign(Y_AXIS, LEFT, TOP, 2);
    }

TabbedPane.prototype.createSVGContent = function() {
        this.createSVGContentTabbedPane();
    }

TabbedPane.prototype.createSVGContentTabbedPane = function() {
        this.createSVGContentPanel();

        this.paneg = this.getGraphics();
        this.buttonsg = this.getGraphics();

        this.paintPanes(this.paneg);
        this.paintButtons(this.buttonsg);

        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

TabbedPane.prototype.paintButtons = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Button") child.paint(g);
            }
            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }
    }

TabbedPane.prototype.paintPanes = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Pane") child.paint(g);
            }
        }
    }

TabbedPane.prototype.onResize = function() {
        this.onResizeTabbedPane();
    }

TabbedPane.prototype.onResizeTabbedPane = function() {
        this.onResizePanel();
    }

TabbedPane.prototype.recalc = function() {
        this.recalcTabbedPane();
    }

TabbedPane.prototype.recalcTabbedPane = function() {

        this.recalcPanel();

        // First, Calculate the effective width and height of the set of button to be used to draw panes
        var dim = this.getLayout().preferredLayoutSize(this);
        this.tabsEffectiveWidth = dim.width;
        this.tabsEffectiveHeight = dim.height;

        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Button")
                    switch (this.tabsLocation) {
                        case LEFT:
                            child.setSize(this.tabsEffectiveWidth, child.h);
                            break;
                        case RIGHT:
                            child.setSize(this.tabsEffectiveWidth, child.h);
                            break;
                        case TOP:
                            child.setSize(child.w, this.tabsEffectiveHeight);
                            break;
                        case BOTTOM:
                            child.setSize(child.w, this.tabsEffectiveHeight);
                            break;
                    }
            }
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Pane") child.recalcPaneOnly();
            }


            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }

        if (this.currentPane != null)
            this.currentPane.button.highlightOn();
    }

TabbedPane.prototype.addPane = function(name, caption, icon) {
        
        var b = new Button(0, 0, 0, 0, name, caption, icon);
        
        b.setFont(this.getFont());
        b.setTextAlign(LEFT, CENTER);
        b.changeSkin(new FlatButtonSkin());
        b.setInsets(8, 8, 3, 3);
        b.setBackground("none");
        b.addActionListener(this);
        var p = new Pane(0, 0, this.w, this.h, b);
        p.setFont(this.getFont());
        p.setAbsolutePosition(true);
        b.pane = p;
        this.add(p);
        this.add(b);
        this.currentPane = p;
        return p;
    }

TabbedPane.prototype.setAlign = function( /* int */ axis, /* int */ align, /* int */ valign, /* int */ gap) {

        if (gap == undefined) gap = 2;

        if (axis == X_AXIS) {
            this.tabsLocation = valign;
            if (valign == CENTER) {
                alert("Warning: Vertical alignment must not be set to CENTER when layout on X axis");
                return;
            }
        }

        if (axis == Y_AXIS) {
            this.tabsLocation = align;
            if (align == CENTER) {
                alert("Warning: Horizontal alignment must not be set to CENTER when layout on Y axis");
                return;
            }
        }

        var layout = this.getLayout();
        if (layout != null) delete layout;

        this.setLayout(new BoxLayout(axis, align, valign, gap));

        //this.recalc();
    }

TabbedPane.prototype.actionPerformed = function( /* ActionEvent */ e) {
    var src = e.source;
    var comm = e.getActionCommand();

    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(e);
    }

    if (src.className == "Button" && src.pane != undefined) {
        this.currentPane.button.highlightOff();
        this.currentPane = src.pane
        this.currentPane.button.highlightOn();
        this.bringToFront(src.pane);
        this.paneg.addGraphics(src.pane); // Move window to the top
    }

}
