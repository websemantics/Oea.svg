/**
 * Draw2D.svg : SVGCanvas
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg
 */

SVGCanvas.prototype= new Node(); 

function SVGCanvas( /* float or String */ vpX, /* float */ vpY, vpW, vpH, vbX, vbY, vbW, vbH) {

    var argv = SVGCanvas.arguments;
    var argc = SVGCanvas.length;
    this.className = "SVGCanvas";

    //===========
    // Properties:
    //===========

    /* float */
    this.viewBoxX = 0;
    /* float */
    this.viewBoxY = 0;
    /* float */
    this.viewBoxW = 0;
    /* float */
    this.viewBoxH = 0;
    /* float */
    this.viewPortX = 0;
    /* float */
    this.viewPortY = 0;
    /* float */
    this.viewPortW = 0;
    /* float */
    this.viewPortH = 0;
    /* svgNode */
    this.Node = null;
    /* String */ //this.preserveAspectRatio="xMidYMid";
    /* String */
    this.preserveAspectRatio = "none";
    /* boolean */
    this.originalViewFlag = true;
    /* float */
    this.ovViewBoxX = 0; // The first X coord of the viewBox 
    /* float */
    this.ovViewBoxY = 0; // The first Y coord of the viewBox
    /* float */
    this.ovViewBoxW = 0; // The width of the viewBox
    /* float */
    this.ovViewBoxH = 0; // The height of the viewBox

    if (argv.length > 0) 
        this.initSVGCanvas(vpX, vpY, vpW, vpH, vbX, vbY, vbW, vbH);
}

/**
 * initSVGCanvas
 *
 * Forms
 * -----:
 * 
 * initSVGCanvas(String id)
 * initSVGCanvas(float vpX,vpY,vpW,vpH,vbX,vbY,vbW,vbH)
 */

SVGCanvas.prototype.initSVGCanvas = function( /* float or String */ vpX, /* float */ vpY, vpW, vpH, vbX, vbY, vbW, vbH) {

        if (isNaN(vpX)) {
            var id = vpX;
            this.loadSVGContent(id);
            return;
        }

        this.viewPortX = vpX;
        this.viewPortY = vpY;
        this.viewPortW = vpW;
        this.viewPortH = vpH;

        this.viewBoxX = vbX;
        this.viewBoxY = vbY;
        this.viewBoxW = vbW;
        this.viewBoxH = vbH;

    }

SVGCanvas.prototype.loadSVGContent = function( /* String */ id) {

        this.Node = svgDocument.getElementById(id);
        if (this.Node == null) return;

        // read the size of the view box from the viewBox attribute

        var viewBox = this.Node.getAttribute("viewBox");
        var arrgs = viewBox.split(" ");

        this.viewBoxX = parseInt(arrgs[0]);
        this.viewBoxY = parseInt(arrgs[1]);
        this.viewBoxW = parseInt(arrgs[2]);
        this.viewBoxH = parseInt(arrgs[3]);

        var width = parseInt(this.Node.getAttribute("width"));
        var height = parseInt(this.Node.getAttribute("height"));

        this.viewPortX = 0;
        this.viewPortY = 0;

        if (isNaN(width))
            this.viewPortW = innerWidth;
        else
            this.viewPortW = width;

        if (isNaN(height))
            this.viewPortH = innerHeight;
        else
            this.viewPortH = height;

        this.setViewBox(this.viewBoxX, this.viewBoxY, this.viewBoxW, this.viewBoxH);
    }

SVGCanvas.prototype.createSVGContent = function() {
        var vpX = this.viewPortX;
        var vpY = this.viewPortY;
        var vpW = this.viewPortW;
        var vpH = this.viewPortH;
        this.Node = createSVGNode("svg", {
            x: vpX,
            y: vpY,
            width: vpW,
            height: vpH,
            preserveAspectRatio: this.preserveAspectRatio
        });
        var vbX = this.viewBoxX;
        var vbY = this.viewBoxY;
        var vbW = this.viewBoxW;
        var vbH = this.viewBoxH;
        this.setViewBox(vbX, vbY, vbW, vbH);
    }

SVGCanvas.prototype.getX = function() {
        return this.viewPortX;
    }

SVGCanvas.prototype.getY = function() {
        return this.viewPortX;
    }

SVGCanvas.prototype.getWidth = function() {
        return this.viewPortW;
    }

SVGCanvas.prototype.getHeight = function() {
        return this.viewPortH;
    }

SVGCanvas.prototype.getViewBoxX = function() {
        return this.viewBoxX;
    }

SVGCanvas.prototype.getViewBoxY = function() {
        return this.viewBoxY;
    }

SVGCanvas.prototype.getViewBoxWidth = function() {
        return this.viewBoxW;
    }

SVGCanvas.prototype.getViewBoxHeight = function() {
        return this.viewBoxH;
    }

SVGCanvas.prototype.setSizeViewBox = function( /* float */ w, h) {
        this.viewBoxW = w;
        this.viewBoxH = h;
        this.setViewBox(this.viewBoxX, this.viewBoxY, w, h);
    }

SVGCanvas.prototype.translateViewBox = function( /* float */ x, y) {
        this.viewBoxX = x;
        this.viewBoxY = y;
        this.setViewBox(x, y, this.viewBoxW, this.viewBoxH);
    }

SVGCanvas.prototype.setOriginalViewViewBox = function( /* float */ x, y, w, h) {
    this.ovViewBoxX = x;
    this.ovViewBoxY = y;
    this.ovViewBoxW = w;
    this.ovViewBoxH = h;
}

SVGCanvas.prototype.setViewBox = function( /* float */ x, y, w, h) {

        if (w < 0) w = 0;
        if (h < 0) h = 0;

        this.viewBoxX = x;
        this.viewBoxY = y;
        this.viewBoxW = w;
        this.viewBoxH = h;

        // Adjust the size [new]
        var size = this.getViewBoxSizeCAR();
        this.viewBoxW = size.w;
        this.viewBoxH = size.h;

        if (this.originalViewFlag) {
            this.originalViewFlag = false;
            this.ovViewBoxX = x;
            this.ovViewBoxY = y;
            this.ovViewBoxW = w;
            this.ovViewBoxH = h;
        }

        if (this.Node != null)
            this.Node.setAttribute("viewBox", this.viewBoxX + "," + this.viewBoxY + "," + this.viewBoxW + "," + this.viewBoxH);
    }

SVGCanvas.prototype.zoomIn = function( /* float */ x, y) {
        var p = this.castVPC2VBC(x, y);
        var w = this.viewBoxW / 2;
        var h = this.viewBoxH / 2;
        x = p.x - w / 2;
        y = p.y - h / 2;
        this.setViewBox(x, y, w, h);
    }

SVGCanvas.prototype.zoomOut = function( /* float */ x, y) {
        var p = this.castVPC2VBC(x, y);
        var w = this.viewBoxW * 2;
        var h = this.viewBoxH * 2;
        x = p.x - w / 2;
        y = p.y - h / 2;
        this.setViewBox(x, y, w, h);
    }

SVGCanvas.prototype.originalView = function() {
        this.setViewBox(this.ovViewBoxX, this.ovViewBoxY, this.ovViewBoxW, this.ovViewBoxH);
    }

SVGCanvas.prototype.setSize = function( /* float */ w, h) {
        this.viewPortW = w;
        this.viewPortH = h;
        if (this.Node != null) {
            this.Node.setAttribute("width", w);
            this.Node.setAttribute("height", h);
        }
    }

SVGCanvas.prototype.translate = function( /* float */ x, y) {
        this.viewPortX = x;
        this.viewPortY = y;
        if (this.Node != null) {
            this.Node.setAttribute("x", x);
            this.Node.setAttribute("y", y);
        }
    }

SVGCanvas.prototype.getViewPortSizeCAR = function( /* float */ w, h) {
        // Summary:
        // Get the width and height of a possible View Port taking into 
        // account the aspect ration

        if (w == undefined) w = this.getWidth();
        if (h == undefined) h = this.getHeight();

        var aspectRatio = this.viewBoxW / this.viewBoxH; // viewBox Aspect Ratio
        var viewPortW = 0; // viewPort Width
        var viewPortH = 0; // viewPort height

        if (aspectRatio < 1) {
            // viewBox height > width
            viewPortH = h;
            viewPortW = viewPortH * aspectRatio;
        } else {
            // viewBox height <= width
            viewPortW = w;
            viewPortH = viewPortW / aspectRatio;
        }

        var ret = new Object();
        ret.w = viewPortW;
        ret.h = viewPortH;

        return ret;
    }

SVGCanvas.prototype.getViewBoxSizeCAR = function( /* float */ w, h) {
        // Summary:
        // Get the width and height of a possible View Box taking into account 
        // the aspect ration

        if (w == undefined) w = this.getViewBoxWidth();
        if (h == undefined) h = this.getViewBoxHeight();

        var aspectRatio = this.viewPortW / this.viewPortH; // viewPort Aspect Ratio
        var viewBoxW = 0; // viewBox Width
        var viewBoxH = 0; // viewBox height

        if (isNaN(aspectRatio))
            aspectRatio = 1;

        if (aspectRatio < 1) {
            // viewPort height > width
            viewBoxH = h;
            viewBoxW = viewBoxH * aspectRatio;
        } else {
            // viewPort height <= width
            viewBoxW = w;
            viewBoxH = viewBoxW / aspectRatio;
        }

        var ret = new Object();
        ret.w = viewBoxW;
        ret.h = viewBoxH;

        return ret;
    }

SVGCanvas.prototype.adjustViewPortToViewBox = function() {
        // Summary:
        // 
        // Adjust the width and height  of ViewPort according to the current 
        // viewBox so they have the same Aspect Ratio.
        // 
        // Aspect Ratio = View Box Width / View Box height
        //
        // If the aspect ratio is < 1 that means the viewBox height is greater 
        // that its width, so,..to fit the SVGCanvas into the available area the 
        // viewPort width should be reduced: (new width = height * aspect ratio.)
        // 
        // But if the aspect ratio is >= 1 then the viewBox width is greater that 
        // its height,.. therefore adject the height as: 
        // new height = width / aspect ratio  
        
        var size = this.getViewPortSizeCAR();
        this.setSize(size.w, size.h);
    }

SVGCanvas.prototype.adjustViewBoxToViewPort = function() {
        // Summary:
        // Adjust the width and height of ViewBox according to the current 
        // viewPort so they have the same Aspect Ratio.
        var size = this.getViewBoxSizeCAR();
        this.setViewBoxSize(size.w, size.h);
    }

SVGCanvas.prototype.toString = function() {
        var ret = this.className + ":\n";
        ret += "ViewPort [ X: " + this.viewPortX + ", Y: " + this.viewPortY + ", Width: " + this.viewPortW + ", Height: " + this.viewPortH + " ]\n";
        ret += "ViewBox [ X: " + this.viewBoxX + ", Y: " + this.viewBoxY + ", Width: " + this.viewBoxW + ", Height: " + this.viewBoxH + " ]";
        return ret;
    }

SVGCanvas.prototype.castVPC2VBC = function( /* float */ x, y) {
    // Summary:
    // Cast View Port Coordinates to View Box Coordinates: castVPC2VBC
    var ViewPortSize = svgCanvas.getViewPortSizeCAR(); // Get the width and height of the viewport taking aspect ratio into account
    var Rx = svgCanvas.getViewBoxWidth() / ViewPortSize.w;
    var Ry = svgCanvas.getViewBoxHeight() / ViewPortSize.h;

    x = x * Rx + svgCanvas.getViewBoxX();
    y = y * Ry + svgCanvas.getViewBoxY();

    return new Point(x, y);
}

SVGCanvas.prototype.castVBC2VPC = function( /* float */ x, y) {
  // Summary:
  // Cast View Box Coordinates to View Port Coordinates: castVPC2VBC 
    var ViewPortSize = svgCanvas.getViewPortSizeCAR(); // Get the width and height of the viewport taking aspect ratio into account
    var Rx = svgCanvas.getViewBoxWidth() / ViewPortSize.w;
    var Ry = svgCanvas.getViewBoxHeight() / ViewPortSize.h;

    x = (x - svgCanvas.getViewBoxX()) / Rx;
    y = (y - svgCanvas.getViewBoxY()) / Ry;

    return new Point(x, y);
}