/**
 * Swing.svg : List
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

List.prototype= new Container(); 

function List( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = List.arguments;
        var argc = List.length;

        /* String */
        this.className = "List";
        /* String */
        this.name = "List";
        /* boolean */
        this.fixedSize = false;
        /* Graphics  */
        this.lg = null;
        /* Graphics  */
        this.contentg = null;
        /* Shape */
        this.border = null;
        /* Color */
        this.selRectColor = "#3498db"; // The color of the selected item
        /* Component */
        this.highlightedComp = null; // The one which's selected or mouseOver
        
        if (argv.length > 0) 
          this.initList(x, y, w, h);
    }

List.prototype.initList = function(x, y, w, h) {
        this.addInternalMouseMotionListener(mouseClicked, "listMouseClicked");
        this.initContainer(x, y, w, h);
        this.setInsets(7, 7, 5, 5); // left,right,top,bottom 
        this.setBackground("white");
        this.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 0));
    }

List.prototype.createSVGContent = function() {
        this.createSVGContentList();
    }

List.prototype.createSVGContentList = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.lg = this.getGraphics();
        this.border = this.drawBorder(this.lg);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed');
        this.paintChildren(this.contentg);
    }

List.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawWinBorder(0, 0, this.w, this.h);
        border.setFaceDown();
        return border;
    }

List.prototype.addSeparator = function() {
        var s = new Separator(0, 0, 10, 10);
        this.add(s);
    }

List.prototype.addComponentItem = function( /* Component */ comp) {
        comp.className = "Item";
        comp.setFont(this.font);
        this.add(comp);
    }

List.prototype.addTextItem = function( /* String */ text) {
        var l = new Label(0, 0, 0, 0, text, text);
        l.className = "Item";
        l.setFont(this.font);
        this.add(l);
    }

List.prototype.addTextIconItem = function( /* String */ text, /* String */ fn, /* int */ w, /* int */ h) {
        var icon = null;

        if (fn != undefined) icon = new Icon(fn, w, h);

        var l = new Label(0, 0, 0, 0, text, text, icon);
        l.className = "Item";
        l.setFont(this.font);
        this.add(l);
    }

List.prototype.onResize = function() {
        this.onResizeList();
    }

List.prototype.onResizeList = function() {
        this.onResizeContainer();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

List.prototype.onMove = function() {
        this.onMoveList();
    }

List.prototype.onMoveList = function() {
        this.onMoveContainer();
    }

List.prototype.setToFixedSize = function() {
        this.fixedSize = true;
    }

List.prototype.recalc = function() {
        this.recalcList();
    }

List.prototype.recalcList = function() {
        this.recalcContainer();

        if (this.getLayout() != null & this.fixedSize != true) {
            /* Dimension */
            var d = this.getLayout().preferredLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }

        if (this.children != null) {
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.setTextAlign != undefined)
                    child.setTextAlign(LEFT, CENTER);
                child.setSize(this.w - this.left - this.right, child.h);
            }

            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }
    }

List.prototype.listMouseClicked = function( /* MouseEvent */ e) {
        // if(e.source!=this)return;

        var d = this.getComponentAt(e.getX(), e.getY());

        if (d == null || d.className != "Item") return;

        this.changeHighlightedComp(d);

        /* ActionEvent */
        var aevt = new ActionEvent(d, "itemClicked", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

List.prototype.changeHighlightedComp = function( /* Component */ d) {

        if (this.highlightedComp != null) {
            this.highlightedComp.setBackground(this.getBackground());
            this.highlightedComp.setTextColor("black");
        }
        this.highlightedComp = d;
        this.highlightedComp.setTextColor("white");
        this.highlightedComp.setBackground(this.selRectColor);
    }

List.prototype.show = function() {
        if (this.getNode() == null) return;
        this.showComponent();
        this.getNode().setAttribute("pointer-events", "all");
        //
        if (this.highlightedComp != null) {
            this.highlightedComp.setBackground(this.getBackground());
            this.highlightedComp.setTextColor("black");
            this.highlightedComp.highlightOff();
        }
    }

List.prototype.hide = function() {
        if (this.getNode() == null) return;
        this.hideComponent();
        this.getNode().setAttribute("pointer-events", "none");
    }

List.prototype.getItemDimension = function() {
        var fComp = this.getComponentAt(this.left, this.top);
        return new Dimension(fComp.getWidth(), fComp.getHeight());
    }

List.prototype.getFirstItem = function() {
    return this.getComponentAt(this.left, this.top);
}

List.prototype.getSelected = function() {
    if (this.highlightedComp == null) return null;
    return this.highlightedComp.getText();
}
