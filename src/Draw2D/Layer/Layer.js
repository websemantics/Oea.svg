/**
 * Draw2D.svg : Layer
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     10th November 2004
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var common_layer_id = "layer_";
var layers_counter = 0;
var layer_Register=new Array();

// This is the default layer to be used by everyone (if not otherwise stated) !
var defualt_layer = null; 

/**
 * External Layer APIs :
 */

function ly_createLayer(page,zOrder,layerId){return (new Layer(page,zOrder,layerId));}

function ly_createDefualtLayer(){defualt_layer=ly_createLayer();}

function ly_getDefualtLayer(){return defualt_layer;}

/**
 * Internal Layer APIs :
 */

function ly_int_getLayerId(){return (common_layer_id+(layers_counter++));}

function ly_int_registerLayer(layer){layer_Register[layer.id]=layer;}

/**
 * Class Layer.
 * 
 * This class serves as a host to any graphical objects
 * (e.g. Graphics contextes, GUI component, etc).
 * It has a z-order that define its relative location 
 * on the z coordinate   
 */

function Layer(page, zOrder, layerId) {
        var argv = Layer.arguments;
        var argc = Layer.length;
    	  this.className = "Layer";

        if (argv.length > 0)
        	this.initLayer(page, zOrder, layerId);
    }

Layer.prototype.initLayer = function(page, zOrder, layerId) {
        if (!page || page == null) this.page = pg_getDefualtPage();
        else this.page = page;
        this.setZOrder(zOrder);
        if (!layerId || layerId == null) this.id = ly_int_getLayerId();
        else this.id = layerId;
        ly_int_registerLayer(this);
        this.create();
    }

Layer.prototype.create = function() {
				// Summary:
				// Create the SVG 'g' element for the Layer object
				
        // Do not redraw if the SVG node for this object exists
        if (svgDocument.getElementById(this.getId()) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.getId()
        }, this.getPage().getNode());
        
        //this.Node=createSVGNode("g",{id: this.getId()}); 
    }

Layer.prototype.addGraphics = function(/* Node or svgNode*/ node) {
        this.addChild(node);
    }

Layer.prototype.addChild = function(/* Node or svgNode*/ node) {
        if (node.Node) node = node.Node;
        this.Node.appendChild(node);
    }

Layer.prototype.setZOrder = function(zOrder) {
        if (!zOrder || zOrder == null) zOrder = 0;
        this.zOrder = zOrder;
    }

Layer.prototype.getPage = function() {
        return this.page;
    }

Layer.prototype.getNode = function() {
        return this.Node;
    }

Layer.prototype.getId = function() {
        return this.id;
    }

Layer.prototype.show = function() {
        this.Node.setAttribute('display', "inline");
    }

Layer.prototype.hide = function() {
        this.Node.setAttribute('display', "none");
    }

Layer.prototype.isShown = function() {
        return (this.Node.getAttribute('display') == "inline");
    }

Layer.prototype.isHidden = function() {
    return (this.Node.getAttribute('display') == "none");
}