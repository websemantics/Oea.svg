/**
 * Swing.svg : Toolbar
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     20th July 2005
 * @package   websemantics/oea/swing.svg
 */

Toolbar.prototype= new Panel();

function Toolbar(x, y, w, h) {
        var argv = Toolbar.arguments;
        var argc = Toolbar.length;

        /* String */
        this.name = "Toolbar";
        /* String */
        this.className = "Toolbar";
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;
        /* Boolean */
        this.autoResize = true; // if true the Toolbar resizes to fit its components
        
        if (argv.length > 0) 
          this.initToolbar(x, y, w, h);
    }

Toolbar.prototype.initToolbar = function(x, y, w, h) {
        this.initPanel(x, y, w, h);
        this.setLayout(new FlowLayout(LEFT));
        this.setBackground("#d4d0c8");
    }

Toolbar.prototype.createSVGContent = function() {
        this.createSVGContentToolbar();
    }

Toolbar.prototype.createSVGContentToolbar = function() {
        this.createSVGContentPanel();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
        this.border = this.contentg.drawStepBorder(0, 0, this.w, this.h);
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

Toolbar.prototype.onResize = function() {
        this.onResizeToolbar();
    }

Toolbar.prototype.onResizeToolbar = function() {
        this.onResizePanel();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

Toolbar.prototype.onMove = function() {
        this.onMoveToolbar();
    }

Toolbar.prototype.onMoveToolbar = function() {
        this.onMovePanel();
    }

Toolbar.prototype.recalc = function() {
        this.recalcToolbar();
    }

Toolbar.prototype.recalcToolbar = function() {
        this.recalcPanel();
        if (this.getLayout() != null && this.autoResize) {
            /* Dimension */
            var d = this.getLayout().minimumLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }
    }

Toolbar.prototype.changeSkin = function( /* ButtonSkin */ buttonSkin) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().changeSkin(buttonSkin.clone());
        }
    }

Toolbar.prototype.addItem = function( /* String */ name, /* String or Icon */ is1, /* String */ is2) {
      // Ex: this.addItem("button_1",icon1,"hello");
        var button = null;

        if (is1 != undefined && is1 instanceof Icon) {
            if (is2 != undefined)
                button = new Button(0, 0, 0, 0, name, is2, is1);
            else
                button = new Button(0, 0, 0, 0, name, null, is1);

        } else {
            button = new Button(0, 0, 0, 0, name, is1);
        }

        if (button != null) {
            button.setInsets(3, 3, 3, 3);
            button.changeSkin(new ToolButtonSkin());
            this.add(button);
            button.addActionListener(this);
        }
    }

Toolbar.prototype.actionPerformed = function( /* ActionEvent */ e) {
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(e);
    }
}