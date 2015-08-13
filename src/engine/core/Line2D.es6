/**
 * @class Line2d
 */
export default class Line2d {
    /**
     * @constructs Line2d
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     */
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    bounds() {
        throw new Error("Method not implemented");
    }

    length() {
        throw new Error("Method not implemented");
    }
}
