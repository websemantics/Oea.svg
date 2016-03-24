/**
 * Java.js : Point3D
 *
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.io>
 * @copyright 2004-2016 Web Semantics, Inc. (http://websemantics.io)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     24th November 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

function Point3d( /* double */ x, y, z) {
        var argv = Point3d.arguments;
        var argc = Point3d.length;
        this.className = "Point3d";

        /* Point   */
        this.normal = null; // normal to boundary plane
        /* Array double */
        this.v = null;
        /* Point3d */ // this.o = new Point3d(0,0,0);
        /* Point3d */ // this.i = new Point3d(1,0,0);
        /* Point3d */ // this.j = new Point3d(0,1,0);
        /* Point3d */ // this.k = new Point3d(0,0,1);
        /* Point3d */ // this.ijk = new Point3d(1,1,1);
        
        if (argv.length >= 0) 
          this.initPoint3d(x, y, z);
    }

Point3d.prototype.initPoint3d = function( /* double */ x, y, z) {
        this.v = new Array(); // of type double
        this.v[0] = this.v[1] = this.v[2] = 0;

        if (x != undefined && y != undefined && z != undefined) {
            this.v[0] = x;
            this.v[1] = y;
            this.v[2] = z;
        }

    }

Point3d.prototype.fromSpherical = function( /* double */ r, theta, phi) {
        return new Point3d(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(theta) * Math.cos(phi), r * Math.sin(phi));
    }

Point3d.prototype.fromCylindrical = function( /* double */ r, theta, y) {
        return new Point3d(r * Math.cos(theta), y, r * Math.sin(theta));
    }

Point3d.prototype.x = function() {
        return this.v[0];
    }

Point3d.prototype.y = function() {
        return this.v[1];
    }

Point3d.prototype.z = function() {
        return this.v[2];
    }

Point3d.prototype.theta = function() {
        return Math.atan2(this.v[0], this.v[2]);
    }

Point3d.prototype.r = function() {
        return Math.sqrt(this.v[0] * this.v[0] + this.v[2] * this.v[2]);
    }

Point3d.prototype.add = function( /* Point3d */ x) {
        var a = new Point3d();
        for (var i = 0; i < 3; i++) {
            a.v[i] = this.v[i] + x.v[i];
        }
        return a;
    }

Point3d.prototype.subtract = function( /* Point3d */ x) {
        var a = new Point3d();
        for (var i = 0; i < 3; i++) {
            a.v[i] = this.v[i] - x.v[i];
        }
        return a;
    }

Point3d.prototype.scale = function( /* double */ x, y, z) {

        var a = new Point3d();

        if (y == undefined && z == undefined) {
            for (var i = 0; i < 3; i++) {
                a.v[i] = this.v[i] * x;
            }
            return a;
        } else
            return new Point3d(x * this.v[0], y * this.v[1], z * this.v[2]);
    }

Point3d.prototype.dot = function( /* Point3d */ x) {
        var d = 0;
        for (var i = 0; i < 3; i++) {
            d += this.v[i] * x.v[i];
        }
        return d;
    }

Point3d.prototype.length = function() {
        return Math.sqrt(this.dot(this));
    }

Point3d.prototype.normalize = function() {
        return this.scale(1 / this.length());
    }

Point3d.prototype.cross = function( /* Point3d */ x) {
        return new Point3d(this.v[1] * x.v[2] - x.v[1] * this.v[2], this.v[2] * x.v[0] - x.v[2] * this.v[0], this.v[0] * x.v[1] - x.v[0] * this.v[1]);
    }

Point3d.prototype.toString = function() {
    return "v[" + this.v[0] + "," + this.v[1] + "," + this.v[2] + "]";;
}
