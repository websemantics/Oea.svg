# Oea.svg

SVG GUI and Graphics Library built after Java AWT. The Oea Framework provides three Javascript libraries, 1- Java.js, 2- Draw2D.svg and 3- Swing.svg to build SVG GUI applications.

## Java.js

This package container a number of core Java classes that was required to implement both, Draw2D.svg and Swing.svg. Two Java packages have been ported, AWT and Util. AWT classes included Event and Geom namespaces while Util package included generic classes such as Hastable, Vector, Enumeration and many other useful code.

## Draw2D.svg

The svgDraw2D package is written for SVG in JavaScript to decouple the manipulation of DOM/SVG interfaces from writing graphics applications. The package provides a higher level of abstraction to JavaScript developers to manipulate graphics independently from the DOM API. It also provides capabilities for drawing sophisticated two-dimensional shapes, working with fonts, text and text layout, controlling colours; and it features layering management, styled tool tips and desktop canvas. The work on the svgDraw2D package was inspired by the Java AWT package.

### Foundational Classes

#### Rect

Rect represents an axis-aligned rectangle. Graphical entities in svgDraw2D (i.e. Shapes, Graphics objects) are bounded within a rectangular area. The Rect class also provides an interface to change-size, rotate, scale and to translate a graphical entity.

#### SVGNode

The SVGNode class is used as a wrapper around an SVG node (or DOM tree element). The class ensures access to the SVG node corresponding to any Shape or Graphics in svgDraw2D. SVGNode provides convenient methods to return the actual SVG node, set/get/remove the SVG node attributes, set/get the Id, add/remove DOM event listeners, set visibility and opacity, set/get the cursor, set/get the tool tip text and finally to dispose the SVG node from the SVG document permanently.

#### RectNode

RectNode is responsible of applying all changes and transformations - made on the rectangular area defined by the Rect class - on the SVG content. For instance, when the user invokes any method on the Rect class, say obj.rotate(45), RectNode will change the properties of the SVG node referenced by the SVGNode class accordingly.

#### Node

This class is used to maintain a list of internal (local within the inheritance hierarchy of the class) and external listeners for DOM Level 3 mouse events. When a DOM Level 3 mouse event is received the class notifies all listeners of that particular event type. Subclasses of this class could have separate event handlers for any DOM event. For instance, if class A has registered to handle the mousedown event through the processMouseDown method and its subclass B wants to handle the same event but without stopping events being delivered to class A; in JavaScript this is not possible because if class B overrides the processMouseDown method it will never be able to pass control up to the superclass version of the method (e.g. use of super.processMouseDown ()). The Node class also provides an interface to its internal methods to register listeners for any global mouse events (see Section 4.1.7).

Figure below illustrates the inheritance hierarchy diagram of the main svgDraw2D classes. The Foundational Classes (coloured blue) are described below in Section 4.2. Foundational Classes are also used with the svgSwing package (Section 6.1).

### Main Classes

#### Graphics Canvas

Graphics acts as a graphical container that can be used to generate SVG drawing primitives. It manages a graphics context by controlling how information is drawn; similar to the Java AWT Graphics class. svgDraw2D Graphics contains methods for drawing, colouring and font manipulation. Additional methods are supported by Graphics such as flexible clipping, tool tip, cursor manipulation, DOM events handling, and coordinate transformation (scale, rotate and translate). Graphics permits external listeners to handle DOM events that originated from within the Graphics content; and for internal handling of events that originated elsewhere in the SVG document (global events, see Section 4.1.7).

#### Layer

The svgDraw2d package provides a layering feature. Graphics has to be associated to a layer to be valid. A default layer is used if the user has not specified one. Layers have a z-order property that is used for display order.

#### Shape

Graphics is used for drawing lines, images, rectangles, ovals and other drawing primitives. All drawing methods of Graphics return Shape objects (Rectangle, Text, TextView, Oval, Path, etc). Shape object provides an interface to manipulate the corresponding SVG primitive. Similarly to Graphics, Shape supports tool tip, cursor manipulation, DOM events handling and coordinate transformation.

#### Cursor

The Cursor object provides an interface to the system cursor. The cursor shape can be changed to any entry of the cursor default list supported by SVG/DOM (i.e. crosshair, move, e-resize, etc) or can be set to a Shape or a Graphics.

#### Tooltip

Graphics and Shape objects use the setToolTipTest method to create a tool tip. The tool tip is displayed automatically when the mouse pointer moves over the content of a Graphics or a Shape objects.

#### Font and Font Metrics

Font and FontMetrics provide methods and constants for font control.

#### Desktop

The Desktop is a key component in svgDraw2D. It continuously listens to all DOM events that occur on the SVG document (mousedown, mouseover, mouseup, mouseout, mousemove and click). It maintains a list of listeners that it notifies whenever an event is received. JavaScript objects can act as event listeners by registering themselves with the Desktop. Listeners should provide a callback method that the Desktop invokes to notify the object with an event. Desktop events are regarded as global events within the svgDraw2D package. This object also has a major role in implementing the Advanced Mouse Event handling code.

Section 5.2.3 provides more information about the Desktop.



### Draw2D.svg


## Swing.svg


using http://smallicons.net/
