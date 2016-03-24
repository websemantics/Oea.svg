/**
 * Swing.svg : TextBox (***** 5 Stars Widget)
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th July 2005 (me birthday)
 * @package   websemantics/oea/swing.svg
 */

/*
* 
* Class Textbox: 
* 
* Overview:
* 
* This is an SVG implementation of a Textbox widget. 
* 
* The component has a cursor and works in two modes: (1) Type mode, and 
* (2) Insert mode. To switch between the two modes use the 'insert'
* key. The cursor in the type mode is bold while in the insert mode
* is transparent and has the width of the char beneath it. Textbox
* inherits from Component class. While writing this class the
* SCanvas class was modified to support changing the SVG Mouse
* cursor shape. Since this modification, now the mouse cursor takes
* the 'text' shape when the mouse hovers over the Textbox. Maximum
* effort was put to ensure that this widget feels no different
* than a normal non-SVG weight. This class (Textbox) has a cursor
* that moves: left, right, up, down, 'home' and 'end'. And also it
* locates to the char nearest to the mouse click spot. Text
* selection is also supported. One can either select text by moving
* the cursor using the keyboard arrows, 'home' and 'end' while
* pressing on the shift key or by dragging the mouse on the
* required fragment of text. One can also double-click on a word to
* select it or press Ctrl-A to select all. Textbox support styled
* selection rectangle in the single line mode. The color, stroke
* color and stroke width of the selection rectangle can be changed.
* Good care take taken to ensure that Textbox widget works in Batik
* viewer as well. A minimal form of a clipboard was supported. Use
* Ctrl-C to copy the selected text, Ctrl-X/Shift-Delete to copy and
* cut and Ctrl-V/Shift-Insert to paste. The copied text can be
* either used locally or with other Textbox objects. If the flag
* 'trs' (Type Replaces Selection) is on (true), the inserted text
* replaces the selected text otherwise it does not. This component
* support 'focus' mechanism independently. The technique to support
* focus is simple and easy to implement. At first, the component
* does not have focus and therefore the cursor is hidden and the
* widget does not listen to the keyboard. If the user clicks on the
* component the component gains focus BUT if the user click
* anywhere else on the desktop then the widget loses it. So, for
* multiple Textbox object: they all start with no focus but when
* the user clicks on a particular Textbox all other Textbox objects
* receive Mouse Click/Press Event from the desktop and that causes
* them to lose focus (including the one that the user's clicked)
* but after that the same component receive another Mouse Click
* Event but this one is originated from the component itself and
* that causes it to gain the focus. When the component gain focus
* it starts to listen to the keyboard. The component can be
* configured to work as a single line or multi-line Textbox. The
* multi-line form of the component uses the new features supported
* in ASV6 (text layout). However, the current version of Batik does
* not support that. Also, the Textbox widget can be used to input
* single line text, where it uses a simple SVG text element that
* can be used in Batik and ASV viewers. The component resizes
* itself to fit only a single line of text. This component can not
* deal with an amount of text that does not fit into its working
* space so it cuts the extra text out and displays the rest. A
* warning message is produced to the user when that happens.
* 
* 16th Dec 2005
* 
* (1) Bug fix: 
* 
* There was a problem sometimes the baseline of the text inside the text box is 
* not given correctly by the host SVG env. because it is obtained while the creation
* of the text box SVG content (createSVGContent). The fix was to re-obtain the baseline
* again when the 'recalc' method is executed by calling setFont(getFont()).
* 
* (2) New features: 
* 
* The new feature added is that, the text box can hide what is written in it
* by replacing types characters witl an alternative letter ('*' or else). 
* This can be used for enter passwords.
*
* Known bugs:
* (1) When type x, there will be an error (line 119). NOT FIXED
*/

TextBox.prototype= new Canvas(); // Extends EventManager

function TextBox(x, y, w, h, text, multiLine) {
        var argv = TextBox.arguments;
        var argc = TextBox.length;
        /* String */
        this.className = "TextBox";
        /* String */
        this.name = "TextBox";
        
        /* boolean */
        this.multiLine = multiLine || false;
        /* boolean */
        this.passwordMode = false; // display star '*' if this flag is set to true
        /* Char */
        this.passwordChar = "*"; // display star '*' 
        /* int */
        this.margin = 5; // Never change this property directly,...use setMargin method
        /* int */
        this.selCharPos1 = -1;
        /* int */
        this.selCharPos2 = -1;
        /* int */
        this.cursorCharPos = 0;
        /* int */
        this.cursorHeight = 0;
        /* int */
        this.cursorWidth = 1; // The width of char 'i',..changes when the font has changed
        /* String */
        this.text = null; // Never change this property directly,... Use setText method
        /* Shape */
        this.textShape = null;
        /* Shape */
        this.tv = null; // TextView
        /* Shape */
        this.cursorShape = null;
        /* Shape */
        this.selectionRectShape = null;
        /* Boolean */
        this.insertMode = false; // New text overwrite old
        /* Boolean */
        this.trs = true; // Type Replaces Selection flag
        /* Font */
        this.font = new Font("Helvetica", "normal", "10pt");
        /* Font */ //this.font=new Font("monospace","normal","8pt");
        /* Color */
        this.fontColor = "black"; // for font and cursor
        /* Color */
        this.backgroundColor = "white"; // for font and cursor
        /* Boolean */
        this.selectionGraphicsClear = true; // To indicate if the selection graphics is full of empty of sel rects
        /* Color */
        this.selectionColor = "blue";
        /* Color */
        this.selectionStrokeColor = "none";
        /* Color */
        this.selectionStrokeWidth = 0;
        /* Graphics */
        this.sg = null; // Graphics for the selection rectangles
        /* Boolean */
        this.styledMode = false; // Textbox supports single line in styled mode, with this mode the selection
        // Is done differently using a styled rectangle.
        /* boolean */
        this.created = false; // true of the svg content is created (only once).
        
        if (argv.length > 0) 
          this.initTextBox(x, y, w, h, text);
    }

TextBox.prototype.initTextBox = function(x, y, w, h, text) {
        this.initCanvas(x, y, w, h);
        if (text) this.text = text; // Does not get updated!, use this.getText();
        this.addMouseMotionListener(this);
        this.addMouseListener(this);
        this.addKeyListener(this);
        ds_addEventListener(this, "click", "desktopMouseClick");
        ds_addEventListener(this, "mousedown", "desktopMouseClick");
    }

TextBox.prototype.setPasswordMode = function( /* boolean */ mode) {
    // Summary:
    // setPasswordMode: display '*' if in password mode
        this.passwordMode = mode;
    }

TextBox.prototype.paint = function( /* Graphics */ g) {
        this.paintTextBox(g);
    }

TextBox.prototype.paintTextBox = function( /* Graphics */ g) {
        this.paintCanvas(g);
        this.updateCursor();
        this.lostFocus();
    }

TextBox.prototype.recalc = function() {
        this.recalcTextBox();
    }

TextBox.prototype.recalcTextBox = function() {
        this.recalcCanvas();
        // When the widget changes font it automatically calculate the baseline and 
        // the problem is fixed!!!
        this.setFont(this.getFont());
    }

TextBox.prototype.createSVGContent = function() {
        this.createSVGContentTextBox();
    }

TextBox.prototype.createSVGContentTextBox = function() {
        this.createSVGContentCanvas();

        this.contentg = this.getGraphics();

        var cg = this.contentg;
        
        // The font size MUST be in pt to calculate the height correctly,...
        cg.setFont(this.font);
        this.created = true;
        this.setBackground(this.backgroundColor);
        this.border = cg.drawWinBorder(0, 0, this.w, this.h);
        this.border.setFaceDown();
        cg.setColor(this.fontColor);
        var fm = cg.getFontMetrics();
        
        // this.cursorBaseline=fm.getBaseline();  <== DOES NOT RETURN A TRUE BASELINE,..
        
        this.cursorHeight = fm.getHeight();
        
        // If this text box is multiline then create a Text View shape.
        if (this.multiLine) { // ***************** [ MLUTI-LINE OR SINGLE-LINE ] ********************
            this.tv = cg.drawTextView(this.margin, this.margin, this.w - (this.margin * 2), this.h - (this.margin * 2));
            this.tv.setAttribute("pointer-events", "none");
            this.textShape = this.tv.addParagraph("A"); // Set the text to 'A' to get the baseline only then reset to default
        } else {
            this.textShape = cg.drawText(this.margin, this.margin, "A");
            this.textShape.setToBaseLine();
            this.textShape.setAttribute("pointer-events", "none");
            var temp = this.text;
            this.setSize(this.getWidth(), this.cursorHeight + (this.margin * 2)); // Resize to only to one line of text
            this.text = temp;
        }
        
        // Get THE REAL baseline,.. 
        this.cursorBaseline = this.getBaseline();

        // Set text
        if (this.text != null) this.setText(this.text);
        else this.setText("");

        cg.setStrokeColor("black");

        this.cursorShape = cg.drawRect(this.margin, this.margin, 1, this.cursorHeight);
        this.cursorShape.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        var ani = svgDocument.createElementNS("http://www.w3.org/2000/svg", "animate")
        ani.setAttribute("attributeName", "visibility")
        ani.setAttribute("values", "visible;hidden;visible")
        ani.setAttribute("begin", "0s")
        ani.setAttribute("repeatCount", "indefinite")
        ani.setAttribute("dur", "1")
        this.cursorShape.getNode().appendChild(ani);
        // Set the mouse cursor shape
        this.setCursor("text");

        // Draw the selection Rect
        this.sg = createGraphics(0, 0, 1, 1);

        // Selection recangle style
        this.sg.setColor(this.selectionColor);
        this.sg.setStrokeColor(this.selectionStrokeColor);
        this.sg.setStrokeWidth(this.selectionStrokeWidth);
        cg.addGraphics(this.sg);
        this.selectionGraphicsClear = true;
    }

TextBox.prototype.insertTextConsiderSelection = function( /* String */ text) {
    // Summary: 
    // insertTextConsiderSelection: Insert a text but consider the selection,..replace when neccessary
   
        var temp = this.text; // save the current state (text)
        var pos = this.cursorCharPos; // save the current state (cursor location)

        if (this.isSelection() && this.trs) { // If there is a selection then the typed text should replace it, otherwise normal
            this.replaceText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos(), text);
            this.cursorCharPos = this.selStartCharPos() + text.length;
        } else {
            if (this.insertMode)
                this.replaceText(this.cursorCharPos, text.length, text);
            else
                this.insertText(this.cursorCharPos, text);
            this.cursorCharPos += text.length;
        }

        // If the box is full of text then don't take more, go back to previous state,..
        if (!this.isThereStillRoom(this.text.length - 1)) {
            this.setText(temp);
            this.cursorCharPos = pos;
        }

        this.resetSelection();

    }

TextBox.prototype.getDisplayText = function( /* String */ text) {

        if (!this.passwordMode) return text;
        if (text == undefined || text == null) return "";

        var len = text.length;
        text = "";
        for (var i = 0; i < len; i++)
            text += this.passwordChar;
        return text;
    }

TextBox.prototype.getBaseline = function(pos) {
        
        pos = pos || 0;
        var textWidth = this.textShape.getNode().getBBox().width;
        
        // this.baseline = fm.getBaseline(); 
        return ( textWidth > 0 ) ? this.textShape.getNode().getStartPositionOfChar(pos).y : 0;        
}

TextBox.prototype.setText = function( /* String */ text) {

        this.text = text;

        if (this.textShape != null)
            this.textShape.setText(this.getDisplayText(text));

        if (this.text == null || this.text.length == 0) return;
        // Cut out any extra text that can not fit into the Textbox space,...
        var i = 0;

        for (i = 0; i < this.text.length && this.isThereStillRoom(i); i++);

        if (i < this.text.length) {
            // alert("Warning: The TEXT can not fit the TextBox component. The extra letters will be cut."); <<<==== [Un comment]
            // Cut the extra text
            this.textShape.setText(this.getDisplayText(this.text.substring(0, i)));
            this.text = this.text.substring(0, i);
        }

    }

TextBox.prototype.getText = function() {
        return this.text;
    }

TextBox.prototype.insertText = function( /* int */ charPos, /* String */ text) {
        this.text = this.text.substring(0, charPos) + text + this.text.substring(charPos, this.text.length);
        this.textShape.insertText(charPos, this.getDisplayText(text));
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.replaceText = function( /* int */ charPos, /* int */ count, /* String */ text) {
        this.textShape.replaceText(charPos, count, this.getDisplayText(text));
        this.text = this.text.substring(0, charPos) + text + this.text.substring(charPos + count, this.text.length);
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.deleteText = function( /* int */ charPos, /* int */ count) {
        this.textShape.deleteText(charPos, count);
        this.text = this.text.substring(0, charPos) + this.text.substring(charPos + count, this.text.length);
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.sendChangeEvent = function() {
        // Delever change event for listners [8-2-2006]
        /* ActionEvent */
        var aevt = new ActionEvent(this, "textBoxChanged", null);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

TextBox.prototype.getRotationOfChar = function( /* int */ charPos) {
    // Summary: 
    // getRotationOfChar : Wrapper around SVG Interface

        return (this.textShape.getNode().getRotationOfChar(charPos));
    }

TextBox.prototype.getStartPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getStartPositionOfChar: Wrapper around SVG Interface

        if( charPos > -1) // Added April 28th 2015
          return this.getBaseline(charPos);
        else 
          return 0;
    }

TextBox.prototype.getEndPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getEndPositionOfChar: Wrapper around SVG Interface

        return (this.textShape.getNode().getEndPositionOfChar(charPos));
    }

TextBox.prototype.getXPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getXPositionOfChar
    // return: x position of a char 

        return (this.getStartPositionOfChar(charPos)).x;
    }

TextBox.prototype.getYPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getYPositionOfChar
    // return: y position of a char 

        return (this.getStartPositionOfChar(charPos)).y;
    }

TextBox.prototype.isCharsAtSameLine = function( /* int */ charPos1, /* int */ charPos2) {
    // Summary: 
    // isCharsAtSameLine
    // return: true as long as the two chars are at the same line,.. 

        return (this.getYPositionOfChar(charPos1) == this.getYPositionOfChar(charPos2));
    }

TextBox.prototype.calcSelectionEnds = function( /* boolean */ shiftDown, /* int */ charPos1, /* int */ charPos2) {
    // Summary: 
    // calcSelectionEnds: Claculated the 'start' and the 'end' of a selection

        if (shiftDown) {
            if (this.selCharPos1 == -1)
                this.selCharPos1 = charPos1;
            this.selCharPos2 = charPos2;
        } else
            this.resetSelection();
    }

TextBox.prototype.isThereStillRoom = function( /* int */ charPos) {
    // Summary: 
    // isThereStillRoom: return true if we can add more text 

        if (!this.multiLine) {
            var fm = this.font.getFontMetrics();
            if (fm.getStringWidth(this.text.substring(0, charPos + 1)) > this.w - (this.margin * 2)) return false;
            return true;
        } else {
            if (this.text.length > 0 && this.getYPositionOfChar(charPos) <= 0) return false;
            return true;
        }
    }

TextBox.prototype.getCharPosFromXY = function( /* int */ x, /* int */ y) {

        // This to fix the problem when the mouse cursor y coord is bigger than the y coord of the last line of the text box
        if (y > this.getYPositionOfChar(this.text.length - 1)) y = this.getYPositionOfChar(this.text.length - 1);
        // This to fix the problem when the mouse cursor y coord is less than the y coord of the first line of the text box
        if (y < this.getYPositionOfChar(0)) y = this.getYPositionOfChar(0);

        y = this.quantizeY(y); // Y is always crosses the middle y axis of a line of chars

        var p = svgDocument.documentElement.createSVGPoint();
        p.x = x;
        p.y = y;

        var pos = this.textShape.getNode().getCharNumAtPosition(p);

        if (pos != -1) return pos;
        else {
            // First, check if there is a line along the y axis, eventhough the location under the mouse cursor is empty
            // Meaning, if the mouse is not over any letter in the current line,...
            p.x = 0;
            p.y = y;
            pos = this.textShape.getNode().getCharNumAtPosition(p);

            if (pos != -1) { // So if there's a line then check if the mouse is one the left then go to the 
                // start of the line 'home'; otherwise go to the right 'end'
                if (x <= 0) return pos;
                // Now go to the last char of the current line,...same as the end key

                var j = 0;
                for (j = pos; j < this.text.length && this.isCharsAtSameLine(j, pos); j++);

                if (j == this.text.length) return j;
                else return (j - 1);
            } // if 
        } // else
        return -1;
    }

TextBox.prototype.quantizeY = function( /* int */ y) {
    // Summary:
    // Make the value of Y always fall in the middle of the line ,.. Height / 2
        return (Math.floor(y / this.cursorHeight) * (this.cursorHeight)) + this.cursorHeight / 2;
    }

TextBox.prototype.selStartCharPos = function() {
        return Math.min(this.selCharPos1, this.selCharPos2);
    }

TextBox.prototype.selEndCharPos = function() {
        return Math.max(this.selCharPos1, this.selCharPos2);
    }

TextBox.prototype.isSelection = function() {
        return (this.selCharPos1 > -1 && this.selCharPos2 > -1);
    }

TextBox.prototype.resetSelection = function() {

        this.selCharPos1 = -1;
        this.selCharPos2 = -1;
        if (this.styledMode) {
            this.sg.clear();
            this.selectionGraphicsClear = true;
        } else svgDocument.documentElement.deselectAll();

    }

TextBox.prototype.updateSelection = function() {

        if (!this.styledMode && this.isSelection()) { // Update Selecion,..
            var s = this.selStartCharPos();
            var e = this.selEndCharPos();
            this.textShape.getNode().selectSubString(s, (e - s));
            return;
        }

        // Batik Mode only!
        if (this.selStartCharPos() == this.selEndCharPos()) return;
        var spoint, epoint;
        spoint = this.getStartPositionOfChar(this.selStartCharPos());
        if (this.selEndCharPos() == this.text.length)
            epoint = this.getEndPositionOfChar(this.selEndCharPos() - 1);
        else
            epoint = this.getStartPositionOfChar(this.selEndCharPos());

        var x = spoint.x + this.margin;
        var y = spoint.y + this.margin - this.cursorBaseline;
        var w = epoint.x - spoint.x;
        var h = this.cursorHeight;

        if (this.isSelection()) {

            if (this.selectionGraphicsClear) {
                this.selectionGraphicsClear = false;
                var sy = spoint.y;

                while (sy != epoint.y) {
                    var lastCharPos = this.getCharPosFromXY(this.w, sy);
                    w = this.getEndPositionOfChar(lastCharPos).x - x;
                    sy = this.getStartPositionOfChar(lastCharPos + 1).y;
                }

                this.sRect = this.sg.drawRect(x, y, w, h);
                this.sRect.setAttribute('shape-rendering', 'optimizeSpeed');
                this.sRect.setOpacity(0.3);
            } else {
                if (spoint.y != epoint.y) {
                    w = this.getEndPositionOfChar(this.getCharPosFromXY(this.w, this.y)).x - x;
                }
                this.sRect.translate(x, y);
                this.sRect.setSize(w, h);
            }
        }
    }

TextBox.prototype.moveCursorLeftRight = function( /* int */ inc, /* boolean */ shiftDown) {
        this.calcSelectionEnds(shiftDown, this.cursorCharPos, this.cursorCharPos + inc);
        this.cursorCharPos += inc;
        this.updateSelection();
    }

TextBox.prototype.moveCursorUpDown = function( /* int */ inc, /* boolean */ shiftDown) {
        var oldCursorCharPos = this.cursorCharPos;
        var p = svgDocument.documentElement.createSVGPoint();
        p.x = this.cursorX;
        p.y = this.getYPositionOfChar(this.cursorCharPos) + inc;

        var pos = this.textShape.getNode().getCharNumAtPosition(p);
        if (pos != -1)
            this.cursorCharPos = pos;
        else {
            // sometimes the cursor is at the end of a line and eventhough three's more lines under, the cursor does not find
            // a char underneath itself because of linebreak (emty),...so we'll check if there are more lines under; if so move the 
            // cursor to the end of that line,... THE SAME FOR ABOVE!!
            if (inc > 0) { // GO DOWN
                for (i = this.cursorCharPos; i <= this.text.length; i++)
                    if (!this.isCharsAtSameLine(i, this.cursorCharPos)) {
                        this.cursorCharPos = i;
                        // Now go to the last char,...same login as the end key
                        for (j = this.cursorCharPos; j <= this.text.length && this.isCharsAtSameLine(j, this.cursorCharPos); j++);
                        this.cursorCharPos = j - 1;
                        break;
                    }
            } else { // GO UP
                for (i = this.cursorCharPos; i >= 0; i--)
                    if (!this.isCharsAtSameLine(i, this.cursorCharPos)) {
                        this.cursorCharPos = i;
                        break;
                    }
            }
        } // else [pos != -1]
        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.endKeyPressed = function(shiftDown) {

        var oldCursorCharPos = this.cursorCharPos;
        // first, move to char last pos check if it's in the same line (it could be that the cursor in the 
        // forth line for instance and 0 is the begin of the text),..effecent for single line text box
        if (this.isCharsAtSameLine(this.text.length - 1, this.cursorCharPos)) this.cursorCharPos = this.text.length;
        else {
            for (i = this.cursorCharPos; i <= this.text.length && this.isCharsAtSameLine(i, this.cursorCharPos); i++);
            this.cursorCharPos = i - 1;
        }

        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.homeKeyPressed = function( /* boolean */ shiftDown) {

        var oldCursorCharPos = this.cursorCharPos;
        // first, move to char pos 0 and check if it's in the same line,..effecent for single line text box
        if (this.text.length != 0 && this.cursorCharPos == this.text.length) this.cursorCharPos--;

        if (this.isCharsAtSameLine(0, this.cursorCharPos)) this.cursorCharPos = 0;
        else {
            for (i = this.cursorCharPos; i >= 0 && this.isCharsAtSameLine(i, this.cursorCharPos); i--);
            this.cursorCharPos = i + 1;
        }

        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.updateCursor = function() {

        if (this.cursorShape == null) return;

        // If the Text Box is empty then it's imposible to retrive the x,y coord so we set
        // the text of the Text Box with any text and delete it after getting x and y 

        var emptyText = false;

        if (this.text.length == 0) {
            emptyText = true;
            this.setText("A");
            this.cursorCharPos = 0;
        }

        var rot = 0; // Rotation
        // Inforce the range between 0 and text.length
        if (this.cursorCharPos < 0) this.cursorCharPos = 0;
        if (this.cursorCharPos >= this.text.length) {
            this.cursorCharPos = this.text.length;
            pos = this.getEndPositionOfChar(this.cursorCharPos - 1);
            rot = this.getRotationOfChar(this.cursorCharPos - 1);
        } else {
            pos = this.getStartPositionOfChar(this.cursorCharPos);
            rot = this.getRotationOfChar(this.cursorCharPos);
        }

        // Calc the x and y coordinates of the cursor
        this.cursorX = pos.x + this.margin;
        this.cursorY = pos.y + this.margin - this.cursorBaseline;

        if (this.insertMode && this.cursorCharPos != this.text.length &&
            this.text.substring(this.cursorCharPos, this.cursorCharPos + 1) != " ") {
            f = this.textShape.getNode().getExtentOfChar(this.cursorCharPos);
            this.cursorShape.setSize(f.width, this.cursorShape.getHeight());
            this.cursorShape.setOrigin((this.cursorWidth / 2), this.cursorShape.getHeight());
            this.cursorShape.rotate(rot);
            this.cursorShape.translate(f.x + this.margin, this.cursorY);
            if (this.hasFocus) this.cursorShape.setOpacity(0.4);
        } else {
            this.cursorShape.setSize(this.cursorWidth, this.cursorShape.getHeight());
            this.cursorShape.setOrigin((this.cursorWidth / 2), this.cursorShape.getHeight());
            this.cursorShape.rotate(rot);
            this.cursorShape.translate(this.cursorX - (this.cursorWidth / 2), this.cursorY);

            if (this.hasFocus) {
                if (this.insertMode)
                    this.cursorShape.setOpacity(0.4);
                else
                    this.cursorShape.setOpacity(1);
            } // hasFocus
        }

        // Undo the things that have been done !! :-)
        if (emptyText) {
            emptyText = false;
            this.setText("");
        }

        // Update Selecion,..
        this.updateSelection();
    }

TextBox.prototype.desktopMouseClick = function(evt) {
        this.lostFocus();
    }

TextBox.prototype.mouseClicked = function( /* MouseEvent */ e) {

        var i, j;
        this.gainFocus();
        // Here we already know the pos of the cursor (has been done in mousePressed)
        if (e.getClickCount() == 2) {
            // if the char of the cursor is a space then return;
            if (this.text.substring(this.cursorCharPos, this.cursorCharPos + 1) == " ") return;
            // first get the left end (space char or the begining of the para) of the current work
            for (i = this.cursorCharPos; i >= 0 && this.text.substring(i, i + 1) != " "; i--);
            this.selCharPos1 = i + 1;
            for (j = this.cursorCharPos; j < this.text.length && this.text.substring(j, j + 1) != " "; j++);
            this.selCharPos2 = j;
        }
        this.updateCursor();
    }

TextBox.prototype.mousePressed = function( /* MouseEvent */ e) {

    this.gainFocus();

    if (e.isShiftDown() && this.selCharPos1 == -1) this.selCharPos1 = this.cursorCharPos;

    var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);
    if (pos != -1) this.cursorCharPos = pos;

    if (e.isShiftDown()) this.selCharPos2 = this.cursorCharPos;
    else if (e.getButton() != BUTTON2) this.resetSelection(); // Don't remove selection if the right button is pressed

    this.updateCursor();
}

TextBox.prototype.mouseStartDragged = function( /* MouseEvent */ e) {

        if (!this.hasFocus) return;

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos1 = pos;
            if (viewerMode != Batik && !this.styledMode) // <=== This is a fix for ASV
                this.textShape.getNode().selectSubString(this.selCharPos1, 0);
        }
    }

TextBox.prototype.mouseDragged = function( /* MouseEvent */ e) {

        if ((!this.styledMode && viewerMode != Batik) || !this.hasFocus) return; // <=== This is a fix for ASV [if ASV return]

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos2 = pos;
            this.updateCursor();
        } else {
            this.resetSelection();
        }

    }

TextBox.prototype.mouseEndDragged = function( /* MouseEvent */ e) {

        if (this.styledMode) return;

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos2 = pos;
            this.updateCursor();
        } else {
            this.resetSelection();
        }

    }

TextBox.prototype.mouseReleased = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseEntered = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseExited = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseMoved = function( /* MouseEvent */ e) {}

TextBox.prototype.keyPressed = function( /* KeyEvent */ event) {}

TextBox.prototype.keyTyped = function( /* KeyEvent */ event) {
        var code = event.getKeyChar();
        if (!event.isControlDown() && !event.isAltDown() && code != VK_BACK_SPACE && code != VK_ENTER &&
            code != VK_DOWN && code != VK_UP && code != VK_HOME && code != VK_END && code != VK_LEFT &&
            code != VK_RIGHT && code != VK_DELETE && code != VK_INSERT && code <= 0xFF) {
            this.insertTextConsiderSelection(String.fromCharCode(event.getKeyChar()));
            this.updateCursor();
        } // if code
    }

TextBox.prototype.keyReleased = function( /* KeyEvent */ event) {

        var code = event.getKeyCode();
        var temp = this.getText();
        switch (code) {

            case VK_SPACE:
                this.resetSelection();
                break;
            case VK_ENTER:
                this.resetSelection();
                break;
            case VK_BACK_SPACE:
                if (this.isSelection()) {
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                } else if (this.cursorCharPos > 0) {
                    this.deleteText(this.cursorCharPos - 1, 1);
                    this.cursorCharPos--;
                }
                break;
            case VK_DELETE:
                if (this.isSelection()) {
                    // Copy to Clipboard if shift key is pressed
                    if (event.isShiftDown())
                        clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                } else
                    this.deleteText(this.cursorCharPos, 1);
                break;
                VK_INSERT
            case VK_INSERT:
                if (event.isShiftDown() && clipboard.getData() != null)
                    this.insertTextConsiderSelection(clipboard.getData());
                else
                if (!this.insertMode) {
                    this.insertMode = true
                } else {
                    this.insertMode = false;
                }
                break;
                /* Ctrl+A : Select All */
            case VK_A:
                if (event.isControlDown()) {
                    this.selCharPos1 = 0;
                    this.selCharPos2 = this.text.length;
                }
                break;
                /* Ctrl+C : Copy */
            case VK_C:
                if (event.isControlDown() && this.isSelection())
                    clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                break;
                /* Ctrl+X : Cut  */
            case VK_X:
                if (event.isControlDown() && this.isSelection()) {
                    clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                }
                break;
                /* Ctrl+V : Past */
            case VK_V:
                if (event.isControlDown() && clipboard.getData() != null)
                    this.insertTextConsiderSelection(clipboard.getData());
                break;
            case VK_DOWN:
                this.moveCursorUpDown(this.cursorHeight, event.isShiftDown());
                break;
            case VK_UP:
                this.moveCursorUpDown(-this.cursorHeight, event.isShiftDown());
                break;
            case VK_HOME:
                this.homeKeyPressed(event.isShiftDown());
                break;
            case VK_END:
                this.endKeyPressed(event.isShiftDown());
                break;
            case VK_LEFT:
                this.moveCursorLeftRight(-1, event.isShiftDown());
                break;
            case VK_RIGHT:
                this.moveCursorLeftRight(1, event.isShiftDown());
                break;
        }
        this.updateCursor();
    }

TextBox.prototype.selectAll = function(event) {
        this.selCharPos1 = 0;
        this.selCharPos2 = this.text.length;
        this.updateCursor();
    }

TextBox.prototype.gainFocus = function() {
        this.gainFocusTextBox();
    }

TextBox.prototype.gainFocusTextBox = function() {
        this.gainFocusCanvas();
        if (this.cursorShape != null)
            if (this.insertMode) this.cursorShape.setOpacity(0.4);
            else this.cursorShape.setOpacity(1);
    }

TextBox.prototype.lostFocus = function() {
        this.lostFocusTextBox();
    }

TextBox.prototype.lostFocusTextBox = function() {
        this.lostFocusCanvas();
        if (this.cursorShape != null)
            this.cursorShape.setOpacity(0);
        this.resetSelection(); // Because the way we support focus this might not be working as it's supposed to.
    }

TextBox.prototype.setFontSize = function( /* Size in pt*/ size) {
        this.font.setSize(size);
        this.setFont(this.font);
    }

TextBox.prototype.getFontSize = function() {
        return this.font.getSizeValue();
    }

TextBox.prototype.setFont = function( /* Font */ font) {

        this.font = font;

        if (this.contentg == null) return;

        this.contentg.setFont(font);

        var fm = font.getFontMetrics();
        this.cursorHeight = fm.getHeight();

        var temp = this.text;
        this.setText("A"); // We do this to ensure that the textShape object is always has text even when it has been empty.
        // Then we restore the original text.

        if (this.textShape != null)
            this.textShape.setFont(font);

        // Calculate the width of the cursor caret
        var fm = this.getFont().getFontMetrics();
        this.cursorWidth = fm.getStringWidth("i") / 4;

        // Get THE REAL baseline,.. 
        this.cursorBaseline = this.getBaseline();
        this.cursorShape.setSize(this.cursorWidth, this.cursorHeight);

        this.setSize(this.w, this.h);
        this.setText(temp);
        this.cursorCharPos = 0;

        this.updateCursor();
    }

TextBox.prototype.setmargin = function( /* int */ margin) {

        this.margin = margin;

        if (this.multiLine) {
            if (this.tv != null) {
                this.tv.translate(this.margin, this.margin);
                this.tv.setSize(this.w - (this.margin * 2), this.h - (this.margin * 2));
            }
        } else {
            if (this.textShape != null) {
                this.textShape.translate(this.margin, this.margin);
                this.setSize(this.w, 0);
            }
        }
        this.setText(this.getText());
        this.updateCursor();
    }

TextBox.prototype.onResize = function() {

        // Fix the height for single line Textbox
        if (!this.multiLine) this.h = this.cursorHeight + (this.margin * 2);

        this.onResizeCanvas();

        if (this.border != undefined && this.border != null)
            this.border.setSize(this.w, this.h);

        if (this.multiLine && this.tv != null)
            this.tv.setSize(this.w - (this.margin * 2), this.h - (this.margin * 2));

        this.setText(this.getText());
        this.updateCursor();
    }

TextBox.prototype.setStyledModeOff = function() {
        this.styledMode = false;
    }

TextBox.prototype.setStyledModeOn = function() {
        this.styledMode = true;
    }

TextBox.prototype.changeSelectionRectStyle = function( /* Color */ color, /* Color */ strokeColor, /* int */ strokeWidth) {

        this.selectionColor = color;
        this.selectionStrokeColor = strokeColor;
        this.selectionStrokeWidth = strokeWidth;

        this.sg.setColor(this.selectionColor);
        this.sg.setStrokeColor(this.selectionStrokeColor);
        this.sg.setStrokeWidth(this.selectionStrokeWidth);

    }

TextBox.prototype.getPreferredSize = function( /* int */ cols) {
    // Summary:
    // Gets the preferred size of this component.

        if (cols == undefined) return this.getSize();
        var fm = this.getFont().getFontMetrics();
        var str = "";
        for (var i = 0; i < cols; i++) str += "M";
        return new Dimension(fm.getStringWidth(str), this.h);
    }

TextBox.prototype.toString = function() {
    return this.className + " [ caption: " + this.caption + ", name: " + this.name + "]";
}