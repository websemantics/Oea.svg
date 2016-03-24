/**
 * Java.js : gPolygon
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     7th August 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class gPolygon
 * The gPolygon class encapsulates a description of a closed, two-dimensional 
 * region within a coordinate space. This region is bounded by an arbitrary 
 * number of line segments, each of which is one side of the polygon. 
 * Internally, a polygon comprises of a list of x, y coordinate pairs, where each
 * pair defines a vertex of the polygon, and two successive pairs are the 
 * endpoints of a line that is a side of the polygon. The first and final
 * pairs of x, y points are joined by a line segment that closes the polygon.  
 * This gPolygon is defined with an even-odd winding rule.  
 * See {@link java.awt.geom.PathIterator#WIND_EVEN_ODD WIND_EVEN_ODD}
 *
 *
 * New: 
 * (1) Smooth() function that take smoothness level to smooth the polygon by using the averge method
 * (2) decimationPath() function for tessellating the curve of a path to a polygon
 * 
 */

function gPolygon( /* int[] */ xpoints, /* int[] */ ypoints, /* int[] */ npoints) { // implements Shape
        var argv = gPolygon.arguments;
        var argc = gPolygon.length;
        this.className = "gPolygon";

        // The total number of points.  The value of npoints represents the number of 
        // valid points in this gPolygon and might be less than the number of elements in 
        // xpoints ypoints
        /* int */
        this.npoints = 0;
        // The array of x coordinates.  The number of elements in this array might be 
        // more than the number of x coordinates in this gPolygon.  The extra elements 
        // allow new points to be added to this gPolygon without re-creating this array.
        /* int[] */
        this.xpoints = null;
        // The array of y coordinates.  The number of elements in this array might be 
        // more than the number of y coordinates in this gPolygon.  The extra elements 
        // allow new points to be added to this gPolygon without re-creating this array.
        /* int[] */
        this.ypoints = null;
        /* gRectangle */
        this.bounds = null;
        
        if (argv.length == 1) 
        	this.initgPolygon();
        else
        if (argv.length > 0) 
        	this.initgPolygon(xpoints, ypoints, npoints);

    }

gPolygon.prototype.initgPolygon = function(xpoints, ypoints, npoints) {
    // Forms
    // ======
    // (1) initgPolygon()
    // (2) initgPolygon(xpoints,ypoints,npoints)
        if (xpoints != undefined) this.xpoints = xpoints;
        else this.xpoints = new Array();
        if (ypoints != undefined) this.ypoints = ypoints;
        else this.ypoints = new Array();
        if (npoints != undefined) this.npoints = npoints;
        else this.npoints = 0;
    }

gPolygon.prototype.reset = function() {
		// Summary
    // Resets this gPolygon object to an empty polygon. The coordinate arrays and 
    // the data in them are left untouched but the number of points is reset to 
    // zero to mark the old vertex data as invalid and to start accumulating new 
    // vertex data at the beginning.

        this.npoints = 0;
        this.bounds = null;
    }

gPolygon.prototype.invalidate = function() {
		// Summary
    // Invalidates or flushes any internally-cached data that depends on the vertex 
    // coordinates of this gPolygon. This method should be called after any direct 
    // manipulation of the coordinates in the xpoints or ypoints arrays to avoid 
    // inconsistent results from methods such as getBounds or contains that might 
    // cache data from earlier computations relating to the vertex coordinates.

        this.bounds = null;
    }

gPolygon.prototype.translate = function( /* int */ deltaX, /* int */ deltaY) {
		// Summary
    // Translates the vertices of the gPolygon by deltaX along the x axis and by 
    // deltaY along the y axis.

        for (var i = 0; i < this.npoints; i++) {
            this.xpoints[i] += deltaX;
            this.ypoints[i] += deltaY;
        }
        if (this.bounds != null) {
            this.bounds.translate(deltaX, deltaY);
        }
    }

gPolygon.prototype.calculateBounds = function( /*int[]*/ xpoints, /*int[]*/ ypoints, /*int[]*/ npoints) {
		// Summary
    // Calculates the bounding box of the points passed to the constructor.

        var boundsMinX = -32767; // 0x7fffffff;// Integer.MAX_VALUE;
        var boundsMinY = -32767; // 0x7fffffff;//Integer.MAX_VALUE;
        var boundsMaxX = 65535; // 0x80000000;//Integer.MIN_VALUE;
        var boundsMaxY = 65535; // 0x80000000;//Integer.MIN_VALUE;

        for (var i = 0; i < npoints; i++) {
            var x = xpoints[i];
            boundsMinX = Math.min(boundsMinX, x);
            boundsMaxX = Math.max(boundsMaxX, x);
            var y = ypoints[i];
            boundsMinY = Math.min(boundsMinY, y);
            boundsMaxY = Math.max(boundsMaxY, y);
        }
        this.bounds = new gRectangle(boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY);
    }

gPolygon.prototype.updateBounds = function( /* int */ x, /* int */ y) {
		// Summary
    // Resizes the bounding box to accomodate the specified coordinates.

        if (x < this.bounds.x) {
            this.bounds.width = this.bounds.width + (this.bounds.x - x);
            this.bounds.x = x;
        } else {
            this.bounds.width = Math.max(this.bounds.width, x - this.bounds.x);
            // bounds.x = bounds.x;
        }

        if (y < this.bounds.y) {
            this.bounds.height = this.bounds.height + (this.bounds.y - y);
            this.bounds.y = y;
        } else {
            this.bounds.height = Math.max(this.bounds.height, y - this.bounds.y);
            // bounds.y = bounds.y;
        }
    }

gPolygon.prototype.addPoint = function( /* int */ x, /* int */ y) {
		// Summary
    // Appends the specified coordinates to this gPolygon. If an operation that 
    // calculates the bounding box of this gPolygon has already been performed, such as  
    // getBounds or contains, then this method updates the bounding box. 

        this.xpoints[this.npoints] = x;
        this.ypoints[this.npoints] = y;
        this.npoints++;

        if (this.bounds != null) {
            this.updateBounds(x, y);
        }

    }

gPolygon.prototype.findPoint = function( /* int */ x, /* int */ y) {
        for (var i = 0; i < this.npoints; ++i)
            if (this.xpoints[i] == x && this.ypoints[i] == y) return i;

        return null;
    }

gPolygon.prototype.remove = function( /* int */ x, /* int */ y) {

        var i = this.findPoint(x, y);

        if (i == null) return;

        var n = --this.npoints;

        for (var j = i; j < n; ++j) {
            this.xpoints[j] = this.xpoints[j + 1];
            this.ypoints[j] = this.ypoints[j + 1];
        }

    }

gPolygon.prototype.getBounds = function() {
    // Summary
    // Gets the bounding box of this gPolygon. The bounding box is the smallest {@link Rectangle} whose
    // sides are parallel to the x and y axes of the coordinate space, and can completely contain the gPolygon.
        return this.getBoundingBox();
    }

gPolygon.prototype.getBoundingBox = function() {
    // Summary
    // Returns the bounds of this gPolygon.
        if (this.npoints == 0) {
            return new gRectangle();
        }
        if (this.bounds == null) {
            this.calculateBounds(this.xpoints, this.ypoints, this.npoints);
        }
        return this.bounds.getBounds();
    }

gPolygon.prototype.inside = function( /* int or Point */ x, /* int */ y) {
		// Summary:
		// Determines whether the specified Point is inside this gPolygon.
        return this.contains(x, y);
    }

gPolygon.prototype.contains = function( /* int or Point */ x, /* int */ y, /* int */ w, /* int */ h) {
    // Summary: 
    // 
    // Determines whether the specified Point is inside this gPolygon.
    //  - OR -
    // Tests if the interior of this gPolygon entirely contains the specified set of rectangular coordinates.
    //
    // Forms:
    // (1) contains(Point p)
    // (2) contains(Rectangle2D r)
    // (3) contains(int x, int y);
    // (4) contains(int x,int y,int w,int h);

        if (x instanceof Point) {
            var p = x;
            return this.contains(p.x, p.y);
        }

        if (x instanceof Rectangle2D) {
            var r = x;
            return this.contains(r.getX(), r.getY(), r.getWidth(), r.getHeight());
        }

        if (x != undefined && y != undefined && w == undefined && h == undefined) {

            if (this.npoints <= 2 || !this.getBoundingBox().contains(x, y)) {
                return false;
            }
            var hits = 0;

            var lastx = this.xpoints[this.npoints - 1];
            var lasty = this.ypoints[this.npoints - 1];
            var curx, cury;

            // Walk the edges of the polygon
            for (var i = 0; i < this.npoints; lastx = curx, lasty = cury, i++) {
                curx = this.xpoints[i];
                cury = this.ypoints[i];

                if (cury == lasty) {
                    continue;
                }

                var leftx;
                if (curx < lastx) {
                    if (x >= lastx) {
                        continue;
                    }
                    leftx = curx;
                } else {
                    if (x >= curx) {
                        continue;
                    }
                    leftx = lastx;
                }

                var test1, test2;
                if (cury < lasty) {
                    if (y < cury || y >= lasty) {
                        continue;
                    }
                    if (x < leftx) {
                        hits++;
                        continue;
                    }
                    test1 = x - curx;
                    test2 = y - cury;
                } else {
                    if (y < lasty || y >= cury) {
                        continue;
                    }
                    if (x < leftx) {
                        hits++;
                        continue;
                    }
                    test1 = x - lastx;
                    test2 = y - lasty;
                }

                if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
                    hits++;
                }
            }
            return ((hits & 1) != 0);
        } // contains(x,y)

        if (x != undefined && y != undefined && w != undefined && h != undefined) {
            if (this.npoints <= 0 || !this.getBoundingBox().intersects(x, y, w, h)) {
                return false;
            }
            /* Crossings */
            var cross = getCrossings(x, y, x + w, y + h);
            return (cross != null && cross.covers(y, y + h));

        } // contains(x,y,w,h)

    }

gPolygon.prototype.getBounds2D = function() {
	    // Summary: 
			// Returns the high precision bounding box of the Shape.
			// [NOT IMPLEMENTED]
        return this.getBounds();
    }

gPolygon.prototype.getCrossings = function( /* double */ xlo, /* double */ ylo, /* double */ xhi, /* double */ yhi) {
        /*
        Crossings cross = new Crossings.EvenOdd(xlo, ylo, xhi, yhi);
        	int lastx = xpoints[npoints - 1];
        	int lasty = ypoints[npoints - 1];
        	int curx, cury;

        	// Walk the edges of the polygon
        	for (int i = 0; i < npoints; i++) {
        	    curx = xpoints[i];
        	    cury = ypoints[i];
        	    if (cross.accumulateLine(lastx, lasty, curx, cury)) {
        		return null;
        	    }
        	    lastx = curx;
        	    lasty = cury;
        	}

        	return cross;
        */
    }

gPolygon.prototype.intersects = function( /* double */ x, /* double */ y, /* double */ w, /* double */ h) {
    // Summary
    // Tests if the interior of this gPolygon intersects the interior of a specified 
    // set of rectangular coordinates.
        if (this.npoints <= 0 || !this.getBoundingBox().intersects(x, y, w, h)) {
            return false;
        }

        /* Crossings */
        var cross = this.getCrossings(x, y, x + w, y + h);
        return (cross == null || !cross.isEmpty());
    }

gPolygon.prototype.getPathIterator = function( /* AffineTransform */ at) {
    // Summery
    // Returns an iterator object that iterates along the boundary of this gPolygon and 
    // provides access to the geometry of the outline of this gPolygon.
        return new gPolygonPathIterator(this, at);
    }

gPolygon.prototype.serialize = function() {
        var str = "";

        for (var i = 0; i < this.npoints; i++)
            str += parseInt(this.xpoints[i]) + "," + parseInt(this.ypoints[i]) + " ";

        return str;
    }

gPolygon.prototype.deserialize = function( /* String */ str) {
        this.initgPolygon();

        //if(str == undefined || str == "" || str == null) return;

        var s = str.split(' ');
        for (var i = 0; i < s.length; i++) {
            var m = s[i].split(",");
            if (m != undefined && m != null && m.length > 1) {
                var x = parseFloat(m[0]);
                var y = parseFloat(m[1]);
                if (!isNaN(x) && !isNaN(y)) this.addPoint(x, y);
            }
        }

    }

gPolygon.prototype.smooth = function( /* int */ level) { // level of smoothness (point to be averged including the current one), only odd numbers 3,5,7,9
				// Summary
				// Takes smoothness level to smooth the polygon by using the averge method
        
        var n = this.npoints;
        var xx = this.xpoints;
        var yy = this.ypoints;

        var nx = new Array();
        var ny = new Array();

        for (var i = 0; i < n; i++) {
            var xSum = 0;
            var ySum = 0;
            for (var j = 0; j < level; j++) {
                var ind = i + j - ((level - 1) / 2);
                if (ind < 0) ind += n;
                else if (ind >= n) ind = ind % n;
                xSum += xx[ind];
                ySum += yy[ind];
            }
            nx[i] = xSum / level;
            ny[i] = ySum / level;
        }

        this.xpoints = nx;
        this.ypoints = ny;

    }

gPolygon.prototype.decimationPath = function( /* int */ npoints, /* SVGPathElement*/ path, /* float */ viewBoxX, viewBoxY, viewBoxW, viewBoxH, viewPortX, viewPortY, viewPortW, viewPortH) {
    // Summary:
    // decimationPath: tessellating the curve of a path to a polygon
    // this function considers the viewBox and ViewPort of an SVG segment

        if (viewBoxX == undefined) viewBoxX = 0;
        if (viewBoxY == undefined) viewBoxY = 0;
        if (viewBoxW == undefined) viewBoxW = innerWidth;
        if (viewBoxH == undefined) viewBoxH = innerHeight;

        if (viewPortX == undefined) viewPortX = 0;
        if (viewPortY == undefined) viewPortY = 0;
        if (viewPortW == undefined) viewPortW = innerWidth;
        if (viewPortH == undefined) viewPortH = innerHeight;

        var ratioX = viewPortW / viewBoxW;
        var ratioY = viewPortH / viewBoxH;

        // Convert a path to Polygon
        var d = path.getTotalLength() / npoints;
        for (var i = 0; i < npoints; i++) {
            p = path.getPointAtLength(i * d);
            this.addPoint((p.x - viewBoxX) * ratioX, (p.y - viewBoxY) * ratioY);
        }

    }

gPolygon.prototype.getPathData = function( /* float */ viewBoxX, viewBoxY, viewBoxW, viewBoxH, viewPortX, viewPortY, viewPortW, viewPortH) {
    // Summary:
    // convert polygon to path data
    // this function considers the viewBox and ViewPort of an SVG segment

        var pathData = null;

        if (viewBoxX == undefined) viewBoxX = 0;
        if (viewBoxY == undefined) viewBoxY = 0;
        if (viewBoxW == undefined) viewBoxW = innerWidth;
        if (viewBoxH == undefined) viewBoxH = innerHeight;

        if (viewPortX == undefined) viewPortX = 0;
        if (viewPortY == undefined) viewPortY = 0;
        if (viewPortW == undefined) viewPortW = innerWidth;
        if (viewPortH == undefined) viewPortH = innerHeight;

        var ratioX = viewPortW / viewBoxW;
        var ratioY = viewPortH / viewBoxH;


        for (var i = 0; i < this.npoints; i++)
            if (pathData == null)
                pathData = "M " + (parseInt(this.xpoints[i]) / ratioX + viewBoxX) + " " + (parseInt(this.ypoints[i]) / ratioY + viewBoxY) + " ";
            else
                pathData += "L " + (parseInt(this.xpoints[i]) / ratioX + viewBoxX) + " " + (parseInt(this.ypoints[i]) / ratioY + viewBoxY) + " ";

        return pathData;
    }

gPolygon.prototype.toString = function() {
    var ret = "";
    for (var i = 0; i < this.npoints; i++)
        ret += this.xpoints[i] + "," + this.ypoints[i] + " "; // for double

    return this.className + "[nPoints = " + this.npoints + "]\n" + "X: " + this.xpoints + "\nY: " + this.ypoints;
}