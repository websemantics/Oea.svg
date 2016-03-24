/**
 * Swing.svg : RadioButton
 *
 * SUPPORTS LOOK AND FEEL
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25 Augus 2005
 * @package   websemantics/oea/swing.svg
 */

RadioButton.prototype= new CheckBox(); 

function RadioButton( /* String */ caption) {
        var argv = RadioButton.arguments;
        var argc = RadioButton.length;
        /* String */
        this.name = "RadioButton";
        /* String */
        this.className = "RadioButton";
        /* Shape */
        this.bgCircle = null;
        /* Shape */
        this.innerCircle = null;

        if (argv.length > 0) 
        	this.initRadioButton( /* String */ caption);
    }

RadioButton.prototype.initRadioButton = function( /* String */ caption) {
        this.initCheckBox(caption);
    }

RadioButton.prototype.createSVGContent = function() {
        this.createSVGContentRadioButton();
    }

RadioButton.prototype.createSVGContentRadioButton = function() {
        var x = this.left;
        var y = this.top;
        this.createSVGContentLabel();
        this.contentg = this.getGraphics();
        this.contentg.setColor("white");
        this.contentg.setStrokeColor("Gray");
        this.contentg.setStrokeWidth(3);
        this.bgCircle = this.contentg.drawCircle(x, y, 0);
        this.contentg.setStrokeColor("none");
        this.contentg.setColor("black");
        this.innerCircle = this.contentg.drawCircle(x, y, 0);
        this.setSelected(this.selected);
    }

RadioButton.prototype.recalc = function() {
        this.recalcRadioButton();
    }

RadioButton.prototype.recalcRadioButton = function() {
        this.recalcLabel();
        this.setTextAlign(RIGHT, CENTER);
        var h = (this.h - this.top - this.bottom) * 0.7;
        // Expand the size of the Radoi Button to fit the new drawings,..
        this.setSize(this.w + h + this.left, this.h);
        // Update the drawings
        var x = this.left;
        var y = (this.getHeight() - h) / 2;
        this.bgCircle.translate(x, y);
        this.bgCircle.setRadius(h / 2);
        this.innerCircle.translate(x + h / 4, y + h / 4);
        this.innerCircle.setRadius(h / 4);
    }

RadioButton.prototype.setSelected = function( /* boolean */ selected) {
    this.selected = selected;
    if (this.innerCircle != null) this.innerCircle.setVisibility(this.selected);
}