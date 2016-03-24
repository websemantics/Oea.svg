/**
 * Oea.svg
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2004
 * @package   websemantics/oea
 */

/**
 * Initlialise the Swing.svg Package
 *
 * @return void
 */

/* Env Constants */
var Batik       = 0;
var ASV         = 1;
var Native      = 2;

/**
 * Current Env variable to indicate whether this script code is 
 * working under SVG (Batik / ASV) or HTML environment (Native) 
 * functions. 
 */
var viewerMode  = Native;

/**
 * Ref to the document object / use document as default for running inside SVG
 * This can be set to the svg object when window.onload event!
 */

var svgDocument = document;

function initialise() {

    if (viewerMode == Batik) {

        // Correct a bug []
        VK_ENTER = 10; // for ASV it is 13!
        // Fix some shortages of Batik [ set variables innerWidth and innerHeight and define function printNode]
        // window.innerWidth=svgDocument.documentElement.viewport.getWidth();
        // window.innerHeight=svgDocument.documentElement.viewport.getHeight();
        window.contextMenu = null;
        window.printNode = printXMLNode // (find it at: src/svgDraw2d/FClasses/SVG/SvgUtilities.js);
    } 

    initDraw2D();
    initSwing();
}



