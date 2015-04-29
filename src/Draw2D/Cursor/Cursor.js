/**
 * Draw2D.svg : Cursor
 *
 * Cursor SVG type:
 * ----------------
 * 
 * auto : crosshair : default : pointer : move : e-resize : ne-resize : nw-resize
 * n-resize : se-resize : sw-resize : s-resize : w-resize : text ; wait : help  
 * OR dynamic elements (cursors) =< not supported in Batik yet.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     18th November 2005
 * @package   websemantics/oea/draw2d.svg
 */

var common_cursor_id = "cursor_";
var cursor_counter = 0;

/*
 * Internal Cursor APIs:
 *
 * (1) Internal Only : cr_int_getCursorId: returns a unique Id for a Cursor object 
 * 
 */

function cr_int_getCursorId() {
    return (common_cursor_id + (cursor_counter++));
}

/**
 * Class Cursor
 * 
 * @param int x Coordinate X
 * @param int y Coordinate Y
 * @param Shape shape 
 */

Cursor.prototype = new Shape();

function Cursor(x, y, shape) {
        var argv = Cursor.arguments;
        var argc = Cursor.length;
        this.initCursor(x, y, shape);
    }

Cursor.prototype.initCursor = function(x, y, shape) {
        this.create(x, y, shape);
    }

Cursor.prototype.create = function(x, y, shape) {
    this.id = cr_int_getCursorId();
    this.Node = createSVGNode("cursor", {
        id: this.id,
        x: x,
        y: y
    });
    shape.translate(0, 0);
    this.addChild(shape.getNode());
    
    // Add the current mouse to the defs section in the SVG doc.
    df_addToDefs(this);
}