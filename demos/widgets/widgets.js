/**
 * Oea.svg : Swing Widgets
 *
 * 
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th September 2005
 * @package   websemantics/oea/tools
 */


function run() {
    
    var w = 700, h = 500;

		// var win = new Window(250, 200, 300, 300, "Swing Widgets", null, true, new SimpleWindowSkin());
		var win = new Window(300, 100, w+ 20, h+40, "Swing.svg Widgets", null, true);

		win.setMinSize(w, h);
		win.setLayout(new FlowLayout(CENTER));
		
		// win.paint();
		// win.recalc();
		// win.inProgress(true);

		setTimeout(function() { load(win, w,h); }, 300);
	}

 function makeInfoBox(text, x, y) {
	 	// Summary:
	 	// Create an info box

	 	x = x || 0;
	 	y = y || 0;

    var info = new TitledBorder(x, y, 475, 40);
    info.setBackground('#1abc9c');
    info.setLayout(new FlowLayout(LEFT));

    var note = new Label(0, 0, 0, 0, null, text, new Icon("../../img/smallicons/rocket.svg", 16, 16),'#fff')
    
    info.add(note);

    return info;
 }

 function load(win, w, h) {

    tabbedPane = new TabbedPane(0, 0, w, h);
    var p1 = tabbedPane.addPane("pane1", " Tabbed Pane .", new Icon("../../img/demos/widgets/TabbedPane.png", 32, 32));
    var p2 = tabbedPane.addPane("pane2", " Toolbar .....", new Icon("../../img/demos/widgets/Toolbar.png", 32, 32));
    var p3 = tabbedPane.addPane("pane3", " Titled Border", new Icon("../../img/demos/widgets/TitledBorder.png", 32, 32));
    var p5 = tabbedPane.addPane("pane5", "Button", new Icon("../../img/demos/widgets/Button.png", 32, 32));
    var p6 = tabbedPane.addPane("pane6", "Label", new Icon("../../img/demos/widgets/Label.png", 32, 32));
    var p7 = tabbedPane.addPane("pane7", "ToolTip", new Icon("../../img/demos/widgets/ToolTip.png", 32, 32));
    var p8 = tabbedPane.addPane("pane8", "List", new Icon("../../img/demos/widgets/List.png", 32, 32));
    var p9 = tabbedPane.addPane("pane9", "PopUp Menu", new Icon("../../img/demos/widgets/PopupMenu.png", 32, 32));
    var p10 = tabbedPane.addPane("pane10", "ComboBox", new Icon("../../img/demos/widgets/ComboBox.png", 32, 32));
    var p4 = tabbedPane.addPane("pane4", "TextBox", new Icon("../../img/demos/widgets/TextArea.png", 32, 32));
    var p11 = tabbedPane.addPane("pane11", "CheckBox", new Icon("../../img/demos/widgets/CheckBox.png", 32, 32));
    
    // **************************************************
    // Add TabbedPane
    // **************************************************
    
    tb1 = new TabbedPane(0, 0, 235, 200);
    tb1.addPane("pane6", "Left");
    tb1.addPane("pane7", "Right");
    tb1.addPane("pane8", "Bottom");
    tb1.setAlign(X_AXIS, LEFT, TOP, 2);

    tb2 = new TabbedPane(0, 0, 235, 200);
    tb2.addPane("pane6", null, new Icon("../../img/smallicons/medicine.svg", 32, 32));
    tb2.addPane("pane7", null, new Icon("../../img/smallicons/hamburger.svg", 32, 32));
    tb2.addPane("pane8", null, new Icon("../../img/smallicons/muffin.svg", 32, 32));
    tb2.setAlign(X_AXIS, RIGHT, BOTTOM, 6);

    tb3 = new TabbedPane(0, 0, 235, 200);
    tb3.addPane("pane6", "Refresh", new Icon("../../img/smallicons/cloud-refresh.svg", 16, 16));
    tb3.addPane("pane7", "Error", new Icon("../../img/smallicons/cloud-error.svg", 16, 16));
    tb3.addPane("pane8", "Success", new Icon("../../img/smallicons/cloud-check.svg", 16, 16));
    tb3.setAlign(Y_AXIS, LEFT, TOP, 4);

    tb4 = new TabbedPane(0, 0, 235, 200);
    tb4.addPane("pane6", "Left");
    tb4.addPane("pane7", "Right");
    tb4.addPane("pane8", "Bottom");
    tb4.setAlign(Y_AXIS, RIGHT, BOTTOM, 2);
    
		p1.setLayout(new FlowLayout(LEFT,15,15));

    p1.add(makeInfoBox("FlowLayout and TabbedPane Component with different alignments."));
    p1.add(tb1);
    p1.add(tb2);
    p1.add(tb3);
    p1.add(tb4);

    // **************************************************
    // Add Toolbars
    // **************************************************
    
    var toolbar1 = new Toolbar(20, 20, 400, 150);
    toolbar1.addItem("b1", "File");
    toolbar1.addItem("b2", "Edit");
    toolbar1.addItem("b3", "View");
    toolbar1.addItem("b4", "Tools");
    toolbar1.addItem("b5", "Actions");
    toolbar1.addItem("b6", "Window");
    toolbar1.addItem("b7", "Help");
    var toolbar2 = new Toolbar(20, 120, 400, 150);
    toolbar2.addItem("b1", new Icon("../../img/smallicons/map2.svg", 16, 16), "Map");
    toolbar2.addItem("b1", new Icon("../../img/smallicons/store.svg", 16, 16), "Store");
    toolbar2.addItem("b1", new Icon("../../img/smallicons/paper-plane.svg", 16, 16), "Plane");
    toolbar2.addItem("b1", new Icon("../../img/smallicons/packman.svg", 16, 16), "Packman");
    var toolbar3 = new Toolbar(20, 220, 400, 150);
    toolbar3.addItem("b1", new Icon("../../img/smallicons/r2d2.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/briefcase.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/candy.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/car.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/hand.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/train.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/toaster.svg", 32, 32));
    toolbar3.addItem("b1", new Icon("../../img/smallicons/muffin.svg", 32, 32));
    p2.setInsets(20, 10, 20, 10);
    p2.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 10));

    p2.add(makeInfoBox("'Text only', 'Icons and Text' and 'Icons only' Toolbars."));
    p2.add(toolbar1);
    p2.add(toolbar2);
    p2.add(toolbar3);

    // **************************************************
    // Add Titled Border
    // **************************************************

    var tb1 = new TitledBorder(30, 80, 250, 100, new Label(0, 0, 0, 0, null, "TV Programs", new Icon("../../img/smallicons/eye.svg", 32, 32)));
    var tb2 = new TitledBorder(30, 210, 250, 100, new Label(0, 0, 0, 0, null, "Transport"));
    var tb3 = new TitledBorder(30, 320, 250, 100, new Label(0, 0, 0, 0, null, null, new Icon("../../img/smallicons/photo.svg", 32, 32)));
    tb1.setLayout(new FlowLayout(LEFT));
    tb1.setAlign(LEFT, TOP);

    tb2.setLayout(new FlowLayout(CENTER));
    tb2.setAlign(RIGHT, BOTTOM);

    tb3.setLayout(new FlowLayout(CENTER));
    tb3.setAlign(CENTER, TOP);

    tb2.add(new Label(0,0,0,0,null,null, new Icon("../../img/smallicons/bus.svg", 32, 32)));
    tb2.add(new Label(0,0,0,0,null,null, new Icon("../../img/smallicons/car.svg", 64, 64)));
    tb2.add(new Label(0,0,0,0,null,null, new Icon("../../img/smallicons/train.svg", 32, 32)));

    tb3.add(new Button(0, 0, 50, 50, "label1", "Take a pic!"));
    var ccb1 = new ComboBox(0, 0, 0, 0);
    ccb1.setFont(new Font("Arial", "normal", "10pt"));
    ccb1.addTextItem("Futurama");
    ccb1.addTextItem("Simpsons");
    ccb1.addTextItem("Office");
    ccb1.addTextItem("Britain Got Talent");
    tb1.add(ccb1);
    
    p3.add(makeInfoBox("Titled Border widget with own Layout Manager.", 30, 20));
		p3.add(tb1);
    p3.add(tb2);
    p3.add(tb3);

    // **************************************************
    // Add TextBox
    // **************************************************

    var tb1 = new TextBox(0, 0, 475, 100, "Swing.svg & Draw2D.svg", false);
    var tb2 = new TextBox(0, 0, 475, 100, "Web Semantics, Inc.", false);
    var tb3 = new TextBox(0, 0, 475, 100, "http://websemantics.ca", false);
    var tb4 = new TextBox(0, 0, 475, 100, "Copyright 2004 - 2015", false);
    tb1.setFontSize('14pt')
    tb2.setFontSize('20pt')
    tb3.setFontSize('24pt')
    tb4.setFontSize('28pt')
    
    // var tb5 = new TextBox(0, 0, 350, 100, "Please send an email or visit: websemantics.ca.", viewerMode);
    var label1 = new Label(0, 0, 0, 0, "Label1", "Oea.svg Packages:");
    var label2 = new Label(0, 0, 0, 0, "Label1", "Author:");
    var label3 = new Label(0, 0, 0, 0, "Label1", "URL:");
    var label4 = new Label(0, 0, 0, 0, "Label1", "Copyright:");
    
    // var label5 = new Label(0, 0, 0, 0, "Label1", "Comments:");
    p4.setInsets(20, 10, 20, 10);
    p4.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 10));

    p4.add(makeInfoBox("BoxLayout and TextBoxes with various Font Sizes and Selection Colors."));
    p4.add(label1);
    p4.add(tb1);
    p4.add(label2);
    p4.add(tb2);
    p4.add(label3);
    p4.add(tb3);
    p4.add(label4);
    p4.add(tb4);
    // p4.add(label5); p4.add(tb5);
    
    // **************************************************
    // Add Buttons
    // **************************************************
    
    var b1 = new Button(0, 0, 50, 50, "b1", "Simple Button");
    var b2 = new Button(0, 0, 50, 50, "b2", "Window Button");
    b2.changeSkin(new WinButtonSkin());
    var b3 = new Button(0, 0, 50, 50, "b3", "Box-styled Button");
    b3.changeSkin(new BoxButtonSkin());
    var b4 = new Button(0, 0, 50, 50, "b4", "Tool Button");
    b4.changeSkin(new ToolButtonSkin());
    var b5 = new Button(0, 0, 50, 50, "b5", "Flat Button");
    b5.changeSkin(new FlatButtonSkin());
    var spin1 = new Spin(0, 0, "spin1", "00", 5);
    spin1.setMinMax(0, 20);
    
    p5.setInsets(20, 10, 10, 10);
    p5.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));

    p5.add(makeInfoBox("Demostration of Swing.svg built-in support for Java-style Look & Feel."));
    p5.add(b1);
    p5.add(b2);
    p5.add(b3);
    p5.add(b4);
    p5.add(b5);
    p5.add(spin1);

    // **************************************************
    // Add Labels
    // **************************************************
    
    p6.add(makeInfoBox("Labels come in two styles: 'Text only' and 'Text and Icon'."));
    p6.setInsets(20, 10, 10, 10);
    p6.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));
    p6.add(new Label(0, 0, 0, 0, null, "Hungry and lonely"));
    p6.add(new Label(0, 0, 0, 0, null, " Eating dount", new Icon("../../img/smallicons/donut.svg", 32, 32)));

    // **************************************************
    // Add Components with Tooltip
    // **************************************************

    var lbl11 = new Label(0, 0, 0, 0, null, "Rock & Roll", new Icon("../../img/smallicons/hand.svg", 32, 32))
    lbl11.setBackground("white");
    lbl11.setToolTipText("Tooltip for a label,... ");
    var lbl22 = new Button(0, 0, 0, 0, null, " Eat me,.. ", new Icon("../../img/smallicons/hamburger.svg", 32, 32))
    lbl22.setToolTipText("Tooltip for a button,... ");

    p7.add(makeInfoBox("Tooltips can be attached to any Swing.svg compoenent."));
    p7.setInsets(20, 10, 10, 10);
    p7.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));
    p7.add(lbl11);
    p7.add(lbl22);
    p7.setToolTipText("Let's talk about Tooltips.");

    // **************************************************
    // Add Lists
    // **************************************************

    var list1 = new List(10, 10, 200, 200);
    list1.addTextIconItem(" Eat a breakfast ", "../../img/smallicons/toaster.svg", 30, 30);
    list1.addTextIconItem(" Go to school ", "../../img/smallicons/bus.svg", 30, 30);
    list1.addTextIconItem(" Vist the library ", "../../img/smallicons/bookshelf.svg", 30, 30);
    list1.addTextIconItem(" Last class ", "../../img/smallicons/watch.svg", 30, 30);
    list1.addTextIconItem(" Time to party ", "../../img/smallicons/hand.svg", 30, 30);
    var list2 = new List(10, 10, 200, 200);
    list2.addTextIconItem(" Open File ");
    list2.addTextIconItem(" Save File ");
    list2.addTextIconItem(" Print Preview ");
    list2.addTextIconItem(" Page Setup ");
    list2.addTextIconItem(" Message Window ");
    list2.addTextIconItem(" Workspace Window ");
    list2.addTextIconItem(" Windows Manager ");
    list2.addTextIconItem(" Logout ");

    var container = new Panel(0,0,w,h);
    container.setLayout(new FlowLayout(LEFT, 10, 10));
    container.add(list1);
    container.add(list2);

    p8.add(makeInfoBox("Support for Lists with/without Icons."));
    p8.add(container);
    p8.setInsets(20, 10, 10, 10);
    p8.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));

    // **************************************************
    // Add PopUpMenu
    // **************************************************

    var lbl1 = new Label(0, 0, 0, 0, null, "It's raining ... ", new Icon("../../img/smallicons/umbrella.svg", 32, 32))
    lbl1.setBackground("white");
    lbl1.addMenuItem("What's this? (Label)");
    lbl1.addMenuSeparator();
    lbl1.addMenuItem("Source Code");
    var lbl2 = new Button(0, 0, 0, 0, null, " Comming to get you ... ", new Icon("../../img/smallicons/packman.svg", 32, 32))
    lbl2.addMenuItem("What's this? (Button)");
    lbl2.addMenuSeparator();
    lbl2.addMenuItem("Source Code");

    p9.add(makeInfoBox("Support for Context Menu (right click on widget or window)."));
    p9.add(lbl1);
    p9.add(lbl2);
    p9.setInsets(20, 10, 10, 10);
    p9.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));
    
    p9.addMenuItem("Spelling");
    p9.addMenuItem("Thesaurus");
    p9.addMenuSeparator();
    p9.addMenuItem("Check Code");
    p9.addMenuSeparator();
    p9.addMenuItem("Install");
    p9.addMenuItem("Customize");
   
    // **************************************************
    // Add ComboBoxes
    // **************************************************
    
    var cb0 = new ComboBox(0, 0, 0, 0);
    cb0.addComponent(new Label(0, 0, 0, 0, null, null, new Icon("../../img/smallicons/pizza.svg", 32, 32)));
    cb0.addComponent(new Label(0, 0, 0, 0, null, null, new Icon("../../img/smallicons/muffin.svg", 32, 32)));
    cb0.addComponent(new Label(0, 0, 0, 0, null, null, new Icon("../../img/smallicons/candy.svg", 32, 32)));

    var cb1 = new ComboBox(0, 0, 0, 0);
    cb1.setFont(new Font("Arial", "normal", "13pt"));
    cb1.addTextItem("Futurama");
    cb1.addTextItem("Simpsons");
    cb1.addTextItem("Office");
    cb1.addTextItem("Britain Got Talent");

    var cb2 = new ComboBox(0, 0, 0, 0);
    cb2.addComponent(new Label(0, 0, 0, 0, null, "Open Letter", new Icon("../../img/smallicons/open-letter.svg", 16, 16)));
    cb2.addComponent(new Label(0, 0, 0, 0, null, "World Wide Web", new Icon("../../img/smallicons/www.svg", 16, 16)));
    cb2.addComponent(new Label(0, 0, 0, 0, null, "Multipurpose", new Icon("../../img/smallicons/knife.svg", 16, 16)));
    cb2.addComponent(new Label(0, 0, 0, 0, null, "When in need", new Icon("../../img/smallicons/piggy.svg", 16, 16)));
    cb2.addComponent(new Label(0, 0, 0, 0, null, "Shopping", new Icon("../../img/smallicons/label.svg", 16, 16)));

    p10.add(makeInfoBox("Swing.svg provides Text, Icon and Color ComboBoxes."));
    p10.add(cb2);
    p10.add(cb0);
    p10.add(new Canvas(0,0,200,10));
    p10.add(cb1);
    p10.add(new ColorComboBox("fillColor"));
    p10.setInsets(10, 10, 10, 10);
    p10.setLayout(new FlowLayout(LEFT, 20, 20));

    // **************************************************
    // Add CheckBoxes
    // **************************************************

    var birdButton = new RadioButton("Bird");
    var catButton = new RadioButton("Cat");
    var rabbitButton = new RadioButton("Rabbit");
    birdButton.setSelected(true);
    rabbitButton.setSelected(true);

    var group = new ButtonGroup();
    group.add(birdButton);
    group.add(catButton);
    group.add(rabbitButton);

    p11.add(makeInfoBox("Support for Radio and Check Boxes.", 30, 20));
    p11.add(group);
    p11.add(new CheckBox("Hello"));
    p11.add(new CheckBox("World"));
    p11.setInsets(20, 10, 10, 10);
    p11.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 20));

    // **************************************************
    // Customize TextBoxes
    // **************************************************
    
    tabbedPane.paint();

    tb1.setStyledModeOn();
    tb1.changeSelectionRectStyle("red", "blue", 1);
    
    tb3.setStyledModeOn();
    tb3.changeSelectionRectStyle("yellow", "none", 0);
    
    tb4.setStyledModeOn();
    tb4.changeSelectionRectStyle("green", "red", 2);

    win.add(tabbedPane);
	win.repaint();
	win.recalc();

		// win.inProgress(false);
}