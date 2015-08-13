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

    bounds() {
        throw new Error("Method not implemented");
    }

    /**
     * Determine if the rectangle contains the point within it's boundaries.
     *
     * @param {Point2d} point
     */
    containsPoint(point) {
        return !(
            point.x < this.x ||
            point.x > this.x + this.width ||
            point.y < this.y ||
            point.y > this.y + this.height
        );
    }

    /**
     * Determine if it intersects with another rectangle.
     *
     * @param {Rect} rect
     */
    intersectsRect(rect) {
        return !(
            this.x + rectA.width < rect.x ||
            rect.x + rect.width < this.x ||
            this.y + this.height < rect.y ||
            rect.y + rect.height < this.y
        );
    }
}
