/**
 * Oea.svg : Dragable
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2004
 * @package   websemantics/oea/demos
 */

Dragable.prototype = new EventManager(); // [ superclass: EventManager]

function Dragable( /* Shape */ shape) {
    this.useCapture = false;
    this.shape = shape;
    this.initSVGNode(shape.getNode());
    this.initEventManager();
    this.addMouseMotionListener(this);
    this.enableMouseMotionListener();
}
//********************
// mouseStartDragged 
//********************
Dragable.prototype.mouseStartDragged = function( /* MouseEvent */ event) {
    this.setCursor("move");
    this.tempX = event.getX();
    this.tempY = event.getY();
}
//********************
// mouseDragged 
//********************
Dragable.prototype.mouseDragged = function( /* MouseEvent */ event) {
    var x = event.getX();
    var y = event.getY();
    this.shape.moveBy(x - this.tempX, y - this.tempY)
}
//********************
// mouseEndDragged 
//********************
Dragable.prototype.mouseEndDragged = function( /* MouseEvent */ event) {
    this.setCursor("default");
}
//********************
// mouseMoved 
//********************
Dragable.prototype.mouseMoved = function( /* MouseEvent */ event) {}