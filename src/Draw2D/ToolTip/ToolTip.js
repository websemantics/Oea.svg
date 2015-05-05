/**
 * Draw2D.svg : Tooltip
 *
 * Tooltip only supports immediate svg nodes (circle, rect, path, etc) or
 * grouped nodes (alternative text is attached to the group element:
 *  <g class="text"><rect /><circle/></g>)
 * Tooltip uses the 'class' attribute to attaches the alternative text to,..
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     24th December 2004
 * @package   websemantics/oea/draw2d.svg
 */

 /**
  * Global Variables
  */

// A refernce to the Graphics of the Tooltip 'g'
var toolTipNode=null;              
var toolTipNodeId="ToolTip";
var toolTipFontSize=9;
var toolTipFontSizeUnit='pt';
var toolTipFontName='Helvetica';
var toolTipFontStyle='normal';
var toolTipTextColor='Black';
var toolTipBorderColor='black';
var toolTipBorderWidth=1;
var toolTipBackgroundColor='rgb(255,255,225)';

// Don't delete the tooltip as long as the mouse is over the node  
var toolTipMouseOverFlag=false; 

// Turn off/on the toolTip completely [true = on, false = off ]
var toolTipOnOffFlag=true;      

// Graphics Context of the toolTip
var toolTipGraphics=null;       

/*
 * Internal ToolTip APIs:
 *
 */

function tp_int_getToolTipFontSize() {
        var scale = (svgDocument.rootElement.currentScale);
        return ((toolTipFontSize / scale) + toolTipFontSizeUnit);
    }

function tp_int_getToolTipNode() {
        return (svgDocument.getElementById(toolTipNodeId));
    }

function tp_int_disposeToolTipNode() {
        deleteSVGNodeById(toolTipNodeId);
    }

/*
 * External ToolTip APIs:
 *
 */

function tp_setToolTipFont(font) {
        toolTipFontSize = font.getSize();
        toolTipFontName = font.getName();
        toolTipFontStyle = font.getStyle();
    }

function tp_getToolTipFont() {
        return (new Font(toolTipFontName, toolTipFontStyle, toolTipFontSize));
    }

function tp_setToolTipTextColor(color) {
        toolTipTextColor = color;
    }

function tp_getToolTipTextColor() {
        return toolTipTextColor;
    }

function tp_setToolTipBorderColor(color) {
        toolTipBorderColor = color;
    }

function tp_getToolTipBorderColor() {
        return toolTipBorderColor;
    }

function tp_setToolTipBackgroundColor(color) {
        toolTipBackgroundColor = color;
    }

function tp_getToolTipBackgroundColor() {
        return toolTipBackgroundColor;
    }

function tp_setToolTipBorderWidth(width) {
        toolTipBorderWidth = width;
    }

function tp_getToolTipBorderWidth() {
        return toolTipBorderWidth;
    }

function tp_turnToolTipOn() {
				// Summary:
				// Turn off/on the toolTip completely [true = on, false = off ]
        toolTipOnOffFlag = true; 
    }

function tp_turnToolTipOff() {
				// summary:
				// Turn off/on the toolTip completely [true = on, false = off ]
        toolTipOnOffFlag = false;
    }

function tp_setToolTipText(string, node) {
				// Note:the 'class' attribute of the node is being used 
			  //          to save the text of the ToolTip text
        if (node == undefined || node == null) return;
        node.addEventListener("mousemove", tp_int_mouse_over, false);
        node.addEventListener("mouseover", tp_int_mouse_over, false);
        node.addEventListener("mouseout", tp_int_mouse_out, false);
        node.setAttribute("class", string);
    }

function tp_removeToolTipText(node) {
        if (node == undefined || node == null) return;
        node.removeEventListener("mousemove", tp_int_mouse_over, false);
        node.removeEventListener("mouseover", tp_int_mouse_over, false);
        node.removeEventListener("mouseout", tp_int_mouse_out, false);
        tp_disposeToolTipNode();
    }

function tp_int_createToolTip(evt) {
        
        var scale = (svgDocument.rootElement.currentScale);
        var g = new Graphics(0, 0, 0, 0, toolTipNodeId);
        
        g.setAttribute("pointer-events", "none");
        g.setFont(new Font(toolTipFontName, toolTipFontStyle, tp_int_getToolTipFontSize()));
        
        var fm = g.getFontMetrics();
        var toolTipText = evt.target.getAttribute('class');
        
        // If the tooltip text is not found on the node itself try its parent! [in case of group]
        if (toolTipText == null || toolTipText == "") {
            toolTipText = evt.target.parentNode.getAttribute('class');
            if (toolTipText == null || toolTipText == 'null' || toolTipText == "") return;
        }
        
        var w = (fm.getStringWidth(toolTipText) + (7 / scale));
        var h = (fm.getHeight() + (4 / scale));
        var xd = 4 / scale;
        var yd = 2 / scale;
        
        // Draw the shadow  
        g.setColor('black');
        var shw = g.drawRect(3 / scale, 3 / scale, w, h);
        shw.setOpacity(0.5);
        
        // Draw the border 
        g.setColor(toolTipBackgroundColor);
        g.setStrokeWidth(toolTipBorderWidth / scale);
        g.setStrokeColor(toolTipBorderColor);
        g.drawRect(0, 0, w, h);
        
        // Print the text 
        g.setColor(toolTipTextColor);
        var text = g.drawText(xd, yd, toolTipText);
        
        text.moveBy(0, 11 / scale); // OR text.setToBaseLine(); <== [ Supported by Adobe but not with Batik! ]
        // you can turn anti-aliasing off on particular objects (or on the whole drawing) 
        // by setting property 'shape-rendering' to 'crispEdges'
        // shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | nherit ) 
        g.setAttribute('shape-rendering', 'crispEdges');
        toolTipLayer.addGraphics(g);
        return g;
    }

function tp_int_mouse_over(evt) {

        var scale = (svgDocument.rootElement.currentScale);

        // Create the toolTip node once,..
        if (!toolTipMouseOverFlag) {
            toolTipMouseOverFlag = true;
            tp_int_disposeToolTipNode();
            toolTipGraphics = tp_int_createToolTip(evt);
        }
        
        // If the Graphics Contect of the toolTip is not defined, exit.
        if (toolTipGraphics == null) return;
        
        // Don't show the toolTip if the 'toolTipOnOffFlag' is turned off
        toolTipGraphics.setVisibility(toolTipOnOffFlag);
        
        // Otherwise move the toolTip
        var tx = svgDocument.rootElement.currentTranslate.x;
        var ty = svgDocument.rootElement.currentTranslate.y;
        var x = ((evt.clientX - tx + 13));
        var y = ((evt.clientY - ty));
        toolTipGraphics.translate(x / scale, y / scale);
    }

function tp_int_mouse_out(evt) {
        tp_disposeToolTipNode();
    }

function tp_disposeToolTipNode() {
    toolTipNode = tp_int_getToolTipNode();
    if (toolTipNode == null) return;
    toolTipNode.setAttribute('visibility', 'hidden');
    toolTipMouseOverFlag = false;
    if (toolTipGraphics != null) {
        toolTipGraphics.dispose();
        toolTipGraphics = null;
    }
}