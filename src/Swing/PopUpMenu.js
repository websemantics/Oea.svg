/**
 * Swing.svg : PopUpMenu
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

PopUpMenu.prototype= new List(); 

function PopUpMenu( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = PopUpMenu.arguments;
        var argc = PopUpMenu.length;
        /* String */
        this.name = "PopUpMenu";
        /* String */
        this.className = "PopUpMenu";

        if (argv.length > 0) 
          this.initPopUpMenu(x, y, w, h);
    }

PopUpMenu.prototype.initPopUpMenu = function(x, y, w, h) {
        this.addInternalMouseMotionListener(mousePressed, "popUpMenuMousePressed");
        this.addInternalMouseMotionListener(mouseMoved, "popUpMenuMouseMoved");
        ds_addEventListener(this, "mousedown", "desktopMouseDown");
        this.initList(x, y, w, h);
        this.setBackground("#d4d0c8");
        this.font = new Font("Arial", "normal", "10pt");
    }

PopUpMenu.prototype.createSVGContent = function() {
        this.createSVGContentPopUpMenu();
    }

PopUpMenu.prototype.createSVGContentPopUpMenu = function() {
        this.createSVGContentList();
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
        this.hide();
    }

PopUpMenu.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawWinBorder(0, 0, this.w, this.h);
        border.setFaceUp();
        return border;
    }

PopUpMenu.prototype.recalc = function() {
        this.recalcPopUpMenu();
    }

PopUpMenu.prototype.recalcPopUpMenu = function() {
        this.setVisibility(false);
        this.show(); // <=== to fix a bug when it works on batik,....if text node display property is none getComputedTextLength does not work,..
        this.recalcList();
        this.setVisibility(true);
        this.hide();
    }

PopUpMenu.prototype.desktopMouseDown = function(evt) {
    // Summary:
    // Click anywhere to hide the Menu,...
        this.hide();
    }

PopUpMenu.prototype.popUpMenuMouseMoved = function( /* MouseEvent */ e) {
        var d = this.getComponentAt(e.getX(), e.getY());
        if (d != null && d.className == "Item")
            this.changeHighlightedComp(d);
    }

PopUpMenu.prototype.popUpMenuMousePressed = function( /* MouseEvent */ e) {
    // Summary:
    // Because the menu click event is delivered after the desktop event 
    // is excuted then the menu will show.

    if (e.source != this) return;

    this.show();

    var d = this.getComponentAt(e.getX(), e.getY())

    if (d == null || e.getButton() == BUTTON2 || e.getButton() == BUTTON3 || d.className == "Separator") return;

    /* ActionEvent */
    var aevt = new ActionEvent(d, "menuItemSelected", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements()) {
            /* ActionListener */
            k.nextElement().actionPerformed(aevt);

        }
    }
    this.hide();
}
