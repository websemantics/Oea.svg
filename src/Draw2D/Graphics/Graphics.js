/**
 * Draw2D.svg : Graphics
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002 -> 5th November 2004 -> 18th July 2005
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var common_graphics_id = "Graphics_";
var graphics_counter = 0;

var defaultWidth = 400 ;
var defaultHeight = 400;

/**
 * Graphics External APIs
 */

function createGraphics(x,y,w,h,id,layer){return (new Graphics(x,y,w,h,id,layer));}

function getGraphicsId(){return (common_graphics_id+(graphics_counter++));}

/**
 * Class Graphics Context.
 * 
 * This class work similarly to Windows Device Context
 */

Graphics.prototype= new Node(); 

function Graphics(x, y, w, h, id, layer) {
        var argv = Graphics.arguments;
        var argc = Graphics.length;
        
        this.id = null;
        this.font = null;
        this.color = null;
        this.strokeWidth = null;
        this.backgroundColor = null;
        this.strokeColor = null;
        this.backgroundRect = null;
        this.clipRect = null;
        this.clipNode = null;
        
        // Call initilize ,.. 
        if (argv.length == 0)
            this.initGraphics(0, 0, defaultWidth, defaultHeight, null, null);
        else this.initGraphics(x, y, w, h, id, layer);
    }

Graphics.prototype.initGraphics = function(x, y, w, h, id, layer) {
        if (!id || id == null) 
          this.id = getGraphicsId();
        else this.id = id;

        this.initNode(x, y, w, h, 0, 1);
        this.setOriginToCenter();
        
        // The element in the SVG document that has this object as a child!!!
        if (!layer || layer == null) this.layer = ly_getDefualtLayer();
        else this.layer = layer;
        
        // initialise color, backgroundColor, font and other stuff 
        this.setColor("black");
        this.setStrokeColor(null);
        this.setStrokeWidth(0);
        this.font = new Font("Helvetica", "normal", "10pt");
        this.create();
    }

Graphics.prototype.create = function() {
        // Summary:
        // Create the SVG 'g' element for the Graphics context object 

        if (svgDocument.getElementById(this.id) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.id
        }, this.layer);
        this.translate(this.x, this.y);
    }

Graphics.prototype.setColor = function(color) {
        this.color = color;
    }

Graphics.prototype.getColor = function() {
        if (this.color == null) return "none";
        return this.color;
    }

Graphics.prototype.setStrokeColor = function(strokeColor) {
        this.strokeColor = strokeColor;
    }

Graphics.prototype.getStrokeColor = function() {
        var strokeColor = this.strokeColor;
        if (this.strokeColor == null) strokeColor = "none";
        return strokeColor;
    }

Graphics.prototype.setStrokeWidth = function(stroke) {
        this.strokeWidth = stroke;
    }

Graphics.prototype.getStrokeWidth = function() {
        return this.strokeWidth;
    }

Graphics.prototype.setFont = function(font) {
        this.font = font;
    }

Graphics.prototype.getFont = function() {
        return this.font;
    }

Graphics.prototype.getFontMetrics = function() {
        return (new FontMetrics(this.font));
    }

Graphics.prototype.addGraphics = function(g) {
        this.addChild(g.getNode());
    }

Graphics.prototype.drawLine = function(x1, y1, x2, y2) {
        return (new Line(x1, y1, x2, y2, this));
    }

Graphics.prototype.drawRect = function(x, y, w, h) {
        return (new Rectangle(x, y, w, h, this));
    }

Graphics.prototype.drawRoundRect = function(x, y, w, h, rx, ry) {
        return (new RRectangle(x, y, w, h, rx, ry, this));
    }

Graphics.prototype.drawCircle = function(x, y, r) {
        return (new Circle(x, y, r, this));
    }

Graphics.prototype.drawOval = function(x, y, rx, ry) {
        return (new Oval(x, y, rx, ry, this));
    }

Graphics.prototype.drawPath = function(x, y, d) {
        return (new Path(x, y, d, this));
    }

Graphics.prototype.drawPolygon = function(x, y, xx, yy) {
        return (new Polygon(x, y, xx, yy, this));
    }

Graphics.prototype.drawImage = function(x, y, w, h, path) {
        return (new Image(x, y, w, h, path, this));
    }

Graphics.prototype.drawSpinnerImage = function(x, y, w, h, name, color) {
        // New: 1 May 2015
        return (new SpinnerImage(x, y, w, h, name, color, this));
    }

Graphics.prototype.drawText = function(x, y, string, nodeType, parentSvgNode) {
        return (new Text(x, y, string, this, nodeType, parentSvgNode));
    }

Graphics.prototype.drawTextView = function(x, y, w, h, string, regionShape) {
        if (regionShape == undefined) regionShape = null;
        return (new TextView(x, y, w, h, string, regionShape, this));
    }

Graphics.prototype.drawWinBorder = function(x, y, w, h) {
        return (new WinBorder(x, y, w, h, this));
    }

Graphics.prototype.drawStepBorder = function(x, y, w, h) {
        return (new StepBorder(x, y, w, h, this));
    }

Graphics.prototype.drawBoxBorder = function(x, y, w, h, depth) {
        return (new BoxBorder(x, y, w, h, depth, this));
    }

Graphics.prototype.removeBackground = function() {
        if (this.backgroundRect != null) {
            this.backgroundRect.dispose();
            this.backgroundRect = null;
        }
    }

Graphics.prototype.setBackground = function(backgroundColor) {
        this.backgroundColor = backgroundColor;
        if (this.backgroundRect == null) {
            this.backgroundRect = this.drawRect(0, 0, this.w, this.h);
            this.backgroundRect.setId(this.id + "_BackgroundColor");
        }
        this.backgroundRect.setColor(this.getBackground());
    }

Graphics.prototype.getBackground = function() {
        // return 'none' if backgroundColor color = null 
        
        if (this.backgroundColor == null) return "none";
        else return this.backgroundColor;
    }

Graphics.prototype.setClipOn = function() {
        if (this.clipRect == null) {
            this.clipRect = this.drawRect(0, 0, this.w, this.h, this);
            this.clipRect.setId(this.id + "-clip-rect");
        }
        this.clipNode = createSVGNode("clipPath", {
            id: this.id + "-clip"
        });
        this.clipNode.appendChild(this.clipRect.getNode());
        this.setAttribute('clip-path', 'url(#' + this.id + '-clip)');
    }

Graphics.prototype.setClipOff = function() {
        this.removeAttribute('clip-path');
        deleteSVGNode(this.clipNode);
        this.clipRect.dispose();
        this.clipRect = null;
        this.clipNode = null;
    }

Graphics.prototype.onResize = function() {
        if (this.clipRect != null) this.clipRect.setSize(this.w, this.h);
        if (this.backgroundRect != null) this.backgroundRect.setSize(this.w, this.h);
    }

Graphics.prototype.clear = function() {
        // Summary:
        // Clear all nodes (remove)
        var children = this.getNode().childNodes;
        for (var i = 0; i < children.length; i++) deleteSVGNode(children.item(i));
    }

Graphics.prototype.oldClear = function() {
    this.setId("graphics_temp");
    deleteSVGNode(this.Node);
    this.create();
}
