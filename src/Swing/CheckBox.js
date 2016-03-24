/**
 * Swing.svg : CheckBox
 *
 * SUPPORTS LOOK AND FEEL
 * 
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25 Augus 2005
 * @package   websemantics/oea/swing.svg
 */

CheckBox.prototype = new Label();

function CheckBox( /* String */ caption) {
        var argv = CheckBox.arguments;
        var argc = CheckBox.length;
        /* String */
        this.name = "CheckBox";
        /* String */
        this.className = "CheckBox";
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* Shape */
        this.bgRect = null; // White background
        /* Shape */
        this.boxBorder = null; // Checkbox border
        /* Shape */
        this.crossLine1 = null; // Firsrt line of the cross
        /* Shape */
        this.crossLine2 = null; // Firsrt line of the cross
        /* boolean */
        this.selected = false;

        if (argv.length > 0) 
          this.initCheckBox( /* String */ caption);
    }

CheckBox.prototype.initCheckBox = function( /* String */ caption) {
        this.initLabel(0, 0, 0, 0, caption, caption);
        this.addMouseListener(this);
        this.addMouseMotionListener(this);
    }

CheckBox.prototype.createSVGContent = function() {
        this.createSVGContentCheckBox();
    }

CheckBox.prototype.createSVGContentCheckBox = function() {

        var x = this.left;
        var y = this.top;
        this.createSVGContentLabel();
        this.contentg = this.getGraphics();
        this.contentg.setColor("white");
        this.bgRect = this.contentg.drawRect(x, y, 0, 0);
        this.boxBorder = this.contentg.drawWinBorder(x, y, 0, 0);
        this.boxBorder.setFaceDown();
        this.contentg.setStrokeColor("black");
        this.contentg.setStrokeWidth(1);
        this.crossLine1 = this.contentg.drawLine(0, 0, 0, 0);
        this.crossLine2 = this.contentg.drawLine(0, 0, 0, 0);
        this.setSelected(this.selected);
    }

CheckBox.prototype.onResize = function() {
        this.onResizeCheckBox();
    }

CheckBox.prototype.onResizeCheckBox = function() {
        this.onResizeLabel();
    }

CheckBox.prototype.onMove = function() {
        this.onMoveCheckBox();
    }

CheckBox.prototype.onMoveCheckBox = function() {
        this.onMoveLabel();
    }

CheckBox.prototype.recalc = function() {
        this.recalcCheckBox();
    }

CheckBox.prototype.recalcCheckBox = function() {
        this.recalcLabel();
        this.setTextAlign(RIGHT, CENTER);
        // Calculate the dimension of the CheckBox,...
        var h = (this.h - this.top - this.bottom) * 0.7;
        var w = h;
        // Expand the size of the Check Box to fit the new drawings,..
        this.setSize(this.w + h + this.left, this.h);
        // Update the drawings
        var x = this.left;
        var y = (this.getHeight() - h) / 2;
        this.bgRect.translate(x, y);
        this.bgRect.setSize(h, h);
        this.boxBorder.translate(x, y);
        this.boxBorder.setSize(h, h);
        
        // Update the cross,..
        var strokeWidth = w * 0.1
        var m = 0.8 * w;
        this.crossLine1.setAttribute('stroke-width', strokeWidth);
        this.crossLine2.setAttribute('stroke-width', strokeWidth);
        this.crossLine1.setPoint1(x + m, y + m);
        this.crossLine1.setPoint2(x + w - m, y + h - m);
        this.crossLine2.setPoint1(x + w - m, y + m);
        this.crossLine2.setPoint2(x + m, y + h - m);
    }

CheckBox.prototype.setSelected = function( /* boolean */ selected) {
        this.selected = selected;
        if (this.crossLine1 != null) this.crossLine1.setVisibility(this.selected);
        if (this.crossLine2 != null) this.crossLine2.setVisibility(this.selected);
    }

CheckBox.prototype.getSelected = function() {
        return this.selected;
    }

CheckBox.prototype.mouseClicked = function( /* MouseEvent */ e) {
        /* ActionEvent */
        var aevt = new ActionEvent(this, "checkBoxChanged", e);
        // Action Listeners 
        this.setSelected(!this.selected);
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

CheckBox.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}