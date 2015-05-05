/**
 * Oea.svg : Launcher
 *
 * This is used to launch swing applications,...use callback function
 * 
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th September 2005
 * @package   websemantics/oea/tools
 */

Launcher.prototype = new Window();

function Launcher( /* String */ title, /* String */ callback) {
    var argv = Launcher.arguments;
    var argc = Launcher.length;
    this.className = "Launcher";

    /* int */
    this.defaultW = 325;
    /* int */
    this.defaultH = 70;
    /* Function */
    this.callback = null;
    
    if (argv.length > 0) 
    	this.initLauncher(title, callback);
}
//*************
// initLauncher 
//*************
Launcher.prototype.initLauncher = function( /* String */ title, /* String */ callback) {
    var x = (innerWidth - this.defaultW) / 2;
    var y = (innerHeight - this.defaultH) / 2;
    // Initilize the super class : Window
    this.initWindow(x, y, this.defaultW, this.defaultH, title, null, false);
    this.setToFixedSize();
    this.setLayout(new FlowLayout(CENTER, 5, 5));
    var button = new Button(0, 0, 64, 30, "load", "");
    button.setResizeToText(false);
    this.setCallback(callback);
    button.addActionListener(this);
    this.add(button);
    this.paint();
    button.contentg.setFont(new Font("Helvetica", "normal", "10pt"));
    button.contentg.drawText(9, 20, "Load,..");
    this.recalc();
}
//*************
// actionPerformed 
//*************
Launcher.prototype.setCallback = function( /* String */ cb) {
    this.callback = cb;
}
//*************
// actionPerformed 
//*************
Launcher.prototype.actionPerformed = function( /* ActionEvent */ e) {
    this.actionPerformedLauncher(e);
}
//*************
// actionPerformedLauncher 
//*************
Launcher.prototype.actionPerformedLauncher = function( /* ActionEvent */ e) {
    this.actionPerformedWindow(e);
    var src = e.source;
    var comm = e.getActionCommand();
    if (comm == "buttonClicked") {
        switch (src.name) {
            case "load":
                if (this.callback != null) this.callback();
                break;
        }
    }
    this.dispose();
}