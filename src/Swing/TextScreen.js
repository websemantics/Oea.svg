/**
 * Swing.svg : TextScreen
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class TextScreen
 *
 * Can be used to display text (not for editing)
 * 
 */

TextScreen.prototype= new Panel(); 

function TextScreen(x, y, w, h) {
        var argv = TextScreen.arguments;
        var argc = TextScreen.length;

        /* String */
        this.name = "TextScreen";
        /* String */
        this.className = "TextScreen";
        /* TextView*/
        this.textView = null; // The text view shape to display text
        /* winBorder*/
        this.textBorder = null; // the border
        /* Rectangle*/
        this.textRect = null; // white background
        /* TextView*/
        this.textView = null; // The text view shape to display text

        if (argv.length > 0) 
        	this.initTextScreen(x, y, w, h);
    }

TextScreen.prototype.initTextScreen = function(x, y, w, h) {
        this.initPanel(x, y, w, h);
    }

TextScreen.prototype.createSVGContent = function() {
        this.createSVGContentTextScreen();
    }

TextScreen.prototype.createSVGContentTextScreen = function() {
        this.createSVGContentPanel();
        this.contentg = this.getGraphics();
        this.textBorder = this.contentg.drawWinBorder(0, 0, this.w, this.h);
        this.contentg.setColor("white");
        this.textRect = this.contentg.drawRect(2, 2, this.w - 1, this.h);
        this.contentg.setColor("black");
        this.textBorder.setFaceDown();
        this.textView = this.contentg.drawTextView(4, 4, this.w - 3, this.h - 10);
        this.textView.setFont(new Font("Arial", "normal", "10pt"));
        this.textView.setAttribute('shape-rendering', 'optimizeSpeed');
    }

TextScreen.prototype.addParagraph = function(text) {
        return this.textView.addParagraph(text);
    }

TextScreen.prototype.insertParagraph = function(text) {
        return this.textView.insertParagraph(text);
    }

TextScreen.prototype.clear = function() {
        return this.textView.clear();
    }

TextScreen.prototype.onResize = function() {
        this.onResizeTextScreen();
    }

TextScreen.prototype.onResizeTextScreen = function() {
    this.onResizePanel();
    if (this.textBorder != null)
        this.textBorder.setSize(this.w, this.h);
    if (this.textRect != null)
        this.textRect.setSize(this.w, this.h);
}