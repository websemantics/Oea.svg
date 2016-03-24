/**
 * Java.js : Dimension2D
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class Dimension2D
 * 
 * The Dimension2D class is to encapsulate a width and a height dimension.
 * 
 */

function Dimension2D() { /* implements Cloneable */

        this.className = "Dimension2D";

    }

Dimension2D.prototype.getWidth = function() {
        // Abstract class 
    }

Dimension2D.prototype.getHeight = function() {
        // Abstract class 
    }

Dimension2D.prototype.setSize = function(width, height) {
    // Summary
    // Sets the size to a specified width and height 
    //
    // Forms:
    // (1) setSize(width,height)
    // (2) setSize(Dimension2D d)

        // Abstract class 
        if (width instanceof Dimension2D) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
            this.setSize(width, height);
        }
    }

Dimension2D.prototype.clone = function() {
    // Abstract class 
}