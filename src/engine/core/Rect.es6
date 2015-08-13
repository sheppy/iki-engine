/**
 * @class Rect
 */
export default class Rect {
    /**
     * @constructs Rect
     * @param {number} width
     * @param {number} height
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor(width, height, x = 0, y = 0) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    getBounds() {
        throw new Error("Method not implemented");
    }

    /**
     * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
     *
     * @param {number} x
     * @param {number} y
     */
    containsPoint(x, y) {
        throw new Error("Method not implemented");
    }

    /**
     * Determine if two rectangles overlap.
     *
     * @param {Rect} rect
     */
    intersects(rect) {
        throw new Error("Method not implemented");
    }
}
