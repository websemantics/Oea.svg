/**
 * Java.js : Hashtable
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Hashtable [ NEEDS OPTIMIZING ]
 */

function Hashtable( /* String */ deserializeString, chr1, chr2) {
        var argv = Hashtable.arguments;
        var argc = Hashtable.length;
        this.className = "Hashtable";

        this.buffer = new Array();

        if (argv.length > 0) 
          this.initHashtable(deserializeString, chr1, chr2);
    }

Hashtable.prototype.initHashtable = function( /* String */ deserializeString, chr1, chr2) {
        this.deserialize(deserializeString, chr1, chr2);
    }

Hashtable.prototype.clear = function() {
        this.buffer = new Array();
    }

Hashtable.prototype.containsKey = function(key) {
        var exists = false;
        for (var i in this.buffer) {
            if (i == key && this.buffer[i] != null) {
                exists = true;
                break;
            }
        }
        return exists;
    }

Hashtable.prototype.containsValue = function(value) {
        var contains = false;
        if (value != null) {
            for (var i in this.buffer) {
                if (this.buffer[i] == value) {
                    contains = true;
                    break;
                }
            }
        }
        return contains;
    }

Hashtable.prototype.get = function(key) {
        return this.buffer[key];
    }

Hashtable.prototype.isEmpty = function() {
        return (this.size == 0) ? true : false;
    }

Hashtable.prototype.keys = function() {
        var keys = new Array();
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                keys.push(i);
        }
        return keys;
    }

Hashtable.prototype.put = function(key, value) {

        if (key == undefined || value == undefined) return;

        if (key == null || value == null) {
            throw "NullPointerException {" + key + "},{" + value + "}";
        } else {
            this.buffer[key] = value;
        }
    }

Hashtable.prototype.remove = function(key) {
        //var rtn = this.buffer[key];
        this.buffer[key] = null;
        // return rtn;
    }

Hashtable.prototype.size = function() {
        var size = 0;
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                size++;
        }
        return size;
    }

Hashtable.prototype.values = function() {
        var values = new Array();
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                values.push(this.buffer[i]);
        }
        return values;
    }

Hashtable.prototype.clone = function() {
        var ret = new Hashtable();
        for (i in this.buffer)
            ret.buffer[i] = this.buffer[i];
        return ret;
    }

Hashtable.prototype.serialize = function( /* String*/ chr1, chr2) {
    // Summary:
    // Returns the content of the Hashtable as a string: ( key1:value1;key2:value2,..)

        if (chr1 == undefined) chr1 = ":";
        if (chr2 == undefined) chr2 = ";";
        var result = "";
        for (var i in this.buffer)
            if (this.buffer[i] != null) {
                // Ensure that all instances of the char ":" is replaced by char "^" for the serialization to succeed
                var para1 = (i + "").replace(/:/g, "^");
                var para2 = (this.buffer[i] + "").replace(/:/g, "^");
                result += para1 + chr1 + para2 + chr2;
            }
        return result;
    }

Hashtable.prototype.deserialize = function( /* String */ str, /* String*/ chr1, chr2) {
    // Summary:
    // Adds values to the Hastable from a string,..

        if (chr1 == undefined) chr1 = ":";
        if (chr2 == undefined) chr2 = ";";

        if (str == undefined || str == null) return;

        var s = str.split(chr2);

        for (var i = 0; i < s.length; i++) {
            var m = s[i].split(chr1);
            // Ensure that all instances of the char "^" is replaced by char ":" for the deserialization to succeed
            if (m[0] != undefined && m[1] != undefined) {
                var para1 = (m[0] + "").replace(/\^/g, ":");
                var para2 = (m[1] + "").replace(/\^/g, ":");
                this.put(para1, para2);
            }
        }

    }

Hashtable.prototype.toString = function() {
    var result = this.className + " [";
    for (var i in this.buffer) {
        if (this.buffer[i] != null)
            result += "{" + i + "},{" + this.buffer[i] + "}\n";
    }
    result += "]";
    return result;
}              