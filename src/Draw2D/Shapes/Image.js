/**
 * Draw2D.svg : Image
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Image.prototype = new Shape();

function Image(x, y, w, h, path, graphics) {
        var argv = Image.arguments;
        var argc = Image.length;
        this.className = "Image";
        
        if (argv.length > 0)
        	this.initImage(x, y, w, h, path, graphics);
    }

Image.prototype.initImage = function(x, y, w, h, path, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.create(path, graphics);
    }

Image.prototype.create = function(path, graphics) {
        this.Node = svgDocument.createElementNS("http://www.w3.org/2000/svg", "image");
        this.Node.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
        this.Node.setAttribute("x", 0);
        this.Node.setAttribute("y", 0);
        this.Node.setAttribute("width", this.w);
        this.Node.setAttribute("height", this.h);
        graphics.getNode().appendChild(this.Node);
        this.transform();
    }

Image.prototype.changeHref = function( /* String */ href) {
        if (this.Node == null) return;
        this.Node.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    }

Image.prototype.onResize = function() {
    this.setAttribute("width", this.w);
    this.setAttribute("height", this.h);
}