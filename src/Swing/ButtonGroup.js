/**
 * Swing.svg : ButtonGroup
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

ButtonGroup.prototype = new Container();

function ButtonGroup( /* int */ x, /* int */ y) {
        var argv = ButtonGroup.arguments;
        var argc = ButtonGroup.length;
        /* String */
        this.className = "ButtonGroup";
        /* String */
        this.name = "ButtonGroup";
        /* Graphics  */
        this.lg = null;
        /* Graphics  */
        this.contentg = null;

        if(argv.length > 0)
          this.initButtonGroup(x, y);
    }

ButtonGroup.prototype.initButtonGroup = function(x, y) {
        
        if (x == undefined && y == undefined) {
            x = 0;
            y = 0;
        }

        // The ButtonGroup listens to mouseClick event so it could capture the clicked radio button and update other buttons accordingly,..
        this.addInternalMouseMotionListener(mouseClicked, "buttonGroupMouseClicked");
        this.initContainer(x, y, 0, 0);
        this.setInsets(0, 0, 0, 0); // left,right,top,bottom 
        
        // set the default layout manager,...
        this.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 0));
    }

ButtonGroup.prototype.createSVGContent = function() {
        this.createSVGContentButtonGroup();
    }

ButtonGroup.prototype.createSVGContentButtonGroup = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
    }

ButtonGroup.prototype.recalc = function() {
        this.recalcButtonGroup();
    }

ButtonGroup.prototype.recalcButtonGroup = function() {
        this.recalcContainer();

        if (this.getLayout() != null) {
            /* Dimension */
            var d = this.getLayout().preferredLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }

        this.layoutChildren();
    }

ButtonGroup.prototype.add = function( /* Component */ radioButton) {

        if (radioButton.getSelected()) this.unSelectAll();

        return this.addContainer(radioButton);
    }

ButtonGroup.prototype.unSelectAll = function() {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().setSelected(false);
        }
    }

ButtonGroup.prototype.buttonGroupMouseClicked = function( /* MouseEvent */ e) {

    var d = this.getComponentAt(e.getX(), e.getY());

    if (d == null || d.className != "RadioButton") return;

    this.unSelectAll();

    /* ActionEvent */
    var aevt = new ActionEvent(d, "radioButtonClicked", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}