/**
 * Generic 2D map class
 * @class AbstractMap2D
 * @public
 */
export default class AbstractMap2D {
    /**
     * @constructs AbstractMap2D
     * @param {number} width - Width of the map
     * @param {number} height - Height of the map
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.map = [];
    }

    /**
     * Initialise the map with default values
     */
    init() {
        for (let x = 0; x < this.width; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.height; y++) {
                let tile = { x, y };
                this.map[x][y] = tile;
                this.initTile(tile);
            }
        }
    }

    /**
     * Clears the map with default values
     */
    clear() {
        this.map.forEach((row) => {
            row.forEach((tile) => {
                this.initTile(tile);
            });
        });
    }

    /**
     * Initialise a tile with default values
     * @abstract
     * @param {Object} tile - The tile to initialise
     */
    initTile(tile) {
        throw new Error("Map2D:initTile must be implemented by subclass!");
    }

    /**
     *
     * @param {Object} start
     * @param {number} start.x
     * @param {number} start.y
     * @param {Object} target
     * @param {number} target.x
     * @param {number} target.y
     * @param {number} maxDrawDistance
     * @returns {Array}
     */
    rayTraceLine(start, target, maxDrawDistance = 100) {
        let ret = [];

        let x0 = start.x;
        let y0 = start.y;

        let x1 = target.x;
        let y1 = target.y;

        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);

        let sx = x0 < x1 ? 1 : -1;
        let sy = y0 < y1 ? 1 : -1;

        let error = dx - dy;

        dx = dx * 2;
        dy = dy * 2;

        while (maxDrawDistance > 0) {
            // Check we are in map bounds
            if (x0 < 0 || y0 < 0 || x0 >= this.width || y0 >= this.height) {
                break;
            }

            ret.push({ x: x0, y: y0 });

            if (error > 0) {
                x0 += sx;
                error -= dy;
            } else {
                y0 += sy;
                error += dx;
            }

            // TODO: Maybe break if we hit a wall?
            // TODO: Move to function??
            //if (
            //  (x0 === 4 && y0 === 2)
            //) {
            //  break;
            //}

            --maxDrawDistance;
        }

        return ret;
    }
}
