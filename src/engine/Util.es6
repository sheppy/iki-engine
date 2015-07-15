/**
 * @class Util
 * @public
 * @static
 */
export default class Util {
    /**
     * @param {number} val
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    /**
     * @param {Object} point1
     * @param {number} point1.x
     * @param {number} point1.y
     * @param {Object} point2
     * @param {number} point2.x
     * @param {number} point2.y
     * @returns {number}
     */
    static distanceSquared(point1, point2) {
        let xs = point2.x - point1.x;
        xs = xs * xs;

        let ys = point2.y - point1.y;
        ys = ys * ys;

        return xs + ys;
    }

    /**
     * @param {Object} point1
     * @param {number} point1.x
     * @param {number} point1.y
     * @param {Object} point2
     * @param {number} point2.x
     * @param {number} point2.y
     * @returns {number}
     */
    static distance(point1, point2) {
        let distanceSquared = Util.distanceSquared(point1, point2);

        return Math.sqrt(distanceSquared);
    }

    /**
     * Calculate the gradual loss in intensity of any kind of flux through a medium
     * @param r - Radius or length of flux
     * @param f - Falloff rate
     * @param d - Distance between the medium and the center of the flux
     */
    static attenuation(r, f, d) {
        // float atten = 1.0f / (ConstantAtt + LinearAtt * LightDistance);
        //return 0.4;
        //return 1 / (0 + 0.01 + d);
        //return Math.pow(1 - d, 0.5);
        return Math.pow(Math.max(0.0, 1.0 - (d / r)), f + 1.0);
        //return att * att;

        //var att = Util.clamp(1.0 - d / r, 0.0, 1.0);
        //return att * att;

        //var att = Util.clamp(1.0 - d * d / r * r, 0.0, 1.0);
        //return att;
        //return att * att;
        /*
         // var att=1.0/(1.0+0.1*dist+0.01*dist*dist);
         var att = Util.clamp(1.0 - dist / radius, 0.0, 1.0);
         //var att = Util.clamp(1.0 - dist*dist/(radius*radius), 0.0, 1.0);
         att *= att;
         */
    }
}
