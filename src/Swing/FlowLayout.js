/**
 * Swing.svg : FlowLayout
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class FlowLayout
 *
 * A flow layout arranges components in a left-to-right flow, much
 * like lines of text in a paragraph. Flow layouts are typically used
 * to arrange buttons in a panel. It will arrange buttons left to right until 
 * no more buttons fit on the same line. Each line is centered.
 *
 */

/* int */ var TOP = 3;
/* int */ var BOTTOM = 4;

// This value indicates that each row of components should be left-justified.
/* int */ var LEFT=0;

// This value indicates that each row of components should be centered.
/* int */ var CENTER=1;

// This value indicates that each row of components should be right-justified.
/* int */ var RIGHT=2;

// This value indicates that each row of components should be justified to the 
// leading edge of the container's orientation, for example, to the left in 
// left-to-right orientations.
/* int */ var LEADING=3;

// This value indicates that each row of components should be justified to the 
// trailing edge of the container's orientation, for example, to the right in 
// left-to-right orientations.
/* int */ var TRAILING=4;

// Implements LayoutManager

function FlowLayout( /* int */ align, /* int */ hgap, /* int */ vgap) {
        var argv = FlowLayout.arguments;
        var argc = FlowLayout.length;

        /* String */
        this.name = "FlowLayout";
        /* String */
        this.className = "FlowLayout";
        // This value indicates that each row of components should be left-justified.
        /* int */
        this.LEFT = 0;
        // This value indicates that each row of components should be centered.
        /* int */
        this.CENTER = 1;
        // This value indicates that each row of components should be right-justified.
        /* int */
        this.RIGHT = 2;
        // This value indicates that each row of components should be justified to the 
        // leading edge of the container's orientation, for example, to the left in 
        // left-to-right orientations.
        /* int */
        this.LEADING = 3;
        // This value indicates that each row of components should be justified to the 
        // trailing edge of the container's orientation, for example, to the right in 
        // left-to-right orientations.
        /* int */
        this.TRAILING = 4;
        // align is the property that determines how each row distributes empty space.
        // It can be one of the following values:LEFT,RIGHT,CENTER,LEADING and TRAILING.
        /* int */
        this.align = -1;
        /* int */
        this.newAlign = -1;
        // The flow layout manager allows a seperation of components with gaps.  
        // The horizontal gap will specify the space between components.
        /* int */
        this.hgap = 0;
        // The flow layout manager allows a seperation of components with gaps.  
        // The vertical gap will specify the space between rows.
        /* int */
        this.vgap = 0;
        
        if (argv.length > 0) 
        	this.initFlowLayout(align, hgap, vgap);
    }

FlowLayout.prototype.initFlowLayout = function(align, hgap, vgap) {
        if (align == undefined || align == null) align = this.LEFT;
        if (hgap == undefined || hgap == null) hgap = 5;
        if (vgap == undefined || vgap == null) vgap = 5;
        this.hgap = hgap;
        this.vgap = vgap;
        this.setAlignment(align);
    }

FlowLayout.prototype.getAlignment = function() {
		// Summary:
    // Gets the alignment for this layout.
        return this.newAlign;
    }

FlowLayout.prototype.setAlignment = function(align) {
		// Summary:
    // Sets the alignment for this layout.
        this.newAlign = align;
    }

FlowLayout.prototype.getHgap = function() {
		// Summary:
    // Gets the horizontal gap between components.
        return this.hgap;
    }

FlowLayout.prototype.setHgap = function(hgap) {
		// Summary:
    // Sets the horizontal gap between components.
        this.hgap = hgap;
    }

FlowLayout.prototype.getVgap = function() {
		// Summary:
    // Gets the vertical gap between components.
        return this.vgap;
    }

FlowLayout.prototype.setVgap = function(vgap) {
		// Summary:
    // Sets the vertical gap between components.
        this.vgap = vgap;
    }

FlowLayout.prototype.addLayoutComponent = function( /* String */ name, /* Component */ comp) {
		// Summary:
    // Adds the specified component to the layout. Not used by this class.	
}

FlowLayout.prototype.removeLayoutComponent = function( /* Component */ comp) {
		// Summary:
    // Removes the specified component from the layout. Not used by	
}

FlowLayout.prototype.preferredLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the preferred dimensions for this layout given the visible components in 
    // the specified target container.

        /*Dimension */
        var dim = new Dimension(0, 0);
        /* int */
        var nmembers = target.componentCount();
        /* boolean */
        var firstVisibleComponent = true;

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /*Dimension */
                var d = m.getPreferredSize();
                dim.height = Math.max(dim.height, d.height);
                if (firstVisibleComponent) {
                    firstVisibleComponent = false;
                } else {
                    dim.width += this.hgap;
                }
                dim.width += d.width;
            }
        }

        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.hgap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

FlowLayout.prototype.minimumLayoutSize = function( /* Container */ target) {
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
                dim.height = Math.max(dim.height, d.height);
                if (i > 0) {
                    dim.width += this.hgap;
                }
                dim.width += d.width;
            }
        }
        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.hgap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

FlowLayout.prototype.moveComponents = function( /* Container */ target, x, y, width, height, rowStart, rowEnd, /*boolean*/ ltr) {
		// Summary:
    // Centers the elements in the specified row, if there is any slack.

        switch (this.newAlign) {
            case this.LEFT:
                x += ltr ? 0 : width;
                break;
            case this.CENTER:
                x += width / 2;
                break;
            case this.RIGHT:
                x += ltr ? width : 0;
                break;
            case this.LEADING:
                break;
            case this.TRAILING:
                x += width;
                break;
        }

        for (var i = rowStart; i < rowEnd; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                if (ltr) {
                    m.setLocation(x, y + (height - m.getHeight()) / 2);
                } else {
                    m.setLocation(target.getWidth() - x - m.getWidth(), y + (height - m.getHeight()) / 2);
                }
                x += m.getWidth() + this.hgap;
            }
        }
    }

FlowLayout.prototype.layoutContainer = function( /* Container */ target) {
		// Summary:
    // Lays out the container. This method lets each component take its preferred size 
    // by reshaping the components in the target container in order to satisfy the alignment of
    // FlowLayout object.

        /* Insets */
        var insets = target.getInsets();
        var maxwidth = target.getWidth() - (insets.left + insets.right + this.hgap * 2);
        var nmembers = target.componentCount();
        var x = 0,
            y = insets.top + this.vgap;
        var rowh = 0,
            start = 0;

        /* boolean */
        var ltr = true; // target.getComponentOrientation().isLeftToRight(); <=== [ NOT IMPLEMENTED] 

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getPreferredSize();
                m.setSize(d.width, d.height);
                if ((x == 0) || ((x + d.width) <= maxwidth)) {
                    if (x > 0) {
                        x += this.hgap;
                    }
                    x += d.width;
                    rowh = Math.max(rowh, d.height);
                } else {
                    this.moveComponents(target, insets.left + this.hgap, y, maxwidth - x, rowh, start, i, ltr);
                    x = d.width;
                    y += this.vgap + rowh;
                    rowh = d.height;
                    start = i;
                } // else
            } // visible
        } // i
        this.moveComponents(target, insets.left + this.hgap, y, maxwidth - x, rowh, start, nmembers, ltr);
    }

FlowLayout.prototype.toString = function() {
    var str = "";
    switch (this.newAlign) {
        case LEFT:
            str = ",align=left";
            break;
        case CENTER:
            str = ",align=center";
            break;
        case RIGHT:
            str = ",align=right";
            break;
        case LEADING:
            str = ",align=leading";
            break;
        case TRAILING:
            str = ",align=trailing";
            break;
    }
    return this.className + "[hgap=" + this.hgap + ",vgap=" + this.vgap + str + "]";
}
