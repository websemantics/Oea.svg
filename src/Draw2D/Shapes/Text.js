/**
 * Draw2D.svg : Text
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22nd November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

var common_text_path_id = "text-path-";
var text_path_counter = 0;

/**
 * Internal Text Path APIs:
 */
function tp_int_getTextPathId(){return (common_text_path_id+(text_path_counter++));}

/**
 * Class Text
 */

Text.prototype = new Shape();

function Text(x, y, str, graphics, nodeType, parentSvgNode) {
        var argv = Text.arguments;
        var argc = Text.length;
        this.className = "Text";

        if (argv.length > 0)
            this.initText(x, y, str, graphics, nodeType, parentSvgNode);
    }

Text.prototype.initText = function(x, y, str, graphics, nodeType, parentSvgNode) {
    this.textPath == null;
    if (nodeType == undefined) nodeType = "text";
    this.nodeType = nodeType; // 'text' ot 'tspan'
    this.copyProperties(graphics);
    this.font = graphics.getFont();
    var fm = new FontMetrics(this.font);
    this.initNode(x, y, fm.getStringWidth(str), fm.getHeight(), 0, 1);
    this.create(str, graphics, parentSvgNode);
}

Text.prototype.create = function(str, graphics, parentSvgNode) {
				// Summary:
				// nodeType: 'text' or 'tspan' : 'text' is Default
				// if 'tspan' is used then connect it to the previous 'text'
				// element and that by provide the 'text element' as parentSvgNode
				// this is useful when user wants to select all the text drawn
				//
				//  Font Style is: PLAIN, BOLD or ITALIC
				// =======================================:
				// 
				// SVG properties :
				// ================
				// 'font-family' : Initial:    depends on user agent  
				// 'font-style' :  normal | italic | oblique | inherit  
				// 'font-variant' : normal | small-caps | inherit  
				// 'font-weight' :    normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit  
				// 'font-stretch':    normal | wider | narrower |
				// 'font-size' :    <absolute-size> | <relative-size> |
				
        if (parentSvgNode == undefined || parentSvgNode == null) 
        	parentSvgNode = graphics;

        var style = this.font.getNamedStyle();
        var attr = 'font-style';
        if (style == "bold")
            attr = 'font-weight';
        this.Node = createSVGTextNode(str, {
            x: 0,
            y: 0,
            'font-family': this.font.getName(),
            'font-size': this.font.getSize(),
            fill: this.getColor()
        }, parentSvgNode, this.nodeType);
        //this.Node=createSVGTextNode(str,{x: 0, y:0,'font-family':this.font.getName(),attr: style,'font-size':this.font.getSize(), fill: this.getColor()},parentSvgNode,this.nodeType);
        this.transform();
    }

Text.prototype.setTextColor = function(color) {
        this.setAttribute('fill', color);
    }

Text.prototype.getTextColor = function() {
        return this.getAttribute('fill');
    }

Text.prototype.setToBaseLine = function() {
        // this.setAttribute('baseline-shift',"-100%"); // [does not work with Batik 1.6]
        this.setAttribute('baseline-shift', -this.getBaseline());
    }

Text.prototype.setText = function(string) {
        if (this.textPath != null) this.textPath.firstChild.data = string;
        else
            this.Node.firstChild.textContent = string;
    }

Text.prototype.getText = function() {
        if (this.textPath != null) return (this.textPath.firstChild.data);
        else
            return (this.Node.firstChild.data)
    }

Text.prototype.insertText = function(charPos, text) {
        this.Node.firstChild.insertData(charPos, text);
    }

Text.prototype.replaceText = function(charPos, count, text) {
        this.Node.firstChild.replaceData(charPos, count, text);
    }

Text.prototype.deleteText = function(charPos, count) {
        this.Node.firstChild.deleteData(charPos, count);
    }

Text.prototype.setFontSize = function(fontSize) {
        this.font.setSize(fontSize);
        this.setFont(this.font);
    }

Text.prototype.setFont = function(font) {
        this.font = font;
        var style = font.getStyle();
        var attr = 'font-style';
        
        if (style == "bold") 
        	attr = 'font-weight';
        
        this.setAttribute('font-family', font.getName());
        this.setAttribute(attr, style);
        this.setAttribute('font-size', font.getSize());
        
        // update baseline-shift attribute
        if (this.hasAttribute('baseline-shift')) this.setAttribute('baseline-shift', -this.getBaseline());
    }

Text.prototype.setTextPath = function(path) {
        var xlinkns = "http://www.w3.org/1999/xlink";
        var textPathId = tp_int_getTextPathId();
        path.setId(textPathId);
        df_addToDefs(path);
        this.textPath = createSVGNode("textPath", {});
        this.textPath.setAttributeNS(xlinkns, "xlink:href", "#" + textPathId);
        this.textPath.appendChild(this.Node.firstChild);
        this.addChild(this.textPath);
    }

Text.prototype.getStringWidth = function() {
        if (this.Node == null) return 0;
        return this.Node.getComputedTextLength();
    }

Text.prototype.getStringHeight = function() {
        var fm = new FontMetrics(this.font);
        return fm.getHeight();
    }

Text.prototype.getBaseline = function() {
        var fm = new FontMetrics(this.font);
        return fm.getBaseline();
    }

Text.prototype.onResize = function() {}
