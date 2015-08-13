/**
 * @class Line2D
 */
export default class Line2D {
    /**
     * @constructs Point2D
     * @param {number} x1
     * @param {number} y1
     * @param {number} x1
     * @param {number} y2
     */
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    getBounds() {
        throw new Error("Method not implemented");
    }
}
