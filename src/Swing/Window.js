/**
 * Swing.svg : Window
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th Feb 2005 -> 28th July 2005
 * @package   websemantics/oea/swing.svg
 */

Window.prototype= new Panel(); 

function Window(x, y, w, h, title, icon, closeButtonFlag, windowSkin) { // Implements ActionListener
        var argv = Window.arguments;
        var argc = Window.length;

        /* String   */
        this.name = "Window";

        /* String   */
        this.className = "Window";

        /* Graphics */
        this.sking = null; // Used by the WindowSkin
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* WindowSkin */
        this.windowSkin = windowSkin || null;
        /* int */
        this.edgeWidth = 5; // Used to change the mouse cursor when it's at the window edges
        /* Boolean */
        this.fixedSize = false; // If true, the window can not be resized
        /* String */
        this.title = title || "Untitled: ";
        /* icon */
        this.icon = icon || null;
        /* int */
        this.titleRectHeight = 18;
        /* int */
        this.minWidth = 70;
        /* int */
        this.minHeight = 70;
        /* Component */
        this.closeBut = null;
        /* Boolean */
        this.closeButtonFlag = closeButtonFlag || true; // If true, display close button
        /* Boolean */
        this.active = false; // If true, the window is active
        /* int */
        this.execludedMovingAreaWidth = 0; // the area taken by the buttons
        /* boolean */
        this.recalcInsets = true; // 
        
        if (argv.length > 0) 
          this.initWindow(x, y, w, h);
    }

Window.prototype.initWindow = function(x, y, w, h) {
        
        if (typeof this.icon == 'string' || this.icon instanceof String){
            this.icon = new Icon(this.icon, 16,16);
        }

        this.windowSkin =  this.windowSkin || new DefaultWindowSkin(); //  SimpleWindowSkin();                      
        this.enableMouseListener();
        this.enableMouseMotionListener();
        this.addInternalMouseMotionListener(mouseStartDragged, "winMouseStartDragged");
        this.addInternalMouseMotionListener(mouseDragged, "winMouseDragged");
        this.addInternalMouseMotionListener(mouseMoved, "winMouseMoved");
        this.addInternalMouseMotionListener(mouseClicked, "winMouseClicked");
        this.addInternalMouseMotionListener(mousePressed, "winMousePressed");
        ds_addEventListener(this, "mousedown", "desktopMouseClick");
        this.initContainer(x, y, w, h); // The container is intilized here to let the mouse listeners run after the window ones, so
        
        // mouse events of its childeren get executed afterwards.
        ds_addEventListener(this, "click", "desktopMouseClick");
        this.setInsets(3, 3, 3, 3);
        this.setFont(new Font("Helvetica", "normal", "10pt"));

        if (this.closeButtonFlag) {
            this.closeBut = this.add(new Button(0, 0, 20, 20, "closeBut"));
            this.closeBut.addActionListener(this);
            this.closeBut.setAbsolutePosition(true);
        }

    }

Window.prototype.changeSkin = function( /* WindowSkin */ skin) {
        if (!this.created)
            this.windowSkin = skin;
        else {
            this.sking.oldClear();
            this.contentg.oldClear();
            this.windowSkin = skin;
            this.createSVGContent();
        }
    }

Window.prototype.paint = function( /* Graphics */ g) {
        this.paintWindow(g);
    }

Window.prototype.paintWindow = function( /* Graphics */ g) {
        this.paintPanel(g);
    }

Window.prototype.createSVGContent = function() {
        this.createSVGContentWindow();
    }

Window.prototype.createSVGContentWindow = function() {
        this.createSVGContentContainer();
        this.sking = this.getGraphics();
        this.contentg = this.getGraphics();
        this.windowSkin.createSVGContent(this);
        this.paintChildren(this.contentg);
        
        if (this.closeBut != null) {
            var g = this.closeBut.getGraphics();
            g.setStrokeColor("black");
            g.setStrokeWidth(1);
            this.closeBut.line1 = g.drawLine(0, 0, 0, 0);
            this.closeBut.line2 = g.drawLine(0, 0, 0, 0);
        }

        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

Window.prototype.onResize = function() {
        this.onResizeWindow();
    }

Window.prototype.onResizeWindow = function() {
       
        //this.onResizePanel(); [Skip the Container resize]
        if (this.w < this.minWidth) 
            this.w = this.minWidth;

        if (this.h < this.minHeight) 
            this.h = this.minHeight;
        
        this.onResizeCanvas();
        this.windowSkin.setSize(this.w, this.h);
        
        if (this.closeBut != null)
            this.closeBut.setLocation(this.w - this.closeBut.w - this.windowSkin.borderWidth * 2, this.windowSkin.borderWidth * 2);
    }

Window.prototype.onMove = function() {
        this.onMoveWindow();
    }

Window.prototype.onMoveWindow = function() {
        this.onMovePanel();
    }

Window.prototype.recalc = function() {
        this.recalcWindow();
    }

Window.prototype.recalcWindow = function() {
        if (this.windowSkin != null) {
            this.windowSkin.recalc();
            this.titleRectHeight = this.windowSkin.titleLabel.getHeight();
            if (this.recalcInsets) {
                this.setInsets(this.left, this.right, this.top + this.titleRectHeight, this.bottom);
                this.recalcInsets = false;
            }
            // Update the close button and its drawings
            if (this.closeBut != null) {
                this.closeBut.setSize(this.titleRectHeight - 6, this.titleRectHeight - 6);
                this.closeBut.setLocation(this.w - this.closeBut.w - this.windowSkin.borderWidth * 2, this.windowSkin.borderWidth * 2);
                var w = this.closeBut.w;
                var h = this.closeBut.h;
                var strokeWidth = w * 0.1
                var m = 0.8 * w;
                this.closeBut.line1.setAttribute('stroke-width', strokeWidth);
                this.closeBut.line2.setAttribute('stroke-width', strokeWidth);
                this.closeBut.line1.setPoint1(m, m);
                this.closeBut.line1.setPoint2(w - m, h - m);
                this.closeBut.line2.setPoint1(w - m, m);
                this.closeBut.line2.setPoint2(m, h - m);
                this.execludedMovingAreaWidth = this.closeBut.w + this.windowSkin.borderWidth * 2;
            }
        }
        this.recalcPanel();
    }

Window.prototype.setToFixedSize = function() {
        this.fixedSize = true;
    }

Window.prototype.getTitle = function() {
        return this.title;
    }

Window.prototype.getIcon = function() {
        return this.icon;
    }

Window.prototype.setMinSize = function(w, h) {
        this.minWidth = w;
        this.minHeight = h;
    }

Window.prototype.putWindowOnTop = function() {
    windowLayer.addGraphics(this); // Move window to the top
}

Window.prototype.winMousePressed = function( /* MouseEvent */ event) {

        if (this.windowSkin != null) {
            this.windowSkin.active();
            this.active = true;
        }

    }
Window.prototype.winMouseClicked = function( /* MouseEvent */ event) {

        this.winMousePressed(event);
        this.putWindowOnTop();
    }

Window.prototype.winMouseMoved = function( /* MouseEvent */ event) {
        //if(!this.active)return;
        var x = event.getX();
        var y = event.getY();
        var w = this.w;
        var h = this.h;
        var bw = this.edgeWidth;
        if (!this.fixedSize) {
            if (x < bw && y < bw) {
                this.setCursor("nw-resize");
                return
            }
            if ((x > bw && x < (w - bw)) && y < bw) {
                this.setCursor("n-resize");
                return
            }
            if ((x > (w - bw)) && y < bw) {
                this.setCursor("ne-resize");
                return
            }
            if (x < bw && (y > bw && y < (h - bw))) {
                this.setCursor("w-resize");
                return
            }
            if (x < bw && (y > (h - bw))) {
                this.setCursor("sw-resize");
                return
            }
            if ((x > (w - bw)) && (y > bw && y < (h - bw))) {
                this.setCursor("e-resize");
                return
            }
            if ((x > (w - bw)) && (y > (h - bw))) {
                this.setCursor("se-resize");
                return
            }
            if ((x > bw && x < (w - bw)) && (y > (h - bw))) {
                this.setCursor("s-resize");
                return
            }
        }
        if (y < this.titleRectHeight && x < this.w - this.execludedMovingAreaWidth) {
            this.setCursor("move");
            return;
        }
        this.setCursor("default");
    }

Window.prototype.winMouseStartDragged = function( /* MouseEvent */ event) {
        this.tempX = event.getX();
        this.tempY = event.getY();

        this.putWindowOnTop();
    }

Window.prototype.winMouseDragged = function( /* MouseEvent */ event) {
        var x = event.getX();
        var y = event.getY();
        var dragMode = this.getCursor();
        switch (dragMode) {
            case "n-resize":
                if (this.fixedSize) break;
                this.setSize(this.w, this.h - y);
                this.setLocation(this.x, this.y + y);
                break;
            case "w-resize":
                if (this.fixedSize) break;
                this.setSize(this.w - x, this.h);
                this.setLocation(this.x + x, this.y);
                break;
            case "e-resize":
                if (this.fixedSize) break;
                this.setSize(x, this.h);
                break;
            case "s-resize":
                if (this.fixedSize) break;
                this.setSize(this.w, y);
                break;
            case "nw-resize":
                if (this.fixedSize) break;
                this.setSize(this.w - x, this.h - y);
                this.setLocation(this.x + x, this.y + y);
                break;
            case "ne-resize":
                if (this.fixedSize) break;
                this.setSize(x, this.h - y);
                this.setLocation(this.x, this.y + y);
                break;
            case "sw-resize":
                if (this.fixedSize) break;
                this.setSize(this.w + (this.tempX - x), y);
                this.setLocation(this.x - this.tempX + x, this.y);
                break;
            case "se-resize":
                if (this.fixedSize) break;
                this.setSize(x, y);
                break;
            case "move":
                this.translate(this.x - this.tempX + x, this.y - this.tempY + y);
                break;
        }
    }

Window.prototype.desktopMouseClick = function(evt) {
        var r = new gRectangle(this.x, this.y, this.w, this.h);

        var matrix = svgDocument.rootElement.getScreenCTM();
        var scale = svgDocument.rootElement.currentScale;

        var x = parseInt((evt.screenX - matrix.e) / scale);
        var y = parseInt((evt.screenY - matrix.f) / scale);

        if (!r.contains(x, y))
            if (this.windowSkin != null) {
                this.windowSkin.inactive();
                this.active = false;
            }
    }

Window.prototype.show = function() {
        this.showWindow();
    }

Window.prototype.showWindow = function() {
        this.showComponent();
        this.putWindowOnTop();
    }

Window.prototype.actionPerformed = function( /* ActionEvent */ e) {
        this.actionPerformedWindow(e);
    }

Window.prototype.actionPerformedWindow = function( /* ActionEvent */ e) {

    var src = e.source;
    var comm = e.getActionCommand();

    if (comm == "buttonClicked") {
        switch (src) {
            //  case this.closeBut:this.dispose(); break;
            case this.closeBut:
                this.hide();
                break;
        }
    }
}