/**
 * Draw2D.svg : FontMetrics
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002
 * @package   websemantics/oea/draw2d.svg
 */

function FontMetrics(font) {

        var argv = FontMetrics.arguments;
        var argc = FontMetrics.length;
        this.className = "FontMetrics";

        // From pt to px [ by Experiments ;-) ]
        this.pt2px = 1.60; 

        // Ratio between the height and baseline!
        this.h2bl = 0.80; 
        
        if (argv.length > 0)
        	this.initFontMetrics(font);
    }

FontMetrics.prototype.initFontMetrics = function(font) {
        this.setFont(font);
    }

FontMetrics.prototype.setFont = function(font) {
        this.font = font;
    }

FontMetrics.prototype.getAscent = function() {
        return 0;
    }

FontMetrics.prototype.getDescent = function() {
        return 0;
    }

FontMetrics.prototype.getLeading = function() {
        return 0;
    }

FontMetrics.prototype.getHeight = function() {
        return this.font.getSizeValue() * this.pt2px;
    }

FontMetrics.prototype.getBaseline = function() {
        return this.getHeight() * this.h2bl;
    }

FontMetrics.prototype.getFontMetrics = function() {
        return this;
    }

FontMetrics.prototype.getFontMetrics = function(font) {
        return new FontMetrics(font);
    }

FontMetrics.prototype.getStringWidth = function(text) {
        var node = createSVGTextNode(text, {
            x: 0,
            y: 0,
            'font-family': this.font.getName(),
            'font-style': this.font.getStyle(),
            'font-size': this.font.getSize(),
            fill: 'none'
        });
        var len = node.getComputedTextLength(); // [does not work with avs 6 ]
        deleteSVGNode(node);
        return len;
    }

FontMetrics.prototype.toString = function() {
    return "FontMetrics : font [ " + this.font.toString() + " ]";
}