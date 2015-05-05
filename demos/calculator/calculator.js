/**
 * Oea.svg : 
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2004
 * @package   websemantics/oea/demos
 */

/**
 * Class TextBox
 */

TextBox.prototype = new Canvas();

function TextBox(x, y, w, h, name, caption) {
    var argv = TextBox.arguments;
    var argc = TextBox.length;
    /* String */
    this.name = "TextBox";
    /* String */
    this.className = "TextBox";
    
    if (argv.length > 0) 
      this.initTextBox(x, y, w, h, name, caption);
}
//*************
// initTextBox 
//*************
TextBox.prototype.initTextBox = function(x, y, w, h, name, caption) {
    this.initCanvas(x, y, w, h);
    if (name) this.name = name;
    if (caption) {
        this.caption = caption;
    }
    this.butcontentg = this.getGraphics();
}
//*************
// createSVGContent
//*************
TextBox.prototype.createSVGContent = function() {
    this.createSVGContentTextBox();
}
//*************
// createSVGContentTextBox
//*************
TextBox.prototype.createSVGContentTextBox = function() {
    this.createSVGContentCanvas();
    var cg = this.getGraphics();
    this.created = true;
    this.setBackground("white");
    this.border = cg.drawWinBorder(0, 0, this.w, this.h);
    this.border.setFaceDown();
    cg.setColor("black");
    if (this.caption != null) this.text = cg.drawText(4, 16, this.caption);
}
//*************
// mouseClicked 
//*************
TextBox.prototype.setText = function(txt) {
    this.text.setText(txt);
}
//*************
// mouseClicked 
//*************
TextBox.prototype.getText = function() {
    return this.text.getText();
}
//*************
// mouseEndDragged 
//*************
TextBox.prototype.mouseEndDragged = function( /* MouseEvent */ e) {
    this.reset();
}
//*************
// toString
//*************
TextBox.prototype.toString = function() {
    return this.className + " [ caption: " + this.caption + ", name: " + this.name + "]";
}

/**
 * Class Calculator
 */

function Calculator() {
    this.result = 0;
    this.temp = 0;
    this.operation = null;
    var win = new Window(250, 200, 130, 215, "Calculator", "../../img/smallicons/calc.svg", true);
    win.setMinSize(130, 215);
    win.setLayout(new FlowLayout(CENTER));
    var but1 = new Button(0, 0, 85, 25, "Key_backspace", "Backspace");
    var but2 = new Button(0, 0, 25, 25, "Key_clear", "C");
    var but3 = new Button(0, 0, 25, 25, "Key_7", "7");
    var but4 = new Button(0, 0, 25, 25, "Key_8", "8");
    var but5 = new Button(0, 0, 25, 25, "Key_9", "9");
    var but6 = new Button(0, 0, 25, 25, "Key_div", "/");
    var but7 = new Button(0, 0, 25, 25, "Key_4", "4");
    var but8 = new Button(0, 0, 25, 25, "Key_5", "5");
    var but9 = new Button(0, 0, 25, 25, "Key_6", "6");
    var but10 = new Button(0, 0, 25, 25, "Key_mult", "*");
    var but11 = new Button(0, 0, 25, 25, "Key_1", "1");
    var but12 = new Button(0, 0, 25, 25, "Key_2", "2");
    var but13 = new Button(0, 0, 25, 25, "Key_3", "3");
    var but14 = new Button(0, 0, 25, 25, "Key_minus", "-");
    var but15 = new Button(0, 0, 25, 25, "Key_0", "0");
    var but16 = new Button(0, 0, 25, 25, "Key_dot", ".");
    var but17 = new Button(0, 0, 25, 25, "Key_plus", "+");
    var but18 = new Button(0, 0, 25, 25, "Key_equal", "=");
    but1.resizeToText = false;
    but2.resizeToText = false;
    but3.resizeToText = false;
    but4.resizeToText = false;
    but5.resizeToText = false;
    but6.resizeToText = false;
    but7.resizeToText = false;
    but8.resizeToText = false;
    but9.resizeToText = false;
    but10.resizeToText = false;
    but11.resizeToText = false;
    but12.resizeToText = false;
    but13.resizeToText = false;
    but14.resizeToText = false;
    but15.resizeToText = false;
    but16.resizeToText = false;
    but17.resizeToText = false;
    but18.resizeToText = false;
    this.screen = new TextBox(0, 0, 115, 25, "Sum", "0");
    win.add(this.screen);
    win.add(but1);
    win.add(but2);
    win.add(but3);
    win.add(but4);
    win.add(but5);
    win.add(but6);
    win.add(but7);
    win.add(but8);
    win.add(but9);
    win.add(but10);
    win.add(but11);
    win.add(but12);
    win.add(but13);
    win.add(but14);
    win.add(but15);
    win.add(but16);
    win.add(but17);
    win.add(but18);
    but1.addActionListener(this);
    but2.addActionListener(this);
    but3.addActionListener(this);
    but4.addActionListener(this);
    but5.addActionListener(this);
    but6.addActionListener(this);
    but7.addActionListener(this);
    but8.addActionListener(this);
    but9.addActionListener(this);
    but10.addActionListener(this);
    but11.addActionListener(this);
    but12.addActionListener(this);
    but13.addActionListener(this);
    but14.addActionListener(this);
    but15.addActionListener(this);
    but16.addActionListener(this);
    but17.addActionListener(this);
    but18.addActionListener(this);
    win.paint();
    win.recalc();
}
//*************
// performOperation 
//*************
Calculator.prototype.performOperation = function(nextOperation) {
    if (this.operation != null) switch (this.operation) {
        case "+":
            this.result = this.temp + this.result;
            break;
        case "-":
            this.result = this.temp - this.result;
            break;
        case "*":
            this.result = this.temp * this.result;
            break;
        case "/":
            this.result = this.temp / this.result;
            break;
    }
    if (nextOperation != undefined) {
        this.temp = this.result;
        this.operation = nextOperation;
        this.clear();
    } else this.operation = null;
}
//*************
// reset 
//*************
Calculator.prototype.reset = function() {
    this.temp = 0;
    this.operation = null;
    this.clear();
}
//*************
// clear 
//*************
Calculator.prototype.clear = function() {
    this.result = 0;
    this.screen.setText(this.result);
}
//*************
// actionPerformed 
//*************
Calculator.prototype.actionPerformed = function( /* ActionEvent */ e) {
    var name = e.source.name;
    var comm = e.getActionCommand();
    if (comm == "buttonClicked") {
        if (name == "Key_equal") {
            this.performOperation();
            this.screen.setText(this.result);
        } else
        if (name == "Key_clear") this.reset();
        else
        if (name == "Key_backspace") {
            var numStr = this.screen.getText();
            if (numStr.length > 1) {
                var number = parseInt(numStr.substring(0, numStr.length - 1));
                if (number.toString().length < 10) {
                    this.result = number;
                    this.screen.setText(number);
                }
            } else this.clear();
        } else
        if (name == "Key_plus") this.performOperation("+");
        else
        if (name == "Key_minus") this.performOperation("-");
        else
        if (name == "Key_mult") this.performOperation("*");
        else
        if (name == "Key_div") this.performOperation("/");
        else
        if (name == "Key_dot");
        else {
            var numStr = this.screen.getText() + e.source.caption;
            var number = parseInt(numStr, 10);
            if (number.toString().length < 10) {
                this.result = number;
                this.screen.setText(number);
            }
        }
    }
}