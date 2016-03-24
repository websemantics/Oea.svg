/**
 * Swing.svg : Panel
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

Panel.prototype = new Container();

function Panel(x, y, w, h) {
        var argv = Panel.arguments;
        var argc = Panel.length;

        /* String */
        this.name = "Panel";
        /* String */
        this.className = "Panel";

        if (argv.length > 0) 
        	this.initPanel(x, y, w, h);
    }

Panel.prototype.initPanel = function(x, y, w, h) {
        this.initContainer(x, y, w, h);
    }

Panel.prototype.paint = function( /* Graphics */ g) {
        this.paintPanel(g);
    }

Panel.prototype.paintPanel = function( /* Graphics */ g) {
        this.paintContainer(g);
    }

Panel.prototype.createSVGContent = function() {
        this.createSVGContentPanel();
    }

Panel.prototype.createSVGContentPanel = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
    }

Panel.prototype.onResize = function() {
        this.onResizePanel();
    }

Panel.prototype.onResizePanel = function() {
        this.onResizeContainer();
    }

Panel.prototype.onMove = function() {
        this.onMovePanel();
    }

Panel.prototype.onMovePanel = function() {
        this.onMoveContainer();
    }

Panel.prototype.recalc = function() {
        this.recalcPanel();
    }

Panel.prototype.recalcPanel = function() {
    this.recalcContainer();
}


