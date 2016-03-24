/**
 * Java.js :Color
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th January 2005
 * @package   websemantics/oea/java.js/awt
 */

/**
 * Class Color
 *
 * Also, see cColor class (bellow ) for constants,..use CColor object for access
 * 
 */

function Color( /*float*/ r, /*float*/ g, /*float*/ b, /*float*/ a) { /* implements Paint, Serializable  */
        var argv = Color.arguments;
        var argc = Color.length;
        this.className = "Color";

        /* long */
        this.pData = 0;
        /* int */
        this.value - 0;
        // The color value in the default sRGB ColorSpace as float components (no alpha).
        /* float */
        this.frgbvalue = new Array();
        // The color value in the native ColorSpace as float components (no alpha).
        /* float */
        this.fvalue = new Array();
        // The alpha value as a float component. If frgbvalue is null, this is not valid data, so compute from the int color value.
        /* float */
        this.falpha = 0.0;
        // The ColorSpace.  If null, then it's default is sRGB.
        /* ColorSpace */ // cs = null; [ NOT IMPLEMENTED ]
        
        if (argv.length > 0) 
        	this.initColor(r, g, b, a);
    }

Color.prototype.ifFloat = function(num) {
        var str = "n" + num;
        if (str.indexOf(".") == -1) return false;
        return true;
    }

Color.prototype.initColor = function(r, g, b, a) {
		    // Forms
		    // ======
		    // (1) initColor(int r,int g,int b)
		    // (2) initColor(int r,int g,int b,int a)
		    // (3) initColor(float r,float g,float b,float a) : Between 0:0.9999 [ 1.0 is not supported ]
		    // (4) initColor(int rgb)

        // One parameter
        if (r && !g && !b && !a) {
            var rgb = r;
            this.value = 0xff000000 | rgb;
            return;
        }

        if (!a) a = 255;

        if (this.ifFloat(r)) r = Math.round((r * 255 + 0.5));
        if (this.ifFloat(g)) g = Math.round((g * 255 + 0.5));
        if (this.ifFloat(b)) b = Math.round((b * 255 + 0.5));
        if (this.ifFloat(a)) a = Math.round((a * 255 + 0.5));

        this.value = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0);
        this.frgbvalue[0] = r / 255;
        this.frgbvalue[1] = g / 255;
        this.frgbvalue[2] = b / 255;
        this.falpha = a / 255;
        this.fvalue = this.frgbvalue;
    }

Color.prototype.getRGB = function() {
		// Summary:
		// Returns the RGB value representing the color in the default sRGB
        return this.value;
    }

Color.prototype.getRed = function() {
		// Summary
		// Returns the red component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 16) & 0xFF;
    }

Color.prototype.getGreen = function() {
		// Summary
		// Returns the green component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 8) & 0xFF;
    }

Color.prototype.getBlue = function() {
		// Summary
		// Returns the blue component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 0) & 0xFF;
    }

Color.prototype.getRGBAsString = function() {
        return "rgb(" + this.getRed() + "," + this.getGreen() + "," + this.getBlue() + ")";
    }

Color.prototype.toString = function() {
    return this.className + " [r=" + this.getRed() + ",g=" + this.getGreen() + ",b=" + this.getBlue() + "]";
}


/**
 * Class cColor
 *
 * Constant Colors
 * 
 */

function cColor() {
        this.className = "cColor";

        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;
        this.lightGray = new Color(192, 192, 192);
        this.LIGHT_GRAY = this.lightGray;
        this.gray = new Color(128, 128, 128);
        this.GRAY = this.gray;
        this.darkGray = new Color(64, 64, 64);
        this.DARK_GRAY = this.darkGray;
        this.black = new Color(0, 0, 0);
        this.BLACK = this.black;
        this.red = new Color(255, 0, 0);
        this.RED = this.red;
        this.pink = new Color(255, 175, 175);
        this.PINK = this.pink;
        this.orange = new Color(255, 200, 0);
        this.ORANGE = this.orange;
        this.yellow = new Color(255, 255, 0);
        this.YELLOW = this.yellow;
        this.green = new Color(0, 255, 0);
        this.GREEN = this.green;
        this.magenta = new Color(255, 0, 255);
        this.MAGENTA = this.magenta;
        this.cyan = new Color(0, 255, 255);
        this.CYAN = this.cyan;
        this.blue = new Color(0, 0, 255);
        this.BLUE = this.blue;
        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;
        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;

    }

cColor.prototype.toString = function() {
    return this.className;
}

var CColor = new cColor();