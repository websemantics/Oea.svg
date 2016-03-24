/**
 * Java.js : KeyEvent
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th November 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class KeyEvent [comments are taken from java]
 *
 * An event which indicates that a keystroke occurred in a component.
 * 
 */

// Virtual key codes. 
var VK_ENTER = 0x0D;
var VK_BACK_SPACE = 0x08;
var VK_TAB = '\t';
//var VK_ENTER          = '\n';
//var VK_BACK_SPACE     = '\b';
var VK_CANCEL = 0x03;
var VK_CLEAR = 0x0C;
var VK_SHIFT = 0x10;
var VK_CONTROL = 0x11;
var VK_ALT = 0x12;
var VK_PAUSE = 0x13;
var VK_CAPS_LOCK = 0x14;
var VK_ESCAPE = 0x1B;
var VK_SPACE = 0x20;
var VK_PAGE_UP = 0x21;
var VK_PAGE_DOWN = 0x22;
var VK_END = 0x23;
var VK_HOME = 0x24;
// Constant for the non-numpad <b>left</b> arrow key. @see #VK_KP_LEFT
var VK_LEFT = 0x25;
// Constant for the non-numpad <b>up</b> arrow key. @see #VK_KP_UP
var VK_UP = 0x26;
// Constant for the non-numpad <b>right</b> arrow key.  @see #VK_KP_RIGHT
var VK_RIGHT = 0x27;
// Constant for the non-numpad <b>down</b> arrow key. @see #VK_KP_DOWN
var VK_DOWN = 0x28;
var VK_COMMA = 0x2C;
// Constant for the "-" key.
var VK_MINUS = 0x2D;
var VK_PERIOD = 0x2E;
var VK_SLASH = 0x2F;
// VK_0 thru VK_9 are the same as ASCII '0' thru '9' (0x30 - 0x39) 
var VK_0 = 0x30;
var VK_1 = 0x31;
var VK_2 = 0x32;
var VK_3 = 0x33;
var VK_4 = 0x34;
var VK_5 = 0x35;
var VK_6 = 0x36;
var VK_7 = 0x37;
var VK_8 = 0x38;
var VK_9 = 0x39;

var VK_SEMICOLON = 0x3B;
var VK_EQUALS = 0x3D;

// VK_A thru VK_Z are the same as ASCII 'A' thru 'Z' (0x41 - 0x5A) 
var VK_A = 0x41;
var VK_B = 0x42;
var VK_C = 0x43;
var VK_D = 0x44;
var VK_E = 0x45;
var VK_F = 0x46;
var VK_G = 0x47;
var VK_H = 0x48;
var VK_I = 0x49;
var VK_J = 0x4A;
var VK_K = 0x4B;
var VK_L = 0x4C;
var VK_M = 0x4D;
var VK_N = 0x4E;
var VK_O = 0x4F;
var VK_P = 0x50;
var VK_Q = 0x51;
var VK_R = 0x52;
var VK_S = 0x53;
var VK_T = 0x54;
var VK_U = 0x55;
var VK_V = 0x56;
var VK_W = 0x57;
var VK_X = 0x58;
var VK_Y = 0x59;
var VK_Z = 0x5A;

var VK_OPEN_BRACKET = 0x5B;
var VK_BACK_SLASH = 0x5C;
var VK_CLOSE_BRACKET = 0x5D;

var VK_NUMPAD0 = 0x60;
var VK_NUMPAD1 = 0x61;
var VK_NUMPAD2 = 0x62;
var VK_NUMPAD3 = 0x63;
var VK_NUMPAD4 = 0x64;
var VK_NUMPAD5 = 0x65;
var VK_NUMPAD6 = 0x66;
var VK_NUMPAD7 = 0x67;
var VK_NUMPAD8 = 0x68;
var VK_NUMPAD9 = 0x69;
var VK_MULTIPLY = 0x6A;
var VK_ADD = 0x6B;

// This constant is obsolete, and is included only for backwards compatibility. @see #VK_SEPARATOR
var VK_SEPARATER = 0x6C;
// Constant for the Numpad Separator key. @since 1.4
var VK_SEPARATOR = VK_SEPARATER;

var VK_SUBTRACT = 0x6D;
var VK_DECIMAL = 0x6E;
var VK_DIVIDE = 0x6F;
var VK_DELETE = 0x7F; /* ASCII DEL */
var VK_NUM_LOCK = 0x90;
var VK_SCROLL_LOCK = 0x91;

// Constant for the F1 function key. 
var VK_F1 = 0x70;
// Constant for the F2 function key. 
var VK_F2 = 0x71;
// Constant for the F3 function key. 
var VK_F3 = 0x72;
// Constant for the F4 function key. 
var VK_F4 = 0x73;
// Constant for the F5 function key. 
var VK_F5 = 0x74;
// Constant for the F6 function key. 
var VK_F6 = 0x75;
// Constant for the F7 function key. 
var VK_F7 = 0x76;
// Constant for the F8 function key. 
var VK_F8 = 0x77;
// Constant for the F9 function key. 
var VK_F9 = 0x78;
// Constant for the F10 function key. 
var VK_F10 = 0x79;
// Constant for the F11 function key. 
var VK_F11 = 0x7A;
// Constant for the F12 function key. 
var VK_F12 = 0x7B;
// Constant for the F13 function key.
// F13 - F24 are used on IBM 3270 keyboard; use random range for constants. 
var VK_F13 = 0xF000;
// Constant for the F14 function key.
var VK_F14 = 0xF001;
// Constant for the F15 function key.
var VK_F15 = 0xF002;
// Constant for the F16 function key.
var VK_F16 = 0xF003;
// Constant for the F17 function key.
var VK_F17 = 0xF004;
// Constant for the F18 function key.
var VK_F18 = 0xF005;
// Constant for the F19 function key.
var VK_F19 = 0xF006;
// Constant for the F20 function key.
var VK_F20 = 0xF007;
// Constant for the F21 function key.
var VK_F21 = 0xF008;
// Constant for the F22 function key.
var VK_F22 = 0xF009;
// Constant for the F23 function key.
var VK_F23 = 0xF00A;
// Constant for the F24 function key.
var VK_F24 = 0xF00B;

var VK_PRINTSCREEN = 0x9A;
var VK_INSERT = 0x9B;
var VK_HELP = 0x9C;
var VK_META = 0x9D;

var VK_BACK_QUOTE = 0xC0;
var VK_QUOTE = 0xDE;
// Constant for the numeric keypad <b>up</b> arrow key.
var VK_KP_UP = 0xE0;
// Constant for the numeric keypad <b>down</b> arrow key.
var VK_KP_DOWN = 0xE1;
// Constant for the numeric keypad <b>left</b> arrow key.
var VK_KP_LEFT = 0xE2;
// Constant for the numeric keypad <b>right</b> arrow key.
var VK_KP_RIGHT = 0xE3;


//KeyEvent.prototype= new InputEvent(); 
/* extends InputEvent */
function KeyEvent( /* Component */ source, /* svgKeyEvent */ evt) {
        var argv = KeyEvent.arguments;
        var argc = KeyEvent.length;
        this.className = "KeyEvent";

        this.source = null;
        /* int */
        this.keyCode = 0; // The unique value assigned to each of the keys on the keyboard.
        /* char */
        this.keyChar = 0; // A valid unicode character that is fired by a key or a key combination on a keyboard.
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;
        
        if (argv.length > 0) 
        	this.initKeyEvent(source, evt);
    }

KeyEvent.prototype.initKeyEvent = function(source, evt) {
        this.source = source;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
        this.keyCode = evt.keyCode;
        this.keyChar = evt.charCode;
    }

KeyEvent.prototype.getKeyCode = function() {
		// Summary:
		// Returns the integer keyCode associated with the key in this event.
        return this.keyCode;
    }

KeyEvent.prototype.setKeyCode = function( /* int */ keyCode) {
		// Summary:
		// Returns the integer keyCode associated with the key in this event.
        this.keyCode = keyCode;
    }

KeyEvent.prototype.getKeyChar = function() {
		// Summary:
		// Returns the character associated with the key in this event.
		// For example, the key-typed event for shift + "a" returns the value for "A".
        return this.keyChar;
    }

KeyEvent.prototype.setKeyChar = function( /* int */ keyChar) {
		// Summary:
		// Set the keyChar value to indicate a logical character.
        this.keyChar = keyChar;
    }

KeyEvent.prototype.isShiftDown = function() {
		// Summary:
		// Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

KeyEvent.prototype.isControlDown = function() {
		// Summary:
		// Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

KeyEvent.prototype.isMetaDown = function() {
		// Summary:
		// Returns whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

KeyEvent.prototype.isAltDown = function() {
		// Summary:
		// Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

KeyEvent.prototype.toString = function() {
    return this.className + "[keyCode=" + this.keyCode + ", keyChar=" + this.keyChar + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}
