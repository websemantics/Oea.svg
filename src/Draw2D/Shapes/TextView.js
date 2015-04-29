/**
 * Draw2D.svg : Line
 *
 * Support: SVG 1.2 only
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

var common_region_id = "region_";
var region_counter = 0;

/**
 * Internal region APIs
 */

function rg_int_getRegionId(){return (common_region_id+(region_counter++));}

/**
 * Class FlowParagraph
 */

FlowParagraph.prototype = new Shape();

function FlowParagraph(textView, flowDivNode, text) {
        var argv = FlowParagraph.arguments;
        var argc = FlowParagraph.length;
        this.className = "FlowParagraph";

        if (argv.length > 0)
            this.initFlowParagraph(textView, flowDivNode, text);
    }

FlowParagraph.prototype.initFlowParagraph = function(textView, flowDivNode, text) {
        this.textView = textView; // Parent shape
        this.Node = null;
        this.create(flowDivNode, text);
    }

FlowParagraph.prototype.create = function(flowDivNode, text) {
        this.Node = createSVGNode("flowPara", {}, flowDivNode);
        if (text != undefined)
            this.Node.appendChild(svgDocument.createTextNode(text));
    }

FlowParagraph.prototype.addFlowSpan = function(text) {
        var flowSpan = createSVGNode("flowSpan", {
            fill: "red"
        }, this.getNode());
        flowSpan.appendChild(svgDocument.createTextNode(text));
        this.textView.refresh();
    }

FlowParagraph.prototype.addColoredFlowSpan = function(text, color) {
        var flowSpan = createSVGNode("flowSpan", {
            fill: color
        }, this.getNode());
        flowSpan.appendChild(svgDocument.createTextNode(text));
        this.textView.refresh();
    }

FlowParagraph.prototype.setFont = function(font) {
        var style = font.getStyle();
        var attr = 'font-style';
        if (style == "bold") attr = 'font-weight';
        this.Node.setAttribute('font-family', font.getName());
        this.Node.setAttribute(attr, style);
        this.Node.setAttribute('font-size', font.getSize());
    }

FlowParagraph.prototype.getText = function() {

        var ret = "";

        if (this.Node.firstChild.data != undefined)
            ret += this.Node.firstChild.data + "\n";

        var flowSpans = this.getNode().getElementsByTagName("flowSpan");

        for (var i = 0; i < flowSpans.length; i++) {
            if (flowSpans.item(i).firstChild.data != undefined)
                ret += flowSpans.item(i).firstChild.data + "\n";
        }

        if (flowSpans.length == 0) return this.Node.firstChild.data;

        return ret;
    }

FlowParagraph.prototype.setText = function(text) {
        this.Node.firstChild.data = text;
    }

FlowParagraph.prototype.insertText = function(charPos, text) {
        this.Node.firstChild.insertData(charPos, text);
    }

FlowParagraph.prototype.replaceText = function(charPos, count, text) {
        this.Node.firstChild.replaceData(charPos, count, text);
    }

FlowParagraph.prototype.deleteText = function(charPos, count) {
        this.Node.firstChild.deleteData(charPos, count);
    }

FlowParagraph.prototype.selectAll = function() {
        var len = this.Node.firstChild.data.length;
        this.Node.selectSubString(0, len);
    }

FlowParagraph.prototype.getNode = function() {
    return this.Node;
}

/**
 * Class TextView
 */

TextView.prototype = new Text();

function TextView(x, y, w, h, text, regionShape, graphics) {
        var argv = TextView.arguments;
        var argc = TextView.length;
        this.className = "TextView";

        if (argv.length > 0)
          this.initTextView(x, y, w, h, text, regionShape, graphics);
    }

TextView.prototype.initTextView = function(x, y, w, h, text, regionShape, graphics) {
        this.paraCounter = 0;
        this.initNode(x, y, w, h, 0, 1);
        this.regionShape = regionShape;
        
        // To save flowDiv node [used by addParagraph)
        this.flowDiv = null; 
        
        // To save all slowParagraphs objects 
        this.flowPara = new Array(); 
        this.copyProperties(graphics);
        this.font = graphics.getFont();
        this.create(text, graphics);
    }

TextView.prototype.create = function(text, graphics) {
        var xlinkns = "http://www.w3.org/1999/xlink";

        this.Node = createSVGNode("g", {}, graphics);

        // Get id of the region shape 
        var regionId = rg_int_getRegionId();

        if (this.regionShape == undefined || this.regionShape == null)
            this.regionShape = graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
        else this.regionShape = this.regionShape.clone(graphics);

        this.regionShape.setId(regionId);
        this.regionShape.setVisibility(false);
        // Create needed nodes
        var style = this.font.getStyle();
        var attr = 'font-style';
        if (style == "bold") attr = 'font-weight';

        var flowNodeName = "flow"; // <== Name of the flow element is different in Batik and ASV
        if (viewerMode == Batik) flowNodeName = "flowRoot";
        this.flow = createSVGNode(flowNodeName, {
            'font-family': this.font.getName(),
            attr: style,
            'font-size': this.font.getSize(),
            fill: this.getColor()
        }, this.getNode());
        this.flowRegion = createSVGNode("flowRegion", {}, this.flow);

        // Batik does not support element 'region',...
        if (viewerMode == Batik)
            this.regionShape.setParent(this.flowRegion);
        else {
            var region = createSVGNode("region", {}, this.flowRegion);
            region.setAttributeNS(xlinkns, "xlink:href", '#' + regionId);
            this.regionShape.setParent(this.Node);
        }

        this.flowDiv = createSVGNode("flowDiv", {}, this.flow);

        if (text != undefined || text != null) this.addParagraph(text);

        this.transform();

        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.changeRegionShape = function( /* Shape */ shape) {

        var regionId = this.regionShape.getId();
        var oldRegionShape = this.regionShape;
        oldRegionShape.setId("xxxxxyyyyyzzzzz");

        this.regionShape = shape;
        this.regionShape.setId(regionId);

        if (viewerMode == Batik) {
            // this.flowRegion.replaceChild(this.regionShape.getNode(),oldRegionShape.getNode()); // Does not work rightly
            // oldRegionShape.dispose();
        } else {
            this.regionShape.setParent(this.getNode());
            oldRegionShape.dispose();
        }

        this.updateRegionShape();
    }

TextView.prototype.updateRegionShapeProperties = function( /* Shape */ shape) {

        if (shape instanceof RRectangle) {
            this.regionShape.setSize(shape.w, shape.h);
            this.regionShape.setRadius(shape.rx, shape.ry);
            this.regionShape.translate(shape.x, shape.y);
        }
        if (shape instanceof Oval) {
            this.regionShape.setRadius(shape.radiusX, shape.radiusY);
            this.regionShape.translate(shape.x, shape.y);
        }
        if (shape instanceof Polygon) {
            this.regionShape.setAttribute("points", shape.getAttribute("points"));
            this.regionShape.translate(shape.x, shape.y);
        }
    }

TextView.prototype.updateRegionShape = function() {

        if (this.regionShape instanceof Oval) {
            this.regionShape.setRadius(this.getWidth() / 2, this.getHeight() / 2);
        }

        if (this.regionShape instanceof Rectangle || this.regionShape instanceof RRectangle) {
            this.regionShape.setSize(this.getWidth(), this.getHeight());
        }
    }

TextView.prototype.addParagraph = function(text) {
        var len = parseInt(this.flowPara.length);
        this.flowPara[len] = new FlowParagraph(this, this.flowDiv, text);
        this.flowPara[len].setFont(this.font);

        if (viewerMode == Batik) this.refresh();

        return this.flowPara[len];
    }

TextView.prototype.insertParagraph = function(text) {
        var len = parseInt(this.flowPara.length);

        this.addParagraph(text);

        for (var i = len; i > 0; i--)
            this.flowPara[i].setText(this.flowPara[i - 1].getText());

        this.flowPara[0].setText(text);

        if (viewerMode == Batik) this.refresh();

        return this.flowPara[0];
    }

TextView.prototype.getParagraph = function() {
        var len = parseInt(this.flowPara.length);
        this.flowPara[len] = new FlowParagraph(this, this.flowDiv);
        this.flowPara[len].setFont(this.font);
        return this.flowPara[len];
    }

TextView.prototype.refresh = function() {
        // Notice:
        // Careful,..with Batik 1.6 don't attempt to add to a parent unless the 
        // structure of the flowRoot is complete,..have at least one flowPara
        var len = parseInt(this.flowPara.length);
        if (len == 0) return;
        this.getNode().appendChild(this.flow); // A Fix to a Batik bug: Refresh the current view of the TextView
    }

TextView.prototype.setTextAlign = function(ta) {
        this.setAttribute('style', "text-align:" + ta);
    }

TextView.prototype.setFont = function(font) {
        this.font = font;
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].setFont(font);
        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.setColor = function(color) {
        this.color = color;
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].setColor(color);
        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.selectAll = function() {
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].selectAll(); // Does not work!!
    }

TextView.prototype.getText = function() {
        var ret = "";
        for (var i = 0; i < this.flowPara.length; i++)
            ret += this.flowPara[i].getText() + "\n";

        return ret;
    }

TextView.prototype.clear = function() {
        for (var i = 0; i < this.flowPara.length; i++) {
            this.flowPara[i].dispose();
            delete this.flowPara[i];
        }
        this.flowPara = new Array();
    }

TextView.prototype.onResize = function() {
        this.updateRegionShape();
        return this.transform();
    }
