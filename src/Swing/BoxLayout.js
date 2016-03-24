/**
 * Swing.svg : BoxLayout
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class BoxLayout
 * 
 * A flow layout arranges components in a left-to-right flow, much
 * like lines of text in a paragraph. Flow layouts are typically used
 * to arrange buttons in a panel. It will arrange buttons left to right until 
 * no more buttons fit on the same line. Each line is centered.
 *
 */

// Components are laid out horizontally from left to right.
/* int */ var X_AXIS = 0; 

// Components are laid out vertically from top to bottom.
/* int */ var Y_AXIS = 1; 

// Implements LayoutManager
function BoxLayout( /* int */ axis, /* int */ align, /* int */ valign, /* int */ gap) {
        var argv = BoxLayout.arguments;
        var argc = BoxLayout.length;

        /* String */
        this.name = "BoxLayout";
        /* String */
        this.className = "BoxLayout";
        /* int */
        this.axis = -1; // Either, X_AXIS or Y_AXIS
        /* int */
        this.align = -1;
        /* int */
        this.valign = -1; // Vertical
        // The Box layout manager allows a seperation of components with gaps.  
        /* int */
        this.gap = -1;

        if (argv.length > 0)
        	this.initBoxLayout(axis, align, valign, gap);
    }

BoxLayout.prototype.initBoxLayout = function(axis, align, valign, gap) {
        if (axis == undefined || axis == null) axis = X_AXIS;
        if (align == undefined || align == null) align = LEFT;
        if (valign == undefined || valign == null) valign = TOP;
        if (gap == undefined || gap == -1) gap = 5;
        this.axis = axis;
        this.gap = gap;
        this.align = align;
        this.valign = valign;
    }

BoxLayout.prototype.getGap = function() {
		// Summary:
		// Gets the gap between components.
        return this.gap;
    }

BoxLayout.prototype.setGap = function(gap) {
		// Summary:
    // Sets the gap between components.
        this.gap = gap;
    }

BoxLayout.prototype.addLayoutComponent = function( /* String */ name, /* Component */ comp) {
		// Summary:
    // Adds the specified component to the layout. Not used by this class.	
}

BoxLayout.prototype.removeLayoutComponent = function( /* Component */ comp) {
		// Summary:
    // Removes the specified component from the layout. Not used by
}

BoxLayout.prototype.preferredLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the preferred dimensions for this layout given the visible components in 
    // the specified target container.

        /* Dimension */
        var dim = new Dimension(0, 0);
        var nmembers = target.componentCount();

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getPreferredSize();
                // Calculate the height
                if (this.axis == X_AXIS)
                    dim.height = Math.max(dim.height, d.height);
                else {
                    if (i > 0) dim.height += this.gap;
                    dim.height += d.height;
                }
                // Calculate the width
                if (this.axis == Y_AXIS)
                    dim.width = Math.max(dim.width, d.width);
                else {
                    if (i > 0) dim.width += this.gap;
                    dim.width += d.width;
                }
            }
        }

        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.gap * 2;
        dim.height += insets.top + insets.bottom + this.gap * 2;

        return dim;
    }

BoxLayout.prototype.minimumLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the minimum dimensions needed to layout the visible components contained
    // in the specified target container.

        /* Dimension */
        var dim = new Dimension(0, 0);
        var nmembers = target.componentCount();

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getMinimumSize();
                // Calculate the height
                if (this.axis == X_AXIS)
                    dim.height = Math.max(dim.height, d.height);
                else {
                    if (i > 0) dim.height += this.gap;
                    dim.height += d.height;
                }
                // Calculate the width
                if (this.axis == Y_AXIS)
                    dim.width = Math.max(dim.width, d.width);
                else {
                    if (i > 0) dim.width += this.gap;
                    dim.width += d.width;
                }
            }
        }


        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.gap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

BoxLayout.prototype.moveComponents = function( /* Container */ target, x, y, width, height, rowStart, rowEnd) {
		// Summary:
    // Centers the elements in the specified row, if there is any slack.

        /* Insets */
        var insets = target.getInsets();

        switch (this.align) {
            case RIGHT:
                x += width - insets.right;
                break;
            case CENTER:
                x += width / 2;
                break;
            case LEFT:
                x += insets.left;
                break;
        }

        for (var i = rowStart; i < rowEnd; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                m.setLocation(x, y + (height - m.getHeight()) / 2);
                x += m.getWidth() + this.gap;
            }
        }
    }

BoxLayout.prototype.layoutContainer = function( /* Container */ target) {
		// Summary:
    // Lays out the container. This method lets each component take its preferred size 
    // by reshaping the components in the target container in order to satisfy the alignment of
    // BoxLayout object.

        /* Insets */
        var insets = target.getInsets();
        var nmembers = target.componentCount();
        var x = 0,
            y = insets.top,
            rowh = 0;

        var height = 0;

        if (this.axis == X_AXIS) {
            for (var i = 0; i < nmembers; i++) {
                /* Component */
                m = target.componentAt(i);
                if (m.visible && !m.absolutePosition) {
                    /* Dimension */
                    var d = m.getPreferredSize();
                    m.setSize(d.width, d.height);
                    if (x > 0) x += this.gap;
                    x += d.width;
                    rowh = Math.max(rowh, d.height);
                } // visible
            } // i
            // target,x,y,width,height,rowStart,rowEnd
            this.moveComponents(target, insets.left + this.gap, y, target.getWidth() - x - this.gap, rowh, 0, nmembers);
            height = target.getHeight() - rowh;
        } // axis==X_AXIS
        else
        if (this.axis == Y_AXIS) {
            var x = 0,
                y = 0,
                rowh = 0;
            for (var i = 0; i < nmembers; i++) {
                /* Component */
                m = target.componentAt(i);
                if (m.visible && !m.absolutePosition) {
                    /* Dimension */
                    var d = m.getPreferredSize();
                    m.setSize(d.width, d.height);
                    if (y > 0) y += this.gap;
                    y += d.height;
                    rowh = d.height;
                    // target,x,y,width,height,rowStart,rowEnd
                    this.moveComponents(target, x, y - d.height + this.gap, target.getWidth() - d.width, rowh, i, i + 1);
                } // visible
            } // i
            height = target.getHeight() - y - this.gap;
        } // axis==Y_AXIS

        // Move all components vertically,...
        var dy = 0;
        switch (this.valign) {
            case TOP:
                dy = insets.top;
                break;
            case CENTER:
                dy = height / 2;
                break;
            case BOTTOM:
                dy = height - insets.bottom;
                break;
        }
        for (var i = 0; i < nmembers; i++) {
            /* Component */
            m = target.componentAt(i);
            if (m.visible && !m.absolutePosition)
                m.setLocation(m.getX(), m.getY() + dy);
        } // i	 	 
    }

BoxLayout.prototype.toString = function() {
    var str = "";
    switch (this.axis) {
        case X_AXIS:
            str = "axis = X_AXIS";
            break;
        case Y_AXIS:
            str = "axis = Y_AXIS";
            break;
    }
    switch (this.align) {
        case LEFT:
            str += ", align = left";
            break;
        case CENTER:
            str += ", align = center";
            break;
        case RIGHT:
            str += ", align = right";
            break;
    }

    switch (this.valign) {
        case CENTER:
            str += ", valign = center";
            break;
        case TOP:
            str += ", valign = top";
            break;
        case BOTTOM:
            str += ", valign = bottom";
            break;
    }

    return this.className + "[" + str + ", gap = " + this.gap + "]";
}
