/**
 * Draw2D.svg : RectNode
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

RectNode.prototype = new SVGNode();

function RectNode(x, y, w, h, r, s) {

	    var argv = RectNode.arguments;
	    var argc = RectNode.length;
	    this.className = "RectNode";

        if (argv.length == 0) 
        	this.initRectNode(0, 0, 0, 0, 0, 1);
        else 
        	this.initRectNode(x, y, w, h, r, s);
    }

RectNode.prototype.initRectNode = function(x, y, w, h, r, s) {
        this.initSVGNode();
        this.initRect(x, y, w, h);
        this.setRotate(r);
        this.setScale(s);
    }

RectNode.prototype.onMove = function() {
        return this.transform();
    }

RectNode.prototype.onRotate = function() {
        return this.transform();
    }

RectNode.prototype.onScale = function() {
        return this.transform();
    }

RectNode.prototype.transform = function() {
        this.transformRectNode();
    }

RectNode.prototype.transformRectNode = function() {
    if (this.Node == null) return false;
    this.y = this.y || 0;
    this.x = this.x || 0;
    var attr = " translate(" + this.x + " , " + this.y + ")";

    if (this.r > 0 || this.s != 1) {
        attr += " translate(" + this.xo + " , " + this.yo + ")" +
            " rotate(" + this.r + ")" +
            " scale(" + this.s + ")" +
            " translate(-" + this.xo + " , -" + this.yo + ")";
    }
    this.Node.setAttribute('transform', attr);
    return true;
}