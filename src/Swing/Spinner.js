/**
 * Swing.svg : Spinner
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     1st May 2015
 * @package   websemantics/oea/swing.svg
 */

function Spinner(name, w, h, color) {
    
        var argv = Spinner.arguments;
        var argc = Spinner.length;

        /* String */
        this.className = "Spinner";

        this.name = name || 'tail_spin';
        this.color = color || '#000';
        this.w = w || 64;
        this.h = h || 64;
        this.spinner = null;
    }

Spinner.prototype.createSVGContent = function(x,y, /* Graphics */ g) {
        x = x - this.w / 2;
        y = y - this.h / 2;
        this.spinner = g.drawSpinnerImage(x,y, this.w, this.h,this.name,this.color);
        this.spinner.setOriginToCenter();
    }

Spinner.prototype.getWidth = function() {
        if (this.spinner != null) return this.spinner.getWidth();
        else return 0;
    }

Spinner.prototype.getHeight = function() {
        if (this.spinner != null) return this.spinner.getHeight();
        else return 0;
    }

Spinner.prototype.translate = function(x, y) {
    if (this.spinner != null) {
        x = x - this.w / 2;
        y = y - this.h / 2;
        this.spinner.translate(x, y);
    }
}

Spinner.prototype.show = function() {
    if (this.spinner != null) 
        this.spinner.setVisibility(true);
}

Spinner.prototype.hide = function() {
    if (this.spinner != null) 
        this.spinner.setVisibility(false);
}