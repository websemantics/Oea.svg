/**
 * Swing.svg : ComboBox
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     27th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class ComboBox
 */

ComboBox.prototype = new Container();
//
function ComboBox( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* String */ name) {
        var argv = ComboBox.arguments;
        var argc = ComboBox.length;
        /* String    */
        this.name = "ComboBox";
        /* String    */
        this.className = "ComboBox";
        /* Graphics  */
        this.cg = null;
        /* Graphics  */
        this.contentg = null;
        /* Graphics  */
        this.screen = null;
        /* Button    */
        this.button = null;
        /* Component */
        this.comp = null; // this is the currently selected component
        /* PopUpMenu */
        this.menu = null;

        if (argv.length > 0) 
        	this.initComboBox(x, y, w, h, name);
    }

ComboBox.prototype.initComboBox = function(x, y, w, h, name) {
        this.addInternalMouseMotionListener(mousePressed, "comboBoxMousePressed");
        this.initContainer(x, y, w, h, name);
        this.setBackground("white");
        this.button = this.add(new Button(0, 0, 40, 40, "drop"));
        this.initilizeList();
        this.setLayout(new BoxLayout(Y_AXIS, RIGHT, TOP, 0));
        this.setInsets(7, 2, 2, 2);
    }

ComboBox.prototype.initilizeList = function() {
        this.menu = this.add(new PopUpMenu(0, 0, 0, 0));
        this.menu.setFont(this.font);
        this.menu.setBackground(this.getBackground());

        // change the drawBorder method of the List
        this.menu.drawBorder = function( /* Graphics */ g) {
            g.setColor("none");
            g.setStrokeColor("black");
            g.setStrokeWidth(1);
            return g.drawRect(0, 0, this.w, this.h);
        }
        this.menu.setBackground(this.getBackground());
        this.menu.addActionListener(this);
        this.menu.setAbsolutePosition(true);
    }

ComboBox.prototype.changeMenuType = function( /* PopUpMenu */ menu) {
        this.remove(this.menu);
        this.menu = this.add(menu);
        this.menu.setFont(this.font);
        this.menu.setBackground(this.getBackground());
        this.menu.addActionListener(this);
        this.menu.setAbsolutePosition(true);
    }

ComboBox.prototype.createSVGContent = function() {
        this.createSVGContentComboBox();
    }

ComboBox.prototype.createSVGContentComboBox = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.screen = this.getGraphics();
        this.screen.translate(this.left, this.top);
        this.cg = this.getGraphics();
        this.border = this.cg.drawWinBorder(0, 0, this.w, this.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed');
        this.border.setFaceDown();
        this.paintChildren(this.contentg);
        // Attach the list to the menuLayer,..
        menuLayer.addGraphics(this.menu);
        this.menu.hide();
        var g = this.button.getGraphics();
        this.button.triangle = g.drawPolygon(0, 0);
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

ComboBox.prototype.setFont = function( /* Font */ font) {
        this.font = font;
        if (this.menu != null) this.menu.setFont(this.font);
    }

ComboBox.prototype.addComponent = function( /* Component */ comp) {
        this.menu.addComponentItem(comp);
    }

ComboBox.prototype.addTextItem = function( /* String */ text) {
        var l = new Label(0, 0, 0, 0, text, text);
        l.className = "Item";
        l.setFont(this.font);
        this.addComponent(l);
    }

ComboBox.prototype.addTextIconItem = function( /* String */ text, /* String */ fn, /* int */ w, /* int */ h) {
        var icon = null;
        if (fn != undefined) icon = new Icon(fn, w, h);
        var l = new Label(0, 0, 0, 0, text, text, icon);
        l.className = "Item";
        l.setFont(this.font);
        this.addComponent(l);
    }

ComboBox.prototype.recalc = function() {
        this.recalcComboBox();
    }

ComboBox.prototype.recalcComboBox = function() {
        this.recalcContainer();

        // Get the size of an item in the list to resize the ComboBox accordingly
        var dim = this.menu.getItemDimension();

        var w = dim.getHeight();
        var h = dim.getHeight();

        this.button.setSize(w, h);

        var xx = new Array();
        var yy = new Array();
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h / 3;
        yy[1] = h / 3;
        yy[2] = h - h / 3;
        this.button.triangle.setXYPoints(xx, yy);

        //this.setSize(this.menu.getWidth()+this.button.getWidth(),fComp.getHeight()+this.top+this.bottom); // OLD [delete]
        this.setSize(dim.getWidth() + this.button.getWidth() + this.left + this.right, this.button.getHeight() + this.top + this.bottom);

        this.menu.setLocation(0.5, this.h);

        this.displayComponent(this.menu.getFirstItem());
    }

ComboBox.prototype.onResize = function() {
        this.onResizeComboBox();
    }

ComboBox.prototype.onResizeComboBox = function() {
        this.onResizeContainer();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

ComboBox.prototype.comboBoxMousePressed = function( /* MouseEvent */ e) {
    // Summart:
    // Because the menu click event is delivered after the desktop event is excuted then the menu will show.

        /* Point */
        var p = this.getAbsoluteLocation();
        this.menu.setLocation(p.x + 1, p.y + this.h);
        this.menu.show();
    }

ComboBox.prototype.displayComponent = function( /* Component */ d) {
        var clone = d.g.getNode().cloneNode(true);
        this.g.getNode().replaceChild(clone, this.screen.getNode());
        this.screen.setNode(clone);
        this.screen.translate(this.left, this.top);
        this.comp = d;
    }

ComboBox.prototype.getCurrentComponent = function() {
        return this.comp;
    }

ComboBox.prototype.changeToText = function( /* String */ text) {
    var ll = new Label(0, 0, 0, 0, "lb_text", text);
    ll.setFont(this.getFont());
    ll.paint();
    this.displayComponent(ll);
    ll.dispose();
}

ComboBox.prototype.actionPerformed = function( /* ActionEvent */ e) {

    var src = e.source;
    var comm = e.getActionCommand();

    this.displayComponent(src);
    this.menu.hide();

    /* ActionEvent */
    var aevt = new ActionEvent(this, "itemClicked", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}