/**
 * Swing.svg : ColorComboBox
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Classes: ColorBox , ColorList and ColorComboBox
 *
 * The PopUp part of the ComboBox is using a Flow Layout Manager and accepting 
 * components of type ColorBox (below). 
 * 
 */

/**
 * 
 * Class ColorBox
 * 
 */

ColorBox.prototype = new Canvas();

function ColorBox(x, y, w, h, color, bkColor) {
        var argv = ColorBox.arguments;
        var argc = ColorBox.length;
        /* String */
        this.name = "ColorBox";
        /* String */
        this.className = "ColorBox";
        /* Color */
        this.color = "red";
        /* Shape */
        this.rect = null;
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;

        if (argv.length > 0) 
        	this.initColorBox(x, y, w, h, color, bkColor);
    }

ColorBox.prototype.initColorBox = function(x, y, w, h, color, bkColor) {
        this.initCanvas(x, y, w, h);
        this.setInsets(2, 2, 2, 2);
        this.setColor(color);
        if (bkColor == undefined) bkColor = "white";
        this.color = color;
        this.setBackground(this.bkColor);
    }

ColorBox.prototype.getColor = function() {
        return this.color;
    }

ColorBox.prototype.setColor = function( /* Color */ color) {
        if (color == undefined) color = "none";
        this.color = color;
    }

ColorBox.prototype.setTextColor = function() {
	// To make combatable with Label compoenent so it works with the ComboBox and PopUpMenu
}

ColorBox.prototype.highlightOff = function() {
	// To make combatable with Label compoenent so it works with the ComboBox and PopUpMenu
}

ColorBox.prototype.createSVGContent = function() {
        this.createSVGContentColorBox();
    }

ColorBox.prototype.createSVGContentColorBox = function() {
        this.createSVGContentCanvas();
        this.contentg = this.getGraphics();
        this.contentg.setColor(this.color);
        if (this.color != "none") {
            this.rect = this.contentg.drawRect(this.left, this.top, this.w - this.left - this.right, this.h - this.top - this.bottom);
        } else { // Draw a cross
            this.contentg.setStrokeColor("red");
            this.contentg.setStrokeWidth(4);
            this.contentg.drawLine(this.left, this.top, this.w - this.left - this.right, this.h - this.top - this.bottom);
            this.contentg.drawLine(this.w - this.left - this.right, this.top, this.left, this.h - this.top - this.bottom);
        }
        this.rootg.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
    }

/**
 * 
 * Class ColorlList
 * 
 */

ColorlList.prototype = new PopUpMenu();

function ColorlList( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = ColorlList.arguments;
        var argc = ColorlList.length;
        /* String */
        this.className = "ColorlList";
        /* String */
        this.name = "ColorlList";
        /* int    */
        this.itemWidth = 25;
        /* int    */
        this.itemHeight = 25;
        /* int    */
        this.colNum = 0; // Number of Coulmns (depends of width and itemWidth)
        /* int    */
        this.rowNum = 0; // Number of Rows (depends of height and itemHeight)
        /* Shape    */
        this.selRect = null; // Selecion Rectangle
        /* Array */
        this.colors = new Array("#000000", "#202020", "#404040", "#808080", "#C0C0C0", "#FFFFFF", "#030031", "#07024C", "#0A036B", "#003270", "#006667", "#009965", "#340067", "#680398", "#683496", "#6A6995", "#669899", "#6CC29B", "#330000", "#343201", "#356500", "#349803", "#33CC00", "#31FE01", "#690000", "#673500", "#6A6B0D", "#6B9407", "#65CC01", "#63FF00", "#990001", "#9F3304", "#995E00", "#9B9500", "#97CC00", "#9BFF00", "#CF0001", "#C83708", "#C7680A", "#CF9903", "#D1CC00", "#C9FB01", "#FE0000", "#FE0000", "#FE6601", "#FC9A05", "#FFFF00", "none");
        /* Color    */
        this.curColor = this.colors[0]; // Current Color
        
        if (argv.length > 0) 
        	this.initColorlList(x, y, w, h);
    }

ColorlList.prototype.initColorlList = function(x, y, w, h) {
        this.initPopUpMenu(x, y, w, h);
        this.setLayout(new FlowLayout(LEFT, 0, 0));
        this.setInsets(3, 3, 4, 4);
        this.setBackground("black");
        this.selRectColor = "white";
    }

ColorlList.prototype.createSVGContent = function() {
        this.createSVGContentColorlList();
    }

ColorlList.prototype.createSVGContentColorlList = function() {
        this.createSVGContentPopUpMenu();
        var g = this.getGraphics();

        this.colNum = parseInt(this.getWidth() / this.itemWidth);
        this.rowNum = parseInt(this.getHeight() / this.itemHeight);
        var colorCount = 0;

        var x;
        var y;
        for (var j = 0; j < this.rowNum; j++) {
            for (var i = 0; i < this.colNum; i++) {
                g.setColor(this.colors[colorCount]);
                x = i * this.itemWidth + this.left;
                y = j * this.itemHeight + this.top;
                g.drawRect(x, y, this.itemWidth, this.itemHeight);
                colorCount++;
            }
        }

        // Draw a cross
        var m = 4;
        g.setStrokeColor("red");
        g.setStrokeWidth(4);
        x += 2;
        y += 2;
        g.drawLine(x + m, y + m, x + this.itemWidth - m * 2, y + this.itemHeight - m * 2);
        g.drawLine(x + this.itemWidth - m * 2, y + m, x + m, y + this.itemHeight - m * 2);


        g.setStrokeColor("white");
        g.setStrokeWidth(2);
        g.setColor("none");
        this.selRect = g.drawRect(this.left, this.top, this.itemWidth, this.itemHeight);
        this.selRect.setVisibility(false);


    }

ColorlList.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawStepBorder(0, 0, this.w, this.h);
        return border;
    }

ColorlList.prototype.popUpMenuMouseMoved = function( /* MouseEvent */ e) {
        this.selRect.setVisibility(true);
        var hi = parseInt(e.getX() / this.itemWidth);
        var vi = parseInt(e.getY() / this.itemHeight);
        if (hi > (this.colNum - 1)) hi = this.colNum - 1;
        if (vi > (this.rowNum - 1)) vi = this.rowNum - 1;
        this.selRect.translate(hi * this.itemWidth + this.left, vi * this.itemHeight + this.top);
    }

ColorlList.prototype.popUpMenuMousePressed = function( /* MouseEvent */ e) {
    // Summary:
    // Because the menu click event is delivered after the desktop event is excuted then the menu will show.

        if (e.source != this) return;

        var hi = parseInt(e.getX() / this.itemWidth);
        var vi = parseInt(e.getY() / this.itemHeight);
        if (hi > (this.colNum - 1)) hi = this.colNum - 1;
        if (vi > (this.rowNum - 1)) vi = this.rowNum - 1;

        var i = hi + vi * this.colNum;

        this.curColor = this.colors[i];


        this.show();

        var aevt = new ActionEvent(this, "menuItemSelected", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements()) {
                k.nextElement().actionPerformed(aevt);

            }
        }

        this.selRect.setVisibility(false);
        this.hide();
    }

ColorlList.prototype.recalc = function() {
        this.recalcColorlList();
    }

ColorlList.prototype.recalcColorlList = function() {
        this.recalcContainer();
    }

ColorlList.prototype.getItemDimension = function() {
        return new Dimension(this.itemWidth, this.itemHeight);
    }

ColorlList.prototype.getFirstItem = function() {
    // Summary:
    // getFirstItem: this component does not have any children

        return this;
    }

ColorlList.prototype.getColor = function() {
        return this.curColor;
    }

/**
 * 
 * Class ColorComboBox
 * 
 */

ColorComboBox.prototype = new ComboBox();

function ColorComboBox( /* String */ name) {
        var argv = ColorComboBox.arguments;
        var argc = ColorComboBox.length;
        /* String    */
        this.name = "ColorComboBox";
        /* String    */
        this.className = "ColorComboBox";
        
        if (argv.length > 0) 
        	this.initColorComboBox(name);
    }

ColorComboBox.prototype.initColorComboBox = function(name) {
        this.initComboBox(0, 0, 0, 0, name);
        this.setBackground("black");
        this.changeMenuType(new ColorlList(0, 0, 155, 205));
        this.setInsets(2, 2, 2, 2);
    }

ColorComboBox.prototype.changeToColor = function( /* Color */ color) {
        if(this.rootg)this
            this.rootg.setBackground(color)
    }

ColorComboBox.prototype.displayComponent = function( /* ColorlList */ cl) {
        this.changeToColor(cl.getColor());
    }

ColorComboBox.prototype.getCurrentComponent = function() {
        return this.menu;
    }

ColorComboBox.prototype.getColor = function() {
    return this.getCurrentComponent().getColor();
}