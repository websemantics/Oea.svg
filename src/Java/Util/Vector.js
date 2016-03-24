/**
 * Java.js : Vactor
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Vactor 
 * 
 * Utility class used as Linked List (from JAVA)
 * 
 */

function Vector(initialCapacity) {
        var argv = Vector.arguments;
        var argc = Vector.length;
        this.className = "Vector";

        this.elementData = new Array(); // Virtually unlimited capacity,..
        this.elementCount = 0;
        this.initialCapacity = 10;

        if (argv.length > 0) 
        	this.initVector(initialCapacity);
    }

Vector.prototype.initVector = function(initialCapacity) {
        this.initialCapacity = initialCapacity;
    }

Vector.prototype.setSize = function(newSize) {
    // Summary:
    // Sets the size of this vector. If the new size is greater than the current size, new null items 
    // are added to the end of the vector. If the new size is less than the current size, all 
    // components at index newSize and greater are discarded.

        /* NOT IMPLEMENTED
        	if (newSize > this.elementCount) {
        	    for (var i = this.elementCount  ; i < newSize ; i++) {
        		    this.elementData[i] = null;
        	   } else {
        	    for (var i = newSize ; i < this.elementCount ; i++) {
        		 this.elementData[i] = null;
        	    }
        	}
        	this.elementCount = newSize;*/
    }

Vector.prototype.size = function() {
    // Summary:
    // Returns the number of components in this vector.
        return this.elementCount;
    }

Vector.prototype.capacity = function() {
    // Summary:
    // Returns the current capacity of this vector.
        return this.elementData.length;
    }

Vector.prototype.isEmpty = function() {
        return this.elementCount == 0;
    }

Vector.prototype.elements = function() {
    // Summary:
    // This method create an implementation of Enumeration interface specially for Vecotr class,..

        var enumra = new Enumeration();
        // Attributes
        enumra.className = "Enumeration{Vector}";
        enumra.count = 0;
        enumra.container = this.clone();
        // Methods
        enumra.hasMoreElements = function() {
            return (this.count < this.container.size());
        };

        enumra.nextElement = function() {
            if (this.hasMoreElements())
                return (this.container.elementAt(this.count++));
            else
                return null;
        };
        return enumra;
    }

Vector.prototype.contains = function( /* Object */ elem) {
    // Summary:
    // Tests if the specified object is a component in this vector.
        return this.indexOf(elem) >= 0;
    }

Vector.prototype.indexOf = function( /* Object */ elem, /* int */ index) {
    // Summary:
    // Searches for the first occurence of the given argument beginning the search at index
    // Forms:
    //======
    // (1) indexOf(Object elem)
    // (2) indexOf(Object elem,int index)

        if (index == undefined) index = 0;

        if (elem == null) {
            for (var i = index; i < this.size(); i++)
                if (this.elementData[i] == null)
                    return i;
        } else {
            for (var i = index; i < this.size(); i++) {
                if (elem == this.elementData[i]) return i; // Original => if (elem.equals(this.elementData[i]))
            }
        }
        return -1;
    }

Vector.prototype.elementAt = function(i) {
    // Summary:
    // Returns the component at the specified index.
        if (i >= this.elementCount) return null;
        return this.elementData[i];
    }

Vector.prototype.removeElementAt = function(i) {
    // Summary:
    // Deletes the component at the specified index. Each component in this vector with an index greater or 
    // equal to the specified index is shifted downward to have an index one smaller than the value it had previously. 

        if (i >= this.elementCount || i < 0) return null;

        var temp = new Array();
        var cnt = 0;

        for (var j = 0; j < this.elementCount; j++) {
            if (j != i) {
                temp[cnt] = this.elementData[j];
                cnt++;
            }
        }
        delete this.elementData;
        this.elementCount--;
        this.elementData = temp;
    }

Vector.prototype.addElement = function(obj) {
        this.elementData[this.elementCount++] = obj;
        return obj;
    }

Vector.prototype.removeElement = function(obj) {
        var i = this.indexOf(obj);
        if (i >= 0) {
            this.removeElementAt(i);
            return true;
        }
        return false;
    }

Vector.prototype.removeAllElements = function() {
    // Summary:
    // Removes all components from this vector and sets its size to zero.
        this.clear();
    }

Vector.prototype.insertElementAt = function(obj, i) {
        if (i >= this.elementCount) return null;

        this.elementCount++;
        var temp = new Array();
        var cnt = 0;

        for (var j = 0; j < this.elementCount; j++) {
            if (j != i) {
                temp[j] = this.elementData[cnt];
                cnt++;
            } else {
                temp[j] = obj;
            }
        }
        delete this.elementData;
        this.elementData = temp;
    }

Vector.prototype.setElementAt = function(obj, i) {
    // Summary:
    // Sets the component at the specified index of this vector to be the specified object.
        if (i >= this.elementCount) return null;
        this.elementData[i] = obj;
    }

Vector.prototype.clear = function() {
        delete this.elementData;
        this.elementData = new Array();
        this.elementCount = 0;
    }

Vector.prototype.clone = function() {
        var cloneVector = new Vector();
        for (i in this.elementData)
            cloneVector.elementData[i] = this.elementData[i];
        cloneVector.elementCount = this.elementCount;
        return cloneVector;
    }

Vector.prototype.toString = function() {
    var ret = this.className + " (noe = " + this.size() + ") [ ";
    for (i = 0; i < this.size() - 1; i++) ret += this.elementData[i] + ", ";
    ret += this.elementData[i] + " ]";
    return ret;
}
