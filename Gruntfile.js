module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("./src/docblock.js")
            .replace(/@VERSION/, pkg.version)
            .replace(/@DATE/, grunt.template.today("yyyy-mm-dd")) + "\n",
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>",
                report: "min"
            },
            dist: {
                src: "<%= concat.target.dest %>",
                dest: "dist/oea.svg-min.js"
            }
        },
        concat: {
            options: {
                banner: "<%= banner %>"
            },
            target: {
                dest: "dist/oea.svg.js",
                src: [
                    "./src/Initialise.js",
                    "./src/Draw2d/initDraw2D.js",
                    "./src/Swing/initSwing.js",
                    "./src/Draw2d/FClasses/Graphical/Point.js",
                    "./src/Draw2d/FClasses/Graphical/Rect.js",
                    "./src/Draw2d/Color/Palette.js",
                    "./src/Draw2d/FClasses/SVG/SvgNode.js",
                    "./src/Draw2d/FClasses/SVG/SvgUtilities.js",
                    "./src/Draw2d/FClasses/SVG/SVGDefs.js",
                    "./src/Draw2d/FClasses/Graphical/RectNode.js",
                    "./src/Draw2d/FClasses/Node/Node.js",
                    "./src/Draw2d/Layer/Layer.js",
                    "./src/Draw2d/Page/Page.js",
                    "./src/Draw2d/Desktop/Desktop.js",
                    "./src/Draw2d/Font/Font.js",
                    "./src/Draw2d/Font/FontMetrics.js",
                    "./src/Draw2d/Graphics/Graphics.js",
                    "./src/Draw2d/Shapes/Shape.js",
                    "./src/Draw2d/Shapes/Line.js",
                    "./src/Draw2d/Shapes/Oval.js",
                    "./src/Draw2d/Shapes/Circle.js",
                    "./src/Draw2d/Shapes/Polygon.js",
                    "./src/Draw2d/Shapes/Path.js",
                    "./src/Draw2d/Shapes/WinBorder.js",
                    "./src/Draw2d/Shapes/StepBorder.js",
                    "./src/Draw2d/Shapes/BoxBorder.js",
                    "./src/Draw2d/Shapes/RRectangle.js",
                    "./src/Draw2d/Shapes/Rectangle.js",
                    "./src/Draw2d/Shapes/Text.js",
                    "./src/Draw2d/Shapes/TextView.js",
                    "./src/Draw2d/Shapes/Image.js",
                    "./src/Draw2d/Cursor/Cursor.js",
                    "./src/Draw2d/ToolTip/ToolTip.js",
                    "./src/Java/Util/Vector.js",
                    "./src/Java/Util/Hashtable.js",
                    "./src/Java/Util/EventListener.js",
                    "./src/Java/Util/EventObject.js",
                    "./src/Java/Util/Enumeration.js",
                    "./src/Java/Util/Enumerator.js",
                    "./src/Java/Util/ReverseEnumerator.js",
                    "./src/Java/AWT/Geom/Point2D.js",
                    "./src/Java/AWT/Geom/Point.js",
                    "./src/Java/AWT/Geom/Dimension2D.js",
                    "./src/Java/AWT/Geom/Dimension.js",
                    "./src/Java/AWT/Geom/Rectangle2D.js",
                    "./src/Java/AWT/Geom/gRectangle.js",
                    "./src/Java/AWT/Geom/gPolygon.js",
                    "./src/Java/AWT/Insets.js",
                    "./src/Java/AWT/Color.js",
                    "./src/Java/AWT/Event/MouseListener.js",
                    "./src/Java/AWT/Event/MouseMotionListener.js",
                    "./src/Java/AWT/Event/MouseEvent.js",
                    "./src/Java/AWT/Event/KeyEvent.js",
                    "./src/Java/AWT/Event/ActionEvent.js",
                    "./src/Java/AWT/Event/KeyListener.js",
                    "./src/Java/AWT/Event/ActionListener.js",
                    "./src/Swing/LookAndFeel/ButtonSkin.js",
                    "./src/Swing/LookAndFeel/SimpleButtonSkin.js",
                    "./src/Swing/LookAndFeel/WinButtonSkin.js",
                    "./src/Swing/LookAndFeel/BoxButtonSkin.js",
                    "./src/Swing/LookAndFeel/ToolButtonSkin.js",
                    "./src/Swing/LookAndFeel/FlatButtonSkin.js",
                    "./src/Swing/LookAndFeel/WindowSkin.js",
                    "./src/Swing/LookAndFeel/DefaultWindowSkin.js",
                    "./src/Swing/LookAndFeel/SimpleWindowSkin.js",
                    "./src/Swing/ListenerManager.js",
                    "./src/Swing/EventManager.js",
                    "./src/Swing/FlowLayout.js",
                    "./src/Swing/BoxLayout.js",
                    "./src/Swing/Component.js",
                    "./src/Swing/Canvas.js",
                    "./src/Swing/Container.js",
                    "./src/Swing/Panel.js",
                    "./src/Swing/Icon.js",
                    "./src/Swing/Label.js",
                    "./src/Swing/Button.js",
                    "./src/Swing/CheckBox.js",
                    "./src/Swing/RadioButton.js",
                    "./src/Swing/ButtonGroup.js",
                    "./src/Swing/Toolbar.js",
                    "./src/Swing/TabbedPane.js",
                    "./src/Swing/Pane.js",
                    "./src/Swing/TitledBorder.js",
                    "./src/Swing/Separator.js",
                    "./src/Swing/List.js",
                    "./src/Swing/PopUpMenu.js",
                    "./src/Swing/TextBox.js",
                    "./src/Swing/ComboBox.js",
                    "./src/Swing/Spin.js",
                    "./src/Swing/ColorComboBox.js",
                    "./src/Swing/Window.js",
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-exec");

    grunt.registerTask("default", ["concat", "uglify"]);
};
