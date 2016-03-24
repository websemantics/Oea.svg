/**
 * Swing.svg : Canvas
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/** 
 * Class Canvas
 *
 * It is not permitted to use the Component type directly, use this instead
 * 
 */

Canvas.prototype = new Component();

function Canvas(x, y, w, h, name) {
        var argv = Canvas.arguments;
        var argc = Canvas.length;
        /* String */
        this.name = "Canvas";
        /* String */
        this.className = "Canvas";

        if (argv.length > 0) 
        	this.initCanvas(x, y, w, h, name);
    }

Canvas.prototype.initCanvas = function(x, y, w, h, name) {
        this.initComponent(x, y, w, h, name);
    }

Canvas.prototype.paint = function( /* Graphics */ g) {
        this.paintCanvas(g);
    }

Canvas.prototype.paintCanvas = function( /* Graphics */ g) {
        this.paintComponent(g);
    }

Canvas.prototype.createSVGContent = function() {
        this.createSVGContentCanvas();
    }

Canvas.prototype.createSVGContentCanvas = function() {
        this.createSVGContentComponent();
    }

Canvas.prototype.onResize = function() {
        this.onResizeCanvas();
    }

Canvas.prototype.onResizeCanvas = function() {
        this.onResizeComponent();
    }

Canvas.prototype.onMove = function() {
        this.onMoveCanvas();
    }

Canvas.prototype.onMoveCanvas = function() {
        this.onMoveComponent();
    }

Canvas.prototype.recalc = function() {
        this.recalcCanvas();
    }

Canvas.prototype.recalcCanvas = function() {
        this.recalcComponent();
    }

Canvas.prototype.gainFocus = function() {
        this.gainFocusCanvas();
    }

Canvas.prototype.gainFocusCanvas = function() {
        this.gainFocusComponent();
    }

Canvas.prototype.lostFocus = function() {
        this.lostFocusCanvas();
    }

Canvas.prototype.lostFocusCanvas = function() {
    this.lostFocusComponent();
}