/**
 * Oea.svg
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2004
 * @package   websemantics/oea
 */

/**
 * Initlialise the Swing.svg Package
 *
 * @return void
 */
 
var Batik=0;
var ASV=1;
var Native=2;
var viewerMode=-1;

function initialise() {

    // Find out which SVG viewer is running? (Batik or ASV)
    if (svgDocument.documentElement.viewport) {
        viewerMode = Batik;
        // Correct a bug []
        VK_ENTER = 10; // for ASV it is 13!
        // Fix some shortages of Batik [ set variables innerWidth and innerHeight and define function printNode]
        // window.innerWidth=svgDocument.documentElement.viewport.getWidth();
        // window.innerHeight=svgDocument.documentElement.viewport.getHeight();
        window.contextMenu = null;
        window.printNode = printXMLNode // (find it at: src/svgDraw2d/FClasses/SVG/SvgUtilities.js);
    } else
        viewerMode = ASV;
   
    // Added on 29 April 2015, assume SVG native browser support!
    viewerMode = Native;

    initDraw2D();
    initSwing();
}
