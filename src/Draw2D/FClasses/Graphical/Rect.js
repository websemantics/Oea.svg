/**
 * Draw2D.svg : Rect
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

/**
 * Class Rect
 *
 * GET methods are ignored for performance reasons,... 
 * direct access to class properties is allowed 
 *
 * X,Y Origin:
 * Both coordinate are local to the object,..
 * X=0 & Y=0, rotate, scale around top left corner
 * X=W/2 & Y=H/2, rotate, scale around middle
 * X=W & Y=H, rotate, scale around bottom right corner
 * 
 */

function Rect(x, y, w, h) {
        var argv = Rect.arguments;
        var argc = Rect.length;
        this.className = "Rect";

        if (argv.length == 0)
            this.initRect(0, 0, 0, 0);
        else this.initRect(x, y, w, h);
    }

Rect.prototype.initRect = function(x, y, w, h) {
        /* int/float */
        this.x = x; // x coordinate
        /* int/float */
        this.y = y; // y coordinate 
        /* int/float */
        this.xo = 0; // x origin
        /* int/float */
        this.yo = 0; // y origin
        /* int/float */
        this.w = w; // width
        /* int/float */
        this.h = h; // height
        /* float     */
        this.s = 1; // scale factor
        /* float     */
        this.r = 0; // rotation factor
    }

Rect.prototype.setCoord = function(x, y) {
        this.x = x;
        this.y = y;
    }

Rect.prototype.getCoord = function() {
        return (new Point(this.x, this.y));
    }

Rect.prototype.setOrigin = function(xo, yo) {
        this.xo = xo;
        this.yo = yo;
    }

Rect.prototype.getOrigin = function() {
        return (new Point(this.xo, this.yo));
    }

Rect.prototype.setOriginToCenter = function() {
        this.setOrigin(this.w / 2, this.h / 2);
    }

Rect.prototype.setWidth = function(w) {
        this.w = w;
        this.onResize();
    }

Rect.prototype.getWidth = function() {
        return this.w;
    }

Rect.prototype.setHeight = function(h) {
        this.h = h;
        this.onResize();
    }

Rect.prototype.getHeight = function() {
        return this.h;
    }

Rect.prototype.setSize = function(w, h) {
        this.w = w;
        this.h = h;
        this.onResize();
    }

Rect.prototype.setRotate = function(r) {
        this.r = r;
    }

Rect.prototype.getRotate = function() {
        return this.r;
    }

Rect.prototype.setScale = function(s) {
        this.s = s;
    }

Rect.prototype.getScale = function() {
        return this.s;
    }

Rect.prototype.translate = function(x, y) {
        this.setCoord(x, y);
        this.onMove();
    }

Rect.prototype.moveBy = function(dx, dy) {
        this.translate(this.x + dx, this.y + dy);
    }

Rect.prototype.rotate = function(r) {
        this.r = r;
        this.onRotate();
    }

Rect.prototype.scale = function(s) {
        this.s = s;
        this.onScale();
    }

Rect.prototype.onMove = function() {;
    }

Rect.prototype.onRotate = function() {;
    }

Rect.prototype.onScale = function() {;
    }

Rect.prototype.onResize = function() {;
}
