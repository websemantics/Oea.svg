/**
 * Draw2D.svg : Page
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     10th November 2004 
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var page_counter = 0;
var common_page_id = "page_";
var page_Register=new Array();

// This is the default page to be used by everything (if not otherwise stated)!
var defualt_page = null; 

/**
 * Page External APIS:
 */

function pg_createPage(pageNumber, pageId) {
        return (new Page(pageNumber, pageId));
    }

function pg_createDefualtPage() {
        defualt_page = pg_createPage();
    }

function pg_getDefualtPage() {
        return defualt_page;
    }

/**
 * Page Internal APIS:
 */

function pg_int_getPageId() {
				// Summary:
				// pg_getPageId: returns a unique Id for a Page object 
        return (common_page_id + (page_counter++));
    }

function pg_int_registerPage(page) {
				// Summary:
				// pg_registerPage: save Page in an array 
        page_Register[page.id] = page;
    }

/**
 * Class Page
 *
 * This class serve as host to layers
 * 
 */

function Page(pageNumber, pageId) {
        var argv = Page.arguments;
        var argc = Page.length;
        this.className = "Page";

        if (argv.length > 0)
            this.initPage(pageNumber, pageId);
    }

Page.prototype.initPage = function(pageNumber, pageId) {
        if (pageNumber) this.pageNumber = pageNumber;
        else this.pageNumber = 0;
        if (!pageId || pageId == null) this.id = pg_int_getPageId();
        else this.id = pageId;
        pg_int_registerPage(this);
        //this.create();
    }

Page.prototype.create = function() {
				// Summary:
				// Create the SVG 'g' element for the Page object
				// Returns, (this) Page if successful or 'false' if not successful 
	
        // Do not redraw if the SVG node for this object exists
        if (svgDocument.getElementById(this.getId()) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.getId()
        });
    }

Page.prototype.setVisibility = function(/* true or false*/flag) {
        if (flag)
            this.Node.setAttribute('visibility', "show");
        else
            this.Node.setAttribute('visibility', "hidden");
    }

Page.prototype.getNode = function() {
        return this.Node;
    }

Page.prototype.getId = function() {
		    return this.id;
		}