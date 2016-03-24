/**
 * Java.js : Rectangle
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

Rectangle.prototype = new Rectangle2D();

function Rectangle(x, y, width, height) { /* implements Shape, Serializable */
	// Forms:
	// =====
	// (1) Rectangle();
	// (2) Rectangle(Rectangle r);
	// (3) Rectangle(x,y,width,height);
	// (4) Rectangle(width,height);
	// (5) Rectangle(Point p, Dimension d) 
	// (6) Rectangle(Point p) 
	// (7) Rectangle(Dimension d) 

    this.className = "Rectangle";

    /* No parameters */
    if (!x && !y && !width && !height) {
        x = 0;
        y = 0;
        width = 0;
        height = 0;
    }
    // Two parameters */
    if (x && y && !width && !height) {
        if (x instanceof Point && y instanceof Dimension) {
            var p = x;
            var d = y;
            x = p.getX();
            y = p.getY();
            width = d.getWidth();
            height = d.getHeight();
        } else {
            width = x;
            height = y;
            x = 0;
            y = 0;
        }
    }
    /* One parameter */
    if (x instanceof Rectangle) {
        var r = x;
        x = r.getX();
        y = r.getY();
        width = r.getWidth();
        height = r.getHeight();
    } else
    if (x instanceof Point) {
        var p = x;
        x = p.getX();
        y = p.getY();
        width = 0;
        height = 0;
    } else
    if (x instanceof Dimension) {
        var d = x;
        x = 0;
        y = 0;
        width = d.getWidth();
        height = d.getHeight();
    }

    /* Four parameters or one of the above */
    /* int */
    this.x = x;
    /* int */
    this.y = y;
    /* int */
    this.width = width;
    /* int */
    this.height = height;
}


Rectangle.prototype.getX = function() {
        return this.x;
    }

Rectangle.prototype.getY = function() {
        return this.y;
    }

Rectangle.prototype.getWidth = function() {
        return this.width;
    }

Rectangle.prototype.getHeight = function() {
        return this.height;
    }

Rectangle.prototype.getBounds = function() {
		// Summary:
		// Gets the bounding Rectangle of this Rectangle.  
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

Rectangle.prototype.getBounds2D = function() {
		// Summary:
    // Return the high precision bounding box of this rectangle.  
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

Rectangle.prototype.setBounds = function(x, y, width, height) {
		// Summary:
    // Sets the bounding Rectangle of this Rectangle  
    // 
    // Forms:
    // ======
    // (1) setBounds(Rectangle r);
    // (2) setBounds(x,y,width,height);

        if (x instanceof Rectangle) {
            var r = x;
            this.setBounds(r.getX(), r.getY(), r.getWidth(), r.getHeight());
            return;
        }
        this.reshape(x, y, width, height);
    }

Rectangle.prototype.setRect = function( /* double */ x, /* double */ y, /* double */ width, /* double */ height) {
		// Summary:
    // Sets the bounds of this Rectangle to the specified x, y, width,and height.  

        /* int */
        var x0 = Math.floor(x);
        /* int */
        var y0 = Math.floor(y);
        /* int */
        var x1 = Math.ceil(x + width);
        /* int */
        var y1 = Math.ceil(y + height);
        this.setBounds(x0, y0, x1 - x0, y1 - y0);
    }

Rectangle.prototype.reshape = function( /* int */ x, /* int */ y, /* int */ width, /* int */ height) {
		// Summary:
    // Sets the bounding Rectangle of this Rectangle to the specified x, y, width, and height.  
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

Rectangle.prototype.getLocation = function() {
		// Summary:
    // Returns the location of this Rectangle.  
        return new Point(this.x, this.y);
    }

Rectangle.prototype.setLocation = function(x, y) {
		// Summary:
    // Moves this Rectangle to the specified location.  
    //
    // Forms:
    // ======
    // (1) setLocation(x,y)
    // (2) setLocation(Point p)

        if (x instanceof Point) {
            var p = x;
            this.setLocation(p.getX(), p.getY());
            return;
        }
        this.move(x, y);
    }

Rectangle.prototype.move = function(x, y) {
		// Summary:
    // Moves this Rectangle to the specified location.  

        this.x = x;
        this.y = y;
    }

Rectangle.prototype.translate = function(dx, dy) {
		// Summary:
    // Translates this point, at location x,y, by dx and dy 

        this.x += dx;
        this.y += dy;
    }

Rectangle.prototype.getSize = function() {
		// Summary:
    // Gets the size of this Rectangle, represented by the returned Dimension. 

        return new Dimension(this.width, this.height);
    }

Rectangle.prototype.setSize = function(width, height) {
		// Summary:
    // Sets the size of this Rectangle  
    //
    // Forms:
    // ======
    // (1) setSize(width,height)
    // (2) setSize(Dimension d)

        if (width instanceof Dimension) {
            var d = width;
            this.setSize(d.getWidth(), d.getHeight());
            return;
        }
        this.resize(width, height);
    }

Rectangle.prototype.resize = function(width, height) {
		// Summary:
    // Sets the size of this Rectangle to the specified width and height. 

        this.width = width;
        this.height = height;
    }

Rectangle.prototype.contains = function(x, y, width, height) {
		// Summary:
    // Checks whether or not this Rectangle contains the specified Point.
    //
    // Forms:
    // ======
    // (1) contains(x,y)
    // (2) contains(Point p) 
    // (3) contains(x,y,width,height) 
    // (3) contains(Rectangle r) 

        // One parameters 
        if (x instanceof Point) {
            var p = x;
            return this.contains(p.getX(), p.getY());
        }
        if (x instanceof Rectangle) {
            var r = x;
            return this.contains(r.getX(), r.getY(), r.getWidth(), r.getHeight());
        }
        // Two parameters 
        if (x && y && !width && !height) return this.inside(x, y);
        // Four parameters 
        // Checs whether this Rectangle entirely contains the Rectangle at the specified location
        var X = x;
        var Y = y;
        var W = width;
        var H = height;
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;

        if ((w | h | W | H) < 0) {
            return false;
        } // At least one of the dimensions is negative...

        if (X < x || Y < y) {
            return false;
        } // Note: if any dimension is zero, tests below must return false...
        w += x;
        W += X;
        if (W <= X) {
            // X+W overflowed or W was zero, return false if...
            // either original w or W was zero or
            // x+w did not overflow or
            // the overflowed x+w is smaller than the overflowed X+W
            if (w >= x || W > w) {
                return false;
            }
        } else {
            // X+W did not overflow and W was not zero, return false if...
            // original w was zero or
            // x+w did not overflow and x+w is smaller than X+W
            if (w >= x && W > w) {
                return false;
            }
        }
        h += y;
        H += Y;
        if (H <= Y) {
            if (h >= y || H > h) {
                return false;
            }
        } else {
            if (h >= y && H > h) {
                return false;
            }
        }
        return true;
    }

Rectangle.prototype.inside = function(X, Y) {
		// Summary:
    // Checks whether or not this Rectangle contains the point at the specified location 

        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        if ((w | h) < 0) {
            return false;
        } // At least one of the dimensions is negative...
        if (X < x || Y < y) {
            return false;
        } // Note: if either dimension is zero, tests below must return false...
        w += x;
        h += y;
        //    overflow || intersect
        return ((w < x || w > X) && (h < y || h > Y));
    }

Rectangle.prototype.intersects = function( /* Rectangle */ r) {
		// Summary:
    // Determines whether or not this Rectangle and the specified Rectangle intersect.
    //
    // Two rectangles intersect if their intersection is nonempty.

        var tw = this.width;
        var th = this.height;
        var rw = r.width;
        var rh = r.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        var tx = this.x;
        var ty = this.y;
        var rx = r.x;
        var ry = r.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return ((rw < rx || rw > tx) && (rh < ry || rh > ty) && (tw < tx || tw > rx) && (th < ty || th > ry));
    }

Rectangle.prototype.intersection = function( /* Rectangle */ r) {
		// Summary:
    // Computes the intersection of this Rectangle with the specified Rectangle.
    //
    //Returns a new Rectangle that represents the intersection of the two rectangles.
    //If the two rectangles do not intersect, the result will be an empty rectangle.

        var tx1 = this.x;
        var ty1 = this.y;
        var rx1 = r.x;
        var ry1 = r.y;
        var tx2 = tx1;
        tx2 += this.width;
        var ty2 = ty1;
        ty2 += this.height;
        var rx2 = rx1;
        rx2 += r.width;
        var ry2 = ry1;
        ry2 += r.height;
        if (tx1 < rx1) tx1 = rx1;
        if (ty1 < ry1) ty1 = ry1;
        if (tx2 > rx2) tx2 = rx2;
        if (ty2 > ry2) ty2 = ry2;
        tx2 -= tx1;
        ty2 -= ty1;
        // tx2,ty2 will never overflow (they will never be
        // larger than the smallest of the two source w,h)
        // they might underflow, though...
        if (tx2 < this.MIN_VALUE) tx2 = this.MIN_VALUE;
        if (ty2 < this.MIN_VALUE) ty2 = this.MIN_VALUE;
        return new Rectangle(tx1, ty1, tx2, ty2);
    }

Rectangle.prototype.union = function( /* Rectangle */ r) {
		// Summary:
    // Computes the union of this Rectangle with the specified Rectangle.
    //
    // Returns a new Rectangle that represents the union of the two rectangles

        var x1 = Math.min(this.x, r.x);
        var x2 = Math.max(this.x + this.width, r.x + r.width);
        var y1 = Math.min(this.y, r.y);
        var y2 = Math.max(this.y + this.height, r.y + r.height);
        return new Rectangle(x1, y1, x2 - x1, y2 - y1);
    }

Rectangle.prototype.add = function(newx, newy, newwidth, newheight) {
		// Summary:
    // Adds a point, specified by the integer arguments newx and newy, to this Rectangle. 
    // OR
    // Adds a Rectangle to this Rectangle.
    //
    // The resulting Rectangle is the smallest Rectangle that contains both the original 
    // Rectangle and the specified point OR The resulting Rectangle is the union of the two rectangles.
    //
    // After adding a point/rectangle, a call to contains with the added point as an argument does 
    // not necessarily return true. 
    // The contains method does not return true for points on the right or bottom edges of a Rectangle. 
    // Therefore, if the added point falls on the right or bottom edge of the enlarged Rectangle, 
    // contains returns false for that point.
    //
    // Forms:
    // ======
    // (1) add(point pt)
    // (2) add(newx, newy)
    // (3) add(Rectangle r)
    
        if (newx instanceof Point) {
            var pt = newx;
            this.add(pt.getX(), pt.getY(), 0, 0);
            return;
        }
        if (newx instanceof Rectangle) {
            var r = newx;
            this.add(r.getX(), r.getY(), r.getWidth(), r.getHeight());
            return;
        }

        var x1 = Math.min(this.x, newx);
        var x2 = Math.max(this.x + this.width, newx + newwidth);
        var y1 = Math.min(this.y, newy);
        var y2 = Math.max(this.y + this.height, newy + newheight);
        this.x = x1;
        this.y = y1;
        this.width = x2 - x1;
        this.height = y2 - y1;
    }

Rectangle.prototype.grow = function(h, v) {
		// Summary:
    // Resizes the Rectangle both horizontally and vertically.
    //
    // This method modifies the Rectangle so that it is h units larger on both the left and right side,
    // and v units larger at both the top and bottom. 

        this.x -= h;
        this.y -= v;
        this.width += h * 2;
        this.height += v * 2;
    }

Rectangle.prototype.isEmpty = function(h, v) {
		// Summary:
    // Determines whether or not this Rectangle is empty. 
    //
    // A Rectangle is empty if its width or its height is less than or equal to zero.

        return (this.width <= 0) || (this.height <= 0);
    }

Rectangle.prototype.outcode = function( /* double */ x, /* double */ y) {
		// Summary:
    // Determines where the specified coordinates lie with respect to this Rectangle. 
    //
    // This method computes a binary OR of the appropriate mask values indicating, for each side of this 
    // Rectangle, whether or not the specified coordinates are on the same side of the edge as the rest of this Rectangle.

        /*
         * Note on casts to double below.  If the arithmetic of
         * x+w or y+h is done in int, then we may get integer
         * overflow. By converting to double before the addition
         * we force the addition to be carried out in double to
         * avoid overflow in the comparison.
         */

        var out = 0;
        if (this.width <= 0) {
            out |= this.OUT_LEFT | this.OUT_RIGHT;
        } else if (x < this.x) {
            out |= this.OUT_LEFT;
        } else if (x > this.x + this.width) {
            out |= this.OUT_RIGHT;
        }
        if (this.height <= 0) {
            out |= this.OUT_TOP | this.OUT_BOTTOM;
        } else if (y < this.y) {
            out |= this.OUT_TOP;
        } else if (y > this.y + this.height) {
            out |= this.OUT_BOTTOM;
        }
        return out;
    }

Rectangle.prototype.createIntersection = function( /* Rectangle2D */ r) {
		// Summary:
    // Returns a new Rectangle2D object representing the intersection of this Rectangle with the specified Rectangle2D. 
    //
    // A Rectangle is empty if its width or its height is less than or equal to zero.

        if (r instanceof Rectangle) {
            return this.intersection(r);
        }
        /*
          NOT IMPLEMENTED 
        	Rectangle2D  var dest = new Rectangle2D.Double();
        	Rectangle2D.intersect(this, r, dest);
        	return dest;
        */

    }

Rectangle.prototype.createUnion = function( /* Rectangle2D */ r) {
		// Summary:
    // Returns a new Rectangle2D object representing the union of this Rectangle with the specified Rectangle2D. 

        if (r instanceof Rectangle) {
            return this.union(r);
        }
        /*
          NOT IMPLEMENTED 
          Rectangle2D dest = new Rectangle2D.Double();
        	Rectangle2D.union(this, r, dest);
        	return dest;
         */
        return false; // [Remove]
    }

Rectangle.prototype.equals = function( /* Object */ obj) {
		// Summary:
    // Checks whether two rectangles are equal. 
    //
    // The result is true if and only if the argument is not null and is a Rectangle 
    // object that has the same top-left corner, width, and height as this Rectangle. 
    // 
    // Forms:
    // ======
    // (1) equals(Rectangle r)
    // (2) equals(Rectangle2D r)

    if (obj instanceof Rectangle) {
        var r = obj;
        return ((x == r.x) && (y == r.y) && (width == r.width) && (height == r.height));
    }
    /*
     NOT IMPLEMENTED 
     return super.equals(obj);	
    */
    return false; // [Remove]
}