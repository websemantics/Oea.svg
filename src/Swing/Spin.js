/**
 * Swing.svg : Spin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2004
 * @package   websemantics/oea/swing.svg
 */
Spin.prototype = new Panel();

function Spin(x, y, name, format, value) {
        var argv = Spin.arguments;
        var argc = Spin.length;
        /* String */
        this.name = "Spin";
        /* String */
        this.className = "Spin";

        // This is used to allocate spaces and determined the width, i.e. 00000
        /* String */
        this.format = null;

        /* int */
        this.value = 0;
        /* int */
        this.dinc = 1;
        /* int */
        this.min = 0;
        /* int */
        this.max = 100;
        /* Label */
        this.label = null;
        /* Button */
        this.upButton = null;
        /* Button */
        this.downButton = null;
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;

        if (argv.length > 0) 
        	this.initSpin(x, y, name, format, value);
    }

Spin.prototype.initSpin = function(x, y, name, format, value) {
        this.initPanel(x, y, 10, 10);
        this.setValue(value);
        if (name != undefined) this.name = name;
        else name = this.getComponentId();
        if (format != undefined) this.format = format;
        else format = "000";
        this.setBackground("white");
        // Add internal Components
        this.upButton = new Button(0, 0, 0, 0, "upButton");
        this.downButton = new Button(0, 0, 0, 0, "downButton");
        this.label = new Label(0, 0, 0, 0, "screen", this.value);
        this.upButton.setAbsolutePosition(true);
        this.downButton.setAbsolutePosition(true);
        this.label.setAbsolutePosition(true);
        this.add(this.label);
        this.add(this.upButton);
        this.add(this.downButton);
        this.upButton.addActionListener(this);
        this.downButton.addActionListener(this);
    }

Spin.prototype.setMinMax = function( /* int */ min, /* int */ max) {
        this.min = min;
        this.max = max;
        this.setValue(this.value);
    }

Spin.prototype.setValue = function( /* int */ v) {
        if (v == undefined) v = 0;
        if (v > this.max) v = this.max;
        if (v < this.min) v = this.min;
        this.value = v;
        if (this.label != null)
            this.label.setText(this.value);
        this.notifyListeners();
    }

Spin.prototype.getValue = function() {
        return this.value;
    }

Spin.prototype.getMin = function() {
        return this.min;
    }

Spin.prototype.getMax = function() {
        return this.max;
    }

Spin.prototype.changeInc = function( /* int */ dx) {
        if (dx == undefined) dx = 1;
        this.dinc = dx;
    }

Spin.prototype.inc = function( /* int */ dx) {
        if (dx == undefined) dx = this.dinc;
        this.setValue(this.value += dx);
    }

Spin.prototype.dec = function( /* int */ dx) {
        if (dx == undefined) dx = this.dinc;
        this.setValue(this.value -= dx);
    }

Spin.prototype.createSVGContent = function() {
        this.createSVGContentSpin();
    }

Spin.prototype.createSVGContentSpin = function() {
        this.createSVGContentPanel();
        this.label.setFont(this.getFont());
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
        this.border = this.contentg.drawStepBorder(0, 0, this.w, this.h);
        this.border.setFaceDown();
        // Draw arrows on the buttons
        var g = this.upButton.getGraphics();
        this.upButton.triangle = g.drawPolygon(0, 0);
        g = this.downButton.getGraphics();
        this.downButton.triangle = g.drawPolygon(0, 0);
    }

Spin.prototype.onResize = function() {
        this.onResizeSpin();
    }

Spin.prototype.onResizeSpin = function() {
        this.onResizePanel();
        if (this.border != null) this.border.setSize(this.w - this.h / 2, this.h);
    }

Spin.prototype.recalc = function() {
        this.recalcSpin();
    }

Spin.prototype.recalcSpin = function() {
        //this.recalcPanel();

        this.label.setText(this.format);
        this.label.recalc();
        this.label.setLocation(this.left, this.top);
        var h = this.label.getHeight() + this.top + this.bottom;
        var w = this.label.getWidth() + this.left + this.right + h / 2;
        this.setSize(w, h);

        h = this.h / 2;

        this.upButton.setLocation(w - h, 0);
        this.downButton.setLocation(w - h, h);

        this.label.setText(this.value);

        this.upButton.setSize(h, h);
        this.downButton.setSize(h, h);
        // Draw arrows on the buttons
        w = h;
        h = h;
        var xx = new Array();
        var yy = new Array();
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h - h / 3;
        yy[1] = h - h / 3;
        yy[2] = h / 3;
        this.upButton.triangle.setXYPoints(xx, yy);
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h / 3;
        yy[1] = h / 3;
        yy[2] = h - h / 3;
        this.downButton.triangle.setXYPoints(xx, yy);

        this.notifyListeners();
    }

Spin.prototype.actionPerformed = function( /* ActionEvent */ e) {
        var src = e.source;
        var comm = e.getActionCommand();
        if (src == this.upButton) this.inc();
        if (src == this.downButton) this.dec();
    }

Spin.prototype.notifyListeners = function() {

    /* ActionEvent */
    var aevt = new ActionEvent(this, "valueChanged", null);

    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}