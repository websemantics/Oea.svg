/**
 * Swing.svg : Icon
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     20th July 2005
 * @package   websemantics/oea/swing.svg
 */

function Icon( /* String */ filename, /* int */ w, /* int */ h) {
    
        var argv = Icon.arguments;
        var argc = Icon.length;

        /* String */
        this.className = "Icon";
        /* String */
        this.name = "Icon";
        /* String */
        this.filename = null;
        /* Image */
        this.iconShape = null;
        /* int */
        this.w = 0;
        /* int */
        this.h = 0;

        if (argv.length > 0) 
        	this.initIcon(filename, w, h);
    }

Icon.prototype.initIcon = function(filename, w, h) {
        if (filename != undefined) this.filename = filename;
        this.w = w;
        this.h = h;
    }

Icon.prototype.createSVGContent = function( /* Graphics */ g) {
        this.iconShape = g.drawImage(0, 0, this.w, this.h, this.filename);
        this.iconShape.setOriginToCenter();
    }

Icon.prototype.getWidth = function() {
        if (this.iconShape != null) return this.iconShape.getWidth();
        else return 0;
    }

Icon.prototype.getHeight = function() {
        if (this.iconShape != null) return this.iconShape.getHeight();
        else return 0;
    }

Icon.prototype.translate = function(x, y) {
    if (this.iconShape != null) this.iconShape.translate(x, y);
}