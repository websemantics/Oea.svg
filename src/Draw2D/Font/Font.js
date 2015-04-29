/**
 * Draw2D.svg : Font
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002
 * @package   websemantics/oea/draw2d.svg
 */

function Font(name, style, size) {
        
        var argv = Font.arguments;
        var argc = Font.length;
        this.className = "Font";

        this.PLAIN = 0;
        this.BOLD = 1;
        this.ITALIC = 2;

        if (argv.length > 0)
        	this.initFont(name, style, size);
    }

Font.prototype.initFont = function(name, style, size) {
        if (name == undefined) name = "Helvetica";
        if (style == undefined) style = "Normal";
        if (size == undefined) size = "16pt";
        this.setName(name);
        this.setStyle(style);
        this.setSize(size);
    }

Font.prototype.getSize = function() {
        return this.size;
    }

Font.prototype.getSizeValue = function() {
        var ind = this.size.indexOf('pt');
        if (ind != -1) return parseFloat(this.size.substring(0, ind));
        return this.size;
    }

Font.prototype.getStyle = function() {
        return this.style;
    }

Font.prototype.getNamedStyle = function() {
        if (this.style == this.PLAIN || this.style == "normal") return "Normal";
        if (this.style == this.BOLD || this.style == "bold") return "Bold";
        if (this.style == this.ITALIC || this.style == "italic") return "Italic";
        return "Normal";
    }

Font.prototype.getName = function() {
        return this.name;
    }

Font.prototype.setSize = function(size) {
        this.size = size;
    }

Font.prototype.setStyle = function(style) {
        this.style = style;
    }

Font.prototype.setName = function(name) {
        this.name = name;
    }

Font.prototype.getFont = function() {
        return this;
    }

Font.prototype.setFont = function(font) {
        this.init(font.name, font.style, font.size);
    }

Font.prototype.getFontMetrics = function() {
        return (new FontMetrics(this));
    }

Font.prototype.clone = function( /* String */ format) {
        return new Font(this.name, this.Style, this.size);
    }

Font.prototype.toString = function() {
    return "Name = " + this.name + ", Style = " + this.getNamedStyle() + ", Size = " + this.size;
}